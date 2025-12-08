import React from 'react';
import { Link } from 'gatsby';
import { Row, Col, Space } from 'antd';
import AboutTile from '../../AboutTile';
import { stripTags, domHtml } from '../../../utils/stripTags';
import { getRoute } from '../../../utils/common';
import SEO from '../../Seo';
import Config from '../../../../config';

const { keywords, pages } = Config;

const contactRoute = getRoute(pages.contact.path);

const pageText = {
  paraOne: `
    My name is <span class="devName">Momin Bin Shahid</span>,
    and I am a <strong>Full-Stack Engineer & AI Engineer</strong> <emoji>👨‍💻</emoji> with a deep enthusiasm for software engineering and cutting-edge technologies. I love building things that live on the web and now, things that think <emoji>🤖</emoji>
    
    <br/>
    <br/>

    With <strong>8 years</strong> of shipping production software and a <strong>Bachelor's Degree</strong> in Computer Science, I've spent my career architecting web applications from scratch and recently expanded into the fascinating world of <strong>AI Agents</strong> and <strong>LLMs</strong> <emoji>🧠</emoji>. Currently, I'm a <strong>Lead Engineer</strong> at <strong>Sastaticket.pk</strong> where I build AI-powered systems, work directly with stakeholders to understand their needs, and lead a team of awesome engineers.

    <br/>
    <br/>

    My core expertise lies in <strong>JavaScript</strong> and its ecosystem. I've built production applications with <strong>React.js</strong>, <strong>Vue.js</strong>, and <strong>Angular</strong> on the frontend, spanning the full alphabet soup of stacks: <strong>MERN</strong>, <strong>MEVN</strong>, MEAN, and <strong>JAMstack</strong>. On the backend, I work extensively with <strong>Node.js</strong>, <strong>Python</strong>, and <strong>Django</strong> for web services and AI/ML workloads. For AI development, I leverage both <strong>LangChain</strong> and direct integrations with frontier model APIs like <strong>Google GenAI</strong>, <strong>OpenAI</strong>, and <strong>Anthropic Claude</strong> to build intelligent agents.

    <br/>
    <br/>
    
    I've had the privilege of building across <strong>diverse domains</strong> including Internet Privacy & Security <emoji>🔐</emoji> (at the unicorn Securiti.ai), Metadata Platforms, Enterprise Resource Planning (ERP), Human Resource Management Systems (HRMS), EdTech, Travel Tech <emoji>✈️</emoji>, and now AI/Agentic Systems. Throughout my career, I've collaborated directly with clients and served users across the <strong>USA</strong>, <strong>Europe</strong>, <strong>Middle East</strong>, and <strong>South Asia</strong>, always with a focus on understanding their needs and delivering solutions that exceed expectations.

    <br/>
    <br/>
    
    I've shipped code in both <strong>service-based consultancies</strong> (where you learn to adapt fast and interact with clients daily) and <strong>product-based companies</strong> (where you own features end-to-end). Both have taught me that great software is about understanding people, not just writing code <emoji>💡</emoji>.
  `,
  paraTwo: `
    These days, I'm obsessed with building <strong>AI Agents</strong> that actually solve real business problems. For example, I built a QA agent that reviews hundreds of customer support calls daily with remarkable accuracy, accomplishing in a single day what would take a team of humans several days, and with a consistency humans simply can't match. There's something magical about teaching machines to understand context and take action <emoji>✨</emoji>.

    <br/>
    <br/>

    On the infrastructure side, I work with both <strong>On-Premise</strong> and <strong>Cloud</strong> <emoji>☁️</emoji> environments. I've built and maintained monolithic and microservices-based applications using <strong>Docker</strong> and <strong>Kubernetes</strong>, deployed across <strong>AWS</strong>, <strong>GCP</strong>, and Azure with CI/CD pipelines ensuring seamless deployment and management.
    
    <br/>
    <br/>

    <strong>What drives me?</strong> The thrill of solving gnarly problems <emoji>⚡️</emoji>, the satisfaction of <strong>mentoring engineers</strong> and watching them grow <emoji>🌱</emoji>, and the never-ending rabbit hole of learning new technologies <emoji>📈</emoji>. I'm that person who reads documentation for fun (well, sometimes... now I let AI summarize it for me). I believe in leaving codebases better than I found them <emoji>🏕️</emoji>, call it the <strong>Boy Scout Rule</strong> of programming.
    
    <br/>
    <br/>

    I'm endlessly curious and love exploring emerging technologies. I'm always enthusiastic about developing <strong>Web</strong>, <strong>Mobile</strong>, and <strong>Desktop</strong> applications using <strong>JavaScript</strong>, <strong>Python</strong>, and other exciting technologies in their ecosystems.

    <br/>
    <br/>

    While most of my professional work has been closed-source <emoji>🔒</emoji>, I'm increasingly contributing to and learning from the <strong>open-source community</strong> <emoji>🍀</emoji>. The web taught me everything I know, and I want to give back.

    <br/>
    <br/>

    Want to build something together? Have an interesting <strong>AI problem</strong>? Or just want to geek out about the latest in LLMs and web tech? Beyond code, I'm equally fascinated by <strong>philosophy</strong> <emoji>🧘</emoji> and esoteric discussions about the nature of reality, consciousness, and what it means to be alive in this strange universe. I'm always up for a good conversation, whether it's about software architecture or the mysteries of existence. Let's connect! <emoji>🤙</emoji>
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
              <emoji className="heyAnimation font-size2_5">👋</emoji>
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
              emoji="🛠️"
              alt="8 years of coding experience"
              textH4="8 Years Building"
              textH3="Full-Stack to AI Agents"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              emoji="🐍"
              alt="javascript and python"
              textH4="JavaScript + Python"
              textH3="Full-Stack & AI Ecosystems"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              emoji="👨‍💻"
              alt="lead engineer mentoring team"
              textH4="Lead Engineer"
              textH3="Mentoring Engineers Daily"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              emoji="🔄"
              alt="learn and solve problems"
              textH4="Learn & Solve"
              textH3="The Never-Ending Loop"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              emoji="🤝"
              alt="customer focused development"
              textH4="Customer Focused"
              textH3="Building What Users Need"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <AboutTile
              emoji="🧠"
              alt="philosophy and deep thinking"
              textH4="Forever Curious"
              textH3="Code & Consciousness"
            />
          </Col>
        </Row>
      </Space>
    </>
  );
};
export default AboutMe;
