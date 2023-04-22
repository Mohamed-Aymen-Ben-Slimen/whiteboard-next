import { createServer } from 'http';

import express, { json } from 'express';
import next, { NextApiHandler } from 'next';
import { Server } from 'socket.io';
import { v4 } from 'uuid';
import mongoose from 'mongoose';

import {
  ClientToServerEvents,
  Move,
  Room,
  ServerToClientEvents,
} from '@/common/types/global';
import { UserModel } from './user.model';
import { BoardModel } from './board.model';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app = express();
  app.use(json());
  const server = createServer(app);

  const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

  await mongoose.connect('mongodb://127.0.0.1:27017/whiteboard');

  app.get('/hello', async (_, res) => {
    res.send('Hello World');
  });

  const rooms = new Map<string, Room>();

  const addMove = (roomId: string, socketId: string, move: Move) => {
    const room = rooms.get(roomId)!;

    if (!room.users.has(socketId)) {
      room.usersMoves.set(socketId, [move]);
    }

    room.usersMoves.get(socketId)!.push(move);
  };

  const undoMove = (roomId: string, socketId: string) => {
    const room = rooms.get(roomId)!;

    room.usersMoves.get(socketId)!.pop();
  };

  io.on('connection', (socket) => {
    const getRoomId = () => {
      const joinedRoom = [...socket.rooms].find((room) => room !== socket.id);

      if (!joinedRoom) return socket.id;

      return joinedRoom;
    };

    const leaveRoom = (roomId: string, socketId: string) => {
      const room = rooms.get(roomId);
      if (!room) return;

      const userMoves = room.usersMoves.get(socketId);

      if (userMoves) room.drawed.push(...userMoves);
      room.users.delete(socketId);

      socket.leave(roomId);
    };

    socket.on('create_room', (username) => {
      let roomId: string;
      do {
        roomId = Math.random().toString(36).substring(2, 6);
      } while (rooms.has(roomId));

      socket.join(roomId);

      rooms.set(roomId, {
        usersMoves: new Map([[socket.id, []]]),
        drawed: [],
        users: new Map([[socket.id, username]]),
      });

      io.to(socket.id).emit('created', roomId);
    });

    socket.on('check_room', (roomId) => {
      if (rooms.has(roomId)) socket.emit('room_exists', true);
      else socket.emit('room_exists', false);
    });

    socket.on('join_room', (roomId, username) => {
      const room = rooms.get(roomId);

      if (room && room.users.size < 12) {
        socket.join(roomId);

        room.users.set(socket.id, username);
        room.usersMoves.set(socket.id, []);

        io.to(socket.id).emit('joined', roomId);
      } else io.to(socket.id).emit('joined', '', true);
    });

    socket.on('joined_room', () => {
      const roomId = getRoomId();

      const room = rooms.get(roomId);
      if (!room) return;

      io.to(socket.id).emit(
        'room',
        room,
        JSON.stringify([...room.usersMoves]),
        JSON.stringify([...room.users])
      );

      socket.broadcast
        .to(roomId)
        .emit('new_user', socket.id, room.users.get(socket.id) || 'Anonymous');
    });

    socket.on('leave_room', () => {
      const roomId = getRoomId();
      leaveRoom(roomId, socket.id);

      io.to(roomId).emit('user_disconnected', socket.id);
    });

    socket.on('draw', (move) => {

      const roomId = getRoomId();

      const timestamp = Date.now();

      // eslint-disable-next-line no-param-reassign
      move.id = v4();

      addMove(roomId, socket.id, { ...move, timestamp });

      io.to(socket.id).emit('your_move', { ...move, timestamp });

      socket.broadcast
        .to(roomId)
        .emit('user_draw', { ...move, timestamp }, socket.id);
    });

    socket.on('undo', () => {
      const roomId = getRoomId();

      undoMove(roomId, socket.id);

      socket.broadcast.to(roomId).emit('user_undo', socket.id);
    });

    socket.on('mouse_move', (x, y) => {
      socket.broadcast.to(getRoomId()).emit('mouse_moved', x, y, socket.id);
    });

    socket.on('send_msg', (msg) => {
      io.to(getRoomId()).emit('new_msg', socket.id, msg);
    });

    socket.on('disconnecting', () => {
      const roomId = getRoomId();
      leaveRoom(roomId, socket.id);

      io.to(roomId).emit('user_disconnected', socket.id);
    });

    socket.on('save_board', (userId, name) => {
      const roomId = getRoomId();

    console.log(userId);
    console.log(rooms.get(roomId));


    const boardModel = new BoardModel({
      board: rooms.get(roomId),
      user: userId,
      roomId,
      name,
      createdAt: Date.now(),
    });

    boardModel.save();


    });
  });

  app.get('*', (req: any, res: any) => nextHandler(req, res));

  app.post('/register', async (req, res) => {
    console.log(req.body);
    const {user} = req.body;

    const findUser = await UserModel.findOne({email: user.email}).exec();

    if (findUser) {
      res.status(400).send({error: 'This email is already in use'});
      return;
    }

    const userModel = new UserModel(user);

    const savedUser = await userModel.save();

    res.status(200).send({user: savedUser});
  });

  app.post('/users', async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;

    const user = await UserModel.findOne({email}).exec();

    if (!user) {
      res.status(404).send({error: 'User not found'});
      return;
    }

    if (password !== user.password) {
      res.status(400).send({error: 'Wrong password'});
      return;
    }

    res.status(200).send({user});
  });

  app.post('/boards', async (req, res) => {
    const {user} = req.body;

    const boards = await BoardModel.find({user}).exec();

    res.status(200).send({boards});
  });

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
