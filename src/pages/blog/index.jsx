import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import {
  Layout, Row, Col, Empty,
} from 'antd';
import Header from '../../components/PageLayout/Header';

import SidebarWrapper from '../../components/PageLayout/Sidebar';
import PostCard from '../../components/PostCard';
import SEO from '../../components/Seo';

const Blog = ({ data }) => {
  const blogs = data.allMarkdownRemark.edges.filter(({ node }) => node.frontmatter.published);

  const content = !blogs.length
    ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    : (
      <Row gutter={[20, 20]}>
        {
          blogs.map((val) => (
            <Col key={val.node.frontmatter.path} xs={24} sm={24} md={12} lg={8}>
              <PostCard data={val} />
            </Col>
          ))
        }
      </Row>
    );

  return (
    <Layout className="outerPadding">
      <Layout className="container">
        <Header />
        <SEO
          title="Blog"
          description="I like blogging about various web technologies and other stuff related to
          javascript and other trends like software engineering in general and tech stacks, .etc.
          This blog expresses my views of various technologies and scenarios I have come across in realtime."
          path="blog"
        />
        <SidebarWrapper>
          <div className="marginTopTitle">
            <h1 className="titleSeparate">Blog</h1>
          </div>
          { content }
        </SidebarWrapper>
      </Layout>
    </Layout>
  );
};

Blog.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/index.md$/" } }
    ) {
      edges {
        node {
          frontmatter {
            published
            date
            path
            title
            tags
            excerpt
            cover {
              childImageSharp {
                fluid(maxWidth: 288) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Blog;
