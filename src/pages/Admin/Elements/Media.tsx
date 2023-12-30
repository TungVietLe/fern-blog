import React from 'react';
import { FC } from 'react';
import { Button } from 'antd';
import TextInput from 'component/TextInput';
import { signal, computed } from '@preact/signals-react';
import { BlogData, ImgData, defaulBlogData } from 'types/BlogData';
import { handleAddData, handleUploadFile, handleGetDoc, handleGetAllFilesInFolder } from 'firebaseUtils/handler';
import ImgInput from 'component/ImgInput';
import ImgPreview from 'component/ImgPreview';
import DateInput from 'component/DateInput';
import { notification } from 'antd';
import { blogData, imageList, thumbnailFile } from '../signal';

const Media: React.FC = () => {
	return (
		<>
			{computed(() => {
				return (
					<>
						<Button type="primary" onClick={handleSubmit} disabled={blogData.value.title == ''}>
							Submit To DB
						</Button>
						<Button type="dashed" onClick={handlePull}>
							Pull from DB
						</Button>
						<h2>Media</h2>
						<div style={{ margin: '30px' }}></div>
						<ImgInput destination={thumbnailFile} />
						<ImgPreview data={thumbnailFile} />
						<TextInput destination={blogData} />
						<DateInput destination={blogData} />
						<ImgInput destination={imageList} />
						<ImgPreview data={imageList} customFileName />
					</>
				);
			})}
		</>
	);
};

// handlers_________________________________
const handleSubmit = async () => {
	imageList.value.map((elem) => {
		//if file exist
		elem.file && handleUploadFile(elem.file, `images/${blogData.value.title}/${elem.id}`);
	});
	if (thumbnailFile.value[0]?.file) {
		const thumbnailURL = await handleUploadFile(thumbnailFile.value[0].file, `images/${blogData.value.title}/thumbnail`);
		blogData.value = { ...blogData.value, thumbnailURL: thumbnailURL };
	}
	handleAddData(blogData.value, blogData.value.title, 'blogs').then(() => notification.success({ message: 'success' }));
};

const handlePull = () => {
	handleGetDoc('blogs', blogData.value.title)
		.then((result) => {
			blogData.value = result as BlogData;
		})
		.catch(() => notification.error({ message: 'cannot find this ID on database' }));
	handleGetAllFilesInFolder(`images/${blogData.value.title}`).then((result) => {
		imageList.value = result.filter((item) => item.id != 'thumbnail');
		thumbnailFile.value = result.filter((item) => item.id == 'thumbnail');
	});
};

export default Media;
