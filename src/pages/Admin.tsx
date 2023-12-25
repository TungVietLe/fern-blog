import React from 'react';
import { FC } from 'react';
import TextInput from '../component/TextInput';
import ImgUpload from '../component/ImgUpload';

const AdminPage:FC = ()=> {
	return (
		<>
			<TextInput/>
			<ImgUpload/>
		</>
	);
}

export default AdminPage;
