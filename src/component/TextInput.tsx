import React from 'react';
import { Input } from 'antd';
import { Signal, computed } from '@preact/signals-core';
import { BlogData } from '../types/BlogData';
const { TextArea } = Input;


type TextInputProps = {
	destination: Signal<BlogData>;
};
const TextInput: React.FC<TextInputProps> = ({ destination }) => {
	return (
		<>
			{computed(() => {
				return (
					<>
						<TextArea
							value={destination.value.title}
							onChange={(e) => (destination.value = { ...destination.value, title: e.target.value.replace(/[^a-zA-Z0-9 ]/g, '') })} //no special character
							placeholder="Title"
							autoSize
						/>
						<div style={{ margin: '24px 0' }} />
						<TextArea
							value={destination.value.description}
							onChange={(e) => (destination.value = { ...destination.value, description: e.target.value })}
							placeholder="Description"
							autoSize
						/>
						<div style={{ margin: '24px 0' }} />
						<TextArea
							value={destination.value.tag}
							onChange={(e) => (destination.value = { ...destination.value, tag: e.target.value.toLowerCase() })}
							placeholder="Tag"
							autoSize
						/>
						<div style={{ margin: '24px 0' }} />
					</>
				);
			})}
		</>
	);
};

export default TextInput;