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

### Phase I

#### Palette
- we cannot mix tile sets
- ✅ images + meta desc file
- full of blocks
- ✅ with names (in tooltips)
- when switch we switch all tiles - in palette and on canvas
- used counter
- show/hide not used
- active in `paint` mode / disabled in `selection` mode
- different height of tiles?

#### Scene
- ✅ 5x5 or bigger
- ✅ one level
- when `paint` mode we paint
  - ✅ by click 
  - and drag
- when we select more then one tile on Palette we randomize them when paint

### Phase II

#### Palette
- searchable
- multi selection (working with filters)
- different height of tiles?

#### Scene
- selectable size
- multilevel in the future
- when `selection` mode we single select tile and see it's options


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
