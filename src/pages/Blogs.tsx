import React, {useEffect, useState} from 'react';
import { Avatar, List, Tag } from 'antd';
import { handleGetAllDataInCollection } from '../firebase/handler';
import { BlogData } from '../types/BlogData';
import { Link } from 'react-router-dom';

const Blog:React.FC = () => {
    // retrieve data
    const [data, setData] = useState<BlogData[]>()
    const effect = useEffect(()=>{
        handleGetAllDataInCollection("blogs")
        .then(response => setData(response))
    }, [])

    return (
		<List
			itemLayout="horizontal"
			dataSource={data}
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
};

export default Blog;