import {CSSProperties} from 'react';

import styles from './styles.module.scss';

interface AxisLabelProps {
  axis: 'x' | 'y';
  value: number;
  x: number;
  y: number;
  tileSize: number;
}

interface AxisLabelCssProperties extends CSSProperties {
  '--x': string;
  '--y': string;
  '--size': string;
}

const letterA = 'A'.charCodeAt(0);
const getAlphabetLetter = (num: number) => String.fromCharCode(num + letterA);

const MIN_SIZE = 12;

const AxisLabel = ({axis, value, x, y, tileSize}: AxisLabelProps) => {
  const label = axis === 'y' ? getAlphabetLetter(value) : value + 1;

  const size = Math.floor(tileSize / 4 - 2);
  const sizeNotSmallerThenMinSize = Math.max(size, MIN_SIZE);

  let style: AxisLabelCssProperties;

  if (axis === 'x') {
    style = {
      '--size': `${sizeNotSmallerThenMinSize}px`,
      '--x': `${x - 4}px`,
      '--y': `${y + Math.floor(size / 3)}px`,
    };
  } else {
    style = {
      '--size': `${sizeNotSmallerThenMinSize}px`,
      '--x': `${x - size / 4 - 2}px`,
      '--y': `${y + Math.floor(size / 3)}px`,
    };
  }

  return (
    <span className={styles.axisLabel} style={style}>
      {label}
    </span>
  );
};

export default AxisLabel;
