# The Quest for the Perfect Dark Mode (citing Joshua Comeau)

- ♥️ https://www.joshwcomeau.com/react/dark-mode/
- ✅ https://dev.to/ayc0/light-dark-mode-react-implementation-3aoa
- ✅ https://usehooks-ts.com/react-hook/use-dark-mode
- https://hangindev.com/blog/avoid-flash-of-default-theme-an-implementation-of-dark-mode-in-react-app

# Here's our set of criteria for this feature (citing Joshua Comeau)
- ✅ The user should be able to click a toggle to switch between Light and Dark mode.
- ✅ The user's preference should be saved, so that future visits use the correct color theme.
- ✅ It should default to the user's "preferred" color scheme, according to their operating system settings. If not set, it should default to Light.
- ✅ The site should not flicker on first load, even if the user has selected a non-default color theme.
- ✅ The site should never show the wrong toggle state.

## And one more I like it from dev.to:
- ✅ Switching the theme whenever the system-level setting changes BUT only when user doesn't set it by hand
- ✅ A simple way (using CSS variables) to swap colours throughout the site
- ✅ A SCSS mixin to support more complex theming
- ✅ A React Theme Provider for components that needs it
- ⏳ Support No JavaScript
