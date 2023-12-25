import React from 'react';
import { Button } from 'antd';
import { handleAddData } from '../firebase/handler';
import { FC } from 'react';
import TextInput from '../component/TextInput';
import ImgUpload from '../component/ImgUpload';

const AddBlogPage:FC = ()=> {
	return (
		<>
			<TextInput/>
			<ImgUpload/>
		</>
	);
}

export default AddBlogPage;
