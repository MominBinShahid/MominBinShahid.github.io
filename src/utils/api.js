/* eslint-disable no-console */
const { isBrowser } = require('./common');

const handleError = (reason) => console.error('Can not fetch quote for you right now, try again in a while 😔', { reason }) || reason;

const fetchQuote1 = () => fetch('https://programming-quotes-api.herokuapp.com/quotes/random').then((res) => res.json()).catch((e) => handleError(e));
const fetchQuote2 = () => fetch('https://free-quotes-api.herokuapp.com/').then((res) => res.json()).catch((e) => handleError(e));
const fetchQuote3 = () => fetch('https://quote-generator-21.herokuapp.com/random').then((res) => res.json()).catch((e) => handleError(e));

const fetchQuotesOneByOne = {
  fetchQuote1,
  fetchQuote2,
  fetchQuote3,
};

const parseQuote = (quote) => {
  if (quote.data) {
    // eslint-disable-next-line no-param-reassign
    quote = quote.data;
  }

  const finalQuote = {};

  finalQuote.author = quote.author || 'Anonymous';
  finalQuote.text = quote.quote || quote.en || quote.content;
  finalQuote.link = quote.permalink;
  finalQuote.category = quote.category;

  return finalQuote;
};

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

  const parseQuotesJSON = (fulfilled) => Promise.all(
    fulfilled.map((response) => response.json()),
  );

  const promises = await fetchQuotes();

  const rejected = promises.filter((promise) => promise.status === 'rejected').map((promise) => promise.reason);
  rejected.forEach((reason) => handleError(reason));

  const fulfilled = promises.filter((promise) => promise.status === 'fulfilled').map((promise) => promise.value);
  const parsedData = await parseQuotesJSON(fulfilled);

  const data = parsedData.map((quote) => parseQuote(quote));
  return data;
};

module.exports = {
  fetchRandomQuotes,
  ...fetchQuotesOneByOne,
  parseQuote,
};
