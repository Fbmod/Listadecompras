import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { ShoppingList, ShoppingItem } from "../types";

const firebaseConfig = {
    apiKey: "AIzaSyDoyIgr10VEBwpDjNZcdLEDP2yIREW6KKk", 
    authDomain: "lista-de-compras-app-1446f.firebaseapp.com",
    projectId: "lista-de-compras-app-1446f",
    storageBucket: "lista-de-compras-app-1446f.appspot.com",
    messagingSenderId: "417565877000",
    appId: "1:417565877000:web:31f32aa29d9575b1bdc2bd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Path helper to match the specific structure requested
const getListsCollection = (userId: string) => 
    collection(db, "artifacts", firebaseConfig.appId, "users", userId, "lists");

const getListDoc = (userId: string, listId: string) =>
    doc(db, "artifacts", firebaseConfig.appId, "users", userId, "lists", listId);

export const subscribeLists = (userId: string, callback: (lists: ShoppingList[]) => void) => {
    return onSnapshot(getListsCollection(userId), (snapshot) => {
        const lists = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as ShoppingList[];
        callback(lists);
    });
};

export const createList = async (userId: string, name: string) => {
    await addDoc(getListsCollection(userId), { name, items: [] });
};

export const removeList = async (userId: string, listId: string) => {
    await deleteDoc(getListDoc(userId, listId));
};

export const updateListItems = async (userId: string, listId: string, items: ShoppingItem[]) => {
    await updateDoc(getListDoc(userId, listId), { items });
};

export const clearCheckedItems = async (userId: string, listId: string, currentItems: ShoppingItem[]) => {
    const filtered = currentItems.filter(i => !i.checked);
    await updateListItems(userId, listId, filtered);
};