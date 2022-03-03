import React from 'react';
import { Layout, Row, Col } from 'antd';
import Header from '../../components/PageLayout/Header';
import SidebarWrapper from '../../components/PageLayout/Sidebar';
import ContactForm from '../../components/PageFragments/ContactForm';
import SEO from '../../components/Seo';
import Socials from '../../components/Socials';

const Contact = () => (
  <Layout className="outerPadding">
    <Layout className="container">
      <SEO
        title="Contact"
        description="Hello folks Momin here. You can contact me through the contact form on this page.
                    Please feel free to contact me, don't be shy guys, just remember Momin is always open to talk about web
                    technologies especially Javascript tech stacks. Currently working as Sr. Software Development Engineer at Securiti.ai.
                    Find me on github - MominBinShahid."
        path="/contact"
        keywords={['@MominBinShahid', 'MominBinShahid', 'Momin', 'Bin', 'Shahid', 'Software Engineer', 'FullStack Developer', 'Javascript', 'ReactJS', 'NodeJS', 'VueJS', 'Technology']}
      />
      <Header />
      <SidebarWrapper>
        <div className="marginTopTitle">
          <h1 className="titleSeparate">
            Contact
            {' '}
            <emoji>🤙</emoji>
          </h1>
        </div>
        <Row gutter={[40, 20]}>
          <Col sm={24} md={24} lg={12}>
            <img
              src="../../contact.png"
              alt="contact"
              className="widthFull contactImgBorder"
            />
          </Col>

          <ContactForm />
          <Socials useSquareIcons useToolTip />

        </Row>
      </SidebarWrapper>
    </Layout>
  </Layout>
);

export default Contact;
