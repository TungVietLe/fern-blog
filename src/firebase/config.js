import { initializeApp } from 'firebase/app';
//auth
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
//firestore
import { getFirestore } from 'firebase/firestore';
//storage
import { getStorage } from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyAZ98O4zZG-Sn4XoeOwCWTJ8BIKZat0O5M',
	authDomain: 'fern-blog.firebaseapp.com',
	projectId: 'fern-blog',
	storageBucket: 'fern-blog.appspot.com',
	messagingSenderId: '322314817390',
	appId: '1:322314817390:web:38b0cb06b6d88995e8fb7f',
};

const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

//FIRESTORE
const db = getFirestore(app);

//STORAGE
const storage = getStorage(app);

//export
export { auth, googleProvider };
export { db };
export { storage };
