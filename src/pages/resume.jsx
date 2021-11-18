import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import {
  Button, Row, Col, Alert, Space, Spin, Tooltip,
} from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ZoomInOutlined, ZoomOutOutlined,
} from '@ant-design/icons';
import SEO from '../components/Seo';
import Config from '../../config';
import DarkModeToggler from '../components/ThemeToggler';
import { isPortableDeviceScreen } from '../utils/common';

const {
  resumeDownloadLink, resumePrintableDownloadLink,
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
          description="My resume consists of my biodata of experience. You can hire me if you feel
          I'm good for any position in your organization. I'm open to various challenges that come
          in the way of building various web applications. - Momin Bin Shahid"
          path="resume"
          keywords={['@MominBinShahid', 'MominBinShahid', 'Momin', 'Bin', 'Shahid', 'Resume', 'CV', 'C.V.']}
        />

        <Row justify="center" className="pt-1">
          <Col>
            <Space direction="vertical" size="middle">

              <Row justify="center" style={{ /* background: 'lightslategray', */ }}>
                <Col>
                  <DarkModeToggler fixBackgroundHTML />
                </Col>
              </Row>

              <Row justify="center" style={{ /* background: 'lightslategray', */ }}>
                <Col>
                  <Alert
                    message="In Preview Mode"
                    type="info"
                    showIcon
                    action={(
                      <Space>
                        {/* style={{ textAlign: 'center' }} */}
                        {/* className="text-center" */}
                        {/* used block style button so, comment centering */}
                        <Button
                          size="small"
                          type="primary"
                          href={resumeDownloadLink}
                          download
                          target="_blank"
                          block
                        >
                          Download
                        </Button>
                        <Button
                          size="small"
                          href={resumePrintableDownloadLink}
                          download
                          target="_blank"
                          block
                        >
                          Printable
                        </Button>
                      </Space>
                    )}
                  />
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

              {
                numPages > 1
                && (
                <Row justify="center" style={{ /* background: 'lightslategray', */ }}>
                  <Space>
                    <Col>
                      <span>{`Page ${pageNumber} of ${numPages}`}</span>
                    </Col>
                    <Col>
                      <Button type="primary" size="small" onClick={() => this.pageToggle(pageNumber)}>{pageNumber === 1 ? 'Next Page' : 'Previous Page'}</Button>
                    </Col>
                  </Space>
                </Row>
                )
              }

              <Document
                file={resumeDownloadLink}
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
