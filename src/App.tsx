import React from 'react';
import { ConfigProvider, Button } from 'antd';
import NavBar from './component/NavBar';
import AddBlogPage from './pages/AddBlogPage';

function App() {
	return (
		<ConfigProvider>
			<NavBar />
			<AddBlogPage />
		</ConfigProvider>
	);
}

export default App;
