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
- ✅ simple Palette
- ✅ Beautiful theme switcher

### Phase I

#### Palette
- ✅ display size and other globals from selected tileSet
- ✅ images + meta desc file
- ✅ with names (in tooltips)
- ✅ active in `paint` mode / disabled in `erese` / 'select' mode

#### Scene
- ✅ 5x5 and more 
- ✅ one level
- ✅ when `paint` mode we paint
  - ✅ by click 
  - ✅ and drag 
- ! show/hide ghost/empty slot
- ! show/hide axis
- ~~zoom in/out our scene~~

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
- ✅ multi selection
  - ✅ with `Command` || `Ctrl` key
  - working with filters
- different height of tiles?
- used counter
- show/hide not used

#### Scene
- ✅ when we select more then one tile from Palette we randomize them when paint
- ✅ selectable size
- when `selection` mode we single select tile and see it's options
- multilevel thanks to LevelsComposer
- ✅ undo/redo (in memory, diffs based)
  - ✅ add loop/limits
  - ✅ make undo/redo painting when dragging as single action
- ✅ by clicking on axis label we can fill/erase whole row
- ✅ by clicking on axis cross we can fill/erase all
- add settings with option: layout: full / tiny (pro/cosy mode)
- ✅ adjust editor height to window height

#### LevelsComposer (aka Layers)
- in TDD workflow
- with ARIA support
- ✅ list of levels
  - ✅ beautiful styled
- ✅ rename
- ✅ add ~~below~~/above selected ~~(context menu or dropdown)~~
- ✅ select active
- ✅ remove
  - ✅ with confirmation
- ✅ change order (by drag and drop thanks to `dnd-kit` ~~or arrows~~)
- ✅ toggle visibility
- ✅ show only me (show/hide all other layers) - isolation mode
- 👉 buttons above list (show/hide all, remove all)
- count tiles on layer
- undo/redo delete layer

### Phase III
- working on mobile (touchEvent)
- tile/color picker
- add key shortcuts (undo/redo/b-brush,e,p and so on)
- ? replace Mantine with https://tailwindui.com/templates/catalyst

## Base blueprint

![Blueprint](blueprint.png)

## Develop

```
nx serve zen-gardens
nx lint zen-gardens

nx test zen-gardens

// works
nx run zen-gardens:test --watch --ui
nx run zen-gardens:test --coverage
nx run zen-gardens:test --testFile=src/app/scene/utils.spec.ts --coverage

// stop working
// https://github.com/nrwl/nx/pull/22355
nx test --coverage zen-gardens
nx test --coverage --force zen-gardens
nx test --watch --ui zen-gardens 

nx build zen-gardens
nx preview zen-gardens
```

## Playwright e2e tests

install / update
```
npx playwright install --with-deps
```

run
```
cd apps/zen-gardens

npx playwright test
npx playwright test --ui
npx playwright show-report

 npx playwright codegen http://localhost:4200/ 
```
