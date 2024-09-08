import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const createUser = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const logInUser = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const doSignOut = async () => {
  localStorage.clear();
  return auth.signOut();
}