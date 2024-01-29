import clsx from 'clsx';

import styles from './styles.module.scss';

interface SpriteProps {
  className?: string;
  id: string;
  // style?: CSSProperties;
}

const Sprite = ({className, id}: SpriteProps) => {
  return <div aria-label={`sprite-${id}`} className={clsx(styles.sprite, className)} />;
};

export default Sprite;
