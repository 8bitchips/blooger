import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getPosts from '@wasp/queries/getPosts';

export function HomePage() {
  const { data: posts, isLoading, error } = useQuery(getPosts);
  const [newComment, setNewComment] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateComment = () => {
    // TODO: Implement createComment action
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className='mb-4'>
          <Link to={`/post/${post.id}`} className='text-blue-500 hover:underline'>
            <h2 className='text-xl font-bold'>{post.title}</h2>
          </Link>
          <p className='text-gray-500'>by {post.user.username}</p>
        </div>
      ))}
      <Link to='/new-post'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>New post</button>
      </Link>
      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Comments</h2>
        {/* TODO: Implement comments rendering */}
        <div className='mb-4'>
          <textarea
            className='border rounded w-full p-2'
            placeholder='Write a comment...'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
            onClick={handleCreateComment}
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}