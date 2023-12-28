import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { ConfigProvider, theme } from 'antd';
import { AlertComponent } from './component/Alert';
import NavBar from './component/NavBar';
import Admin from './pages/Admin';
import Preview from './pages/Preview';
import Blogs from './pages/Blogs';
import NotFound from './pages/404';
import Blog from './pages/Blog';
import Footer from './component/Footer';

function App() {
	return (
		<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<NavBar />}>
						<Route index element={<Blogs />} />
						<Route path="/blogs/*" element={<BlogRoutes />} />
						<Route path="/admin/preview" element={<Preview />} />
						<Route path="/admin" element={<Admin />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
				<Footer />
				<AlertComponent />
			</BrowserRouter>
		</ConfigProvider>
	);
}

//Nested routes inside app main routes
const BlogRoutes:React.FC = () => {
	return (
		<Routes>
			<Route path=":blogURL" element={<Blog />} />
			<Route path="/" element={<Blogs />} />
		</Routes>
	)
}
export default App;
