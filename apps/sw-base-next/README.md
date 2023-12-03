# About swBaseNext

Next.js version of React swBase SPA

# on my list
- ✅ font
- ✅ absolute import
- ✅ routing
- ✅ change lists routes to dynamic routes
- ✅ internationalization (i18n) with ~~next-i18next~~ (If you're using Next.js 13/14 with app directory, there is no need for next-i18next, you can directly use i18next and react-i18next)
  - ✅ make custom dictionary a little better by using some library
  - ✅ I choose https://next-intl-docs.vercel.app/docs/getting-started/app-router
  - ✅⚠️ like it but it's harder than I expected when including routing / navigation (localizedPathnamesNavigation)
  - ✅ find how to use the same translation for server and client components
- clean TODOs
- add dark/light theme switch
- ✅ try errors when fetching on backend and frontend
- ✅ use Jotai
- ✅ move Avatar and others to nx shared libs
- ⛔️ fix page flickering when loading dynamic content
- ❗️ export as static site: Cannot read properties of undefined (reading 'app') https://github.com/vercel/next.js/issues/53562
- 🤔 try build standalone SPA app with REST API (like swBase)
  - possible when we tread Next.js only as build tool
- 🤔 try build standalone SSG app (Static Site Generation like Astro/Gatsby) 
  - we get client-side routing thanks to Link, full reload when we chang url by hand)
  - Next is not designed as a pure HTML static site generator in the way that frameworks like Jekyll are, & it's not really feasible to ensure nothing about a page or its dependencies is expecting client-side JS. 
    On a per-page basis (see the linked PR for mor), you can add `export const config = { unstable_runtimeJS: false }` to try out this behavior. [More](https://github.com/vercel/next.js/issues/21292#issuecomment-762692528)
