"use client";

import { auth, db } from "@/config/firebase";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";


//sign in the user
const provider = new GoogleAuthProvider();
export const googleSignIn = async () => {
  console.log("Started");

  try {
    await signInWithPopup(auth, provider);
    const user = auth.currentUser;

    console.log(user);
    //check if user object exists
    if (user) {
      const userObjRef = doc(db, "users", user.uid);
      const userObjSnap = await getDoc(userObjRef);

      //add user object
      if (!userObjSnap.exists()) {
        await setDoc(userObjRef, {
          userId: user.uid,
          email: user.email,
          name: user.displayName,
          photoUrl: user.photoURL
        });
      }
    }

    return user
  } catch (err) {
    console.log(err);
  }
};
