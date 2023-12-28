import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { handleSignInWithPopup } from '../firebase/handler';
import { useNavigate } from 'react-router-dom';
const Login: React.FC = () => {
	const navigateTo = useNavigate();
	return (
		<Result
			icon={<SmileOutlined />}
			title="Sorry, this is admin zone!"
			extra={
				<>
					<Button type="default" onClick={handleSignInWithPopup}>
						Admin Login
					</Button>
					<Button type="primary" onClick={() => navigateTo(-1)}>
						Back
					</Button>
				</>
			}
		/>
	);
};

export default Login;