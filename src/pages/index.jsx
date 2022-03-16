import React from 'react';
import { Layout, Space } from 'antd';
import Header from '../components/PageLayout/Header';
import SidebarWrapper from '../components/PageLayout/Sidebar';
import AboutMe from '../components/PageFragments/HomePage/AboutMe';
import Quotes from '../components/PageFragments/Quotes';
import Skills from '../components/PageFragments/HomePage/SkillProgress';

export default () => (
  <Layout className="outerPadding">
    <Layout className="container">
      <Header />
      <SidebarWrapper>
        <>
          <Space direction="vertical" size="large">
            <AboutMe />
            <Skills />
            <div id="quotes" name="quotes">
              <Quotes />
            </div>
          </Space>
        </>
      </SidebarWrapper>
    </Layout>
  </Layout>
);
