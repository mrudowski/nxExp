// const TILE_SIZE = {w: 18, h: 18};
import styles from './styles.module.scss';

const atlas = [
  {
    id: 'tinyBlock',
    name: 'tinyBlock',
    desc: '@danimaccari -> https://dani-maccari.itch.io/',
    image: `/assets/tinyBlocks/tinyBlocks_NOiL.png`,
    scale: 4,
    width: 180,
    height: 160,
    tileWidth: 18,
    tilHeight: 18,
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
    height: atlas[0].tilHeight * atlas[0].scale,
  };
  const imgStyle = {
    backgroundImage: 'url("/assets/tinyBlocks/tinyBlocks_NOiL.png")',
    backgroundPositionX: -data.x * atlas[0].scale * atlas[0].tileWidth,
    backgroundPositionY: -data.y * atlas[0].scale * atlas[0].tilHeight,
    backgroundSize: `${atlas[0].scale * atlas[0].width}px auto`,
    ...tileStyle,
  };

  return (
    <div className={styles.tile} style={tileStyle}>
      <div className={styles.img} style={imgStyle}></div>
    </div>
  );
};

export default Tile;
