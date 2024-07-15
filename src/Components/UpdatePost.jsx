import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useMutation } from 'react-query';

const updateApi = async (updatedPost) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, updatedPost);
  return response.data;
};

const UpdatePost = () => {
  const [updatedPost, setupdatedPost] = useState({
    id: '',
    title: '',
    body: '',
    userId: 1,
  });

  const { mutate, isLoading, isError, error } = useMutation(updateApi, {
    onSuccess: (data) => {
      console.log('Post updated successfully:', data);
      setupdatedPost({ id: '', title: '', body: '', userId: 1 });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!updatedPost.id) {
      alert('Please enter a post ID.');
      return;
    }
    mutate(updatedPost);
  };

  return (
    <>
      <h1>Update Post</h1>
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formPostId">
            <Form.Label>Post ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Post ID"
              value={updatedPost.id}
              onChange={(event) => setupdatedPost({ ...updatedPost, id: event.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPostTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Post Title"
              value={updatedPost.title}
              onChange={(event) => setupdatedPost({ ...updatedPost, title: event.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPostBody">
            <Form.Label>Post Body</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Post Body"
              value={updatedPost.body}
              onChange={(event) => setupdatedPost({ ...updatedPost, body: event.target.value })}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Post'}
          </Button>
          {isError && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </Form>
      </div>
    </>
  );
};

export default UpdatePost;