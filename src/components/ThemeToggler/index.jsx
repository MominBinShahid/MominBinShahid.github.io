import React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
// import FontAwesome from 'react-fontawesome';
import { Switch } from 'antd';
// import { useWindowSize } from '../../utils/hooks';
// import { isBrowser } from '../../utils/common';
import style from './toggler.module.less';
import { addDarkModeEventListener, darkModeEnum } from '../../utils/darkMode';

export default () => (
  <ThemeToggler>
    {({ theme, toggleTheme }) => {
      addDarkModeEventListener(toggleTheme);

      const isDark = theme === darkModeEnum.DARK;

      // const [screenWidth] = useWindowSize();
      // const setClassesBasedOnDevice = (appliedTheme) => {
      //   const isNotPortableDevice = screenWidth > 997;
      //   if (isNotPortableDevice) {
      //     if (isBrowser) {
      //       document.body.classList.remove(appliedTheme);
      //       document.documentElement.classList.toggle(appliedTheme);
      //     }
      //   }
      // };
      // setClassesBasedOnDevice(theme);

      return (
        <>
          {/* <div className={style.themeTogglerDiv}>
            <FontAwesome
              name="sun-o"
              onClick={() => toggleTheme(darkModeEnum.LIGHT)}
              style={{ fontWeight: !isDark && 'bold' }}
            />
            <FontAwesome
              name={isDark ? 'toggle-on' : 'toggle-off'}
              onClick={() => (isDark
                ? toggleTheme(darkModeEnum.LIGHT) : toggleTheme(darkModeEnum.DARK))}
            />
            <FontAwesome
              name="moon-o"
              onClick={() => toggleTheme(darkModeEnum.DARK)}
              style={{ fontWeight: isDark && 'bold' }}
            />
          </div> */}

          <Switch
            className={style.themeToggler}
            checkedChildren={(<emoji>🌙</emoji>)}
            unCheckedChildren={<emoji>☀</emoji>}
            onChange={(checked) => (checked
              ? toggleTheme(darkModeEnum.DARK) : toggleTheme(darkModeEnum.LIGHT))}
            checked={isDark}
          />
        </>
      );
    }}
  </ThemeToggler>
);
