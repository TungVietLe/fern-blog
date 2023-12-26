import React from 'react';
import { Input } from 'antd';
import { Signal, computed } from '@preact/signals-core';
import { BlogData } from '../types/BlogData';
const { TextArea } = Input;


type TextInputProps = {
  data: Signal<BlogData>
}
const TextInput: React.FC<TextInputProps> = ({data}) => {
  return (
    <>
      {
        computed(()=>{
          return (
            <>
              <TextArea
                value={data.value.title}
                onChange={(e) => data.value = {...data.value, title: (e.target.value)}}
                placeholder="Title"
                autoSize
              />
              <div style={{ margin: '24px 0' }} />
              <TextArea
                value={data.value.content}
                onChange={(e) => data.value = {...data.value, content: (e.target.value)}}
                placeholder="Content"
                autoSize={{ minRows: 6, maxRows: 20 }}
              />
              <div style={{ margin: '24px 0' }} />
            </>
          )
        })
      }
    </>
  );
};

export default TextInput;