import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const createPost = async (newPost) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
  return response.data;
};

const AddPost = () => {
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
    userId: 1,
  });

  const { mutate: isLoading, isError, error } = useMutation({
    mutationFn: AddPost,
    onSuccess: (data) => {
      console.log(data);
    },
  });

//   const { mutate, isLoading, isError, error, } = useMutation(createPost, {
//     onSuccess: () => {
//       console.log('Post created successfully');
//       setNewPost({ title: '', body: '', userId: 1 });
//     },
//     onError: (error) => {
//       console.error('Error creating post:', error);
//     },
//   });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(newPost);
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
          <Button variant="primary" type="submit">
            Create Post
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddPost;

