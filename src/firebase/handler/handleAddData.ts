import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config';
import { BlogData } from '../../types/BlogData';

export async function handleAddData(data:BlogData) : Promise<string>
{
	try {
		const docRef = await addDoc(collection(db, 'blogs'), data.toDictionary());
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
	return 'aaa';
}
