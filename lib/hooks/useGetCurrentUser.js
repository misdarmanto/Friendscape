import { useState, useEffect } from "react";
import { db } from "../helper/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { useContextApi } from "./useContextApi";

export const useGetCurrentUser = (email) => {
  const [currentUserData, setCurrentUserData] = useState(null);
  const { setCurrentUser } = useContextApi();

  useEffect(() => {
    const docRef = doc(db, "Content", email);
    const unsub = onSnapshot(docRef, (doc) => {
      setCurrentUserData({ id: user.email, ...doc.data() });
      setCurrentUser({ id: user.email, ...doc.data() });
    });
    return () => unsub;
  }, []);
  return [currentUserData];
};
