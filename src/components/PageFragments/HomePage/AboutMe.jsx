import React from 'react';
import { Row, Col, Space } from 'antd';
import AboutTile from '../../AboutTile';
import { stripTags, domHtml } from '../../../utils/stripTags';

import SEO from '../../Seo';

const pageText = {
  paraOne: `
    It's <span class="devName">Momin Bin Shahid</span> <emoji>👨‍💻</emoji> here.
    I'm a <strong>Full-Stack JavaScript Developer</strong> passionate about software engineering and technologies, mainly <strong>Web</strong> and <strong>JavaScript</strong> <emoji>🤟</emoji>.
    
    <br/>
    <br/>
    
    With an <strong>industry experience</strong> of <strong>4+ years</strong> in <strong>software development</strong> and <strong>1+ years</strong> in <strong>sales</strong> and <strong>marketing</strong>, I love to learn the processes, build and sell solutions. 
    
    <br/>
    
    Experienced in working with <strong>service-based</strong> and <strong>product-based</strong> companies as well as with clients from the U.S., Europe, Middle East and also other parts of the world usually building and maintaining solutions using <strong>MERN</strong>, <strong>MEVN</strong> and <strong>MEAN</strong> stacks.
    
    <br/>
    
    My working experiences comprise diverse domains like <strong>Internet Privacy</strong> and <strong>Security</strong>, <strong>Enterprise Resource Planning (ERP)</strong>, <strong>Human Resource Management System (HRMS)</strong>, <strong>EdTech</strong> and more.

    <br/>
    <br/>
    
    You will usually find me learning and experimenting with different technologies and concepts that encompass Web, Mobile and Desktop apps using <strong>JavaScript</strong> <emoji>🚀</emoji> and other exciting <emoji>🤩</emoji> technologies.
  `,
  paraTwo: `
    Currently, at work, I mostly utilize JavaScript-based technologies <emoji>🛠</emoji> like <strong>VueJS, ReactJS, NodeJS, and more</strong>.
    I also have hands-on experience working with <strong>On-Premise</strong> <emoji>⛰</emoji> and <strong>Cloud</strong> <emoji>☁️</emoji> infrastructures like <strong>AWS</strong>, <strong>Azure</strong>, <strong>Firebase</strong> (<strong>GCP</strong>).
    I have built and maintained <strong>serverless</strong> and <strong>micro-services</strong>-based applications as well.
    While developing and deploying apps, I do keep <strong>scalability</strong> in mind while utilizing industry <strong>best practices</strong>.
    I utilize <strong>Docker</strong> <emoji>🐳</emoji> and <strong>Kubernetes</strong> <emoji>☸️</emoji> for development as well as for CI/CD.
    
    <br/>
    <br/>

    I'm always a quick learner <emoji>⚡️</emoji> and a self-taught <emoji>💻</emoji> programmer.
    As of now, I have only <strong>worked on closed-source</strong> <emoji>🔒</emoji> projects but lately, I am getting into the <strong>open-source software</strong> <emoji>🍀</emoji> as well.

    <br/>
    <br/>
    
    Let's get in touch <emoji>🤙</emoji> and feel free to reach out for any opportunities or project collaboration <emoji>😇</emoji> or just to say hi <emoji>🙋‍♂️</emoji>
  `,
};

const AboutMe = () => {
  const description = `${stripTags(pageText.paraOne)} ${stripTags(pageText.paraTwo)}`;
  return (
    <>
      <Space direction="vertical">
        <div>
          <SEO
            title="About"
            description={description}
            path=""
            keywords={['@MominBinShahid', 'MominBinShahid', 'Momin', 'Bin', 'Shahid', 'Software Engineer', 'FullStack Developer', 'Javascript', 'ReactJS', 'NodeJS', 'VueJS']}
          />
          <h1 className="titleSeparate">
            About Me
            {' '}
            <emoji className="heyAnimation">👋</emoji>
          </h1>
          {/*
          <p>
            {pageText.paraOne}
          </p>
           */}
          <p dangerouslySetInnerHTML={domHtml(pageText.paraOne)} className="theme-text-color" />
          <p dangerouslySetInnerHTML={domHtml(pageText.paraTwo)} className="theme-text-color" />
        </div>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              img="location.png"
              alt="location image"
              textH4="Born and bought up in"
              textH3="Karachi, Sindh, P.K."
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              img="javascript.png"
              alt="javascript logo image"
              textH4="Love JavaScript ♥️"
              textH3="Learn Once, Ship Anywhere!"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              img="meeting.png"
              alt="meeting with other people image"
              textH4="Socially Awkward (at times)"
              textH3="Yet, Love to Socialize"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              img="open-source.png"
              alt="open source initiative image"
              textH4="Worked on Closed-Source"
              textH3="Getting into Open-Source"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              img="code.png"
              alt="code image"
              textH4="Self Taught Programmer"
              textH3="Thanks to the Web Resources"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              img="graduation.png"
              alt="graduation image"
              textH4="Pursued Bachelors in"
              textH3="Computer Science"
            />
          </Col>
        </Row>
      </Space>
    </>
  );
};
export default AboutMe;
