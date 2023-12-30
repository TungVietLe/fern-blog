import React from 'react';
import { FC } from 'react';
import { Button } from 'antd';
import { computed } from '@preact/signals-react';
import { BlogData } from 'types/BlogData';
import { handleAddData, handleUploadFile, handleGetDoc, handleGetAllFilesInFolder } from 'firebaseUtils/handler';
import { Link } from 'react-router-dom';
import { user } from 'firebaseUtils/signal';
import { notification } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import { blogData, imageList, thumbnailFile } from '../signal';

const ContentEditor: FC = () => {
	return (
		<>
			{computed(() => {
				return (
					<>
						<MDEditor
							value={blogData.value.content}
							onChange={(e) => {
								blogData.value = { ...blogData.value, content: e as string };
							}}
						/>
					</>
				);
			})}
		</>
	);
};

export default ContentEditor;
