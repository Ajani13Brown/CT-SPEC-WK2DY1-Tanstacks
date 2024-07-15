import React from 'react';
import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const fetchPosts = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
};

const deletePost = async (postId) => {
  const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return response.data;
};

const GetPost = () => {
  const { data: posts, isLoading, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const { mutate: removePost, isLoading: isRemoving } = useMutation(deletePost, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you wish to delete this post?')) {
      removePost(id);
      console.log('Post has been deleted')
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {posts.map((post, index) => (
        <Card key={index} style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
            <Button onClick={() => handleDelete(post.id)} variant="primary" disabled={isRemoving}>
              {isRemoving ? 'Removing...' : 'Remove Post'}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default GetPost;