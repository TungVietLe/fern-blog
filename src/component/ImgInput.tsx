import React from 'react';
import {Input} from "antd";
import {Signal, signal, useSignal, computed} from "@preact/signals-react"
import { ImgData } from '../types/BlogData';
const { TextArea } = Input;

type ImgInputProps = {
	destination: Signal<ImgData[]>;
	customFileName?: boolean;
};
const ImgInput: React.FC<ImgInputProps> = ({ destination, customFileName = false }) => {
	const desireId = signal<string>('');
	return (
		<>
			<input
				type="file"
				onChange={(e) => {
					if (e.target.files && e.target.files[0]) {
						const newFile = e.target.files[0];
						const newImgData = { id: newFile.name, file: newFile, url: URL.createObjectURL(newFile) };
						destination.value = [...destination.value, newImgData];
						desireId.value = newFile.name;
						console.log(destination.value);
					} else {
						console.warn('No file selected');
					}
				}}
			/>
			{
				// computed since value depend on desireID
				computed(
					() =>
						customFileName && (
							<>
								<TextArea
									value={desireId.value}
									onChange={(e) => {
										desireId.value = e.target.value.replace(/\D/g, ''); //only take digit
										const temp = [...destination.value];
										temp[temp.length - 1].id = desireId.value; // change id of the element in the end of array
										destination.value = temp;
									}}
									placeholder="Image ID (number only)"
									autoSize
									disabled={destination.value.length == 0}
								/>
							</>
						)
				)
			}
		</>
	);
};
export default ImgInput