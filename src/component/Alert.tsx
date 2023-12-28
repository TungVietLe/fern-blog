import React from 'react';
import { Button, notification, Space } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const App: React.FC = () => {
	const [api, contextHolder] = notification.useNotification();
	return <>{contextHolder}</>;
};

export default App;
