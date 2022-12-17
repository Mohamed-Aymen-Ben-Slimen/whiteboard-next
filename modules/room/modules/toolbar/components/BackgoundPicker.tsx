import { CgScreen } from 'react-icons/cg';

import { useModal } from '@/modules/modal';

import BackgroundModal from '../modals/BackgroundModal';

const BackgroundPicker = () => {
  const { openModal } = useModal();

  return (
    <button  className="flex flex-col justify-center items-center" onClick={() => openModal(<BackgroundModal />)}>
      <CgScreen  className="btn-icon text-4xl"/>
      <p>Background</p>
    </button>
  );
};

export default BackgroundPicker;
