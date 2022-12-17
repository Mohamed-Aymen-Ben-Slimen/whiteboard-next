import { useEffect } from 'react';

import { AiOutlineSelect } from 'react-icons/ai';
import { BsPencilFill } from 'react-icons/bs';
import { FaEraser } from 'react-icons/fa';

import { useOptions, useSetSelection } from '@/common/recoil/options';

const ModePicker = () => {
  const [options, setOptions] = useOptions();
  const { clearSelection } = useSetSelection();

  useEffect(() => {
    clearSelection();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.mode]);

  return (
    <>
      <button
        className={`flex flex-col justify-center items-center rounded p-1 ${
          options.mode === 'draw' && 'bg-green-800'
        }`}
        onClick={() => {
          setOptions((prev) => ({
            ...prev,
            mode: 'draw',
          }));
        }}
      >
        <BsPencilFill className="btn-icon text-4xl"/>
        <p>Draw</p>
      </button>

      <button
        className={`flex flex-col justify-center items-center rounded p-1 ${
          options.mode === 'eraser' && 'bg-green-800'
        }`}
        onClick={() => {
          setOptions((prev) => ({
            ...prev,
            mode: 'eraser',
          }));
        }}
      >
        <FaEraser className="btn-icon text-4xl"/>
        <p>Erase</p>
      </button>

      <button
        className={`flex flex-col justify-center items-center rounded p-1 ${
          options.mode === 'select' && 'bg-green-800'
        }`}
        onClick={() => {
          setOptions((prev) => ({
            ...prev,
            mode: 'select',
          }));
        }}
      >
        <AiOutlineSelect className="btn-icon text-4xl"/>
        <p>Select</p>
      </button>
    </>
  );
};

export default ModePicker;
