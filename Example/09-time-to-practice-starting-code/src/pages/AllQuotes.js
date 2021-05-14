import { useEffect } from 'react';

import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';

import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

// const DUMMY_QUOTES = [
//   {id: 'q1', author: 'Dun', text: 'Learning react is very boring !'},
//   {id: 'q2', author: 'MinDun', text: 'Learning react is very funnnnnnnnnn !'}
// ]
const AllQuotes = () => {
  const { sendRequest, status, data: quotesList, error } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return <div className="centered focused">
      <LoadingSpinner />
    </div>
  }

  if (error) {
    return <div className="centered focused">{error}</div>
  }

  if (status === 'completed' && (!quotesList || quotesList.length === 0)) {
    return <NoQuotesFound />
  }
  
  return <QuoteList quotes={quotesList}/>
};

export default AllQuotes;