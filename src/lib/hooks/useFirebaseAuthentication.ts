import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

const useFirebaseAuthentication = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, (user) => {
      user ? setAuthUser(user) : setAuthUser(null);
    });

    return () => {
      unlisten();
    };
  }, []);

  async function signIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  function signOutUser() {
    signOut(auth);
  }

  return { authUser, signIn, signOutUser };
};

export { useFirebaseAuthentication };
