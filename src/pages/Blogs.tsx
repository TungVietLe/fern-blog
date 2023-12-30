import React, {useEffect, useState} from 'react';
import { Avatar, List, Tag } from 'antd';
import { handleGetAllDataInCollection } from '../firebaseUtils/handler';
import { BlogData } from '../types/BlogData';
import { Link } from 'react-router-dom';
import { signal, computed } from '@preact/signals-react';
import Logo from 'assets/logo';

const pulledBlogsData = signal<BlogData[]>([]);
const Blog: React.FC = () => {
	const effect = useEffect(() => {
		if (pulledBlogsData.value.length != 0) return;
		handleGetAllDataInCollection('blogs').then((response) => (pulledBlogsData.value = response));
		console.log('TRY TO GET BLOG DATA');
	}, []);

	return (
		<>
			<Logo />
			<p>Reflecting on learned things. Crafts, personal, and technical details.</p>
			<div style={{ margin: '130px 0' }}></div>
			{blogsListing}
		</>
	);
};

const blogsListing = computed(() => {
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
									{item.date.toDate().toDateString()} <br></br>
								</div>
								<Tag style={{ fontWeight: '500', color: '#828282', backgroundColor: '#e0e0e0' }} bordered={false}>
									{item.tag}
								</Tag>
							</div>
						}
					/>
				</List.Item>
			)}
		/>
	);
});

export default Blog;