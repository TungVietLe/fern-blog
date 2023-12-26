import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import { db, storage } from './config';
import { BlogData } from '../types/BlogData';

export async function handleAddData(data:BlogData, id:string, folder:string) : Promise<void>
{
	try {
       await setDoc(doc(db, `${folder}`, `${id}`), data);
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

export function handleUploadFile(file:File, path:string) {
    const storageRef = ref(storage, path);
    uploadBytes(storageRef, file).then((url) => {
        console.log('Uploaded a blob or file!');
    });
}

export function handleReadAllFiles() {
    const storageRef = ref(storage, "/images/afvawv");
    listAll(storageRef)
    .then((res) => {
        const files = res.items;
        
        files.forEach((file) => {
            console.log(file)
        getDownloadURL(file)
            .then((url:string) => {
                    console.log(url)
            })
            .catch((error:string) => {
            // Handle errors
            });
        });
    })
    .catch((error) => {
        // Handle errors
    });
    
}

export function handleGetFileURL(path:string, name:string) : string
{
    const storageRef = ref(storage, `${path}`);
    listAll(storageRef)
    .then((res) => {
        const files = res.items;
        const target = files.find((elem)=>{return elem.name.slice(0, elem.name.lastIndexOf(".")) == name}) // ignore suffix, .png, .jpg...
        getDownloadURL(target!).then((url)=>{
            return url
        })
    })
    .catch((error) => {
        // Handle errors
    });
    return "fail to fetch"
}