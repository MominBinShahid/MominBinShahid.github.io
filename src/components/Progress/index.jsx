import React from 'react';
import { Progress } from 'antd';

const ProgressBar = (props) => {
  const { text, percent } = props;
  return (
    <div style={{ marginTop: '20px' }}>
      <div>
        <Progress
          strokeColor={{
            from: '#304CFD', // @theme-color
            to: '#108ee9', // @theme-color accent
          }}
          percent={percent || 0}
          strokeWidth={22}
          status="active"
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
