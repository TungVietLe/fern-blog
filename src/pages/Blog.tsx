import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { handleGetDoc, handleGetFileURL, handleReadAllFiles } from '../firebase/handler';
import { BlogData, ImgDownData, defaulBlogData } from '../types/BlogData';
import { signal, computed, batch } from '@preact/signals-react';
import { Empty } from 'antd';

const fetchedData = signal<BlogData>(defaulBlogData as BlogData);
const fetchedImgs = signal<ImgDownData[]>([]);

const previewContent = computed(() => {
	const path = `images/${fetchedData.value.title}`;

	const replaced = fetchedData.value.content.replace(/{{image(\d+)}}/g, (match, id) => {
		const url = fetchedImgs.value.find((elem) => elem.id == id)?.url;
		return `<img src="${url}" />`;
	});
	return parse(replaced);
});

const blogExist = signal<boolean>(false);
const body = computed(() => {
	if (!blogExist.value) {
		return <Empty description={false} />;
	} else {
		return (
			<>
				<h1>{fetchedData.value.title}</h1>
				{previewContent}
			</>
		);
	}
});
const Blog: React.FC = () => {
	const { blogURL } = useParams();

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
		handleReadAllFiles(`images/${blogURL}`).then((result) => {
			fetchedImgs.value = result;
		});
	}, []);

	return <>{body}</>;
};

export default Blog;
