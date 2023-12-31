import React from 'react';
import {Input} from "antd";
import {Signal, signal, useSignal, computed} from "@preact/signals-react"
import { ImgData } from '../types/BlogData';
const { TextArea } = Input;

type ImgInputProps = {
	destination: Signal<ImgData[]>;
};
const ImgInput: React.FC<ImgInputProps> = ({ destination }) => {
	return (
		<>
			<input
				type="file"
				multiple
				onChange={(e) => {
					if (e.target.files != null) {
						[...e.target.files].map((elem) => {
							const newFile = elem;
							const newImgData = { id: newFile.name.replace(/\D/g, ''), file: newFile, url: URL.createObjectURL(newFile) };
							destination.value = [...destination.value, newImgData];
							console.log(destination.value);
						});
					} else {
						console.warn('No file selected');
					}
				}}
			/>
		</>
	);
};
export default ImgInput