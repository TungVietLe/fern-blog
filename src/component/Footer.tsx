import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
const { Footer } = Layout;
const Login: React.FC = () => (
	<>
		<Footer style={{ textAlign: 'center' }}>
			©2023 Created by Tung Le
			<Link to={'/admin'}>
				<SettingOutlined color="white" />
			</Link>
		</Footer>
	</>
);

export default Login;