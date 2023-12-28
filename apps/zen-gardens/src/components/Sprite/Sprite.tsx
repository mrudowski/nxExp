import clsx from 'clsx';

import styles from './styles.module.scss';

interface SpriteProps {
  className?: string;
}

const Sprite = ({className}: SpriteProps) => {
  return <div className={clsx(styles.sprite, className)} />;
};

export default Sprite;
