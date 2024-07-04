import React, { useReducer, useEffect } from 'react';
import { Button, Spin, Tooltip } from 'antd';
// import { ReloadOutlined } from '@ant-design/icons';
import {
  // fetchRandomQuotes,
  fetchQuoteAPIs, parseQuote,
} from '../../../utils/api';
import { goToLink } from '../../../utils/common';

import styles from './quotes.module.less';

function quotesReducer(quotes, action) {
  switch (action.type) {
    case '👍':
      if (!quotes) return [action.quote];

      return [...quotes, action.quote];
    case '👎': {
      if (!quotes) return quotes;

      const quoteIndexToDelete = quotes.findIndex((quote) => quote.text === action.text);
      if (quoteIndexToDelete === -1) return quotes;

      quotes.splice(quoteIndexToDelete, 1);
      return [...quotes];
    }
    case '❌':
      if (!quotes) return [];

      return quotes;
    case '🗑':
      return [];

    default:
      throw new Error('Use proper action.type for quotesReducer');
  }
}

const useQuotes = (defaultState = null, quoteAPIs = []) => {
  const [quotes, dispatch] = useReducer(quotesReducer, defaultState);

  // const [quotes, setQuotes] = useState(null);
  /**
   * Can not use `useState` here
   * ref: https://reactjs.org/docs/hooks-reference.html#:~:text=when%20the%20next%20state%20depends%20on%20the%20previous%20one
   */

  const fetchQuoteIndependently = () => {
    quoteAPIs.forEach((quoteAPI) => {
      const apiPromise = quoteAPI.api || quoteAPI;
      const parser = quoteAPI.parser || parseQuote;

      apiPromise().then((res) => {
        if (!res || res instanceof Error) return dispatch({ type: '❌', error: res });

        const quote = parser(res);
        return dispatch({ type: '👍', quote });
        // setQuotes(quotes ? [...quotes, quote] : [quote]);
      });
    });
  };

  const getFreshQuotes = () => {
    dispatch({ type: '🗑' });

    // // Reason of doing this instead of using async function in useEffect is here - https://reactjs.org/docs/hooks-faq.html#how-can-i-do-data-fetching-with-hooks
    // // Article - https://www.robinwieruch.de/react-hooks-fetch-data/
    // const fetchData = async () => {
    //   const data = await fetchRandomQuotes();
    //   setQuotes(data);
    // };
    // fetchData();

    fetchQuoteIndependently();
  };

  useEffect(() => {
    getFreshQuotes();
  }, []);

  return [quotes, getFreshQuotes];
};

const Quotes = () => {
  const [quotes, reload] = useQuotes(null, fetchQuoteAPIs);

  if (quotes === null) return <Spin style={{ paddingTop: '6px' }} />;
  if (!quotes.length) return null;

  const goToQuoteLink = (link) => {
    if (!link) return;

    goToLink(link);
  };

  const handleKeyPress = (event, link) => {
    if (event.key !== 'Enter') return;

    goToQuoteLink(link);
  };

  const refresh = (
    <Tooltip title="Reload new quotes">
      <Button type="dashed" size="large" shape="circle" icon="↻" className={styles.reload} onClick={reload} />
    </Tooltip>
  );

  const title = (
    <>
      {quotes.length > 1 ? 'Couple of ' : 'An '}
      Insightful Thought
      {quotes.length > 1 ? 's ' : ' '}
      <emoji>💬</emoji>
    </>
  );

  const quotesJSX = quotes.map((quote) => (
    <div
      key={quote.id || quote.text}
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
        <span className={styles.quote}>
          { quote.text }
        </span>
      </div>
      <div>
        {/* → */}
        —
        <span className={styles.author}>
          { quote.author || 'Anonymous' }
        </span>

        {
          quote.category
            ? (
              <span className={styles.category}>
                (
                { quote.category }
                )
              </span>
            ) : null
        }
      </div>
    </div>
  ));

  return (
    <div className="mt-1">
      <h2 className="titleSeparate">
        {title}
        {refresh}
      </h2>
      { quotesJSX }
    </div>
  );
};
export default Quotes;
