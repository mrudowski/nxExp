# NxExp

`NxExp` is the learning playground / workspace. Monorepo of projects powered by https://nx.dev/.

A place where I'm experimenting with all new and old things in new way

## On my list

### nx monorepo
- 🥲 Oh, we cannot extends `tsconfig` paths: https://github.com/microsoft/TypeScript/issues/44589
- ✅⚠️ import scss/css from libs to apps - works but nx doesn't know about that connection!
- make eslint dev checker works as typescript - in all app dependencies

- try web components
- try StyleX from Meta: https://stylexjs.com/docs/learn/
- try Apollo Client as local state manager :) 
- develop swBase in
  - ✅ react (by nx/vite/swc)
  - ✅ next.js
  - remix / astro / gatsby solution
  - switch react router to https://tanstack.com/router/v1/docs/overview
  - 

### zen-gardens
a tiny isometric block gardens builder
- https://github.com/mrudowski/nxExp/tree/main/apps/zen-gardens

### sw-base
- https://github.com/mrudowski/nxExp/tree/main/apps/sw-base

### sw-base-next
- https://github.com/mrudowski/nxExp/tree/main/apps/sw-base-next

- - -

## Install and update nx

```
npx nx migrate latest
```
- Make sure package.json changes make sense and then run `yarn`,
- Run `yarn nx migrate --run-migrations`

## Start the app in dev mode

To start the development server run 

```
nx serve zen-gardens
nx serve sw-base
nx serve sw-base-next
nx serve iso-tiles
nx serve css-fun
```

Open your browser and navigate to http://localhost:4200/

## Other actions:

```
nx lint [app-name]
nx test [app-name]
nx build [app-name]
nx preview [app-name]
```

- - -

## Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Just run `nx build sw-base` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/core-features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)
