import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Tooltip } from 'antd';
import Config from '../../../config';
import styles from './socials.module.less';

const { social } = Config;

export default ({
  useSidebar, useSquareIcons = false, useToolTip = false, fontSize = '2rem',
}) => {
  const links = [];

  Object.keys(social).forEach((key) => {
    const {
      link, icon, hide, color, 'icon-square': iconSquared,
    } = social[key];

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

    if (!hide) {
      links.push(
        <a key={link} href={link} target="_blank" label="button" rel="noopener noreferrer">
          {iconWithToolTip}
        </a>,
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
