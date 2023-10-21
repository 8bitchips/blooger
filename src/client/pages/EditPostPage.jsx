import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPost from '@wasp/queries/getPost';
import editPost from '@wasp/actions/editPost';
import createComment from '@wasp/actions/createComment';
import getComments from '@wasp/queries/getComments';

export function EditPostPage() {
  const { postId } = useParams();
  const { data: post, isLoading, error } = useQuery(getPost, { id: postId });
  const editPostFn = useAction(editPost);
  const createCommentFn = useAction(createComment);
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useQuery(getComments, { postId: postId });
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [newComment, setNewComment] = useState('');

  if (isLoading || commentsLoading) return 'Loading...';
  if (error || commentsError) return 'Error: ' + (error || commentsError);

  const handleEditPost = () => {
    editPostFn({ id: postId, title, content });
  };

  const handleCreateComment = () => {
    createCommentFn({ postId: postId, content: newComment });
    setNewComment('');
  };

  return (
    <div className='p-4'>
      <form onSubmit={handleEditPost}>
        <div>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='content'>Content:</label>
          <textarea
            id='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type='submit'>Save</button>
      </form>

      <div className='mt-4'>
        <h2 className='text-xl font-bold'>Comments</h2>
        {comments.map((comment) => (
          <div key={comment.id} className='bg-gray-100 p-4 mt-2 rounded-lg'>
            <p>{comment.content}</p>
          </div>
        ))}
        {comments.length === 0 && <p>No comments yet</p>}
        <form onSubmit={handleCreateComment} className='mt-4'>
          <textarea
            rows='3'
            className='w-full border p-2 rounded'
            placeholder='Write a comment...'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
          >
            Add Comment
          </button>
        </form>
      </div>

      <div className='mt-4'>
        <Link to={`/post/${postId}`} className='text-blue-500'>View post</Link>
      </div>
    </div>
  );
}