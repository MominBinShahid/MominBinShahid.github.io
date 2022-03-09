import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Tooltip } from 'antd';
import DiscordSVG from './discord.svg';
import Config from '../../../config';
import {
  getThemeColor,
} from '../../utils/themeColor';
import styles from './socials.module.less';

const { social } = Config;

export default ({
  useSidebar, useSquareIcons = false, useToolTip = false,
}) => {
  const themeColor = getThemeColor();

  const links = [];
  Object.keys(social).forEach((key) => {
    const {
      link, icon, hide, hideOnSidebar, color, 'icon-square': iconSquared, useSVG, userName,
    } = social[key];

    if (hide) return;

    if (useSidebar && hideOnSidebar) return;

    // if no icon is provided, then no need to render icons
    if (!icon && !iconSquared && !useSVG) return;

    const fontSize = useSquareIcons ? '4rem' : '2rem';

    const iconContent = (
      useSVG
        ? <DiscordSVG className={styles.discordSVG} />
        : (
          <FontAwesome
            name={useSquareIcons ? (iconSquared || icon) : icon}
            style={{ color, fontSize }}
            className="resetXMargin"
          />
        )
    );

    // eslint-disable-next-line no-nested-ternary
    const iconWithToolTip = !useToolTip
      ? iconContent
      : (
        userName ? (
          <Tooltip title={key} color={color}>
            <Tooltip
              title={`@${userName}`}
              color={themeColor}
              placement="bottom"
              overlayStyle={{ fontSize: '0.7rem', fontWeight: '300' }}
              overlayInnerStyle={{
                paddingTop: '1px', height: '20px', minHeight: '10px', minWidth: '10px',
              }}
            >
              {iconContent}
            </Tooltip>
          </Tooltip>
        )
          : (
            <Tooltip title={key} color={color}>
              {iconContent}
            </Tooltip>
          )
      );

    /*
      for platform specific CSS because
      fontawesome v4.7 do not have squared icon for some brands
    */
    const stackOverflowSquareIcon = useSquareIcons && key === 'stackoverflow' ? styles.stackOverflowSquareIcon : '';
    const whatsappSquareIcon = useSquareIcons && key === 'whatsapp' ? styles.whatsappSquareIcon : '';
    const discordSquareIcon = useSquareIcons && useSVG && key === 'discord' ? styles.discordSquareIcon : '';
    const codepenSquareIcon = useSquareIcons && key === 'codepen' ? styles.codepenSquareIcon : '';
    const skypeSquareIcon = useSquareIcons && key === 'skype' ? styles.skypeSquareIcon : '';

    links.push(
      <span
        key={link}
        className={`${stackOverflowSquareIcon} ${whatsappSquareIcon} ${discordSquareIcon} ${codepenSquareIcon} ${skypeSquareIcon}`}
      >
        <a
          href={link}
          aria-label={key}
          title={useToolTip ? undefined : key}
          target="_blank"
          label="button"
          rel="noopener noreferrer"
        >
          {iconWithToolTip}
        </a>
      </span>,
    );
  });

  const simpleLinks = (
    <div className={`${styles.sidebarIcons}`}>
      {links}
    </div>
  );
  const socialsSection = (
    <div className={`${styles.sectionIcons}`}>
      <h2 className="titleSeparate">
        Elsewhere
        {' '}
        <emoji>📱</emoji>
      </h2>
      {links}
    </div>
  );

  return (
    <div>
      { useSidebar ? simpleLinks : socialsSection }
    </div>
  );
};
