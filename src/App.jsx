import React from 'react'
import{QueryClient, QueryClientProvider} from '@tanstack/react-query'
import GetPost from './Components/GetPost';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddPost from './Components/addPost';
import UpdatePost from './Components/UpdatePost';


// May want to import axios if not using fetch

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <>
      <AddPost/>
      {/* <UpdatePost/> */}
      <GetPost/>
      {/* <Routes>
        <Route path="/posts" element={<GetPost/>} />
      </Routes> */}
      </>
    </QueryClientProvider>
  )
}

export default App