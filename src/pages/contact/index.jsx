import React from 'react';
import { Layout, Row, Col } from 'antd';
import Header from '../../components/PageLayout/Header';
import SidebarWrapper from '../../components/PageLayout/Sidebar';
import ContactForm from '../../components/PageFragments/ContactForm';
import SEO from '../../components/Seo';
import Socials from '../../components/Socials';
import Config from '../../../config';

const { keywords } = Config;

const Contact = () => (
  <Layout className="outerPadding">
    <Layout className="container">
      <SEO
        title="Contact"
        description="Hello folks Momin here. You can contact me through the contact form on this page OR on social media @MominBinShahid.
                    Please feel free to reach out as I am always open to talk about web technologies especially JavaScript and related tech stacks,
                    also about life in general, science, philosophy, .etc. Currently working as Senior Software Development Engineer (SSDE) at Securiti.ai.
                    Find me on Linkedin, Twitter, Github, StackOverflow - @MominBinShahid."
        path="/contact"
        keywords={['Contact Momin Bin Shahid', 'Contact Momin', ...keywords]}
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
