import { collection, getDocs, doc, setDoc, getDoc, orderBy, query } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";

import { db, storage, googleProvider } from './config';
import { BlogData, ImgData } from '../types/BlogData';

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import {user} from "./signal"

export async function handleSignInWithPopup() {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        user.value = result.user;
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

export async function handleSignOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
        console.log("signed out")
        user.value = null
    }).catch((error) => {
        console.log("sign out error occured")
    });
}










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
    const querySnapshot = await getDocs(query(collection(db, collectionName), orderBy("date", "desc"))); //order by desending dates
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
        return Promise.resolve(docSnap.data()) 
    } else {
        return Promise.reject(null) 
    }
}

export async function  handleUploadFile(file:File, path:string) : Promise<string> {
    let downloadURL = ""
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(snapshot.ref)
    return url
}

export async function handleGetAllFilesInFolder(folder:string) : Promise<ImgData[]>
{
    const result:ImgData[] = []
    const storageRef = ref(storage, `${folder}`);
    await listAll(storageRef)
    .then(async(res) => {
    const files = res.items;

    await Promise.all(files.map(async (file) => {
        const url = await getDownloadURL(file);
        console.log(file.name);
        result.push({ id:file.name, url:url });
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

export async function handleGetAllFileIDs(pathToFolder:string) : Promise<string[]>
{
    const storageRef = ref(storage, pathToFolder);
    const result = await listAll(storageRef)
    const listOfIDs:string[] = []
    result.prefixes.forEach((item)=>{listOfIDs.push(item.name)})
    return listOfIDs
}

export async function handleDeleteAllFilesInFolder(pathToFolder: string) : Promise<void>
{
    const storageRef = ref(storage, pathToFolder);
    const result = await listAll(storageRef)
    await Promise.all(result.items.map(async (item) => {
      await deleteObject(item);
    }))
}