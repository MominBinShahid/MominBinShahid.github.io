import React, { useState } from 'react';
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
                    // allowClear
                    defaultValue={userThemeColor}
                    value={userThemeColor}
                    onChange={onUserThemeColorChange}
                    addonBefore={userThemeColor}
                    aria-label="Set color theme"
                    style={{ width: '175px' }}
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
      title={['Your Preferences ', <emoji key="emoji">⚙️</emoji>]}
      placement="right"
      key="drawer"
      closable
      onClose={onSettingsClose}
      visible={showSettings}
    >
      <DrawerContent />
    </Drawer>
  );
};
