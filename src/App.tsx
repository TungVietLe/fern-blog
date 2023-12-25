import React from 'react';
import { ConfigProvider, Button } from 'antd';
import NavBar from './component/NavBar';
import AddBlogPage from './pages/AddBlogPage';
import FetchBlogPage from './pages/FetchBlogPage';

function App() {
	return (
		<ConfigProvider>
			<NavBar />
			<AddBlogPage />
			<FetchBlogPage/>
		</ConfigProvider>
	);
}

export default App;
