import QuoteList from '../components/quotes/QuoteList';

const DUMMY_QUOTES = [
  {id: 'q1', author: 'Dun', text: 'Learning react is very funnnnnnnnnn !'},
  {id: 'q2', author: 'MinDun', text: 'Learning react is very funnnnnnnnnn !'}
]
const AllQuotes = () => {
  return <QuoteList quotes={DUMMY_QUOTES}/>
};

export default AllQuotes;