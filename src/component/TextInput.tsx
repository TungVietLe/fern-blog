import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { handleAddData } from '../firebase/handler';
import { BlogData } from '../types/BlogData';
import parse from "html-react-parser"

const { TextArea } = Input;

const TextInput: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSubmit = () => {
    const c:BlogData = {title:title, content: content}
    handleAddData(c)
  }

  return (
    <>
      <TextArea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        autoSize
      />
      <div style={{ margin: '24px 0' }} />
      
      <div style={{ margin: '24px 0' }} />
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        autoSize={{ minRows: 6, maxRows: 20 }}
      />
			<Button type='primary' onClick={handleSubmit}>Submit To DB</Button>

      <div>
        <h1>Preview</h1>
        <div>{parse(content)}</div>
      </div>
    </>
  );
};

export default TextInput;