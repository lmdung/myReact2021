import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

import QuoteForm from '../components/quotes/QuoteForm';

const NewQuote = () => {
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);
  const onAddQuote = (dataAdded) => {
    sendRequest(dataAdded);
  }
  useEffect(() => {
    if (status === 'completed') {
      history.push('/quotes')
    }
  }, [history, status])
  return <QuoteForm isLoading={status === 'pending'} onAddQuote={onAddQuote}/>
};

export default NewQuote;