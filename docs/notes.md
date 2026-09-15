### Some Points I wanted to mentioned which will be fixed/added in workflows but need to mention these for future

- Github: see signing commits and tags

- use `-webkit-font-smoothing: antialiased;` for dark-mode and fix unreadable text on headings and #hashtags
- try to find a way to not apply filter on selectors that we wanted to fix for dark mode, as because of transition it shows weird imgs/emojis/other element (or remove transition which is not good for accessibility)
- #hashtag font size on /tags
- white-shadow on blog and tags cards
- add a back to top for long pages
- replace image plugin form `gatsby-image` to `gatsby-plugin-image` as prior is deprecated (check - https://www.gatsbyjs.com/docs/conceptual/using-gatsby-image/ and https://www.gatsbyjs.com/docs/preoptimizing-images/ and https://www.gatsbyjs.com/docs/working-with-images/)
- fix React warning `The tag <emoji> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.`
- In dark mode, adding emojis in text box will result inverted (added a secret memo for now)
- In dark mode, color picker is not adapting to CSS filter  
- fix `h4` and some `h3` as it is used for styling which should not be the case [search `h4` globally] (Accessibility Issues: Heading elements are not in a sequentially-descending order)
- Add `gatsby-plugin-csp` plugin for Content Security Policy (CSP)
- Use `https://web.dev/measure` or lighthouse and fix all the issues mentioned
- warnings: gin gatsby-plugin-google-gtag is not compatible with your gatsby version 2.32.13 - It requires gatsby@^3.0.0-next.0
- check for no-extraneous-dependencies in code
- Check all `TODO` and `FIXME` to see if you can fix them
- Make over all app less white as it will make dark mode less pitch black look
- Skills color does not change on random color theme because of color is coming from JS and not CSS
- Enable outline on focus to fix accessibility issues (see: Fixes ANT Design outline:none issue)

---

### Apple Silicon Mac Setup (Dec 2025)

**Background:**  
When migrating from Intel Mac to Apple Silicon (M1/M2/M3/M4), `npm install` fails because Gatsby 2.x depends on native modules (`sharp`, `mozjpeg`, `pngquant-bin`) that were built before Apple Silicon existed. These packages don't have prebuilt ARM64 binaries, and building from source fails without proper tools.

**What was done:**

1. **Node.js 14 → 16**  
   Node 14 doesn't have official ARM64 binaries. Node 16+ has native Apple Silicon support.

2. **Added `sharp` overrides in `package.json`**  
   The old `sharp@0.27.x` (used by `gatsby-plugin-sharp`) lacks ARM64 binaries. We override it to `sharp@0.32.6` which has ARM64 support. See the `overrides` section in `package.json`.

3. **Install build tools (one-time on your Mac)**  
   Some packages (`mozjpeg`, `pngquant-bin`) still don't have ARM64 prebuilts and try to compile from source. This requires C/C++ build tools:

   ```bash
   brew install autoconf automake libtool nasm libpng pkg-config mozjpeg
   ```

4. **Use the Apple Silicon install script**  
   Even with build tools, `mozjpeg` has hardcoded Intel paths that fail on ARM64. The workaround is to skip its install script and only rebuild `sharp`:

   ```bash
   npm run install:apple-silicon
   ```

   This runs: `npm install --ignore-scripts && npm rebuild sharp`

**For other platforms:**  
Windows, Intel Mac, and GitHub Actions (Linux) all have prebuilt binaries available, so they work with standard `npm install` - no special steps needed.
