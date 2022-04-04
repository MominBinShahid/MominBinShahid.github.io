import React, { useState, useRef } from 'react';
import FontAwesome from 'react-fontawesome';
import {
  Drawer, Checkbox, Typography, Input, Button,
} from 'antd';
import {
  defaultThemeColor,
  getThemeColor,
  getUserThemeColorSetting,
  setUserThemeColorSetting,
  switchThemeColor,
} from '../../../utils/themeColor';
import {
  isInDarkMode, turnOnDarkMode, turnOffDarkMode,
} from '../../../utils/darkMode';

// for .module.less - read: https://www.gatsbyjs.com/plugins/gatsby-plugin-less/#with-css-modules
import style from './drawer.module.less';

const { Text } = Typography;

const DrawerContent = () => {
  const userSavedThemeColor = getUserThemeColorSetting();
  const themeColor = getThemeColor();
  const defaultUserThemeColor = userSavedThemeColor || themeColor;

  const [userThemeColor, setUserThemeColor] = useState(defaultUserThemeColor);
  const [isRandomThemeColor, setRandomThemeColor] = useState(!userSavedThemeColor);

  const onRandomThemeColor = (event = {}) => {
    const { target: { checked: useRandomColor } } = event;

    setUserThemeColorSetting(useRandomColor ? '' : userThemeColor);
    switchThemeColor(!useRandomColor && userThemeColor);

    setRandomThemeColor(useRandomColor);
  };

  const onUserThemeColorChange = (event = {}) => {
    const { currentTarget: { value: selectedColor } } = event;

    const colorToBeSet = selectedColor || defaultThemeColor;

    setUserThemeColorSetting(colorToBeSet);
    switchThemeColor(colorToBeSet);

    setUserThemeColor(colorToBeSet);
  };

  const generateNewColor = () => {
    switchThemeColor();
  };

  /**
   * used useRef hook instead of simple assignment because
   * we do not wanted to reassign the variable on every render
   * ref: https://reactjs.org/docs/hooks-reference.html#:~:text=It%E2%80%99s%20handy%20for%20keeping%20any%20mutable%20value%20around
   */
  const resettingTheme = useRef(false);

  const colorPickerOpened = () => {
    if (!isInDarkMode()) return;

    resettingTheme.current = true;
    turnOffDarkMode();
  };
  const colorPickerClosed = () => {
    if (!resettingTheme.current) return;

    if (isInDarkMode()) return;

    resettingTheme.current = false;
    turnOnDarkMode();
  };

  return (
    <div className={style.drawerContent}>

      <p>
        <Text>Enable Random Theme Color → &nbsp;</Text>
        <Checkbox checked={isRandomThemeColor} onChange={onRandomThemeColor}>
          {isRandomThemeColor ? ['On  ', <emoji key="emoji">✋</emoji>] : ['Off ', <emoji key="emoji">✊</emoji>]}
        </Checkbox>
      </p>

      <p>
        <Text disabled={!isRandomThemeColor}>Generate New Theme Color → &nbsp;</Text>
        <span>
          {
            isRandomThemeColor ? (
              <FontAwesome
                className={`${style.refreshColor} resetXMargin`}
                name="refresh"
                onClick={generateNewColor}
              />
            )
              : <emoji className="cursor-not-allowed">🔄</emoji>
          }
        </span>
      </p>

      <p>
        <Text disabled={isRandomThemeColor}>Choose your own theme → &nbsp;</Text>
        {
            isRandomThemeColor
              ? <Text disabled>{userThemeColor}</Text>
              : (
                <Input.Group
                  compact
                  style={{ display: 'inline-block', verticalAlign: 'middle', width: '300px' }}
                >
                  <Input
                    type="color"
                    onFocus={colorPickerOpened}
                    onBlur={colorPickerClosed}
                    // allowClear
                    defaultValue={userThemeColor}
                    value={userThemeColor}
                    onChange={onUserThemeColorChange}
                    addonBefore={userThemeColor}
                    aria-label="Set color theme"
                    style={{ width: '180px' }}
                  />
                  <Button
                    onClick={onUserThemeColorChange}
                    title="Clear Selection"
                    style={{ paddingLeft: '8px', paddingRight: '8px' }}
                  >
                    <emoji>🙅</emoji>
                  </Button>
                </Input.Group>
              )
          }
      </p>

    </div>
  );
};

export default ({ showSettings, setSettingsVisibility }) => {
  const onSettingsClose = () => {
    setSettingsVisibility(false);
  };

  return (
    <Drawer
      key="drawer"
      title={['Your Preferences ', <emoji key="emoji">⚙️</emoji>]}
      closable
      onClose={onSettingsClose}
      visible={showSettings}
      /**
       * this will be messed up in dark mode because of position: fixed
       * under CSS filter see details in dark.less
       */
      // placement="bottom"
      placement="right"
    >
      <DrawerContent />
    </Drawer>
  );
};
