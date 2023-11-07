import {Container, Sprite, Stage, Text} from '@pixi/react';
import {BaseTexture, Resource, SCALE_MODES, Spritesheet, Texture, utils} from 'pixi.js';
import {useEffect, useMemo, useState} from 'react';

import {atlasData} from './atlasData.ts';
import {generateGrid, screen_to_isometric} from './utils.ts';

// const blurFilter = new BlurFilter(2);

export function App() {
  const [textures, setTextures] = useState<utils.Dict<Texture<Resource>>>();
  useEffect(() => {
    const spriteSheet = new Spritesheet(
      BaseTexture.from(atlasData.meta.image, {scaleMode: SCALE_MODES.NEAREST}),
      atlasData
    );
    spriteSheet.parse().then(setTextures);
  }, []);

  const [over, setOver] = useState('');

  const grid = useMemo(() => generateGrid(16, 16, (x, y) => ({x, y})), []);

  // if (!textures) {
  //     return <div>Loading</div>
  // }

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={{
        resizeTo: window,
        // backgroundColor: 0xeef1f5,
        backgroundAlpha: 0,
        antialias: false,
      }}
    >
      <Container x={20} y={-20}>
        <Text text="Loading" anchor={{x: 0.5, y: 0.5}} />
      </Container>
      {textures ? (
        grid.map(({x, y}) => {
          // convert the screen coordinate to isometric coordinate
          const [isometric_x, isometric_y] = screen_to_isometric(x, y);
          return (
            <Sprite
              key={x + '-' + y}
              interactive={true}
              texture={textures['pale_green_grass']}
              x={isometric_x + window.innerWidth / 2} // center horizontally
              y={isometric_y + window.innerHeight / 12 - (over === `${x}-${y}` ? -4 : 0)} // align the y axis to one fourth of the screen
              scale={4} // scale into 4x
              anchor={{x: 0, y: 0}} // the anchor point would be center of the sprite
              pointerover={() => {
                setOver(x + '-' + y);
              }}
            />
          );
        })
      ) : (
        <Container x={20} y={-20}>
          <Text text="Loading" anchor={{x: 0.5, y: 0.5}} />
        </Container>
      )}
    </Stage>
  );
}

export default App;
