import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Button} from "antd"
import { Menu } from 'antd';
import { handleSignInWithPopup, handleSignOut } from '../firebaseUtils/handler';
import { user } from '../firebaseUtils/signal';
import { computed } from '@preact/signals-react';

const signOutBtn = computed(()=>user.value && <Button type='dashed' onClick={handleSignOut}>Sign Out</Button>)

const items: MenuProps['items'] = [
	{
		label: signOutBtn,
		key: 'out',
	},
	{
		label: <Link to={'/blogs'}>Blogs</Link>,
		icon: <AppstoreOutlined />,

		key: 'alipay',
	},
	{
		label: (
			<a href={'https://tungle.tech'} target="_blank">
				Me 🡥
			</a>
		),
		key: 'me',
	},
];

const NavBar: React.FC = () => {
  const [current, setCurrent] = useState('');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
    <Menu theme='light' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    <Outlet/>
    </>
  )
}

export default NavBar;