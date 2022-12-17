import { FaRedo, FaUndo } from 'react-icons/fa';

import { useMyMoves } from '@/common/recoil/room';
import { useSavedMoves } from '@/common/recoil/savedMoves';

import { useRefs } from '../../../hooks/useRefs';

const HistoryBtns = () => {
  const { redoRef, undoRef } = useRefs();

  const { myMoves } = useMyMoves();
  const savedMoves = useSavedMoves();

  return (
    <>
      <button
        className="flex flex-col justify-center items-center"
        ref={redoRef}
        disabled={!savedMoves.length}
      >
        <FaRedo className="btn-icon text-4xl"/>
        <p>Redo</p>
      </button>
      <button
       className="flex flex-col justify-center items-center"
        ref={undoRef}
        disabled={!myMoves.length}
      >
        <FaUndo className="btn-icon text-4xl"/>
        <p>Undo</p>
      </button>
    </>
  );
};

export default HistoryBtns;
