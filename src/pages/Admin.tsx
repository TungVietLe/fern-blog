import React from 'react';
import { FC } from 'react';
import { Button } from 'antd';
import TextInput from '../component/TextInput';
import { signal, computed, } from '@preact/signals-react';
import { BlogData, ImgUpData } from '../types/BlogData';
import { handleAddData, handleUploadFile } from '../firebase/handler';
import ImgInput from "../component/ImgInput"
import ImgPreview from '../component/ImgPreview';
import parse from "html-react-parser"
import Alert, {alert} from "../component/Alert"

// signals
const blogData = signal<BlogData>({title: "", content:""})
const imageList = signal<ImgUpData[]>([])
const previewContent = computed(()=>{
	// basically just change image string to tag
	const replaced = blogData.value.content.replace(/{{image(\d+)}}/g, (match, id) => {
		const target = imageList.value.find((element) => element.id == id)
		if (target?.file) {
		return `<img src=${URL.createObjectURL(target?.file)} />`;
		} 
		else return ""
	});
	return parse(replaced)
}) 
// end signals



const AdminPage:FC = ()=> {
	const handleSubmit = () => {
    	handleAddData(blogData.value, blogData.value.title, "blogs")
		.then(()=>alert.value = "success")
		imageList.value.map((elem)=>{
			handleUploadFile(elem.file, `images/${blogData.value.title}/${elem.id}.png`)
		})
  	}

	//replace img string with HTML tag
	return (
		<>
			<Alert/>
			<Button type='primary' onClick={handleSubmit}>Submit To DB</Button>
			<TextInput data={blogData}/>
			<ImgInput destination={imageList}/>
    		<ImgPreview data={imageList}/>
			{/* preview  */}
			<div>{previewContent}</div>
		</>
	);
}

export default AdminPage;
