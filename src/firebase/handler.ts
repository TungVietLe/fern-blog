import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import { db, storage } from './config';
import { BlogData, ImgDownData } from '../types/BlogData';
import { async } from "@firebase/util";

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
export async function handleGetDoc(folder:string, id:string) {
    const docRef = doc(db, `${folder}`, `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() 
    } else {
        return null
    }
}
handleGetDoc("blogs", "first custom id")

export function handleUploadFile(file:File, path:string) {
    const storageRef = ref(storage, path);
    uploadBytes(storageRef, file).then((url) => {
        console.log('Uploaded a blob or file!');
    });
}

export async function handleReadAllFiles(folder:string) : Promise<ImgDownData[]>
{
    const result:ImgDownData[] = []
    const storageRef = ref(storage, `${folder}`);
    await listAll(storageRef)
    .then(async(res) => {
    const files = res.items;

    await Promise.all(files.map(async (file) => {
        const url = await getDownloadURL(file);
        console.log("abc");
        const id = file.name.slice(0, file.name.lastIndexOf("."));
        result.push({ id, url });
    }));
    })
    .catch((error) => {
    // Handle errors
    });
console.log("done!");
    return result
}

export async function handleGetFileURL(path:string, name:string) : Promise<string>
{
    console.log(`try to get ${path}/${name}`)
    const storageRef = ref(storage, `${path}`);
    await listAll(storageRef)
    .then((res) => {
        const files = res.items;
        const target = files.find((elem)=>{return elem.name.slice(0, elem.name.lastIndexOf(".")) == name}) // ignore suffix, .png, .jpg...
        getDownloadURL(target!).then((url)=>{
            console.log(`result:`)
            return url
        })
    })
    .catch((error) => {
        // Handle errors
    });
    return "fail to fetch"
}