import { Fragment, useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  const { quoteId } = params;
  // console.log(params)
  const { sendRequest, status, data: quote, error} = useHttp(getSingleQuote, true);
  
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId])
  if (status === 'pending') {
    return <div className="centered focused">
      <LoadingSpinner />
    </div>
  }
  if (error) {
    return <div className="centered focused">{error}</div>
  }
  if (!quote) {
    return <p>No quote found !</p>
  }
  return <Fragment>
    {!quote && <p>Quote not found!</p>}
    {quote && <HighlightedQuote text={quote.text} author={quote.author}/>}
    <Route path={match.path} exact>
      <div className="centered">
        <Link className="btn--flat" to={`${match.url}/comments`} >
          Load comments
        </Link>
      </div>
    </Route>
    <Route path={`${match.path}/comments`} exact>
      <Comments />
    </Route>
  </Fragment> 
};

export default QuoteDetail;