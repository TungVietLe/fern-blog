import React from 'react';
import { FC } from 'react';
import { Button } from 'antd';
import TextInput from '../component/TextInput';
import { signal, computed, } from '@preact/signals-react';
import { BlogData, ImgUpData, defaulBlogData } from '../types/BlogData';
import { handleAddData, handleUploadFile } from '../firebase/handler';
import ImgInput from '../component/ImgInput';
import ImgPreview from '../component/ImgPreview';
import { Link } from 'react-router-dom';
import Alert, { alert } from '../component/Alert';
import {user} from "../firebase/signal"
import Login from "./Login"

// signals
export const blogData = signal<BlogData>(defaulBlogData as BlogData);
export const imageList = signal<ImgUpData[]>([]);
const thumbnailFile = signal<ImgUpData[]>([]); // actually only store 1 file
// end signals

const AdminPage: FC = () => {
	const handleSubmit = async () => {
		imageList.value.map((elem) => {
			handleUploadFile(elem.file, `images/${blogData.value.title}/${elem.id}`);
		});
		const thumbnailURL = await handleUploadFile(thumbnailFile.value[0].file, `images/${blogData.value.title}/thumbnail`);
		blogData.value = { ...blogData.value, thumbnailURL: thumbnailURL };
		handleAddData(blogData.value, blogData.value.title, 'blogs').then(() => (alert.value = 'success'));
	};

	return (
		<>
		
		{computed(()=>
			{
				if (user.value == null) {
					return <Login/>
				}
				if (user.value?.email == "tunle0801@gmail.com") {
					return (<>
					<Alert />
						<div style={{ margin: '30px' }}></div>
						<Button type="primary" onClick={handleSubmit}>
							Submit To DB
						</Button>
						<Link to={'preview'}>
							<Button type="default">Preview</Button>
						</Link>
						<div style={{ margin: '30px' }}></div>
			
						<h2>Thumbnail</h2>
						<ImgInput destination={thumbnailFile} />
						<ImgPreview data={thumbnailFile} />
						<TextInput data={blogData} />
						<h2>Media</h2>
						<ImgInput destination={imageList} customFileName />
						<ImgPreview data={imageList} />
					</>)
				}
				return <div>YOU DON'T HAVE THE PERMISSION TO THIS PAGE</div>
			}
		)
		}
			
		</>
	);
};
export default AdminPage;
