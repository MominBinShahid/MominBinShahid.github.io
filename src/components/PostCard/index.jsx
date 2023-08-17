import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import Utils from '../../utils/pageUtils';
import style from './postCard.module.less';
import { useEmojiTag } from '../../utils/stripTags';

const PostCard = (props) => {
  const { data: { node: { frontmatter } } } = props;
  const reTitle = useEmojiTag(frontmatter.title);
  const reExcerpt = useEmojiTag(frontmatter.excerpt);

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
          <h3 dangerouslySetInnerHTML={{ __html: reTitle }} />
          <p dangerouslySetInnerHTML={{ __html: reExcerpt }} />
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
