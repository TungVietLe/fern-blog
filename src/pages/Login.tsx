import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { handleSignInWithPopup } from '../firebase/handler';

const Login: React.FC = () => (
  <Result
    icon={<SmileOutlined />}
    title="Sorry, this is admin zone!"
    extra={<Button type='primary' onClick={handleSignInWithPopup}>Admin Login</Button>}
  />
);

export default Login;