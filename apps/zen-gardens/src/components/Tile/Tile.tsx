// const TILE_SIZE = {w: 18, h: 18};
import {CSSProperties} from 'react';

import styles from './styles.module.scss';

export interface TileCssProperties extends CSSProperties {
  '--width': string;
  '--height': string;
  // '--x': number;
  // '--y': number;
}

const atlas = [
  {
    id: 'tinyBlock',
    name: 'tinyBlock',
    desc: '@danimaccari -> https://dani-maccari.itch.io/',
    image: `/assets/tinyBlocks/tinyBlocks_NOiL.png`,
    scale: 4,
    width: 180,
    height: 160,
    tileWidth: 16,
    tileHeight: 18,
    tileWidthFrame: 18,
    tileHeightFrame: 18,
    blockWidth: 16,
    tiles: [
      {
        x: 1,
        y: 1,
        name: 'grass',
      },
    ],
  },
];

const data = atlas[0].tiles[0];

const Tile = () => {
  const tileStyle = {
    width: atlas[0].tileWidth * atlas[0].scale,
    height: atlas[0].tileHeight * atlas[0].scale,
    '--width': `${atlas[0].tileWidth * atlas[0].scale}px`,
    '--height': `${atlas[0].tileHeight * atlas[0].scale}px`,
    // '--x': -data.x,
    // '--y': -data.y,
  };
  const imgStyle = {
    backgroundImage: 'url("/assets/tinyBlocks/tinyBlocks_NOiL.png")',
    backgroundPositionX:
      (-data.x * atlas[0].tileWidthFrame - (atlas[0].tileWidthFrame - atlas[0].tileWidth) / 2) * atlas[0].scale,
    backgroundPositionY:
      (-data.y * atlas[0].tileHeightFrame - (atlas[0].tileHeightFrame - atlas[0].tileHeight) / 2) * atlas[0].scale,
    backgroundSize: `${atlas[0].scale * atlas[0].width}px auto`,
    ...tileStyle,
  };

  const viewBox = `0 0 ${tileStyle.width} ${tileStyle.height}`;

  return (
    <div className={styles.tile} style={tileStyle}>
      <div className={styles.img} style={imgStyle} />
      {/*<div className={styles.env} />*/}
      <svg viewBox={viewBox} className={styles.hotspot}>
        <g
          transform={`scale(${tileStyle.width / 80}, ${tileStyle.height / 80}) translate(0, 0)`}
          onClick={() => {
            console.log('def');
          }}
        >
          <path className="bottom" d="M40,80 0,60 40,40 80,60 z" />
          <path className="backLeft" d="M0,20 40,0 40,40 0,60 z" />
          <path className="backRight" d="M40,0 80,20 80,60 40,40 z" />
          <path className="frontLeft" d="M0,20 40,40 40,80 0,60 z" />
          <path className="frontRight" d="M40,40 80,20 80,60 40,80 z" />
          <path className="top" d="M40,40 0,20 40,0 80,20 z" />
        </g>
      </svg>
    </div>
  );
};

export default Tile;
