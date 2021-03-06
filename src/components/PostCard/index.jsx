import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import Utils from '../../utils/pageUtils';
import style from './postCard.module.less';

const PostCard = (props) => {
  const { data: { node: { frontmatter } } } = props;

  return (
    <div className={style.postCard}>
      <Link to={Utils.resolvePageUrl(frontmatter.path)}>
        <div
          className={style.postCardImg}
          style={{
            backgroundImage: `url(${frontmatter ? frontmatter.cover.childImageSharp.fluid.src : ''})`,
          }}
        />
        <div className={style.mrTp20}>
          <p>
            <span className={style.dateHolder}>{frontmatter ? moment(frontmatter.date).format('MMM Do YYYY') : ''}</span>
          </p>
          <h3 dangerouslySetInnerHTML={{ __html: frontmatter.title }} />
          <p dangerouslySetInnerHTML={{ __html: frontmatter.excerpt }} />
          <p style={{ color: '#ce6d96', wordSpacing: '10px' }}>
            {
                `#${frontmatter.tags.join(' #')}`
            }
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
