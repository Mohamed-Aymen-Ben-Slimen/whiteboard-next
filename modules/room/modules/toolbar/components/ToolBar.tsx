import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { FiChevronRight, FiSave } from "react-icons/fi";
import { HiOutlineDownload } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import { IoIosShareAlt } from "react-icons/io";

import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import { useViewportSize } from "@/common/hooks/useViewportSize";
import { useModal } from "@/modules/modal";

import { useRefs } from "../../../hooks/useRefs";
import ShareModal from "../modals/ShareModal";
import BackgroundPicker from "./BackgoundPicker";
import ColorPicker from "./ColorPicker";
import HistoryBtns from "./HistoryBtns";
import ImagePicker from "./ImagePicker";
import LineWidthPicker from "./LineWidthPicker";
import ModePicker from "./ModePicker";
import ShapeSelector from "./ShapeSelector";
import UserList from "@/modules/room/components/UserList";
import { deleteUserLocalStorage } from "@/common/lib/localStorage";
import { useRoom } from "@/common/recoil/room";
import { SaveRoomModal } from "../modals/SaveRoomModal";

const ToolBar = () => {
  const { canvasRef, bgRef } = useRefs();
  const { openModal } = useModal();
  const { width } = useViewportSize();
  const room = useRoom();

  const [opened, setOpened] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (width >= 1024) setOpened(true);
    else setOpened(false);
  }, [width]);

  const handleExit = () => {
    deleteUserLocalStorage();
    router.push("/");
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_SIZE.width;
    canvas.height = CANVAS_SIZE.height;

    const tempCtx = canvas.getContext("2d");

    if (tempCtx && canvasRef.current && bgRef.current) {
      tempCtx.drawImage(bgRef.current, 0, 0);
      tempCtx.drawImage(canvasRef.current, 0, 0);
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "canvas.png";
    link.click();
  };

  const handleSave = () => openModal(<SaveRoomModal />);

  const handleShare = () => openModal(<ShareModal />);

  return (
    <>
      <motion.button
        className="btn-icon absolute bottom-1/2 -left-2 z-50 h-10 w-10 rounded-full bg-black text-2xl transition-none lg:hidden"
        animate={{ rotate: opened ? 0 : 180 }}
        transition={{ duration: 0.2 }}
        onClick={() => setOpened(!opened)}
      >
        <FiChevronRight />
      </motion.button>
      <motion.div
        className="absolute left-[50%] top-[8%] z-50 grid auto-cols-max grid-flow-col items-center gap-8 rounded-lg p-3 px-8 text-white "
        animate={{
          x: opened ? 0 : -160,
          y: "-50%",
        }}
        transition={{
          duration: 0.2,
        }}
        style={{
          translateX: "-50%",
          backgroundColor: "#3ca839",
        }}
      >
        <UserList />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Whiteboard</h1>
        </div>

        <div className="h-full w-px bg-white 2xl:hidden" />
        <div className="h-full w-px bg-white" />

        <HistoryBtns />

        <div className="h-full w-px bg-white 2xl:hidden" />
        <div className="h-full w-px bg-white" />

        <ShapeSelector />
        <ColorPicker />
        <LineWidthPicker />
        <ModePicker />
        <ImagePicker />

        <div className="2xl:hidden"></div>
        <div className="h-full w-px bg-white 2xl:hidden" />
        <div className="h-full w-px bg-white" />

        <BackgroundPicker />
        <button
          className="flex flex-col items-center justify-center"
          onClick={handleShare}
        >
          <IoIosShareAlt className="btn-icon text-4xl" />
          <p>Share</p>
        </button>
        <button
          className="flex flex-col items-center justify-center"
          onClick={handleDownload}
        >
          <HiOutlineDownload className="btn-icon text-4xl" />
          <p>Download</p>
        </button>
        <button
          className="flex flex-col items-center justify-center"
          onClick={handleSave}
        >
          <FiSave className="btn-icon text-4xl" />
          <p>Save</p>
        </button>
        <button
          className="flex flex-col items-center justify-center"
          onClick={handleExit}
        >
          <ImExit className="btn-icon text-4xl" />
          <p>Exit</p>
        </button>
      </motion.div>
    </>
  );
};

export default ToolBar;
