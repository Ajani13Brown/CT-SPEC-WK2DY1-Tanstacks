import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useMutation } from '@tanstack/react-query';

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

  const { mutate: isLoading, isError, error } = useMutation({
    mutationFn: updateApi,
    onSuccess: (data) => {
      console.log(data);
    },
  });

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       if (!updatedPost.id) {
//         alert('Please enter a post ID.');
//         return;
//       }
//       const updatedData = await updateApi(updatedPost);
//       console.log('Post updated successfully:', updatedData);
//       setupdatedPost({ id: '', title: '', body: '', userId: 1 });
//     } catch (error) {
//       console.error('Error updating post:', error);
//     }
//   };

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
          <Button variant="primary" type="submit">
            Update Post
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdatePost;

