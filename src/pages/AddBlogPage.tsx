import React from 'react';
import { Button } from 'antd';
import { handleAddData } from '../firebase/handler/handleAddData';
import { Content } from '../types/Content';
import { FC } from 'react';

const AddBlogPage:FC = ()=> {
	const c = new Content('as', 'Asd');
	return (
		<>
			<Button type='primary' onClick={handleAddData}>Click to add data</Button>
		</>
	);
}

export default AddBlogPage;
