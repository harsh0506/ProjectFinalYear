import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "./FirebaseConfig";
import { currentUser } from '../GlobalState/Globalstate'
import { createState, useState } from '@hookstate/core';
import { getTask } from "./Crud";

const auth = getAuth(app);
export const SigninMethod = async (email, password) => {
    try {
        const userCrential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCrential.user.email, userCrential.user.uid,userCrential.user.displayName)
        const data = {userId : userCrential.user.uid , userEmail : userCrential.user.email }
        return data
    } catch (error) { console.log(error) }
}
export const LoginMethod = async (email, password) => {
    try {
        const userCrential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCrential.user.email, userCrential.user.uid)
        return [userCrential.user.email, userCrential.user.uid]
    } catch (error) { console.log(error) }
}
export const SignOutMethod = async () => {
    try {
        const userCrential = await signOut(auth)
    } catch (error) { console.log(error) }
}
export const checkauth = async () => {
    const curUser = auth.currentUser
    console.log(curUser)
}