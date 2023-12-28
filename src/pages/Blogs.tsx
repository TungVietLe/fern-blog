import React, {useEffect, useState} from 'react';
import { Avatar, List, Tag } from 'antd';
import { handleGetAllDataInCollection } from '../firebase/handler';
import { BlogData } from '../types/BlogData';
import { Link } from 'react-router-dom';
import { signal, computed } from '@preact/signals-react';

const pulledBlogsData = signal<BlogData[]>([]);
const Blog: React.FC = () => {
	const effect = useEffect(() => {
		if (pulledBlogsData.value.length != 0) return;
		handleGetAllDataInCollection('blogs').then((response) => (pulledBlogsData.value = response));
		console.log('TRY TO GET BLOG DATA');
	}, []);

	return body;
};

const body = computed(() => {
	return (
		<List
			itemLayout="horizontal"
			dataSource={pulledBlogsData.value}
			renderItem={(item, index) => (
				<List.Item>
					<List.Item.Meta
						avatar={<Avatar shape="square" size={100} src={item.thumbnailURL} />}
						title={<Link to={`/blogs/${item.title}`}>{item.title}</Link>}
						description={
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: '30px',
								}}
							>
								<div>
									{item.description} <br></br>
									{item.date} <br></br>
								</div>
								<Tag color={'blue'}>{item.tag}</Tag>
							</div>
						}
					/>
				</List.Item>
			)}
		/>
	);
});

export default Blog;