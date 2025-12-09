import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Document, Page } from 'react-pdf';
import {
  Button, Row, Col, Space, Spin, Tooltip,
} from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ZoomInOutlined, ZoomOutOutlined, ArrowLeftOutlined, HomeTwoTone,
} from '@ant-design/icons';
import SEO from '../components/Seo';
import Config from '../../config';
import DarkModeToggler from '../components/ThemeToggler';
import { isPortableDeviceScreen } from '../utils/common';

const {
  resume, legacy_resume: legacyResume, keywords,
} = Config;

const zoomOperatorEnum = {
  zoomIn: '+', zoomOut: '-',
};
export default class Resume extends Component {
  constructor() {
    super();
    const pageScale = isPortableDeviceScreen() ? 1.3 : 1.6;
    this.state = {
      numPages: null,
      pageNumber: 1,
      pageScale,
    };
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
    this.pageToggle = this.pageToggle.bind(this);
    this.zoom = this.zoom.bind(this);
  }

  onDocumentLoadSuccess({ numPages }) {
    this.setState({ numPages });
  }

  pageToggle(pageNumber) {
    if (pageNumber === 1) {
      this.setState({ pageNumber: 2 });
    } else {
      this.setState({ pageNumber: 1 });
    }
    return 1;
  }

  zoom(op) {
    const zoomFactor = 0.3;
    const { pageScale } = this.state;

    if (op === zoomOperatorEnum.zoomIn) {
      return this.setState({ pageScale: pageScale + zoomFactor });
    }
    return this.setState({ pageScale: pageScale - zoomFactor });
  }

  render() {
    const {
      pageNumber, numPages, pageScale,
    } = this.state;

    const loader = (
      <div className="text-center">
        <Spin />
      </div>
    );

    return (
      <>
        <SEO
          title="Resume"
          description="Full-Stack & AI Engineer with 8 years of building production web applications and AI agents. Skilled in JavaScript/TypeScript, Python, React, Node.js, and LangChain. Open to job opportunities, project collaborations, or just saying hi. Looking to hire? I'm ready to learn, grow, and tackle the challenges that come with building great solutions. Let's connect!
          - Momin Bin Shahid @MominBinShahid"
          path="resume"
          keywords={['Momin Bin Shahid Resume', "Momin Bin Shahid's Resume", 'Momin Resume', 'Resume', 'CV', 'C.V.', ...keywords]}
        />

        <Row justify="center" className="pt-1">
          <Col>
            <Space direction="vertical" size="middle">

              <Row justify="center" style={{ /* background: 'lightslategray', */ }}>
                <Col>
                  <Link to="/">
                    <Button
                      type="dashed"
                      shape="round"
                      icon={<ArrowLeftOutlined />}
                      size="small"
                    >
                      {/* onClick={() => navigate('/')} */}
                      {/* href="/" */}

                      {/* Back */}
                      <HomeTwoTone />
                    </Button>
                  </Link>
                </Col>
                <Col className="pl-0_5">
                  <DarkModeToggler />
                </Col>
              </Row>

              <Row justify="center" style={{ /* background: 'lightslategray', */ }}>
                <Col>
                  <Tooltip title="Increase the size of the page">
                    <Button
                      type="dashed"
                      shape="round"
                      icon={<ZoomInOutlined />}
                      size="large"
                      onClick={() => this.zoom(zoomOperatorEnum.zoomIn)}
                    >
                      Zoom In
                    </Button>
                  </Tooltip>
                </Col>
                <Col className="pl-0_5">
                  <Tooltip title="Decrease the size of the page">
                    <Button
                      danger
                      type="dashed"
                      shape="round"
                      icon={<ZoomOutOutlined />}
                      size="large"
                      onClick={() => this.zoom(zoomOperatorEnum.zoomOut)}
                    >
                      Zoom Out
                    </Button>
                  </Tooltip>
                </Col>

              </Row>

              <Row justify="center" style={{ /* background: 'lightslategray', */ }}>
                <Col>
                  <Button
                    type="primary"
                    size="large"
                    href={resume}
                    download
                    target="_blank"
                    block
                    style={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                    }}
                  >
                    Download Resume
                  </Button>
                </Col>
              </Row>

              <Row justify="center" style={{ /* background: 'lightslategray', */ }}>
                <Col>
                  <Button
                    size="small"
                    type="ghost"
                    href={legacyResume}
                    download
                    target="_blank"
                    block
                  >
                    Legacy Resume
                  </Button>
                </Col>
              </Row>

              {
                numPages > 1
                && (
                <Row justify="center" style={{ /* background: 'lightslategray', */ }}>
                  <Space>
                    <Col>
                      <span>{`Page ${pageNumber} of ${numPages}`}</span>
                    </Col>
                    <Col>
                      <Button type="dashed" size="small" onClick={() => this.pageToggle(pageNumber)}>{pageNumber === 1 ? 'Next Page' : 'Previous Page'}</Button>
                    </Col>
                  </Space>
                </Row>
                )
              }

              <Document
                file={resume}
                onLoadSuccess={this.onDocumentLoadSuccess}
                loading={loader}
                className="pb-2"
              >
                <Page
                  pageNumber={pageNumber}
                  scale={pageScale}
                  loading={loader}
                  renderAnnotationLayer={false} // causes weird space below the pdf
                />
              </Document>

            </Space>
          </Col>
        </Row>
      </>
    );
  }
}
