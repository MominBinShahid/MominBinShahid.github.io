import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Layout } from 'antd';
import 'font-awesome/less/font-awesome.less';
import style from './header.module.less';
import '../../../styles/global.less';
import { useWindowSize } from '../../../utils/hooks';
import Config from '../../../../config';

export default () => {
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

      const addedSlashBefore = '/';
      const to = `${addedSlashBefore}${path}`;

      links.push(
        <li className={style.navItem} key={`${path}-${name}`}>
          <Link to={to} onClick={toggleMenu} activeClassName={style.anchorActive}>
            { name }
          </Link>
        </li>,
      );
    });

    return links;
  };

  return (
    <>
      <div className={style.circleMenu} role="button" tabIndex="0" onKeyDown={toggleMenu} onClick={toggleMenu}>
        <div className={`${style.hamburger} ${menu ? style.menuIcon : null}`}>
          <div className={style.line} />
          <div className={style.line} />
          <div className={style.hamburgerText}>MENU</div>
        </div>
      </div>
      <Layout className={`${style.navWrap} ${menu ? null : style.hidden} ${menu ? style.openMenu : null}`}>
        <div className={style.backgroundDiv}>
          <ul className={style.nav}>
            { generateLinks() }
          </ul>
        </div>
      </Layout>
    </>
  );
};
