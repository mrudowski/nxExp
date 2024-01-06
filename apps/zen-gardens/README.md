# zen-gardens

a tiny isometric block gardens builder (test)

## Main assumptions:
- only html, svg, css and images (no canvas)
- all new
- Jotai https://jotai.org/
- Mantine https://mantine.dev/
- with some nice licensed tile sets
- we cannot mix them

### Phase 0
- ✅ Superb `Slot` component with tile `Sprite` and svg hotspot
- ✅ placed on `Level`
- ✅ which is a part of bigger (multi level) `Scene`
- ✅ simple Info
- ✅ Beautiful theme switcher

### Phase I

#### Palette
- ✅ display size and other globals from selected tileSet
- ✅ images + meta desc file
- ✅ with names (in tooltips)
- ✅ active in `paint` mode / disabled in `erese` / 'select' mode

#### Scene
- ✅ 5x5
- ✅ one level
- ✅ when `paint` mode we paint
  - ✅ by click 
  - ✅ and drag 
- ! show/hide ghost/empty slot
- ! show/hide axis
- ~~zoom in/out our scene~~
- add settings with option: layout: full / tiny (pro/cosy)

#### Info (slot/tile info)
- single selection
- display info about selected tile
  - slot id
  - slot ghost / tile sprite
  - tile name (+tileSetName?)
  - size
- actions:
  - set it lower/higher (in phase II working multilevel)


### Phase II

#### Palette
- when switch we switch all tiles - in palette and on canvas
- full of blocks
- searchable
- multi selection (working with filters)
- different height of tiles?
- used counter
- show/hide not used

#### Scene
- when we select more then one tile on Info we randomize them when paint
- ✅ selectable size
- when `selection` mode we single select tile and see it's options
- multilevel in the future
- undo/redo (in memory, last snapshot of state)

### Phase III
- working on mobile (touchEvent)
- add key shortcuts (undo/redo/b-brush,e,p and so on)
- replace Mantine with https://tailwindui.com/templates/catalyst

## Base blueprint

![Blueprint](blueprint.png)
[ex.js](..%2F..%2F..%2F..%2FDownloads%2Ffunctional-light-v3%2Fimpurity%2Fex.js)
[README.md](..%2F..%2F..%2F..%2FDownloads%2Ffunctional-light-v3%2Fimpurity%2FREADME.md)
## Develop

```
nx serve zen-gardens
nx lint zen-gardens
nx test zen-gardens
nx build zen-gardens
nx preview zen-gardens
```
