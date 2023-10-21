import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import createComment from '@wasp/actions/createComment';
import getPost from '@wasp/queries/getPost';
import getComments from '@wasp/queries/getComments';

export function ViewPostPage() {
  const { postId } = useParams();
  const { data: post, isLoading: postIsLoading, error: postError } = useQuery(getPost, { id: parseInt(postId) });
  const { data: comments, isLoading: commentsIsLoading, error: commentsError } = useQuery(getComments, { postId: parseInt(postId) });
  const createCommentFn = useAction(createComment);
  const [newCommentContent, setNewCommentContent] = useState('');

  if (postIsLoading || commentsIsLoading) return 'Loading...';
  if (postError || commentsError) return 'Error: ' + (postError || commentsError);

  const handleCreateComment = () => {
    createCommentFn({ postId: parseInt(postId), content: newCommentContent });
    setNewCommentContent('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
      <p className='text-gray-500 mb-4'>Author: {post.user.username}</p>
      <p>{post.content}</p>

      <hr className='my-4' />

      <h2 className='text-xl font-bold mb-4'>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className='mb-4'>
          <p>{comment.content}</p>
          <p className='text-gray-500'>Author: {comment.user.username}</p>
        </div>
      ))}

      <hr className='my-4' />

      {user && (
        <div className='mb-4'>
          <h2 className='text-xl font-bold mb-2'>New Comment</h2>
          <textarea
            className='border border-gray-300 rounded p-2 mb-2 w-full'
            placeholder='Enter your comment'
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
          ></textarea>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleCreateComment}
          >
            Add Comment
          </button>
        </div>
      )}
    </div>
  );
}