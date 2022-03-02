import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'gatsby';
import { Layout } from 'antd';
import Config from '../../../../config';
import DarkModeToggler from '../../ThemeToggler';
import { useWindowSize } from '../../../utils/hooks';
import { showConsoleMessage } from '../../../utils/common';
import { switchThemeColor } from '../../../utils/themeColor';
import Drawer from './drawer';

import style from './header.module.less';

// find out a better place to import these [globals]
import 'font-awesome/less/font-awesome.less';
import '../../../styles/global.less';

// call on init only
switchThemeColor();
showConsoleMessage();

export default () => {
  const [showSettings, setSettingsVisibility] = useState(false);
  const openSettings = () => {
    setSettingsVisibility(true);
  };

  const [menu, setMenu] = useState(false);
  const [width] = useWindowSize();
  const { pages } = Config;

  const toggleMenu = () => {
    if (width !== 0 && width <= 768) {
      if (menu) {
        setMenu(false);
      } else {
        setMenu(true);
      }
    }
  };

  const generateLinks = () => {
    const links = [];

    Object.keys(pages).forEach((key) => {
      const { path, name, hide } = pages[key];

      if (hide) return;

      const addedSlash = '/';
      const to = `${addedSlash}${path}${path && addedSlash}`;
      //  if you wanted to know the reason of making such urls, see this - https://github.com/gatsbyjs/gatsby/issues/10586#issuecomment-449134665

      links.push(
        <li className={style.navItem} key={`${path}-${name}`}>
          <Link to={to} onClick={toggleMenu} activeClassName={style.anchorActive}>
            { name }
          </Link>
        </li>,
      );
    });

    links.push(
      <li className={`${style.navItem} ${style.darkModeToggler}`} key="darkMode">
        <DarkModeToggler />
      </li>,
    );

    links.push(
      <li className={style.navItem} key="settings">
        <FontAwesome
          className={`cursor-pointer ${menu ? style.menuSettings : style.settings} ${showSettings ? `fa-spin ${style.settingsLoading}` : ''}`}
          name={showSettings ? 'spinner' : 'wrench'}
          onClick={openSettings}
        />
      </li>,
    );

    return links;
  };

  return (
    <>
      <div
        className={`${style.circleMenu} ${menu ? '' : style.circleMenuShadow}`}
        role="button"
        tabIndex="0"
        onClick={toggleMenu}
        onKeyDown={toggleMenu}
      >
        <div className={`${style.hamburger} ${menu ? style.menuIcon : ''}`}>
          <div className={style.hamburgerText}>
            <div className={style.line} />
            <div className={style.line} />
            <div className={style.line} />
          </div>
        </div>
      </div>
      <Layout className={`${style.navWrap} ${menu ? '' : style.hidden} ${menu ? style.openMenu : ''}`}>
        <div className={style.backgroundDiv}>
          <ul className={`${style.nav} text-center`}>
            { generateLinks() }
          </ul>
        </div>
      </Layout>

      <Drawer showSettings={showSettings} setSettingsVisibility={setSettingsVisibility} />
    </>
  );
};
