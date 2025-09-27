
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

export interface UserInfo {
  readonly uid: string;
  readonly displayName: string | null;
  readonly email: string | null;
  readonly phoneNumber: string | null;
  readonly photoURL: string | null;
  readonly providerId: string;
}
