import React, {useEffect, useState} from 'react';
import { Avatar, List } from 'antd';
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

    return(
    <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
        <List.Item>
            <List.Item.Meta
            avatar={<Avatar shape='square' size={100} src={`https://firebasestorage.googleapis.com/v0/b/catafy-26ec0.appspot.com/o/stores%2Fhacker%2FstoreConfig%2Fbanner?alt=media&token=b2768564-2d67-47e5-b79d-4aa63914d27f`} />}
            title={<Link to={`/blogs/${item.title}`}>{item.title}</Link>}
            description={
            <>
            {item.content} <br></br>
            {item.date ?? "Jan 08 2005"}
            </>
            }
            />
        </List.Item>
        )}
    />
  )
};

export default Blog;