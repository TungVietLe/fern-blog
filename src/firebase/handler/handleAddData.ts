import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config';

export async function handleAddData() : Promise<string>
{
	try {
		const docRef = await addDoc(collection(db, 'users'), {
			first: 'Ada',
			last: 'Lovelace',
			born: 1815,
		});
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
	return 'aaa';
}