/* eslint-disable no-console */
const { isBrowser } = require('./common');

// http://quotes.stormconsultancy.co.uk/
const stormConsultancyQuoteAPI = 'https://quotes.stormconsultancy.co.uk/random.json';
// https://programming-quotes-api.herokuapp.com/
const programmingQuotesAPI = 'https://programming-quotes-api.herokuapp.com/quotes/random';

const fetchRandomQuoteFromStormConsultancyQuoteAPI = async () => {
  if (!isBrowser) return null;

  let quote = null;
  try {
    const api = await fetch(stormConsultancyQuoteAPI);
    const json = await api.json();

    const parsedQuote = {};
    parsedQuote.author = json.author;
    parsedQuote.text = json.quote;
    parsedQuote.link = json.permalink;

    quote = parsedQuote;
  } catch (error) {
    console.error('Can not fetch Quote for you from http://quotes.stormconsultancy.co.uk/, try in some time 😔');
  }

  return quote;
};

const fetchRandomQuoteFromProgrammingQuotesAPI = async () => {
  if (!isBrowser) return null;

  let quote = null;
  try {
    const api = await fetch(programmingQuotesAPI);
    const json = await api.json();

    const parsedQuote = {};
    parsedQuote.author = json.author;
    parsedQuote.text = json.en;
    parsedQuote.link = null;

    quote = parsedQuote;
  } catch (error) {
    console.error('Can not fetch Quote for you from https://programming-quotes-api.herokuapp.com/ , try in some time 😔');
  }

  return quote;
};

const fetchRandomQuotes = async () => {
  const fetchQuotes = () => Promise.allSettled(
    [fetch(stormConsultancyQuoteAPI), fetch(programmingQuotesAPI)],
  );

  const parseQuotes = (fulfilled) => Promise.all(
    fulfilled.map((response) => response.json()),
  );

  const promises = await fetchQuotes();

  const rejected = promises.filter((promise) => promise.status === 'rejected').map((promise) => promise.reason);
  rejected.forEach((reason) => {
    console.error('Can not fetch Quote for you, try in some time 😔', { reason });
  });

  const fulfilled = promises.filter((promise) => promise.status === 'fulfilled').map((promise) => promise.value);
  const parsedData = await parseQuotes(fulfilled);
  const data = parsedData.map((quote) => {
    const res = {};
    res.author = quote.author;
    res.text = quote.quote || quote.en;
    res.link = quote.permalink;
    return res;
  });

  return data;
};

module.exports = {
  fetchRandomQuoteFromStormConsultancyQuoteAPI,
  fetchRandomQuoteFromProgrammingQuotesAPI,
  fetchRandomQuotes,
};
