/* eslint-disable no-console */
const { isBrowser } = require('./common');

const fetchRandomQuotes = async () => {
  if (!isBrowser) return [];

  const fetchQuotes = () => Promise.allSettled(
    [
      fetch('https://programming-quotes-api.herokuapp.com/quotes/random'),
      fetch('https://free-quotes-api.herokuapp.com/'),
      fetch('https://quote-generator-21.herokuapp.com/random'),
      // fetch('http://quotes.stormconsultancy.co.uk/random.json'),
    ],
  );

  const parseQuotes = (fulfilled) => Promise.all(
    fulfilled.map((response) => response.json()),
  );

  const promises = await fetchQuotes();

  const rejected = promises.filter((promise) => promise.status === 'rejected').map((promise) => promise.reason);
  rejected.forEach((reason) => {
    console.error('Can not fetch quote for you right now, try again in a while 😔', { reason });
  });

  const fulfilled = promises.filter((promise) => promise.status === 'fulfilled').map((promise) => promise.value);
  const parsedData = await parseQuotes(fulfilled);

  const data = parsedData.map((quote) => {
    if (quote.data) {
      // eslint-disable-next-line no-param-reassign
      quote = quote.data;
    }

    const res = {};

    res.author = quote.author || 'Anonymous';
    res.text = quote.quote || quote.en || quote.content;
    res.link = quote.permalink;
    res.category = quote.category;

    return res;
  });

  return data;
};

module.exports = {
  fetchRandomQuotes,
};
