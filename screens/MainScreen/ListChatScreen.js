import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../layouts";
import { useContextApi } from "../../lib/hooks/useContextApi";
import List from "../../components/List";
import { heightPercentage, widthPercentage } from "../../global/Dimensions";
import TextTitle from "../../components/Text/TextTitle";
import ImageRounded from "../../components/Images/ImagesRounded";
import NotFoundAnimation from "../../components/animations/NotFound";
import HeaderLeftArrow from "../../components/Header/HeaderLeftArrow";
import { FlatList, View, Text } from "react-native";
import { Primary } from "../../global/Colors";
import { StyleSheet } from "react-native";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../lib/database/firebase";

const ListChatScreen = () => {
  const [userList, setUserList] = useState([]);
  const navigation = useNavigation();
  const { currentUserData, shareDataCollection } = useContextApi();

  // ambil semua user target Id didalam chatId user saat ini,
  //lalu cari data lengkapnya didalam share data collection
  const findUserTargetInCollection = () => {
    if (currentUserData.chatId.length === 0) return;
    const result = [];
    currentUserData.chatId.forEach((chatObjRef) => {
      const userTargetdata = shareDataCollection.filter((userTarget) => {
        return userTarget.id === chatObjRef.userChatTargetId;
      });

      userTargetdata[0].chatRoom = chatObjRef;
      result.push(...userTargetdata);
    });
    result.sort(
      (a, b) => b.chatRoom.newMessageTotal - a.chatRoom.newMessageTotal
    );
    setUserList(result);
  };

  // hapus notifikasi pesan per user di user chatId saat ini
  const removeMessageNotification = async (id) => {
    const indexOfUser = currentUserData.chatId.findIndex((user) => {
      return user.userChatTargetId === id;
    });
    currentUserData.chatId[indexOfUser].newMessageTotal = 0;

    const docRef = doc(db, "Users", currentUserData.id);
    await updateDoc(docRef, {
      chatId: currentUserData.chatId,
    });
  };

  const navigateToMessageScreen = (userTarget) => {
    removeMessageNotification(userTarget.id);
    navigation.navigate("Message", {
      chatRef: userTarget.chatRoom.chatRef,
      userProfile: userTarget.userProfile,
      name: userTarget.name,
      userTargetId: userTarget.id,
    });
  };

  useEffect(() => {
    if (currentUserData.chatId.length !== 0) {
      findUserTargetInCollection();
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderLeftArrow />,
    });
  }, []);

  return (
    <Layout>
      {currentUserData.chatId.length !== 0 ? (
        <FlatList
          data={userList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <List
              listStyles={{
                paddingVertical: heightPercentage(0.1),
                justifyContent: "space-between",
              }}
              onPress={() => navigateToMessageScreen(item)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ImageRounded
                  source={{ uri: item.userProfile.imageUri }}
                  size={50}
                  opacity={1}
                />
                <View style={{ marginLeft: widthPercentage(2) }}>
                  <TextTitle>{item.name}</TextTitle>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 12,
                      paddingLeft: widthPercentage(1),
                    }}
                  >
                    {item.chatRoom.lastMessage.length > 30
                      ? item.chatRoom.lastMessage.slice(0, 30) + "..."
                      : item.chatRoom.lastMessage}
                  </Text>
                </View>
              </View>
              {item.chatRoom.newMessageTotal !== 0 && (
                <View style={styles.notification}>
                  <Text style={{ color: "#FFF", fontSize: 10 }}>
                    {item.chatRoom.newMessageTotal}
                  </Text>
                </View>
              )}
            </List>
          )}
        />
      ) : (
        <NotFoundAnimation massage="Belum ada pesan" />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  notification: {
    minWidth: 20,
    minHeight: 20,
    borderRadius: 20 / 2,
    backgroundColor: Primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    marginHorizontal: widthPercentage(2),
  },
});

export default ListChatScreen;
