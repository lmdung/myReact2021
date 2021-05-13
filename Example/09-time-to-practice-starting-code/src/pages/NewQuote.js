import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm';

const NewQuote = () => {
  const history = useHistory();
  const onAddQuote = (dataAdded) => {
    console.log('data', dataAdded);
    history.push('/quotes')
  }

  return <QuoteForm onAddQuote={onAddQuote}/>
};

export default NewQuote;