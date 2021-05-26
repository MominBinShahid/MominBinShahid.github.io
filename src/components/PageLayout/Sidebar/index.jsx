import React from 'react';
import {
  Affix, Layout, Row, Col, Space,
} from 'antd';
import FontAwesome from 'react-fontawesome';
// eslint-disable-next-line import/no-extraneous-dependencies
import { globalHistory } from '@reach/router';
import style from './sidebar.module.less';
import { useWindowSize } from '../../../utils/hooks';
import Config from '../../../../config';

const { Content } = Layout;
const { social, resumeDownloadLink, resumePrintableDownloadLink } = Config;

const socialLinks = () => {
  const links = [];
  Object.keys(social).forEach((key) => {
    const { link, icon, hide } = social[key];

    if (!hide) {
      links.push(
        <a key={link} href={link} target="_blank" label="button" rel="noopener noreferrer">
          <FontAwesome name={icon} />
        </a>,
      );
    }
  });
  return links;
};

const DomContent = () => (
  <aside>
    <div className={style.profileAvatar} />
    <div className={`${style.name} centerAlign`}>
      <div className={`${style.boxName} centerAlign`}>
        <h2>
          <span>Momin </span>
          <span className={`${style.unsetFontWeight}`}> Bin Shahid </span>
          <span>👨‍💻</span>
        </h2>
      </div>
      <div className={`${style.badge} ${style.badgeGray}`}>
        Sr. Software Dev Engineer
        {/* Senior Software
        <br />
        Development Engineer */}
      </div>
      <div className={`${style.badge} ${style.badgeGray} ${style.badgeGrayDescText}`}>
        @&nbsp;
        <a href="https://Securiti.ai" target="_blank" rel="noreferrer">Securiti.ai</a>
      </div>
      <div className={`centerAlign box ${style.socialLinks}`}>
        { socialLinks() }
      </div>

      {/* below mentioned class: contactBlock is not working because it's in style.contactBlock */}
      <ul className={`box ${style.badge} contactBlock`}>

        <li className={`${style.contactBlockItem}`}>
          <Space size="middle" className={`${style.fixSidebarInfoIcons}`}>
            <span className={`${style.fixSidebarSmiley}`}>📞</span>
            {/* can also use `callto` instead of tel or do this https://stackoverflow.com/questions/24349340/mailto-link-equivalent-for-phone-calls */}
            <a href="tel:+923342526270"><span className={`${style.fixSideBarRefText} ${style.unsetFontWeight}`}>+92 334 3526270</span></a>
          </Space>
        </li>

        <li className={`${style.contactBlockItem}`}>
          <Space size="middle" className={`${style.fixSidebarInfoIcons}`}>
            <span className={`${style.fixSidebarSmiley}`}>🎂</span>
            <a href="https://en.wikipedia.org/wiki/December_13" target="_blank" rel="noreferrer">
              <span className={`${style.unsetFontWeight} ${style.fixSideBarRefText}`}>Dec 13, 1995</span>
            </a>
          </Space>
        </li>

        <li className={`${style.contactBlockItem}`}>
          <Space size="middle" className={`${style.fixSidebarInfoIcons}`}>
            <span className={`${style.fixSidebarSmiley}`}>📍</span>
            <a href="https://en.wikipedia.org/wiki/Karachi" target="_blank" rel="noreferrer">
              <span className={`${style.unsetFontWeight} ${style.fixSideBarRefText}`}>Karachi, Pakistan</span>
            </a>
          </Space>
        </li>

        <li className={`${style.contactBlockItem}`}>
          <Space size="middle" className={`${style.fixSidebarInfoIcons}`}>
            <span className={`${style.fixSidebarSmiley}`}>📧</span>
            <a
              href="mailto:&#77;&#111;&#109;&#105;&#110;&#66;&#105;&#110;&#83;&#104;&#97;&#104;&#105;&#100;&#64;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;"
              target="_top"
            >
              <span className={`${style.emailHider} ${style.fixSideBarRefText}`}>@</span>
            </a>
          </Space>
        </li>

      </ul>
      <div className={style.resumeDownload}>
        <a href={resumeDownloadLink} download target="_blank" rel="noreferrer">Download CV</a>
      </div>
      <div className={style.resumePrintableDownload}>
        <a href={resumePrintableDownloadLink} download target="_blank" rel="noreferrer">Printable CV</a>
      </div>
    </div>
  </aside>
);

const Sidebar = (props) => {
  const [width] = useWindowSize();
  const { children } = props;
  const { pathname } = globalHistory.location;
  let domContent = <DomContent />;
  if (width > 997) {
    domContent = (
      <Affix offsetTop={0}>
        <DomContent />
      </Affix>
    );
  }
  if (width < 768) {
    domContent = <></>;
    if (pathname === '/') {
      domContent = <DomContent />;
    }
  }
  return (
    <>
      <Layout>
        <Content className={`${style.content} ${style.background}`}>
          <Row>
            <Col sm={24} md={9} lg={6} className={style.sidebarContent}>
              { domContent }
            </Col>
            <Col sm={24} md={15} lg={18}>
              <Layout className={`${style.background} ${style.boxContent} borderRadiusSection`}>
                { children }
              </Layout>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export const Sidebar404 = (props) => {
  const { children } = props;
  return (
    <Layout>
      <Content className={`${style.content} ${style.background} `}>
        <Row>
          <Col sm={24} md={24} lg={24}>
            <Layout className={`${style.background} ${style.boxContent} ${style.sideBar404Radius}`}>
              {children}
            </Layout>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Sidebar;
