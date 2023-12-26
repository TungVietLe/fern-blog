import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { ConfigProvider, theme } from 'antd';
import NavBar from './component/NavBar';
import AddBlogPage from './pages/Admin';
import Blogs from './pages/Blogs';
import NotFound from "./pages/404"
import Blog from './pages/Blog';

function App() {
	return (
		<div style={backgroundDiv}>
		<ConfigProvider theme={{algorithm: theme.darkAlgorithm}}> {/* ant design theme */}
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
		</ConfigProvider>
		</div>
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

//Background div style
const backgroundDiv: React.CSSProperties = {
  position:"fixed", 
  color:"white", 
  backgroundColor:"black", 
  top:0,bottom:0,left:0,right:0, 
  zIndex:-100
};

export default App;
