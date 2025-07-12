import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { firebaseConfig } from "./src/firebase";
import { initializeApp } from "firebase/app";


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const provider = new GoogleAuthProvider();


export async function createAccount(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user;
  
  await setDoc(doc(db, "users", user.uid), {
    name: user.displayName ?? "",
    email: user.email,
    createdAt: serverTimestamp()
  });
  
  console.log("-- USER SUCCESSFULLY CREATED --")
  return user;
}

export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  console.log("-- LOGIN SUCCESSFULLY --")
  return userCredential.user;
}

export async function loginGoogle() {
  const result = await signInWithPopup(auth, provider);
  console.log("-- GOOGLE LOGIN:", result.user.email, "--")
}

export async function watchUser(callback: (user: any) => void) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("-- ACTIVE USER --")
      console.log("NAME USER: ", user.displayName)
      console.log("EMAIL USER: ", user.email)
      callback(user);
    } else {
      console.log("-- NOT USERS LOGGEG IN --")
      window.location.href = "/login.html"
      callback(null);
    }
  })
}

export { auth, db, provider, signInWithPopup };