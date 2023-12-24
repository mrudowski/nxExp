import {CSSProperties} from 'react';

import {AtlasTile, AtlasTileSet} from '@/data/atlas.ts';

import styles from './styles.module.scss';

const SVG_SIZE = 80;

interface TileProps {
  id: string;
  x: number;
  y: number;
  tileSet: AtlasTileSet;
  tile: AtlasTile | null;
}

const Tile = ({id, x, y, tileSet, tile}: TileProps) => {
  const width = tileSet.tileWidth * tileSet.scale;
  const height = tileSet.tileHeight * tileSet.scale;
  const backgroundPositionX = getBackgroundPosition(
    tile?.x ?? 0,
    tileSet.tileWidthFrame,
    tileSet.tileWidth,
    tileSet.scale
  );
  const backgroundPositionY = getBackgroundPosition(
    tile?.y ?? 0,
    tileSet.tileHeightFrame,
    tileSet.tileHeight,
    tileSet.scale
  );

  const tileStyle: TileCssProperties = {
    '--x': `${x}px`,
    '--y': `${y}px`,
    '--width': `${width}px`,
    '--height': `${height}px`,
    '--imageUrl': `url(${tileSet.image})`,
    '--imagePosition': `${backgroundPositionX}px ${backgroundPositionY}px`,
    '--imageSize': `${tileSet.scale * tileSet.width}px auto`,
  };

  const viewBox = `0 0 ${width} ${height}`;
  const transform = `scale(${width / SVG_SIZE}, ${height / SVG_SIZE})`;

  return (
    <div className={styles.tile} style={tileStyle}>
      <div className={styles.img} />
      <svg viewBox={viewBox} className={styles.hotspot}>
        <g
          transform={transform}
          onClick={() => {
            console.log('TODO');
          }}
        >
          {/*<path className="faceB" d="M40,80 0,60 40,40 80,60 z" />*/}
          {/*<path className="faceBL" d="M0,20 40,0 40,40 0,60 z" />*/}
          {/*<path className="faceBR" d="M40,0 80,20 80,60 40,40 z" />*/}
          <path className="faceFL" d="M0,20 40,40 40,80 0,60 z" />
          <path className="faceFR" d="M40,40 80,20 80,60 40,80 z" />
          <path className="faceF" d="M40,40 0,20 40,0 80,20 z" />
        </g>
      </svg>
      <span>[{id}]</span>
    </div>
  );
};

export default Tile;

export interface TileCssProperties extends CSSProperties {
  '--x': string;
  '--y': string;
  '--width': string;
  '--height': string;
  '--imageUrl': string;
  '--imagePosition': string;
  '--imageSize': string;
}

function getBackgroundPosition(tilePos: number, tileSizeFrame: number, tileSize: number, scale: number) {
  return (-tilePos * tileSizeFrame - (tileSizeFrame - tileSize) / 2) * scale;
}
