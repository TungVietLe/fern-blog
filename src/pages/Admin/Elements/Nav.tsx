import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { computed } from '@preact/signals-react';
import { blogData } from '../signal';

const items: MenuProps['items'] = [
	{
		label: <Link to={''}>Media</Link>,
		key: 'media',
		icon: <MailOutlined />,
	},
	{
		label: computed(
			() =>
				blogData.value.title && (
					<Link to={'content'}>
						<AppstoreOutlined />
						Content
					</Link>
				)
		),
		key: 'content',
	},
	{
		label: <Link to={'preview'}>Preview</Link>,
		key: 'preview',
		icon: <AppstoreOutlined />,
	},
	{
		label: (
			<Link to={'danger'}>
				<SettingOutlined />
			</Link>
		),
		danger: true,
		key: 'SubMenu',
	},
];

const App: React.FC = () => {
	const [current, setCurrent] = useState('mail');

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
		setCurrent(e.key);
	};

	return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default App;
