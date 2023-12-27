import React from 'react';
import { FC } from 'react';
import { Button } from 'antd';
import TextInput from '../component/TextInput';
import { signal, computed, } from '@preact/signals-react';
import { BlogData, ImgUpData } from '../types/BlogData';
import { handleAddData, handleUploadFile } from '../firebase/handler';
import ImgInput from "../component/ImgInput"
import ImgPreview from '../component/ImgPreview';
import { Link } from 'react-router-dom';
import Alert, {alert} from "../component/Alert"

// signals
const blogData = signal<BlogData>({title: "", content:"", description:"", date:""})
const imageList = signal<ImgUpData[]>([])
// end signals



const AdminPage:FC = ()=> {
	const handleSubmit = () => {
    	handleAddData(blogData.value, blogData.value.title, "blogs")
		.then(()=>alert.value = "success")
		imageList.value.map((elem)=>{
			handleUploadFile(elem.file, `images/${blogData.value.title}/${elem.id}.png`)
		})
  	}

	return (
		<>
			<Alert/>
			<div style={{margin:"30px"}}></div>
			<Button type='primary' onClick={handleSubmit}>Submit To DB</Button>
			<Link to={"preview"}><Button type='default'>Preview</Button></Link>
			<div style={{margin:"30px"}}></div>
			<TextInput data={blogData}/>
			<ImgInput destination={imageList}/>
    		<ImgPreview data={imageList}/>
		</>
	);
}

export {blogData, imageList}
export default AdminPage;
