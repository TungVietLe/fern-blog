import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { ConfigProvider } from 'antd';
import NavBar from './component/NavBar';
import AddBlogPage from './pages/Admin';
import Blogs from './pages/Blogs';
import NotFound from "./pages/404"
import Blog from './pages/Blog';

//Nested routes
const BlogRoutes:React.FC = () => {
	return (
		<Routes>
			<Route path=":blogURL" element={<Blog />} />
			<Route path="/" element={<Blogs />} />
		</Routes>
	)
}

function App() {
	return (
	<BrowserRouter>
      	<Routes>
			<Route path="/" element={<NavBar />}>
			{/* <Route index element={<Blogs />} /> */}
			<Route path="/blogs/*" element={<BlogRoutes />} />
			<Route path="/admin" element={<AddBlogPage />} />
			<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	</BrowserRouter>
	);
}

export default App;
