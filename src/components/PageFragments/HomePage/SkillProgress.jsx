import React from 'react';
import { Row, Col, Tooltip } from 'antd';
import FontAwesome from 'react-fontawesome';
import ProgressBar from '../../Progress';
import Config from '../../../../config';

const { skills } = Config;

const SkillsProgress = () => (
  <div>
    <h2 className="titleSeparate">
      Primary Skills
      {' '}
      <emoji>🤹‍♂️</emoji>

      <Tooltip title="These percentages are arbitrarily self-assigned and not the exact representation of the acquired skills and are rendered here just to highlight some of the main skills.">
        <FontAwesome name="exclamation-circle" />
      </Tooltip>
    </h2>
    <Row gutter={[20, 20]}>
      {
        skills.map((skillSet) => (
          <Col xs={24} sm={24} md={12}>
            {
             skillSet.map((skill, index) => (
               <ProgressBar
                 percent={skill.percentage}
                 text={skill.name}
                 marginTop={index === 0 ? '0px' : '20px'}
               />
             ))
          }
          </Col>
        ))
      }
    </Row>
  </div>
);

export default SkillsProgress;
