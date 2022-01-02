import React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
// import FontAwesome from 'react-fontawesome';
import { Switch } from 'antd';
// import { useWindowSize } from '../../utils/hooks';
// import { isBrowser } from '../../utils/common';
import style from './toggler.module.less';

export default () => (
  <ThemeToggler>
    {({ theme, toggleTheme }) => {
      const isDark = theme === 'dark';

      // const [screenWidth] = useWindowSize();
      // const setClassesBasedOnDevice = (appliedTheme) => {
      //   const isNotPortableDevice = screenWidth > 997;
      //   if (isNotPortableDevice) {
      //     if (isBrowser) {
      //       // eslint-disable-next-line no-undef
      //       document.body.classList.remove(appliedTheme);
      //       // eslint-disable-next-line no-undef
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
              onClick={() => toggleTheme('light')}
              style={{ fontWeight: !isDark && 'bold' }}
            />
            <FontAwesome
              name={isDark ? 'toggle-on' : 'toggle-off'}
              onClick={() => (isDark ? toggleTheme('light') : toggleTheme('dark'))}
            />
            <FontAwesome
              name="moon-o"
              onClick={() => toggleTheme('dark')}
              style={{ fontWeight: isDark && 'bold' }}
            />
          </div> */}

          <Switch
            className={style.themeToggler}
            checkedChildren={(<emoji>🌙</emoji>)}
            unCheckedChildren={<emoji>🔆</emoji>}
            // unCheckedChildren={<emoji>☀️</emoji>}
            onChange={(checked) => (checked ? toggleTheme('dark') : toggleTheme('light'))}
            checked={isDark}
          />
        </>
      );
    }}
  </ThemeToggler>
);
