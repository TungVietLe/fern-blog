import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';

const Blog:React.FC = () => {
    const { blogURL } = useParams()
  

    return(
    <>
    <h1>{blogURL}</h1>
    </>
  )
};

export default Blog;