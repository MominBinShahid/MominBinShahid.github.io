import React from 'react';
import { Row, Col, Space } from 'antd';
import AboutTile from '../../AboutTile';
import { stripTags, domHtml } from '../../../utils/stripTags';

import SEO from '../../Seo';

const pageText = {
  paraOne: `Hey there <emoji>👋</emoji> My name is <span class="devName">Momin Bin Shahid</span> <emoji>👨‍💻</emoji>.
    I'm a <strong>Full-Stack JavaScript</strong> developer who is passionate about <strong>software engineering</strong> and <strong>web</strong>.
    I love to learn and experiment with different technologies. 
    I have <strong>industry experience of 4+ years</strong> working with <strong>service-based</strong> and <strong>product-based</strong> companies as well as with clients from U.S., Middle East and also other parts of the world usually building solutions using <strong>MERN</strong>/<strong>MEVN</strong>/<strong>MEAN</strong> stack.
    You will usually find me building and experimenting with web, mobile and desktop apps using <strong>JavaScript</strong> <emoji>🚀</emoji> and other exciting <emoji>🤩</emoji> technologies.`,
  paraTwo: `Currently, at work, I mostly utilize <strong>JavaScript</strong>-based technologies 🛠 like <strong>VueJS, ReactJS, NodeJS, and more</strong>.
    I also have hands-on experience working with cloud infrastructures <emoji>☁️</emoji> like <strong>AWS</strong>/<strong>Azure</strong>/<strong>GCP</strong>/<strong>Firebase</strong>.
    I have build and maintained <strong>serverless</strong> applications as well.
    While developing and deploying apps I do keep <strong>scalability</strong> in mind while utilizing industry <strong>best practices</strong>.
    I utilize <strong>Docker</strong> <emoji>🐳</emoji> and <strong>Kubernetes</strong> <emoji>☸️</emoji> for development as well as for CI/CD.
    I'm always a quick learner <emoji>⚡️</emoji> and a self-taught <emoji>💻</emoji> programmer.
    As of now, I have only <strong>worked on closed-source</strong> projects but lately I am getting into the <strong>open-source software</strong> <emoji>🍀</emoji> as well.

    <br/>
    <br/>
    
    Let's get in touch <emoji>🤙</emoji> and feel free to reach out for any opportunities or project collaboration <emoji>😇</emoji> or just to say hi <emoji>🙋‍♂️</emoji>`,
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
          <h1 className="titleSeparate">About Me</h1>
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
              textH3="Learn Once, Deploy Everywhere!"
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
