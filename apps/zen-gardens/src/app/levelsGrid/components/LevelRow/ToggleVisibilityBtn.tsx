import {MouseEventHandler} from 'react';

import ActionBtn from '@/app/levelsGrid/components/LevelRow/ActionBtn.tsx';

interface toggleVisibilityBtnProps {
  visible: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const toggleVisibilityBtn = ({visible, onClick}: toggleVisibilityBtnProps) => {
  const label = visible ? 'Hide layer' : 'Show layer';
  const icon = visible ? 'show' : 'hide';

  return <ActionBtn label={label} icon={icon} onClick={onClick} />;
};

export default toggleVisibilityBtn;
