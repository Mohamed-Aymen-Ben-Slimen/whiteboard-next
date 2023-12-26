import { useRoom } from "@/common/recoil/room";

import RoomContextProvider from "../context/Room.context";
import Board from "../modules/board";
import Chat from "../modules/chat";
import ToolBar from "../modules/toolbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRoomId } from "@/common/recoil/room/room.hooks";
import { socket } from "@/common/lib/socket";
import Home from "@/modules/home";

const Room = () => {
  const room = useRoom();
  const handleSetRoomId = useSetRoomId();

  const router = useRouter();
  const roomIdQuery = router.query.roomId as string;

  useEffect(() => {
    if (!roomIdQuery) return;

    socket.emit("check_room", roomIdQuery);

    socket.on("room_exists", (exists) => {
      if (!exists) {
        router.push("/");
        return;
      }
      handleSetRoomId(roomIdQuery);
    });

    // eslint-disable-next-line consistent-return
    return () => {
      socket.off("room_exists");
    };
  }, [roomIdQuery]);

  if (!room.id) return <Home />;

  return (
    <RoomContextProvider>
      <div className="relative h-full w-full overflow-hidden">
        <ToolBar />
        <Board />
        <Chat />
      </div>
    </RoomContextProvider>
  );
};

export default Room;
