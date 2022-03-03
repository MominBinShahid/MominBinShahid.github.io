import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { fetchRandomQuotes } from '../../../utils/api';
import { goToLink } from '../../../utils/common';

import styles from './quote.module.less';

const Quote = () => {
  const [quotes, setQuotes] = useState(null);

  useEffect(() => {
    // Reason of doing this instead of using async function in useEffect is here - https://reactjs.org/docs/hooks-faq.html#how-can-i-do-data-fetching-with-hooks
    // Article - https://www.robinwieruch.de/react-hooks-fetch-data/
    const fetchData = async () => {
      const data = await fetchRandomQuotes();
      setQuotes(data);
    };
    fetchData();
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
