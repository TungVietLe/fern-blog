import React from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { computed } from '@preact/signals-react';
import { blogData, imageList } from './Admin';
import { Button, notification } from 'antd';
import { DecodeThenParseToHTML, DeleteUnusedFilesInStorage } from 'utils';

const previewContent = computed(() => {
	return DecodeThenParseToHTML(blogData.value.content, imageList.value);
});

const DangerPage: FC = () => {
	return (
		<>
			<div style={{ margin: '30px' }}></div>
			<Link to="/admin">
				<Button type="primary">Back</Button>
			</Link>
			<h2>Danger Zone</h2>
			<Button
				danger
				type="default"
				onClick={() => {
					DeleteUnusedFilesInStorage().then(() => {
						notification.warning({ message: 'Unused files deleted' });
					});
				}}
			>
				Delete unused file storage
			</Button>
		</>
	);
};

export default DangerPage;
