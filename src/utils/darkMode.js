const { isBrowser } = require('./common');

const darkModeEnum = {
  LIGHT: 'light',
  DARK: 'dark',
};

// const localStorageItemName = 'theme';
const customEventName = 'toggleTheme';

// Is App In Dark Mode
const isInDarkMode = () => {
  if (!isBrowser) return false;

  // eslint-disable-next-line no-underscore-dangle
  const currentTheme = window.__theme;

  // let currentTheme = window.localStorage.getItem(localStorageItemName);

  // if (!currentTheme) {
  //   const isDarkInBodyClass = document.body.className.includes(darkModeEnum.DARK);
  //   if (isDarkInBodyClass) {
  //     window.localStorage.setItem(localStorageItemName, darkModeEnum.DARK);
  //     currentTheme = darkModeEnum.DARK;
  //   }
  // }

  return currentTheme === darkModeEnum.DARK;
};

const addDarkModeEventListener = (toggleFn) => {
  if (!isBrowser) return;

  document.body.addEventListener(customEventName, (e) => {
    const newTheme = e.detail.setTheme;
    toggleFn(newTheme);
  });
};

const toggleDarkMode = (theme) => {
  if (!isBrowser) return;

  const toggleThemeEvent = new CustomEvent(customEventName, {
    detail: {
      setTheme: theme,
    },
  });

  document.body.dispatchEvent(toggleThemeEvent);
};

const turnOnDarkMode = () => {
  toggleDarkMode(darkModeEnum.DARK);
};
const turnOffDarkMode = () => {
  toggleDarkMode(darkModeEnum.LIGHT);
};

module.exports = {
  darkModeEnum,
  isInDarkMode,
  addDarkModeEventListener,
  toggleDarkMode,
  turnOnDarkMode,
  turnOffDarkMode,
};
