export const stripTags = (ipStr) => {
  let str = ipStr;
  if ((str === null) || (str === '')) {
    return false;
  }

  str = str.toString();

  return str.replace(/(<([^>]+)>)/ig, '');
};

export const domHtml = (str) => ({ __html: str });

export const removeTagsFromBlogContent = (content) => {
  if (!content) return '';

  // eslint-disable-next-line no-console
  if (typeof content !== 'string') return console.error('Error Occurred: for function: removeTagsFromBlogContent only string is supported');

  const removeEmojiTagsRegex = /<emoji>|<\/emoji>/ig;
  const cleansedString = content.replace(removeEmojiTagsRegex, '');
  return cleansedString;
};
