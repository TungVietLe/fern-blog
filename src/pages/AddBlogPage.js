import { ConfigProvider, Button } from 'antd';
import { handleAddData } from '../firebase/handler/handleAddData';
import { Content } from '../dataStructure/Content';

function AddBlogPage() {
	const c = new Content('as', 'Asd');
	return (
		<>
			<Button onClick={handleAddData}>Click to add data</Button>
		</>
	);
}

export default AddBlogPage;
