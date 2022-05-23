import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../layouts";
import { widthPercentage } from "../../global/Dimensions";
import { useContextApi } from "../../lib/hooks/useContextApi";
import { useNavigation } from "@react-navigation/native";
import ImageRounded from "../../components/Images/ImagesRounded";
import List from "../../components/List";
import NotFoundAnimation from "../../components/animations/NotFound";
import { Text, FlatList } from "react-native";
import { removeMatchNotification } from "../../lib/functions/firebaseFireStore/removeNotification";
import HeaderLeftArrow from "../../components/Header/HeaderLeftArrow";

export default function NotificationScreen() {
  const { shareDataCollection, currentUserData } = useContextApi();
  const [userList, setUserList] = useState([]);
  const navigation = useNavigation();

  // search data from shareDataCollection where user id is equel to current user id
  const findUserTargetDataInCollection = () => {
    const result = [];
    currentUserData.userLikes.forEach((userTargetId) => {
      result.push(
        ...shareDataCollection.filter((user) => user.id === userTargetId)
      );
    });
    setUserList(result);
  };

  useEffect(() => {
    findUserTargetDataInCollection();
    removeMatchNotification(currentUserData.id);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderLeftArrow />,
    });
  }, []);

  return (
    <Layout>
      {currentUserData.userLikes.length !== 0 ? (
        <FlatList
          data={userList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <List
              onPress={() =>
                navigation.navigate("UserDetails", { userTargetData: item })
              }
              listStyles={{
                borderBottomWidth: 1,
                borderBottomColor: "#f3f3f3",
              }}
            >
              <ImageRounded
                source={{ uri: item.userProfile.imageUri }}
                size={45}
                opacity={1}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingLeft: widthPercentage(2),
                  flex: 1,
                  flexWrap: "wrap",
                }}
              >
                {item.name}
                <Text style={{ color: "gray" }}> ngajak kamu jadian,</Text>
                <Text> beri dia kepastian</Text>
              </Text>
            </List>
          )}
        />
      ) : (
        <NotFoundAnimation massage="Belum ada notifikasi" />
      )}
    </Layout>
  );
}
