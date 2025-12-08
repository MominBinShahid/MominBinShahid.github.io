import React from 'react';
import {
  Affix, Layout, Row, Col, Space,
} from 'antd';
import FontAwesome from 'react-fontawesome';
// eslint-disable-next-line import/no-extraneous-dependencies
import { globalHistory } from '@reach/router';
import { useWindowSize } from '../../../utils/hooks';
import Config from '../../../../config';
import Socials from '../../Socials';
import style from './sidebar.module.less';

const { Content } = Layout;
const { resume /* , legacy_resume  */ } = Config;

const DomContent = () => (
  <aside>
    <div className={`${style.profileAvatar} invert`} />
    <div className={`${style.name} centerAlign`}>
      <div className={`${style.boxName} centerAlign`}>
        <h2>
          <span>Momin </span>
          <span className={`${style.unsetFontWeight}`}> Bin Shahid</span>
          <span>
            <emoji>👨‍💻</emoji>
          </span>
        </h2>
      </div>
      <div className={style.designation}>
        <div className={`${style.badge} ${style.badgeGray}`}>
          Lead Engineer
          <br />
          <span>Full Stack AI Engineer</span>
        </div>
        <div className={`${style.badge} ${style.badgeGray} ${style.badgeGrayDescText}`}>
          <span>@</span>
          <a href="https://www.sastaticket.pk/" target="_blank" rel="noopener noreferrer">Sastaticket.pk</a>
        </div>
      </div>
      <div className="centerAlign box">
        <Socials useSidebar />
      </div>

      {/* below mentioned class: contactBlock is not working because it's in style.contactBlock */}
      <ul className={`box ${style.badge} contactBlock`}>

        <li className={`${style.contactBlockItem}`}>
          <Space size="middle" className={`${style.fixSidebarInfoIcons}`}>
            <span className={`${style.fixSidebarSmiley} ${style.phoneEmoji}`}><emoji>📞</emoji></span>
            {/* can also use `callto` instead of tel or do this https://stackoverflow.com/questions/24349340/mailto-link-equivalent-for-phone-calls */}
            {/* Should I hide phone number as I did with email? */}
            {/* and if what I did with email is correct */}
            <span className="textCenter display-inline-block">
              <a href="tel:+923343526270">
                <span className={`${style.fixSideBarRefText} ${style.unsetFontWeight} ${style.phoneHider}`}>+</span>
              </a>
              &nbsp;
              <a href="https://wa.me/923343526270" target="_blank" rel="noopener noreferrer" aria-label="whatsapp">
                {/* ref for whatsapp link: https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat/?lang=en */}
                <FontAwesome
                  name="whatsapp"
                  title="whatsapp"
                  className={`resetXMargin ${style.whatsappWithPhone}`}
                />
              </a>
            </span>
          </Space>
        </li>

        <li className={`${style.contactBlockItem}`}>
          <Space size="middle" className={`${style.fixSidebarInfoIcons}`}>
            <span className={`${style.fixSidebarSmiley}`}><emoji>🎂</emoji></span>
            <a href="https://en.wikipedia.org/wiki/December_13" target="_blank" rel="noopener noreferrer">
              <span className={`${style.unsetFontWeight} ${style.fixSideBarRefText}`}>Dec 13, 1995</span>
            </a>
          </Space>
        </li>

        <li className={`${style.contactBlockItem}`}>
          <Space size="middle" className={`${style.fixSidebarInfoIcons}`}>
            <span className={`${style.fixSidebarSmiley}`}><emoji>🏡</emoji></span>
            <a href="https://en.wikipedia.org/wiki/Karachi" target="_blank" rel="noopener noreferrer">
              <span className={`${style.unsetFontWeight} ${style.fixSideBarRefText}`}>Karachi, Pakistan</span>
            </a>
          </Space>
        </li>

        <li className={`${style.contactBlockItem}`}>
          <Space size="middle" className={`${style.fixSidebarInfoIcons}`}>
            <span className={`${style.fixSidebarSmiley}`}><emoji>📧</emoji></span>
            <a
              href="mailto:&#77;&#111;&#109;&#105;&#110;&#66;&#105;&#110;&#83;&#104;&#97;&#104;&#105;&#100;&#64;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;?subject=Hello from the Website"
              target="_top"
            >
              <span className={`${style.emailHider} ${style.fixSideBarRefText}`}>@</span>
            </a>
          </Space>
        </li>

      </ul>
      <div className={style.resumeDownload}>
        <a href={resume} download target="_blank" rel="noopener noreferrer">
          Download
          {' '}
          <span>CV</span>
        </a>
      </div>

      {/* <div className={style.resumePrintableDownload}>
        <a
          href={legacy_resume}
          download
          target="_blank"
          rel="noreferrer"
        >
          Download Legacy CV
        </a>
      </div> */}

    </div>
  </aside>
);

const AffixFixInDarkMode = ({ children }) => (
  <div id="affix-fix-in-dark-mode">
    <Affix offsetTop={0}>
      {children}
    </Affix>
  </div>
);

const Sidebar = (props) => {
  const [width, height] = useWindowSize();
  const { children } = props;
  const { pathname } = globalHistory.location;
  let domContent = <DomContent />;
  // height was needed because the sidebar content is more than 750
  if (width > 767 /* 997 */ && height > 765) {
    domContent = (
      <AffixFixInDarkMode>
        <DomContent />
      </AffixFixInDarkMode>
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
