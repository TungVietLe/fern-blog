import { collection, getDocs, addDoc } from "firebase/firestore";

import { db } from './config';
import { BlogData } from '../types/BlogData';

export async function handleAddData(data:BlogData) : Promise<void>
{
	try {
		const docRef = await addDoc(collection(db, 'blogs'), data);
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
}

export async function handleGetAllDataInCollection(collectionName: string) : Promise<BlogData[]> {
    let r:BlogData[] = []
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
    r.push(doc.data() as BlogData)
    });
    return(r)
}
