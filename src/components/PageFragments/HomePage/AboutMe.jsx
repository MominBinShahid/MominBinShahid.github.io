import React from 'react';
import { Row, Col, Space } from 'antd';
import AboutTile from '../../AboutTile';
import { stripTags, domHtml } from '../../../utils/stripTags';

import SEO from '../../Seo';

const pageText = {
  paraOne: `Hey there 👋 My name is <span class="devName">Momin Bin Shahid</span>.
    I'm a <strong>full stack developer</strong> who is passionate about various technologies specially <strong>JavaScript</strong> and it's derived ones.
    I like to experiment with different web technologies. 
    I have an <strong>specialized experience of 3+ years</strong> working with <strong>MERN/MEVN/MEAN stack</strong>.
    Building and experimenting with web, mobile and desktop apps using JavaScript`,
  paraTwo: `Currently, I work mostly with Javascript technologies like <strong>VueJS, ReactJS, NodeJS, and more</strong>.
    I also have hands on experience working with cloud infrastructures like <strong>AWS/Azure/GCP</strong>
    and have deployed applications keeping scalability in mind
    and I also worked on serverless applications. 
    Docker and Kubernetes are some of the tools I use for CI/CD.
    I'm always a quick learner and a self taught programmer.
    Till now, I have <strong>worked on closed-source projects</strong> but now I am getting into <strong>open-source software</strong> 🍀

    <br/>
    <br/>
    
    Let's get in touch 😇 and feel free to reach out for any opportunities or project collaboration or just to say hi`,
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
          <p dangerouslySetInnerHTML={domHtml(pageText.paraOne)} />
          <p dangerouslySetInnerHTML={domHtml(pageText.paraTwo)} />
        </div>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              img="location.png"
              height={60}
              alt="location image"
              textH4="Born and bought up in"
              textH3="Karachi, Sindh, P.K."
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              img="javascript.png"
              alt="javascript logo image"
              textH4="Love JavaScript"
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
              height={60}
              width={60}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              img="graduation.png"
              alt="graduation image"
              textH4="Pursued Bachelors in"
              textH3="Computer Science"
              height={60}
              width={60}
            />
          </Col>
        </Row>
      </Space>
    </>
  );
};
export default AboutMe;
