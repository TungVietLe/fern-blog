import React from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { computed } from '@preact/signals-react';
import { blogData, imageList } from '../signal';
import { Button } from 'antd';
import { DecodeThenParseToHTML } from '../../../utils';

const previewContent = computed(() => {
	return DecodeThenParseToHTML(blogData.value.content, imageList.value);
});

const PreviewPage: FC = () => {
	return (
		<>
			<h2>Preview</h2>
			<h1>{blogData.value.title}</h1>
			<div className="previewDiv">{previewContent}</div>
		</>
	);
};

export default PreviewPage;
