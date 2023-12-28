import React from 'react';
import { notification } from 'antd';
import { signal, computed } from '@preact/signals-core';

type AlertType = 'success' | 'info' | 'error' | 'warning' | null;
export const alert = signal<AlertType>('info');

export const AlertComponent: React.FC = () => {
	const [api, contextHolder] = notification.useNotification();

	const openNotificationWithIcon = (type: AlertType) => {
		if (type == null) return;
		api[type]({
			message: 'Success',
			description: 'Well done!.',
			onClose: () => {
				alert.value = null;
			},
		});
	};

	return (
		<>
			{computed(() => {
				openNotificationWithIcon(alert.value);
				return <>{contextHolder}</>;
			})}
		</>
	);
};
