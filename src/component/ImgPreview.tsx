import React, {useState} from 'react';
import { Signal, computed, signal } from '@preact/signals-react';
import { Button, Input } from 'antd';
import { ImgData } from '../types/BlogData';
const { TextArea } = Input;

type ImgPreviewProps = {
	data: Signal<ImgData[]>;
	customFileName?: boolean;
};
const ImgPreview: React.FC<ImgPreviewProps> = ({ data, customFileName = false }) => {
	const desireId = signal<string>('');
	const current = signal<number>(0); // current ID to manipulate
	const handleDeleteIndex = (i: number) => {
		const arr = [...data.value];
		arr.splice(i, 1);
		return arr;
	};
	return (
		<>
			{
				// computed since value depend on desireID
				computed(
					() =>
						customFileName && (
							<>
								<TextArea
									value={desireId.value.replace(/\D/g, '')}
									onChange={(e) => {
										desireId.value = e.target.value.replace(/\D/g, ''); //only take digit
										const temp = [...data.value];
										temp[current.value].id = desireId.value; // change current id
										data.value = temp;
									}}
									placeholder="Image ID (number only)"
									autoSize
									disabled={data.value[current.value] == null}
								/>
							</>
						)
				)
			}
			{computed(() =>
				data.value.map((f, index) => {
					const activeBg = current.value == index ? 'orange' : 'transparent';
					return (
						<div
							key={index}
							style={{ display: 'inline-flex', alignItems: 'center', borderRadius: '10px', padding: '10px', backgroundColor: activeBg }}
						>
							<p>{f.id}</p>
							<img
								src={f.url}
								key={index}
								onClick={() => {
									current.value = index;
								}}
								style={{ width: '15vw' }}
							/>
							<Button disabled={index != current.value} danger type="dashed" onClick={() => (data.value = handleDeleteIndex(index))}>
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
