import React from 'react';
import { FC } from 'react';
import { Button } from 'antd';
import TextInput from '../component/TextInput';
import { signal, computed, } from '@preact/signals-react';
import { BlogData, ImgData, defaulBlogData } from '../types/BlogData';
import { handleAddData, handleUploadFile, handleGetDoc } from '../firebase/handler';
import ImgInput from '../component/ImgInput';
import ImgPreview from '../component/ImgPreview';
import { Link } from 'react-router-dom';
import { user } from '../firebase/signal';
import Login from './Login';
import DateInput from '../component/DateInput';
import { notification } from 'antd';

// signals
export const blogData = signal<BlogData>(defaulBlogData as BlogData);
export const imageList = signal<ImgData[]>([]);
const thumbnailFile = signal<ImgData[]>([]); // only take the first file as thumbnail
// end signals

const AdminPage: FC = () => {
	return (
		<>
			{computed(() => {
				if (user.value == null) {
					return <Login />;
				}
				if (user.value?.email == 'tunle0801@gmail.com') {
					return (
						<>
							<div style={{ margin: '30px' }}></div>
							<Button type="primary" onClick={handleSubmit}>
								Submit To DB
							</Button>
							<Link to={'preview'}>
								<Button type="default">Preview</Button>
							</Link>
							<Button type="dashed" onClick={handlePull}>
								Pull from DB
							</Button>
							<div style={{ margin: '30px' }}></div>

							<h2>Thumbnail</h2>
							<ImgInput destination={thumbnailFile} />
							<ImgPreview data={thumbnailFile} />
							<TextInput destination={blogData} />
							<DateInput destination={blogData} />
							<h2>Media</h2>
							<ImgInput destination={imageList} />
							<ImgPreview data={imageList} customFileName />
						</>
					);
				}
				return <div>YOU DON'T HAVE THE PERMISSION TO THIS PAGE</div>;
			})}
		</>
	);
};
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
		.then((result) => (blogData.value = result as BlogData))
		.catch(() => notification.error({ message: 'cannot find this ID on database' }));
};
export default AdminPage;
