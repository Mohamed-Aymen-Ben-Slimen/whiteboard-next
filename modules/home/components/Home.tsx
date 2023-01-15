import { FormEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { socket } from '@/common/lib/socket';
import { useSetRoomId } from '@/common/recoil/room';
import { useModal } from '@/modules/modal';

import NotFoundModal from '../modals/NotFound';
import { getUserLocalStorage } from '@/common/lib/localStorage';

const Home = () => {
  const { openModal } = useModal();
  const setAtomRoomId = useSetRoomId();

  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState({});


  const router = useRouter();

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    const u = getUserLocalStorage();
    console.log(u);
    setUser(u);
    setUsername(`${u?.firstName} ${u?.lastName}`);
  }, []);

  useEffect(() => {
    socket.on('created', (roomIdFromServer) => {
      setAtomRoomId(roomIdFromServer);
      router.push(`${roomIdFromServer}`);
    });

    const handleJoinedRoom = (roomIdFromServer: string, failed?: boolean) => {
      if (!failed) {
        setAtomRoomId(roomIdFromServer);
        router.push(`${roomIdFromServer}`);
      } else {
        openModal(<NotFoundModal id={roomId} />);
      }
    };

    socket.on('joined', handleJoinedRoom);

    return () => {
      socket.off('created');
      socket.off('joined', handleJoinedRoom);
    };
  }, [openModal, roomId, router, setAtomRoomId]);

  useEffect(() => {
    socket.emit('leave_room');
    setAtomRoomId('');
  }, [setAtomRoomId]);

  const handleCreateRoom = () => {
    socket.emit('create_room', username);
  };

  const handleJoinRoom = () => {
    if (roomId) socket.emit('join_room', roomId, username);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
	<div className="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			<div className="max-w-md mx-auto">
				<div>
					<h1 className="text-2xl font-semibold">User: {username}</h1>
				</div>
				<div className="divide-y divide-gray-200">
					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

						<div className="flex flex-col items-center gap-3">
							<button 
              className="bg-blue-500 text-white rounded-md px-2 py-1"
              onClick={handleCreateRoom}
              >Create a new room</button>
						

            <div className="my-8 flex w-96 items-center gap-2">
            <div className="h-px w-full bg-zinc-200" />
            <p className="text-zinc-400">or</p>
            <div className="h-px w-full bg-zinc-200" />
            </div>

            <div className="relative">
							<input id="roomid"
               name="roomid"
                type="text"
                 className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-none" 
                 placeholder="Password" 
                 value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
							<label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm pointer-events-none">Room ID</label>
						</div>


              <button 
              className="bg-blue-500 text-white rounded-md px-2 py-1"
              onClick={handleJoinRoom}
              >Join a room</button>

      </div>

					</div>
				</div>
			</div>
		</div>
	</div>
</div>




</>

    
  );
};

export default Home;
