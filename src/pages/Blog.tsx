import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import parse from "html-react-parser"


const Blog:React.FC = () => {
  const { blogURL } = useParams()
  const test:string = `
  {{image1}} {{image99}} 
  `
  const renderedContent = test.replace(/{{image(\d+)}}/g, (match, index) => {
    return `<pre> ${index} </pre>`;
  });
  

    return(
    <>
      <div>{renderedContent}</div>
      <h1>{blogURL}</h1>
      <div>{parse(renderedContent)}</div>
    </>
  )
};

export default Blog;