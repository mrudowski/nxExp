import clsx from 'clsx';

import styles from './Avatar.module.scss';

type AvatarProps = {
  name: string;
  size?: 'sm';
};
const Avatar = ({name, size}: AvatarProps) => {
  const className = clsx(styles.avatar, size === 'sm' && styles.smSize);
  const firstLetter = name.at(0) || '';

  return <span className={className}>{firstLetter}</span>;
};

export default Avatar;
