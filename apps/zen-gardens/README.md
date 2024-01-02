# zen-gardens

a tiny isometric block gardens builder (test)

## Main assumptions:
- only html, svg, css and images (no canvas)
- all new
- Jotai https://jotai.org/
- Mantine https://mantine.dev/
- with some nice licensed tile sets

### Phase 0
- ✅ Superb `Slot` component with tile `Sprite` and svg hotspot
- ✅ placed on `Level`
- ✅ which is a part of bigger (multi level) `Scene`
- ✅ simple Palette
- ✅ Beautiful theme switcher

### Phase I

#### Palette
- we cannot mix tile sets
- ✅ images + meta desc file
- full of blocks
- ✅ with names (in tooltips)
- when switch we switch all tiles - in palette and on canvas
- active in `paint` mode / disabled in `erese` / 'select' mode

#### Scene
- ✅ 5x5 or bigger
- ✅ one level
- ✅ when `paint` mode we paint
  - ✅ by click 
  - ✅ and drag 
- show/hide ghost/empty slot

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
- searchable
- multi selection (working with filters)
- different height of tiles?
- used counter
- show/hide not used

#### Scene
- when we select more then one tile on Palette we randomize them when paint
- selectable size
- when `selection` mode we single select tile and see it's options
- multilevel in the future
- undo/redo (in memory, last snapshot of state)

### Phase III
- working on mobile (touchEvent)

## Base blueprint

![Blueprint](blueprint.png)

## Develop

```
nx serve zen-gardens
nx lint zen-gardens
nx test zen-gardens
nx build zen-gardens
nx preview zen-gardens
```
