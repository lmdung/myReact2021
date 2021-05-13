import { Fragment } from 'react';
import { useParams, Route } from 'react-router-dom';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const DUMMY_QUOTES = [
  {id: 'q1', author: 'Dun', text: 'Learning react is very fun !'},
  {id: 'q2', author: 'MinDun', text: 'Learning react is very fun !'}
]

const QuoteDetail = () => {
  const params = useParams();
  const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

  return <Fragment>
    {!quote && <p>Quote not found!</p>}
    {quote && <HighlightedQuote text={quote.text} author={quote.author}/>}
    <Route path={`/quotes/${params.quoteId}/comments`} exact>
      <Comments />
    </Route>
  </Fragment> 
};

export default QuoteDetail;