import React from 'react'
import axios from "axios"
import { useQuery, useMutation } from '@tanstack/react-query'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const fetchPosts = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
    return response.data
};

const deletePost = async postId => {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return response.data;
};

const GetPost = () => {

    const {data: posts, isLoading, error, refetch} = useQuery({
        queryKey: ['posts'], queryFn:fetchPosts
    })

    // const removePost = useMutation(deletePost, {
    //     onSuccess: () => {                        Isolate error to this code block Dom displays correctly when this code is 
    //         refetch();
    //     }
    // });
    

const handleDelete = id =>{
    if(window.confirm('are you sure you wish to delet this post')) {
        removePost.mutate(id)
    }
}

        if (isLoading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
        {posts.map((post, index)=>(
             <Card key={index} style={{ width: '18rem' }}>
             <Card.Body>
               <Card.Title>{post.title}</Card.Title>
               <Card.Text>
                 {post.body}
               </Card.Text>
               <Button onClick={()=> handleDelete(post.id)} variant="primary">Remove Post</Button>
             </Card.Body>
           </Card>
        ))}

    </div>
  )
}

export default GetPost