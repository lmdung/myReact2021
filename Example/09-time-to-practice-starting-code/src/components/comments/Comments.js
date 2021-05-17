import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';
const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const { sendRequest, status, data: listComments } = useHttp(getAllComments, true);

  const { quoteId } = params;
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const onAddedCommentHandle = useCallback(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  useEffect(() => {
    console.log('useE')
    sendRequest(quoteId)
  },[quoteId, sendRequest])

  let comments;
  if (status === 'pending') {
    comments = <div className="centered">
      <LoadingSpinner />
    </div>
  }

  if (status === 'completed' && listComments && listComments.length > 0) {
    comments = <CommentsList comments={listComments} />
  }

  if (status === 'completed' && (!listComments || listComments.length === 0)) {
    comments = <p className="centered">No comments were added yet !</p>
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={params.quoteId} onAddedComment={onAddedCommentHandle}/>}
      {comments}
    </section>
  );
};

export default Comments;
