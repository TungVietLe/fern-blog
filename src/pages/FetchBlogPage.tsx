import React, {useEffect, useState} from 'react';
import { Avatar, List } from 'antd';
import { handleGetAllDataInCollection } from '../firebase/handler';
import { BlogData } from '../types/BlogData';

const FetchBlogPage:React.FC = () => {
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
            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
            title={<a href="https://ant.design">{item.title}</a>}
            description={item.content}
            />
        </List.Item>
        )}
    />
  )
};

export default FetchBlogPage;