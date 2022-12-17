import { useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { RgbaColorPicker } from 'react-colorful';
import { BsPaletteFill } from 'react-icons/bs';
import { useClickAway } from 'react-use';

import { useOptions } from '@/common/recoil/options/options.hooks';

import { EntryAnimation } from '../animations/Entry.animations';

const ColorPicker = () => {
  const [options, setOptions] = useOptions();

  const ref = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false);

  useClickAway(ref, () => setOpened(false));

  return (
    <div className="relative flex items-center" ref={ref}>
      <button
        className="flex flex-col justify-center items-center"
        onClick={() => setOpened(!opened)}
        disabled={options.mode === 'select'}
      >
        <BsPaletteFill className="btn-icon text-2xl"/>
        <p>Color</p>
      </button>
      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute -top-5 -left-20 mt-24 flex flex-row gap-10"
            variants={EntryAnimation}
            initial="from"
            animate="to"
            exit="from"
          >
            <div>
            <h2 className="ml-3 font-semibold text-black dark:text-white">
              Line color
            </h2>
            <RgbaColorPicker
              color={options.lineColor}
              onChange={(e) => {
                setOptions({
                  ...options,
                  lineColor: e,
                });
              }}
              className="mb-5"
            />
            </div>
            <div>
            <h2 className="ml-3 font-semibold text-black dark:text-white">
              Fill color
            </h2>
            <RgbaColorPicker
              color={options.fillColor}
              onChange={(e) => {
                setOptions({
                  ...options,
                  fillColor: e,
                });
              }}
            />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;
