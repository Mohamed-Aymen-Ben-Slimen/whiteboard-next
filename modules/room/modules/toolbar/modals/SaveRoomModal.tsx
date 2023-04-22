import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import { useRoom } from "@/common/recoil/room";
import { useModal } from "@/modules/modal";
import { getUserLocalStorage } from "@/common/lib/localStorage";
import { socket } from "@/common/lib/socket";
import ShareModal from "./ShareModal";

export const SaveRoomModal = () => {
  const { id } = useRoom();
  const { closeModal } = useModal();

  const [name, setName] = useState(id);

  useEffect(() => setName(id), []);

  const handleSave = () => {
    const user = getUserLocalStorage();

    socket.emit("save_board", user._id, name);
  };

  return (
    <div className="relative flex flex-col items-center rounded-md bg-white p-10 pt-5">
      <button onClick={closeModal} className="absolute top-5 right-5">
        <AiOutlineClose />
      </button>
      <h2 className="text-2xl font-bold">Save Room</h2>
      <h3>
        Room id: <p className="inline font-bold">{id}</p>
      </h3>
      <div className="relative mt-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input sm:w-96"
        />
        <button
          className="btn absolute right-0 h-full"
          onClick={() => {
            handleSave();
            closeModal();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
