import React, {
  useCallback,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "../lib/database/firebase";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContextApi } from "../lib/hooks/useContextApi";
import ImageRounded from "../components/Images/ImagesRounded";
import HeaderLeftArrow from "../components/Header/HeaderLeftArrow";
import { KeyboardAvoidingView, View, Text } from "react-native";
import { widthPercentage } from "../global/Dimensions";
import {
  getObjectFromLocalStorage,
  getValueFromLocalStorage,
  storeObjectToLocalStorage,
  storeValueToLocalStorage,
} from "../lib/functions/asyncStorage/localStorage";
import LoadingAnimation from "../components/animations/LoadingAnimation";
import RewardedAdd from "../components/AdMob/RewardedAdd";

export default function MessageScreen() {
  // this params need four variable
  const { chatRef, userProfile, name, userTargetId } = useRoute().params;
  const [messages, setMessages] = useState([]);
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);
  const [countMessage, setCountMessage] = useState(0);
  const [count, setCount] = useState(1)

  const navigation = useNavigation();
  const { currentUserData } = useContextApi();
  const collRef = collection(db, "Chats", `doc_${chatRef}`, `coll_${chatRef}`);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ImageRounded
          size={40}
          source={{ uri: userProfile.imageUri || null }}
          onPress={() =>
            navigation.navigate("ImageDetail", {
              imageUri: userProfile.imageUri,
            })
          }
          styles={{ paddingRight: widthPercentage(2) }}
        />
      ),
      headerLeft: () => <HeaderLeftArrow />,
      title: name,
    });
  }, []);

  const onSend = useCallback(async (msg = []) => {
    const { _id, createdAt, text, user } = msg[0];
    await addDoc(collRef, {
      _id,
      createdAt,
      text,
      user,
      index: Date.now(),
    });
  }, []);

  useEffect(() => {
    // console.log(count)
    // if(count % 10 === 0) {
    //   RewardedAdd()
    //   setCount(1)
    // }
    // setCount(count + 1)

    const saveData = async () => {
      await storeValueToLocalStorage(`@date${chatRef}`, Date.now());
      await storeObjectToLocalStorage(`@message${chatRef}`, messages);
      setCountMessage(countMessage + 1);
    };
    if (messages.length !== 0) saveData();

    // clean up function
    return () => {
      if (messages.length === 0) return;
      const updateChatIdOfUserTarget = async () => {
        // cari chat refrence dari user saat ini didalam user target
        // lalu update nilai chatId didalam user target
        const docRefUserTarget = doc(db, "Users", userTargetId);
        const docSnap = await getDoc(docRefUserTarget);
        const documentTarget = docSnap.data();
        // find index of user saat ini didalam field chat id target, lalu modifikasi
        const indexOfUserTarget = documentTarget.chatId.findIndex((data) => {
          return data.userChatTargetId === currentUserData.id;
        });

        // edit last message
        documentTarget.chatId[indexOfUserTarget].lastMessage = messages[0].text;
        documentTarget.chatId[indexOfUserTarget].newMessageTotal = countMessage;

        await updateDoc(docRefUserTarget, {
          chatId: documentTarget.chatId,
        });
      };
      updateChatIdOfUserTarget();
    };
  }, [messages]);

  useEffect(() => {
    let unsubscribe;
    const getData = async () => {
      const previousDate = await getValueFromLocalStorage(
        `@date${chatRef}`
      ).then((value) => (value === undefined ? 0 : parseInt(value)));

      const localMessage = await getObjectFromLocalStorage(
        `@message${chatRef}`
      );

      const q = query(
        collRef,
        where("index", ">", previousDate),
        orderBy("index", "desc")
      );

      unsubscribe = onSnapshot(q, (snapshot) => {
        const result = snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
          index: doc.data().index,
        }));

        console.log("____message from server : " + result.length);
        console.log("____message from local  : " + localMessage.length);

        const sortedMesage = [...localMessage, ...result];
        sortedMesage.sort((a, b) => b.index - a.index);
        setMessages(sortedMesage);
        setIsDataAvaliable(true);
      });
    };
    getData();
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isDataAvaliable ? (
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={(msg) => {
            onSend(msg);
          }}
          user={{ _id: currentUserData.id }}
          renderAvatar={null}
          renderBubble={(props) => {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  left: {
                    backgroundColor: "#e3e3e3",
                  },
                }}
              />
            );
          }}
        />
      ) : (
        <LoadingAnimation />
      )}
      <KeyboardAvoidingView />
    </View>
  );
}
