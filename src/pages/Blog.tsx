import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { handleGetDoc, handleGetFileURL, handleGetAllFilesInFolder } from '../firebaseUtils/handler';
import { BlogData, defaulBlogData, ImgData } from '../types/BlogData';
import { signal, computed, batch } from '@preact/signals-react';
import { Button, Empty, FloatButton } from 'antd';
import { DecodeThenParseToHTML } from '../utils';

const fetchedData = signal<BlogData>(defaulBlogData as BlogData);
const fetchedImgs = signal<ImgData[]>([]);

const previewContent = computed(() => {
	return DecodeThenParseToHTML(fetchedData.value.content, fetchedImgs.value);
});

const blogExist = signal<boolean>(false);
const Blog: React.FC = () => {
	const { blogURL } = useParams();
	const navigateTo = useNavigate();

	useEffect(() => {
		blogExist.value = false;
		handleGetDoc('blogs', blogURL as string)
			.then((result) => {
				blogExist.value = true;
				fetchedData.value = result as BlogData;
			})
			.catch(() => {
				console.log('no such blog found');
			});
		handleGetAllFilesInFolder(`images/${blogURL}`).then((result) => {
			fetchedImgs.value = result;
			console.log(result);
		});
	}, []);

	return (
		<>
			<FloatButton onClick={() => navigateTo('/blogs')} description="🡠" style={{ fontWeight: 'bold', left: '3vw', top: '20vh' }}></FloatButton>
			{body}
		</>
	);
};

const body = computed(() => {
	if (!blogExist.value) {
		return <Empty description={false}></Empty>;
	} else {
		return (
			<>
				<div style={{ margin: '60px 0' }}></div>
				<p style={{ opacity: 0.5 }}>
					{fetchedData.value.date.toDate().toDateString()} <mark style={{ backgroundColor: '#b8b8b8' }}>{fetchedData.value.tag}</mark>
				</p>
				<h1>{fetchedData.value.title}</h1>
				{previewContent}
			</>
		);
	}
});

export default Blog;
