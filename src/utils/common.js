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

const switchThemeColor = () => {
  // start - no need to use this color switcher for now (remove this section if needed in future)
  const deludeVariable = true;
  if (deludeVariable) return;
  // end

  if (isBrowser) {
    const colors = [
      '#304CFD',

      '#333333',

      'tomato',
      'coral',
      'chocolate',
      'cornflowerblue',
      'cadetblue',
      'dodgerblue',
      'deepskyblue',
      'forestgreen',
      'indianred',
      'indigo',
      'limegreen',
      'olivedrab',
      'orangered',
      'purple',
      'rebeccapurple',
      'royalblue',
      'seagreen',

      '#F44336',
      '#E91E63',
      '#9C27B0',
      '#673AB7',
      '#3F51B5',
      '#2196F3',
      '#03A9F4',
      '#00ACC1',
      '#009688',
      '#43A047',
      '#558B2F',
      '#827717',
      '#F57F17',
      '#FF6F00',
      '#E65100',
      '#F4511E',
      '#795548',
      '#757575',
      '#607D8B',
    ];

    const randomNumber = getRandomNumber(colors.length);

    /**
     * if you want to test colors in order, comment this line above and uncomment this section
     */
    // let randomNumber = window.localStorage.getItem('number') || 0;
    // if (randomNumber >= colors.length) { randomNumber = 0; }
    // window.localStorage.setItem('number', +randomNumber + 1);

    const selectedColor = colors[randomNumber];

    // eslint-disable-next-line no-undef
    const root = document.querySelector(':root');
    root.style.setProperty('--theme-color', selectedColor);
  }
};

const showConsoleMessage = () => {
  if (isBrowser) {
    // eslint-disable-next-line no-console
    console.log(
      "%c🧑‍💻 Hello there 👋! \n%cSneaking around, uh? 😁 \n%c Excited to see you here, let's catch up on https://MominBinShahid.github.io/contact \n%c Thank you for visiting DevTools 🛠",
      'color: var(--theme-color); font-size:2rem',
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
  switchThemeColor,
  getRandomNumber,
  showConsoleMessage,
};
