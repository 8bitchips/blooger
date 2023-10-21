import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import createPost from '@wasp/actions/createPost';

export function NewPostPage() {
  const createPostFn = useAction(createPost);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = () => {
    createPostFn({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>New Post</h2>

      <div className='mb-4'>
        <label htmlFor='title' className='block text-lg mb-2'>Title:</label>
        <input
          type='text'
          id='title'
          className='border rounded px-2 py-1'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='content' className='block text-lg mb-2'>Content:</label>
        <textarea
          id='content'
          className='border rounded px-2 py-1 h-32'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleCreatePost}
      >
        Create
      </button>
      <Link to='/' className='text-blue-500 hover:underline'>Go back</Link>
    </div>
  );
}