import React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
// import FontAwesome from 'react-fontawesome';
import { Switch } from 'antd';
import { useWindowSize } from '../../utils/hooks';
import style from './toggler.module.less';

export default ({ fixBackgroundHTML }) => (
  <ThemeToggler>
    {({ theme, toggleTheme }) => {
      const isDark = theme === 'dark';
      const [screenWidth] = useWindowSize();
      const isPortableDeviceScreen = screenWidth !== 0 && screenWidth <= 768;

      if (fixBackgroundHTML && isPortableDeviceScreen) {
        // accessing HTML main tag using document

        // eslint-disable-next-line no-undef
        document.documentElement.style.background = isDark ? 'var(--background-dark)' : 'var(--background-light)';
      }

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
