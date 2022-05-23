import { db } from "../../helper/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const removeMatchNotification = async (currentUserId) => {
  const currentUserDocRef = doc(db, "Users", currentUserId);
  await updateDoc(currentUserDocRef, {
    "notification.match": 0,
  });
};

export const removeChatNotification = async (currentUserId) => {
    const currentUserDocRef = doc(db, "Users", currentUserId);
    await updateDoc(currentUserDocRef, {
      "notification.chat": 0,
    });
  };
