import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AlertComponent from './component/Alert';
import NavBar from './component/NavBar';
import Admin from './pages/Admin/Admin';
import Preview from './pages/Admin/Elements/Preview';
import Blogs from './pages/Blogs';
import NotFound from './pages/404';
import Blog from './pages/Blog';
import Footer from './component/Footer';
import { customTheme } from './styles/theme';
import Danger from './pages/Admin/Elements/Danger';

function App() {
	return (
		<ConfigProvider theme={customTheme}>
			<Routes>
				<Route path="/" element={<NavBar />}>
					<Route index element={<Blogs />} />
					<Route path="/blogs/*" element={<BlogRoutes />} />
					<Route path="/admin/*" element={<Admin />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
			<Footer />
			<AlertComponent />
		</ConfigProvider>
	);
}

//Nested routes inside app main routes
const BlogRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path=":blogURL" element={<Blog />} />
			<Route path="/" element={<Blogs />} />
		</Routes>
	);
};

export default App;
