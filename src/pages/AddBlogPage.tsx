import React from 'react';
import { Button } from 'antd';
import { handleAddData } from '../firebase/handler/handleAddData';
import { FC } from 'react';
import TextInput from '../component/TextInput';

const AddBlogPage:FC = ()=> {
	return (
		<>
			<TextInput/>
		</>
	);
}

export default AddBlogPage;
