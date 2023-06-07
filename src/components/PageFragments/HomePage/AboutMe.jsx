import React from 'react';
import { Link } from 'gatsby';
import { Row, Col, Space } from 'antd';
import AboutTile from '../../AboutTile';
import { stripTags, domHtml } from '../../../utils/stripTags';
import { getRoute } from '../../../utils/common';
import SEO from '../../Seo';
import Config from '../../../../config';

import CodeImage from '../../../images/icons/code.png';
import GraduationImage from '../../../images/icons/graduation.png';
import JavaScriptImage from '../../../images/icons/javascript.png';
import LocationImage from '../../../images/icons/location.png';
import MeetingImage from '../../../images/icons/meeting.png';
import OpenSourceImage from '../../../images/icons/open-source.png';

const { keywords, pages } = Config;

const contactRoute = getRoute(pages.contact.path);

const pageText = {
  paraOne: `
    My name is <span class="devName">Momin Bin Shahid</span>,
    and I am a dedicated <strong>Full-Stack Software Engineer</strong> <emoji>👨‍💻</emoji> with a deep enthusiasm for software engineering and cutting-edge technologies, particularly in the domain of <strong>Web</strong> and <strong>JavaScript</strong> <emoji>🤟</emoji>
    
    <br/>
    <br/>

    With a <strong>Bachelor's Degree</strong> in Computer Science and <strong>over 5 years</strong> of experience in the <strong>software development</strong> <emoji>🛠</emoji> field, complemented by an additional 1+ years in sales and marketing, I possess a profound understanding of the development lifecycle and adhere to industry standards. I thrive on acquiring knowledge about various processes, building innovative solutions, and effectively promoting them to the market.
    
    <br/>
    <br/>

    My expertise lies in creating and maintaining robust solutions utilizing stacks such as <strong>MERN</strong> <emoji>⚛</emoji>, <strong>MEVN</strong>, MEAN, and <strong>JAM</strong>. These ventures span a diverse range of domains, including Internet Privacy and Security, Metadata Platforms, Enterprise Resource Planning (ERP), Human Resource Management Systems (HRMS), EdTech (E-learning platform for educational institutions), and Bioinformatics projects with research institutions, among others.

    <br/>
    <br/>
    
    Throughout my career, I have had the privilege of working with both <strong>service-based</strong> and <strong>product-based</strong> companies, collaborating with clients hailing from the United States, Europe, the Middle East, and other regions across the globe. 

    <br/>
    <br/>
    
    My insatiable curiosity drives me to constantly explore and experiment with emerging technologies and concepts. I am always enthusiastic about developing Web <emoji>🌐</emoji>, Mobile <emoji>📱</emoji>, and Desktop <emoji>💻</emoji> applications using <strong>JavaScript</strong> <emoji>🚀</emoji> and other exciting technologies.
  `,
  paraTwo: `
    In my recent experiences, I have extensively utilized JavaScript-based technologies such as <strong>React.js</strong> <emoji>⚛</emoji>, <strong>Vue.js</strong>, and <strong>Node.js</strong>. Furthermore, I have hands-on experience working with <strong>On-Premise</strong> <emoji>⛰️</emoji> and <strong>Cloud</strong> <emoji>☁️</emoji> infrastructures such as <strong>AWS</strong>, Azure, and <strong>Firebase</strong> (GCP). I have successfully built and maintained monolith, serverless (FaaS), and microservices-based applications, leveraging Docker <emoji>🐳</emoji> and Kubernetes to enhance efficiency, scalability, and portability while ensuring seamless deployment (CI/CD) and management.
    
    <br/>
    <br/>

    My <strong>main highlight</strong> is that I have a strong passion for solving complex problems and a drive for continuous and quick <emoji>⚡️</emoji> learning, I consistently strive to stay updated with the latest industry trends <emoji>📈</emoji> and technologies. I have a proven track record of successfully delivering high-quality software solutions that meet and exceed client expectations <emoji>👍</emoji>. My strong analytical skills, attention to detail, and ability to work effectively in cross-functional teams make me a valuable asset in delivering innovative and scalable software solutions. 
    
    <br/>
    <br/>

    Although my previous experiences have primarily revolved around closed-source <emoji>🔒</emoji> projects, I am increasingly immersing myself in the world of open-source software <emoji>🍀</emoji>
    
    <br/>
    <br/>

    Please feel free to reach out to me for any opportunities or potential collaborations <emoji>🤝</emoji> or just to say hi <emoji>🙋‍♂️</emoji>. I am excited to connect and explore how we can work together. Let's get in touch <emoji>🤙</emoji>
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
            keywords={['About Momin Bin Shahid', 'About Momin', ...keywords]}
          />
          <h1 className="titleSeparate">
            About Me
            {' '}
            <Link to={contactRoute}>
              <emoji className="heyAnimation">👋</emoji>
            </Link>
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
              img={LocationImage}
              alt="location image"
              textH4="Born and bought up in"
              textH3="Karachi, Sindh, P.K."
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              img={JavaScriptImage}
              alt="javascript logo image"
              textH4="Love JavaScript ♥️"
              textH3="Learn Once, Ship Anywhere!"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              img={MeetingImage}
              alt="meeting with other people image"
              textH4="Socially Awkward (at times)"
              textH3="Yet, Love to Socialize"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              img={OpenSourceImage}
              alt="open source initiative image"
              textH4="Worked on Closed-Source"
              textH3="Getting into Open-Source"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              img={CodeImage}
              alt="code image"
              textH4="Self Taught Programmer"
              textH3="Thanks to the Web Resources"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              img={GraduationImage}
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
