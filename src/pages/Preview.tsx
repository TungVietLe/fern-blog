import React from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { computed } from '@preact/signals-react';
import { blogData, imageList } from './Admin';
import { Button } from 'antd';
import { DecodeThenParseToHTML } from '../utils';

const previewContent = computed(() => {
	return DecodeThenParseToHTML(blogData.value.content, imageList.value);
}); 

const PreviewPage:FC = ()=> {
	return (
		<>
			<div style={{margin:"30px"}}></div>
            <Link to="/admin"><Button type="default">Back</Button></Link>
            <h2>Preview</h2>
            <h1>{blogData.value.title}</h1>
            <div>{previewContent}</div>
		</>
	);
}

export default PreviewPage;