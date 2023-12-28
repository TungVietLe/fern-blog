import React from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { computed, } from '@preact/signals-react';
import parse from "html-react-parser"
import { blogData, imageList } from './Admin';
import { Button } from 'antd';

const previewContent = computed(()=>{
	// basically just change image string to tag
	const replaced =
		'<pre>' +
		blogData.value.content.replace(/{{image(\d+)}}/g, (match, id) => {
			const target = imageList.value.find((element) => element.id == id);
			if (target?.file) {
				return `<img src="${URL.createObjectURL(target?.file)}"/>`;
			} else return '';
		}) +
		'</pre>';
	return parse(replaced)
}) 

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