import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import parse from "html-react-parser"

const Blog:React.FC = () => {
    const { blogURL } = useParams()
    const test:string = `
      <p>
        Also to test parser html <br>
        fafaf
      </p>
      <img
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
      
      <pre>hello world</pre>
    `
  

    return(
    <>
      <h1>{blogURL}</h1>
      <div>{parse(test)}</div>
      
    </>
  )
};

export default Blog;