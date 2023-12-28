import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { Signal } from '@preact/signals-react';
import { BlogData } from '../types/BlogData';
import { Timestamp } from 'firebase/firestore';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
	console.log(new Date(dateString));
};

type DateInputProps = {
	destination: Signal<BlogData>;
};
const DateInput: React.FC<DateInputProps> = ({ destination }) => (
	<Space direction="vertical">
		<DatePicker
			onChange={(date, dateString) => {
				destination.value = { ...destination.value, date: Timestamp.fromDate(new Date(dateString)) };
			}}
		/>
	</Space>
);

export default DateInput;
