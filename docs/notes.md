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