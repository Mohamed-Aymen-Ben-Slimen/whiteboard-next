import { useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { BsBorderWidth } from 'react-icons/bs';
import { useClickAway } from 'react-use';

import { useOptions } from '@/common/recoil/options';

import { EntryAnimation } from '../animations/Entry.animations';

const LineWidthPicker = () => {
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
        <BsBorderWidth className="btn-icon text-4xl"/>
        <p>Thikness</p>
      </button>
      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute bottom-[-60px] -left-6 w-36"
            variants={EntryAnimation}
            initial="from"
            animate="to"
            exit="from"
          >
            <input
              type="range"
              min={1}
              max={20}
              value={options.lineWidth}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  lineWidth: parseInt(e.target.value, 10),
                }))
              }
              className="h-4 w-full cursor-pointer appearance-none rounded-lg bg-green-400"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LineWidthPicker;
