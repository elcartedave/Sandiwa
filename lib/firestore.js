// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUPhkNEpsx2u62kB5Y-ZamSDzMiJmdbjU",
  authDomain: "sandiwapp-81440.firebaseapp.com",
  projectId: "sandiwapp-81440",
  storageBucket: "sandiwapp-81440.appspot.com",
  messagingSenderId: "1014446807964",
  appId: "1:1014446807964:web:ae0bc8e503f2a8467c4659",
  measurementId: "G-BB2KGE1S7E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

///////////////////////////////////////////////////
function applyQueryFilters(q, { age, batch, lupon, position }) {
  if (age) {
    q = query(q, where("age", "==", age));
  }
  if (batch) {
    q = query(q, where("batch", "==", batch));
  }
  if (lupon) {
    q = query(q, where("lupon", "==", lupon));
  }
  if (position) {
    q = query(q, where("position", "==", position));
  }
  return q;
}

export async function getUsers(db, filters) {
  let userCol = query(collection(db, "users"));
  userCol = applyQueryFilters(userCol, filters);
  const userSnapshot = await getDocs(userCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
}

export async function getUser(db, userId) {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}

export async function getAllUsers(db) {
  const userCol = collection(db, "users");
  const userSnapshot = await getDocs(userCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
}
