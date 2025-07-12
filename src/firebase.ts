import { initializeApp } from "firebase/app";


export const firebaseConfig = {
  apiKey: "AIzaSyAf0G2HZctA0IdAArCLCOswopRib0HlnpU",
  authDomain: "communitychat-13929.firebaseapp.com",
  projectId: "communitychat-13929",
  storageBucket: "communitychat-13929.firebasestorage.app",
  messagingSenderId: "477685201996",
  appId: "1:477685201996:web:77e1f027d7233df6b7c8e9",
  measurementId: "G-XF491D2VQK"
};

export interface UserInfo {
  readonly uid: string;
  readonly displayName: string | null;
  readonly email: string | null;
  readonly phoneNumber: string | null;
  readonly photoURL: string | null;
  readonly providerId: string;
}

const app = initializeApp(firebaseConfig);