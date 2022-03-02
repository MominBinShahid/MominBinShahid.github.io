/**
 * Check if window is defined (so if in the browser or in node.js).
 * this is needed for `gatsby build` or else build will fail
 * on `window` or `document` as node.js don't have these
 * ref: https://www.gatsbyjs.com/docs/debugging-html-builds/#how-to-check-if-window-is-defined
 */
const isBrowser = typeof window !== 'undefined' || typeof document !== 'undefined';

/**
 * Check is it's portable device using the app
 * but this value will be valid only when the function is calls as it's not reactive
 */
const isPortableDeviceScreen = () => {
  if (!isBrowser) return false;

  const screenWidth = window.innerWidth;
  return screenWidth !== 0 && screenWidth <= 768;
};

// Simple debounce function - ref: https://youmightnotneed.com/lodash#function
const debounce = (func, delay, { leading } = {}) => {
  let timerId;

  return (...args) => {
    if (!timerId && leading) {
      func(...args);
    }
    clearTimeout(timerId);

    timerId = setTimeout(() => func(...args), delay);
  };
};

// Is App In Dark Mode
const isInDarkMode = () => {
  if (!isBrowser) return false;

  const currentTheme = window.localStorage.getItem('theme');
  return currentTheme === 'dark';
};

const getRandomNumber = (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);

const showConsoleMessage = () => {
  if (isBrowser) {
    // eslint-disable-next-line no-console
    console.log(
      "%c🧑‍💻 Hello there 👋! \n%cSneaking around, uh? 😁 \n%c Excited to see you here, let's catch up on https://MominBinShahid.github.io/contact \n%c Thank you for visiting DevTools 🛠",
      'color: var(--theme-color, @black-color); font-size:2rem',
      'color: #bada55; font-size:1rem',
      'background: #333; color: whitesmoke',
      'background: initial, color: initial',
    );
  }
};

module.exports = {
  isBrowser,
  isPortableDeviceScreen,
  debounce,
  isInDarkMode,
  getRandomNumber,
  showConsoleMessage,
};
