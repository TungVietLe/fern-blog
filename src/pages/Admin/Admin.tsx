import React from 'react';
import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Button } from 'antd';
import { computed } from '@preact/signals-react';
import { BlogData } from 'types/BlogData';
import { handleAddData, handleUploadFile, handleGetDoc, handleGetAllFilesInFolder } from 'firebaseUtils/handler';
import { Link } from 'react-router-dom';
import { user } from 'firebaseUtils/signal';
import Login from './Elements/Login';
import Preview from './Elements/Preview';
import Media from './Elements/Media';
import Nav from './Elements/Nav';
import Content from './Elements/Content';
import Danger from './Elements/Danger';

const AdminRoutes: React.FC = () => {
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" element={<Media />} />
				<Route path="/content" element={<Content />} />
				<Route path="/preview" element={<Preview />} />
				<Route path="/danger" element={<Danger />} />
			</Routes>
		</>
	);
};

const AdminPage: FC = () => {
	return (
		<>
			{computed(() => {
				if (user.value == null) {
					return <Login />;
				}
				if (user.value?.email == 'tunle0801@gmail.com') {
					return <AdminRoutes />;
				}
				return <div>YOU DON'T HAVE THE PERMISSION TO THIS PAGE</div>;
			})}
		</>
	);
};



export default AdminPage;
