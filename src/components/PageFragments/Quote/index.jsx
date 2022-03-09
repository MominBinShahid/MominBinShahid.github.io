import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import {
  // fetchRandomQuotes,
  fetchQuote1, fetchQuote2, fetchQuote3, parseQuote,
} from '../../../utils/api';
import { goToLink } from '../../../utils/common';

import styles from './quote.module.less';

const Quote = () => {
  // const [quotes, setQuotes] = useState(null);

  let quotes = null;
  const [quote1, setQuote1] = useState(null);
  const [quote2, setQuote2] = useState(null);
  const [quote3, setQuote3] = useState(null);
  if (quote1) quotes = quotes ? [...quotes, quote1] : [quote1];
  if (quote2) quotes = quotes ? [...quotes, quote2] : [quote2];
  if (quote3) quotes = quotes ? [...quotes, quote3] : [quote3];

  const fetchQuoteIndependently = () => {
    fetchQuote1().then((res) => {
      if (!res) return;

      const quote = parseQuote(res);
      setQuote1(quote);
    });

    fetchQuote2().then((res) => {
      if (!res) return;

      const quote = parseQuote(res);
      setQuote2(quote);
    });

    fetchQuote3().then((res) => {
      if (!res) return;

      const quote = parseQuote(res);
      setQuote3(quote);
    });
  };

  useEffect(() => {
    // // Reason of doing this instead of using async function in useEffect is here - https://reactjs.org/docs/hooks-faq.html#how-can-i-do-data-fetching-with-hooks
    // // Article - https://www.robinwieruch.de/react-hooks-fetch-data/
    // const fetchData = async () => {
    //   const data = await fetchRandomQuotes();
    //   setQuotes(data);
    // };
    // fetchData();

    fetchQuoteIndependently();
  }, []);

  if (!quotes) return <Spin style={{ paddingTop: '6px' }} />;
  if (!quotes.length) return null;

  const goToQuoteLink = (link) => {
    if (!link) return;

    goToLink(link);
  };

  const handleKeyPress = (event, link) => {
    if (event.key !== 'Enter') return;

    goToQuoteLink(link);
  };

  const title = (
    <>
      {quotes.length > 1 ? 'Couple of ' : 'An '}
      Insightful Quote
      {quotes.length > 1 ? 's ' : ' '}
      <emoji>💬</emoji>
    </>
  );

  return (
    <div className="mt-1">

      <h2 id="quotes" className="titleSeparate">{title}</h2>
      {
        quotes.map((quote) => (

          <div
            key={quote.text}
            className={`theme-text-color mt-0_5 ${styles.container} ${quote.link ? 'cursor-pointer' : ''}`}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {... (quote.link && {
              onClick: () => goToQuoteLink(quote.link),
              onKeyPress: (event) => handleKeyPress(event, quote.link),
              role: 'button',
              tabIndex: '0',
            })}
          >
            {/* <div className={styles.title}>
              { title }
            </div> */}

            <div>
              { quote.text }
            </div>
            <div>
              —&nbsp;
              <span className={styles.author}>
                {quote.author}
              </span>

              {
                quote.category
                  ? (
                    <span className={styles.category}>
                      &nbsp;(#
                      {quote.category}
                      )
                    </span>
                  ) : null
              }
            </div>
          </div>
        ))
      }

    </div>
  );
};
export default Quote;