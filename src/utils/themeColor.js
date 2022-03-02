// import like this won't work, as it's commonjs here and not ES modules
// import { getRandomNumber, isBrowser } from './common';

const { getRandomNumber, isBrowser } = require('./common');

const defaultThemeColor = '#333333';

const getThemeColor = () => {
  if (!isBrowser) return null;

  // eslint-disable-next-line no-undef
  const cs = window.getComputedStyle(document.documentElement);
  const themeColor = cs.getPropertyValue('--theme-color');
  return themeColor || defaultThemeColor;
};

const setThemeColor = (themeColor = defaultThemeColor) => {
  if (!isBrowser) return;

  // eslint-disable-next-line no-undef
  const root = document.querySelector(':root');
  root.style.setProperty('--theme-color', themeColor);
};

const getUserThemeColorSetting = () => {
  if (!isBrowser) return null;

  return window.localStorage.getItem('__user-theme-color');
};

const setUserThemeColorSetting = (value = '') => {
  if (!isBrowser) return;

  window.localStorage.setItem('__user-theme-color', value);
};

const switchThemeColor = (preferredColor) => {
  if (!isBrowser) return;

  const userThemeColor = getUserThemeColorSetting();
  if (userThemeColor) {
    setThemeColor(userThemeColor);
    return;
  }

  if (preferredColor) {
    setThemeColor(preferredColor);
    return;
  }

  const colors = [
    '#304CFD',

    // increasing the probability of black
    '#333333',
    '#333333',
    '#333333',
    '#333333',
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

  const randomNumber = getRandomNumber(colors.length - 1);

  /**
   * if you want to test colors in order, comment this line above and uncomment this section
   */
  // let randomNumber = window.localStorage.getItem('__color-in-order') || 0;
  // if (randomNumber >= colors.length) { randomNumber = 0; }
  // window.localStorage.setItem('__color-in-order', +randomNumber + 1);

  const selectedColor = colors[randomNumber];

  setThemeColor(selectedColor);
};

module.exports = {
  defaultThemeColor,
  getThemeColor,
  setThemeColor,
  getUserThemeColorSetting,
  setUserThemeColorSetting,
  switchThemeColor,
};
