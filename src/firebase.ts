import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBCDppjtF7Ks8GEaj4OpHuJrdkfxtq695w",
  authDomain: "netflix-clone-aca54.firebaseapp.com",
  projectId: "netflix-clone-aca54",
  storageBucket: "netflix-clone-aca54.firebasestorage.app",
  messagingSenderId: "787324258191",
  appId: "1:787324258191:web:f58f5bcdbacbbddc24adfa",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
};

const login = async (email:string,password:string) => {
  try {
    console.log("hi from login")
   await signInWithEmailAndPassword(auth,email,password)
  } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
};

const logout=async () => {
    signOut(auth);
}

export {auth,db,login,signUp,logout}
