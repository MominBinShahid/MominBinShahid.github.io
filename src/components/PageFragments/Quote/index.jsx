import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { fetchRandomQuotes } from '../../../utils/api';
import { goToLink } from '../../../utils/common';

import styles from './quote.module.less';

const Quote = () => {
  const [quotes, setQuotes] = useState(null);
  const [linkAvailable, setLinkAvailability] = useState(null);

  const findQuoteWithLink = (data) => data.find((quote) => quote.link);

  useEffect(() => {
    // Reason of doing this instead of using async function in useEffect is here - https://reactjs.org/docs/hooks-faq.html#how-can-i-do-data-fetching-with-hooks
    // Article - https://www.robinwieruch.de/react-hooks-fetch-data/
    const fetchData = async () => {
      const data = await fetchRandomQuotes();
      setQuotes(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!quotes || !quotes.length) return;

    const quoteWithLink = findQuoteWithLink(quotes);
    if (quoteWithLink) {
      setLinkAvailability(quoteWithLink.link);
    } else {
      setLinkAvailability(null);
    }
  }, [quotes]);

  const goToQuoteLink = () => {
    if (!linkAvailable) return;

    goToLink(linkAvailable);
  };

  const handleKeyPress = (event) => {
    if (event.key !== 'Enter') return;

    goToQuoteLink(quotes);
  };

  const divProps = {
    onClick: goToQuoteLink,
    onKeyPress: handleKeyPress,
    role: 'button',
    tabIndex: '0',
  };

  if (!quotes) return <Spin style={{ paddingTop: '6px' }} />;
  if (!quotes.length) return null;
  return (
    <div className="mt-1">
      <div
        id="quotes"
        className={`theme-text-color ${styles.container} ${linkAvailable ? 'cursor-pointer' : ''}`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {... (linkAvailable && divProps)}
      >
        <div className={styles.title}>
          {quotes.length > 1 ? 'Couple of ' : 'An '}
          Insightful Quote
          {quotes.length > 1 ? 's ' : ' '}
          <emoji>💬</emoji>
        </div>
        {
          quotes.map((quote) => (
            <div key={quote.text} className={styles.quote}>
              <div>
                { quote.text }
              </div>
              <div className={styles.author}>
                —
                {' '}
                {quote.author}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};
export default Quote;
