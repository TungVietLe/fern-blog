import React, {useState} from 'react';
import {Signal, computed} from "@preact/signals-react"
import { Button } from 'antd';
import { ImgData } from '../types/BlogData';

type ImgPreviewProps = {
	data: Signal<ImgData[]>;
};
const ImgPreview: React.FC<ImgPreviewProps> = ({ data }) => {
	const handleDeleteIndex = (i: number) => {
		const arr = [...data.value];
		arr.splice(i, 1);
		return arr;
	};
	return (
		<>
			{computed(() =>
				data.value.map((f, index) => {
					return (
						<div key={index} style={{ display: 'flex' }}>
							<p>{f.id}</p>
							<img src={f.url} key={index} />
							<Button danger type="dashed" onClick={() => (data.value = handleDeleteIndex(index))}>
								Del
							</Button>
						</div>
					);
				})
			)}
		</>
	);
}; 

export default ImgPreview;
