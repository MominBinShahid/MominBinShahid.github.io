import React from 'react';
import { Layout } from 'antd';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Header from '../../components/PageLayout/Header';
import SidebarWrapper from '../../components/PageLayout/Sidebar';
import SEO from '../../components/Seo';
import Comment from '../../components/Comment';
import Config from '../../../config';
import Utils from '../../utils/pageUtils';
import { removeTagsFromBlogContent } from '../../utils/stripTags';

import 'prismjs/themes/prism-solarizedlight.css';
import './highlight-syntax.less';
import style from './post.module.less';

const { keywords } = Config;

const Post = ({ data }) => {
  const { html, frontmatter } = data.markdownRemark;
  const {
    title, cover: { childImageSharp: { fluid } }, excerpt, path,
  } = frontmatter;

  const canonicalUrl = Utils.resolvePageUrl(
    Config.siteUrl,
    Config.pathPrefix,
    path,
  );
  return (
    <Layout className="outerPadding">
      <Layout className="container">
        <SEO
          title={removeTagsFromBlogContent(title)}
          description={removeTagsFromBlogContent(excerpt)}
          path={path}
          keywords={['Momin Blog', 'Momin Bin Shahid Blog', "Momin's Blog", "Momin Bin Shahid's Blog", 'Momin writes', 'Momin Bin Shahid writes', ...keywords]}
        />
        <Header />
        <SidebarWrapper>
          <div className="marginTopTitle">
            <h1 dangerouslySetInnerHTML={{ __html: title }} />
            <div className={style.bannerImgContainer}>
              <Img
                className={style.bannerImg}
                fluid={fluid}
                title={removeTagsFromBlogContent(excerpt)}
                alt={removeTagsFromBlogContent(title)}
              />
            </div>
            <article className={style.blogArticle} dangerouslySetInnerHTML={{ __html: html }} />
            {
              Config.disqusScript
              && (
                <Comment
                  pageCanonicalUrl={canonicalUrl}
                  pageId={removeTagsFromBlogContent(title)}
                />
              )
            }
          </div>
        </SidebarWrapper>
      </Layout>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($postPath: String!) {
    markdownRemark(frontmatter: { path: { eq: $postPath } }) {
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        tags
        path
        excerpt
        cover {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { path: { ne: $postPath } }
        fileAbsolutePath: { regex: "/index.md$/" }
      }
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            tags
            excerpt
            cover {
              childImageSharp {
                fluid(maxWidth: 600) {
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

export default Post;
