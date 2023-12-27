import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import parse from "html-react-parser"
import { handleGetDoc } from '../firebase/handler';
import { BlogData } from '../types/BlogData';


const Blog:React.FC = () => {
  const { blogURL } = useParams()
  const test:string = `
  {{image1}} {{image99}} 
  `
  
  const [data, setData] = useState<BlogData>()
  
  useEffect(()=>{
    handleGetDoc("blogs", blogURL as string).then((result)=>{
      setData(result as BlogData)
    })
  }, [])
  
  const renderedContent = data?.content.replace(/{{image(\d+)}}/g, (match, index) => {
    return `<pre> ${index} </pre>`;
  });

    return(
    <>
      {renderedContent && <div>{parse(renderedContent)}</div>}
    </>
  )
};

export default Blog;