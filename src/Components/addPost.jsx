import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const createPost = async (newPost) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
  console.log(response.data)
  return response.data;
};

const AddPost = () => {
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
    userId: 1,
  });

  const mutation = useMutation(createPost);

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(newPost);
  };

  return (
    <>
      <h1>Add Post</h1>
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formPostTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Post Title"
              value={newPost.title}
              onChange={(event) => setNewPost({ ...newPost, title: event.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPostBody">
            <Form.Label>Post</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="What is your post?"
              value={newPost.body}
              onChange={(event) => setNewPost({ ...newPost, body: event.target.value })}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Creating...' : 'Create Post'}
          </Button>
          {mutation.isError && <p style={{ color: 'red' }}>Error: {mutation.error.message}</p>}
        </Form>
      </div>
    </>
  );
};

export default AddPost;







