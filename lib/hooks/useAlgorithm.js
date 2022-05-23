import { db } from "../helper/firebase";
import {
  collection,
  updateDoc,
  doc,
  arrayUnion,
  addDoc,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { useContextApi } from "./useContextApi";

export const useAlgorithm = () => {
  const { currentUserData } = useContextApi();

  const handleUserLike = async (userTarget) => {
    console.log("__________________start algorithm__________________");
    // doc ref
    const curentUserDocRef = doc(db, "Users", currentUserData.id);
    const userTargetDocRef = doc(db, "Users", userTarget.id);

    // chek apakah chat room sudah dibuat?... jika ya maka hentikan eksekusi code
    // const isUserAlreadyMatch = currentUserData.chatId.filter(
    //   (data) => data.userChatTargetId === userTarget.id
    // );
    // if (isUserAlreadyMatch.length !== 0) return;

    // create chat room if in curent user document include user target id
    //run this code if di dalam user saat ini terdapat user id target
    if (currentUserData.userLikes.includes(userTarget.id)) {
      // check apakah chat room sudah dibuat? jika sudah dibuat keluar dari code ini
      if (currentUserData.chatId.length !== 0) {
        const isChatRoomExis = currentUserData.chatId.some((value) => {
          return value.userChatTargetId === userTarget.id;
        });
        if (isChatRoomExis) return;
      }

      try {
        // create document/colocetion for chats room
        const colref = collection(
          db,
          "Chats",
          `doc_${currentUserData.id}&${userTarget.id}`,
          `coll_${currentUserData.id}&${userTarget.id}`
        );
        await addDoc(colref, { test: "hello" });

        // simpan alamat documnet dan collection chat room di user saat ini
        const chatRoomAddress = `${currentUserData.id}&${userTarget.id}`;
        await updateDoc(curentUserDocRef, {
          chatId: arrayUnion({
            chatRef: chatRoomAddress,
            userChatTargetId: userTarget.id,
            lastMessage: "",
            newMessageTotal: 0
          }),
          // hapus record user target id  di user saat ini
          userLikes: arrayRemove(userTarget.id),
        });

        // simpan alamat documnet dan collection chat room di user target
        await updateDoc(userTargetDocRef, {
          chatId: arrayUnion({
            chatRef: chatRoomAddress,
            userChatTargetId: currentUserData.id,
            lastMessage: "",
          }),
          // kirim notifikasi chat ke user target
          "notification.chat": increment(1),
          // hapus record user saat ini di record user target
          userAlreadyLikes: arrayRemove(currentUserData.id),
        });
      } catch (e) {
        console.log(e);
      }
      return;
    }

    // set user id to user target documnet if in record not include user target
    //user already likes adalah pengganti dari userlike, untuk mengecek apakah id sedah ada di record
    //this code equel to if(!userTaget.userLikes.includes(curentUser.id))
    if (!currentUserData.userAlreadyLikes.includes(userTarget.id)) {
      try {
        // record data (curent user id) ke user target
        await updateDoc(userTargetDocRef, {
          userLikes: arrayUnion(currentUserData.id),
          // kirim notification match ke  user target
          "notification.match": increment(1),
        });
        // record data (usertarget id) ke user saat ini
        await updateDoc(curentUserDocRef, {
          userAlreadyLikes: arrayUnion(userTarget.id),
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
  return { handleUserLike };
};
