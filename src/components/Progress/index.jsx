import React from 'react';
import { Progress } from 'antd';
import {
  getThemeColor,
} from '../../utils/themeColor';

const ProgressBar = (props) => {
  const { text, percent, marginTop = '20px' } = props;
  const themeColor = getThemeColor();

  return (
    <div style={{ marginTop }}>
      <div>
        <Progress
          // strokeColor={{
          //   from: themeColor, // '#304CFD', // @theme-color
          //   to: 'tomato', // '#108ee9', // @theme-color-accent
          // }}
          strokeColor={themeColor}
          percent={percent || 0}
          strokeWidth={22}
          // status="active"
        />
      </div>
      <div style={{
        position: 'absolute',
        marginTop: '-22px',
        marginLeft: '15px',
        color: 'white',
        fontSize: '13px',
      }}
      >
        <span>{ text || '' }</span>
      </div>
    </div>
  );
};

export default ProgressBar;
