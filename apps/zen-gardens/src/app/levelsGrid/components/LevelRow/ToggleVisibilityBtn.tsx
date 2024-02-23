import {MouseEventHandler} from 'react';

import ActionBtn from '@/app/levelsGrid/components/LevelRow/ActionBtn.tsx';

interface toggleVisibilityBtnProps {
  visible: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const toggleVisibilityBtn = ({visible, onClick}: toggleVisibilityBtnProps) => {
  const label = visible ? 'Hide layer' : 'Show layer';
  const id = visible ? 'show' : 'hide';

  return <ActionBtn label={label} id={id} onClick={onClick} />;
};

export default toggleVisibilityBtn;
