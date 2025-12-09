// [lists are from https://www.jsonapi.co/public-api/Quotable%20Quotes]
// Below are token free api (but we can try https://rapidapi.com/collection/quote-generator-apis)

// credits :: refs (API url -> credit site)
// https://api.quotable.io/quotes/random → https://github.com/lukePeavey/quotable
// https://dummyjson.com/quotes/random → https://dummyjson.com/docs/quotes
// https://favqs.com/api/qotd → https://favqs.com/api
// https://api.themotivate365.com/stoic-quote → https://github.com/tlcheah2/stoic-quote-lambda-public-api
// https://www.affirmations.dev/ → https://www.affirmations.dev/
// https://api.adviceslip.com/advice -> https://api.adviceslip.com/

const motivationalSparkAPI = [
  'https://motivational-spark-api.vercel.app/api/quotes/random',
  (quote) => {
    const { quote: text, author } = quote;
    return { text, author };
  },
];

// NOTE: zenquotes.io doesn't support CORS - can't be used directly from browser
// eslint-disable-next-line no-unused-vars
const zenquotesAPI = [
  'https://zenquotes.io/api/random',
  (quote) => {
    const { q: text, a: author, h: hypertext } = quote;

    console.log(hypertext);

    return { text, author };
  },
];

// eslint-disable-next-line no-unused-vars
const quotableAPI = [
  'https://api.quotable.io/quotes/random',
  (quote) => {
    const {
      _id: id, author, content: text, tags,
    } = quote && quote[0];
    const category = tags.join(', ');
    return {
      id,
      author,
      text,
      category,
    };
  },
];

const dummyJsonAPI = [
  'https://dummyjson.com/quotes/random',
  (quote) => {
    const { id, author, quote: text } = quote;
    return { id, author, text };
  },
];

// FIXME: CORS issue
// eslint-disable-next-line no-unused-vars
const favqsAPI = [
  'https://favqs.com/api/qotd',
  (quote) => {
    const {
      quote: {
        author, body: text, id, tags, url: link,
      },
    } = quote;
    const category = tags.join(', ');
    return {
      id,
      author,
      text,
      category,
      link,
    };
  },
  // {
  //   mode: 'no-cors',
  // },
];

// FIXME: CORS issue
// eslint-disable-next-line no-unused-vars
const stoicAPI = [
  'https://api.themotivate365.com/stoic-quote',
  (quote) => {
    const { quote: text, author } = quote;
    const category = 'Stoic';
    return { author, text, category };
  },
];

// FIXME: CORS issue
// eslint-disable-next-line no-unused-vars
const affirmationAPI = [
  'https://www.affirmations.dev/',
  (quote) => {
    const { affirmation: text } = quote;
    return { text };
  },
];

const adviceSlipAPI = [
  'https://api.adviceslip.com/advice',
  (quote) => {
    const {
      slip: { advice: text, id },
    } = quote;
    const category = 'Advice';
    return { id, text, category };
  },
];

module.exports = [
  motivationalSparkAPI,
  // zenquotesAPI,
  // quotableAPI,
  dummyJsonAPI,
  // favqsAPI,
  // stoicAPI,
  // affirmationAPI,
  adviceSlipAPI,
];
