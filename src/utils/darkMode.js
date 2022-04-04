const { isBrowser } = require('./common');

const darkModeEnum = {
  LIGHT: 'light',
  DARK: 'dark',
};

const localStorageItemName = 'theme';
const customEventName = 'toggleTheme';

// Is App In Dark Mode
const isInDarkMode = () => {
  if (!isBrowser) return false;

  const currentTheme = window.localStorage.getItem(localStorageItemName);
  return currentTheme === darkModeEnum.DARK;
};

const addDarkModeEventListener = (toggleFn) => {
  if (!isBrowser) return;

  // eslint-disable-next-line no-undef
  document.body.addEventListener(customEventName, (e) => {
    const newTheme = e.detail.setTheme;
    toggleFn(newTheme);
  });
};

const toggleDarkMode = (theme) => {
  if (!isBrowser) return;

  // eslint-disable-next-line no-undef
  const toggleThemeEvent = new CustomEvent(customEventName, {
    detail: {
      setTheme: theme,
    },
  });
    // eslint-disable-next-line no-undef
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
