/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  Layout, Row, Col, Empty,
} from 'antd';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Header from '../../components/PageLayout/Header';
import SEO from '../../components/Seo';
import SidebarWrapper from '../../components/PageLayout/Sidebar';
import TagCard from '../../components/TagCard';
import Config from '../../../config';

const Tags = ({ data }) => {
  const { allFile: { edges } } = data;
  const imgEdgesMap = edges.reduce((acc, val) => ({ ...acc, [val.node.name]: val }), {});

  const rawTags = data.allMarkdownRemark.edges
    .filter(({ node }) => node.frontmatter.published)
    .map((edge) => edge.node.frontmatter.tags)
    .reduce((prev, curr) => prev.concat(curr), [])
    .filter((tag, index, array) => index === array.indexOf(tag))
    .sort();

  // const tagPage = Config.pages.tag.path;
  const tagData = Config.tags;

  // Kept for reference
  // const content = edges.map((val) => (
  //   <Col key={val.node.name} xs={24} sm={24} md={12} lg={8}>
  //     <TagCard
  //       img={val.node.childImageSharp.fluid.src}
  //       name={val.node.name}
  //       description={tagData[val.node.name].description}
  //       color={tagData[val.node.name].color}
  //     />
  //   </Col>
  // ));

  const content = !rawTags.length
    ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    : (
      <Row gutter={[30, 20]}>
        {
          rawTags.map((tag) => (
            <Col key={imgEdgesMap[tag].node.name} xs={24} sm={24} md={12} lg={8}>
              <TagCard
                img={imgEdgesMap[tag].node.childImageSharp.fluid.src}
                name={imgEdgesMap[tag].node.name}
                description={tagData[imgEdgesMap[tag].node.name].description}
                color={tagData[imgEdgesMap[tag].node.name].color}
              />
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
          title="Tags"
          description="This page consists of various Tags on various technologies that I'll be using
          to write blogs. You can check the blogs related to the tags by clicking on any of the tags below."
          path="tags"
        />
        <SidebarWrapper>
          <>
            <div className="marginTopTitle">
              <h1 className="titleSeparate">#Tags</h1>
            </div>
            { content }
          </>
        </SidebarWrapper>
      </Layout>
    </Layout>
  );
};

Tags.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
    allFile: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string.isRequired,
            childImageSharp: PropTypes.shape({
              fluid: PropTypes.object.isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/index.md$/" } }) {
      edges {
        node {
          frontmatter {
            published
            tags
          }
        }
      }
    }
    allFile(filter: { relativeDirectory: { eq: "tags" } }) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;

export default Tags;
