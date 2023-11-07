const TILE_SIZE = {w: 18, h: 18};

export const atlasData = {
  frames: {
    pale_green_grass: {
      // the location of the block
      // located at top left corner with (0, 0)
      // with a size of 18 x 18 pixels
      frame: {x: 18, y: 18, ...TILE_SIZE},
      sourceSize: TILE_SIZE,
      spriteSourceSize: {x: 0, y: 0, ...TILE_SIZE},
    },
  },
  meta: {
    // renamed one of the sprite sheets into `structural_blocks.png`
    // and placed it in `public/sprites`
    // image: `${process.env.PUBLIC_URL}/sprites/structural_blocks.png`,
    image: `/assets/tinyBlocks/tinyBlocks_NOiL.png`,
    format: 'RGBA8888',
    size: {w: 180, h: 180},
    // scale is 1:1
    scale: '1',
  },
};
