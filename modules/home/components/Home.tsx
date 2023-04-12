import { FormEvent, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { socket } from "@/common/lib/socket";
import { useSetRoomId } from "@/common/recoil/room";
import { useModal } from "@/modules/modal";

import NotFoundModal from "../modals/NotFound";
import { getUserLocalStorage } from "@/common/lib/localStorage";
import axios from "axios";

const Home = () => {
  const { openModal } = useModal();
  const setAtomRoomId = useSetRoomId();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({});
  const [boards, setBoards] = useState([]);

  const router = useRouter();

  const loadBoards = (userId: string) => {
    axios
      .post("/boards", { user: userId })
      .then((response) => {
        setBoards(response.data.boards);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    document.body.style.backgroundColor = "white";
    const u = getUserLocalStorage();
    console.log(u);
    setUser(u);
    setUsername(`${u?.firstName} ${u?.lastName}`);
    loadBoards(u?._id);
  }, []);

  useEffect(() => {
    socket.on("created", (roomIdFromServer) => {
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

    socket.on("joined", handleJoinedRoom);

    return () => {
      socket.off("created");
      socket.off("joined", handleJoinedRoom);
    };
  }, [openModal, roomId, router, setAtomRoomId]);

  useEffect(() => {
    socket.emit("leave_room");
    setAtomRoomId("");
  }, [setAtomRoomId]);

  const handleCreateRoom = () => {
    sessionStorage.removeItem("board");
    socket.emit("create_room", username);
  };

  const handleJoinRoom = () => {
    if (roomId) {
      sessionStorage.removeItem("board");
      socket.emit("join_room", roomId, username);
    }
  };

  const handleOpenSavedBoard = (board: any) => {
    sessionStorage.setItem("board", JSON.stringify(board));
    socket.emit("create_room", username);
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex h-screen justify-center">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81zRnTPY1ZL._AC_UF894,1000_QL80_.jpg)",
          }}
        >
          <div className="flex h-full items-center bg-gray-900 bg-opacity-40 px-20">
            <div>
              <h2 className="text-4xl font-bold text-white">White Board</h2>

              <p className="mt-3 max-w-xl text-gray-300">User: {username}</p>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-md items-center px-6 lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-center text-2xl font-bold text-gray-700 dark:text-white">
                User: {username}
              </h2>
            </div>

            <div className="mt-6">
              <button
                className="w-full transform rounded-md bg-green-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-green-400 focus:bg-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50"
                onClick={handleCreateRoom}
              >
                Create a new room
              </button>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between">
                <label
                  htmlFor="password"
                  className="text-sm text-gray-600 dark:text-gray-200"
                >
                  Room ID
                </label>
              </div>

              <input
                type="roomid"
                name="roomid"
                id="id"
                placeholder="Room ID"
                className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>

            <div className="mt-8">
              <div>
                <div className="mt-6">
                  <button
                    className="w-full transform rounded-md bg-green-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-green-400 focus:bg-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50"
                    onClick={handleJoinRoom}
                  >
                    Join a room
                  </button>
                </div>
              </div>
            </div>
            {boards.length > 0 && (
              <>
                <div className="mt-8">Open saved boards:</div>

                <div className="mt-8">
                  {boards.map((board: any, index) => (
                    <div
                      key={index}
                      className="rounded-lg border-2 border-white p-2 hover:cursor-pointer hover:border-blue-500"
                      onClick={() => handleOpenSavedBoard(board.board)}
                    >
                      <p className="font-bold">{board.roomId}</p>
                      <p>
                        saved on{" "}
                        {new Date(board.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
