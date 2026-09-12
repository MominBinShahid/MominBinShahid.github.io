import React, { useEffect } from 'react';
import { Layout, Image } from 'antd';
import { Link, graphql } from 'gatsby';
import Header from '../../components/PageLayout/Header';
import { Sidebar404 } from '../../components/PageLayout/Sidebar';
import style from './404.module.less';

/**
 * GitHub Pages serves a project site at its repository's EXACT case, so
 * /mealunits/ never reaches that app at all — it falls through to this user
 * site and lands here. The page is genuinely missing, but the URL is only
 * wrong in shape, and a 404 is the wrong answer to a typing difference.
 *
 * Listed rather than guessed: only a path whose first segment case-insensitively
 * matches a real project is rewritten, so every other 404 still renders as one.
 */
const PROJECTS = ['MealUnits'];

/**
 * The correctly-cased path, or null when there is nothing to correct — which
 * includes the case already being right. Returning null there is what stops a
 * redirect loop.
 */
export function canonicalProjectPath(pathname) {
  const segments = pathname.split('/');
  const first = segments[1];
  if (!first) return null;
  const project = PROJECTS.find((name) => name.toLowerCase() === first.toLowerCase());
  if (!project || project === first) return null;
  segments[1] = project;
  return segments.join('/');
}

export const query = graphql`
  {
    file(base: { eq: "404.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;

export default ({ data }) => {
  useEffect(() => {
    // Guarded because Gatsby renders this at build time, where there is no window.
    if (typeof window === 'undefined') return;
    const target = canonicalProjectPath(window.location.pathname);
    if (target === null) return;
    // replace() rather than assign(): the broken URL should not sit in history
    // for the Back button to return to.
    window.location.replace(target + window.location.search + window.location.hash);
  }, []);

  return (
  <Layout className="outerPadding">
    <Layout className="container">
      <Header />
      <Sidebar404>
        <>
          <div className={`${style.sidebar404Img} ${style.boxContent}`}>
            <Image
              src={data.file.childImageSharp.fluid.src}
              width="100%"
              alt="404"
            />
          </div>
          <div className={`textCenter ${style.boxContent}`}>
            <h1>
              Page not found
              {' '}
              <emoji>😔</emoji>
            </h1>
            <h4>
              The page you are looking for isn’t available. Try to search again or use
              the ‘Go Back’ button below.
            </h4>
            <Link to="/">
              <div className={`centerAlign ${style.textHover}`}>
                <div className={`${style.goBackBtn}`}>
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z" /></svg>
                </div>
                <span>Go Back</span>
              </div>
            </Link>
          </div>
        </>
      </Sidebar404>
    </Layout>
  </Layout>
  );
};
