import { firebaseConfig } from "./src/firebase";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, orderBy, onSnapshot, query as firestoreQuery } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getAllMessages() {
    const messagesSnapshot = await getDocs(collection(db, "message"));
    messagesSnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
    });
}

export function listenMessages(callback: (message: any[]) => void) {
    const messageQuery = firestoreQuery(
        collection(db, "message"),
        orderBy("data")
    )

    return onSnapshot(messageQuery, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(messages)
    });
}