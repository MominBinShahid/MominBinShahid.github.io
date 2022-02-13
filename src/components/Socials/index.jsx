import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Tooltip } from 'antd';
import Config from '../../../config';
import styles from './socials.module.less';

const { social } = Config;

export default ({
  useSidebar, useSquareIcons = false, useToolTip = false,
}) => {
  const links = [];

  Object.keys(social).forEach((key) => {
    const {
      link, icon, hide, color, 'icon-square': iconSquared,
    } = social[key];

    // if no icon is provided, then no need to render icons
    if (!icon && !iconSquared) return;

    const fontSize = useSquareIcons ? '4rem' : '2rem';

    const iconContent = (
      <FontAwesome
        name={useSquareIcons ? (iconSquared || icon) : icon}
        style={{ color, fontSize }}
      />
    );

    const iconWithToolTip = !useToolTip ? iconContent : (
      <Tooltip title={key} color={color}>
        {iconContent}
      </Tooltip>
    );

    /*
      for stackoverflow specific CSS because
      fontawesome v4.7 do not have squared icon for stackoverflow
    */
    const stackOverflowSquareIcon = useSquareIcons && icon === 'stack-overflow' ? styles.stackOverflowSquareIcon : '';

    if (!hide) {
      links.push(
        <span key={link} className={`${stackOverflowSquareIcon}`}>
          <a href={link} target="_blank" label="button" rel="noopener noreferrer" aria-label={key}>
            {iconWithToolTip}
          </a>
        </span>,
      );
    }
  });

  const simpleLinks = (
    <div className={`${styles.hoverLighter}`}>
      {links}
    </div>
  );
  const socialsSection = (
    <div className={`${styles.hoverDarker}`}>
      <h2 className="titleSeparate">Elsewhere</h2>
      {links}
    </div>
  );

  return (
    <div>
      { useSidebar ? simpleLinks : socialsSection }
    </div>
  );
};
