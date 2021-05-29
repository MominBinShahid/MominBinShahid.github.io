import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import {
  Button, Row, Col, Alert, Space, Spin,
} from 'antd';
import SEO from '../components/Seo';
import Config from '../../config';
import DarkModeToggler from '../components/ThemeToggler';

const {
  resumeDownloadLink, resumePrintableDownloadLink,
} = Config;

export default class Resume extends Component {
  constructor() {
    super();
    this.state = {
      numPages: null,
      pageNumber: 1,
    };
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
  }

  onDocumentLoadSuccess({ numPages }) {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;
    const pageToggle = () => {
      if (pageNumber === 1) {
        this.setState({ pageNumber: 2 });
      } else {
        this.setState({ pageNumber: 1 });
      }
      return 1;
    };

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
                  <DarkModeToggler />
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
                          type="dashed"
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

              {
                numPages > 1
                && (
                <Row justify="center" style={{ /* background: 'lightslategray', */ }}>
                  <Space>
                    <Col>
                      <span>{`Page ${pageNumber} of ${numPages}`}</span>
                    </Col>
                    <Col>
                      <Button type="primary" size="small" onClick={pageToggle}>{pageNumber === 1 ? 'Next Page' : 'Previous Page'}</Button>
                    </Col>
                  </Space>
                </Row>
                )
              }

              <Document
                file={resumeDownloadLink}
                onLoadSuccess={this.onDocumentLoadSuccess}
                loading={loader}
              >
                <Page
                  pageNumber={pageNumber}
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
