import { useRef, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { BiRectangle } from 'react-icons/bi';
import { BsCircle, BsTextareaT } from 'react-icons/bs';
import { CgShapeZigzag } from 'react-icons/cg';
import { useClickAway } from 'react-use';

import { useOptions } from '@/common/recoil/options';
import { Shape } from '@/common/types/global';

import { EntryAnimation } from '../animations/Entry.animations';

const ShapeSelector = () => {
  const [options, setOptions] = useOptions();

  const ref = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false);

  useClickAway(ref, () => setOpened(false));

  const handleShapeChange = (shape: Shape) => {
    setOptions((prev) => ({
      ...prev,
      shape,
    }));

    setOpened(false);
  };

  return (
    <div className="relative flex items-center" ref={ref}>
      <button
         className="flex flex-col justify-center items-center"
        disabled={options.mode === 'select'}
        onClick={() => setOpened((prev) => !prev)}
      >
        {options.shape === 'circle' && <BsCircle className="btn-icon text-4xl"/>}
        {options.shape === 'rect' && <BiRectangle className="btn-icon text-4xl"/>}
        {options.shape === 'line' && <CgShapeZigzag className="btn-icon text-4xl"/>}
        {options.shape === 'text' && <BsTextareaT className="btn-icon text-4xl"/>}
        <p>{options.shape}</p>
      </button>

      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute -left-10 bottom-[-70px] z-10 flex gap-1 rounded-lg border p-2 md:border-0"
            variants={EntryAnimation}
            initial="from"
            animate="to"
            exit="from"
            style={
              {
                backgroundColor: '#3ca839'
              }
            }
          >
            <button
              className="btn-icon text-2xl"
              onClick={() => handleShapeChange('line')}
            >
              <CgShapeZigzag />
            </button>

            <button
              className="btn-icon text-2xl"
              onClick={() => handleShapeChange('rect')}
            >
              <BiRectangle />
            </button>

            <button
              className="btn-icon text-2xl"
              onClick={() => handleShapeChange('circle')}
            >
              <BsCircle />
            </button>

            <button
              className="btn-icon text-2xl"
              onClick={() => handleShapeChange('text')}
            >
              <BsTextareaT />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShapeSelector;
