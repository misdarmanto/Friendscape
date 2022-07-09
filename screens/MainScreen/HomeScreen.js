import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import Layout from "../../layouts";
import Card from "../../components/Card";
import { useContextApi } from "../../lib/hooks/useContextApi";
import HeaderLeft from "../../components/Header/HeaderLeft";
import HeaderRight from "../../components/Header/HeaderRight";
import { useNavigation } from "@react-navigation/native";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { getObjectFromLocalStorage } from "../../lib/functions/asyncStorage/localStorage";
import ListHeader from "../../components/ListHeaderComponent/ListHeader";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [dataCollection, setDataCollection] = useState([]);
  const [friends, setFriends] = useState([]);

  const navigation = useNavigation();
  const { shareDataCollection, currentUserData } = useContextApi();
  const newArrayForContent = [...shareDataCollection]

  const onRefresh = useCallback(() => {
    const getDataFromLocalStorage = async () => {
      const data = await getObjectFromLocalStorage("@dataCollection");
      filterContent(data);
      setRefreshing(false);
    };
    getDataFromLocalStorage();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderLeft />,
      headerRight: () => <HeaderRight />,
      title: "",
    });
  }, []);

  const filterContent = (data) => {
    const friendsContainer = [];
    currentUserData.chatId.forEach((user) => {
      const result = data.find((data) => {
        return data.id === user.userChatTargetId;
      });
      const index = data.indexOf(result);
      data.splice(index, 1);
      friendsContainer.push(result);
    });

    data.sort((a, b) => 0.5 - Math.random());
    friendsContainer.sort((a, b) => 0.5 - Math.random());
    setFriends(friendsContainer);
    setDataCollection(data);
  };

  useEffect(() => {
    filterContent(newArrayForContent);
  }, []);

  return (
    <Layout style={{ paddingHorizontal: 0 }}>
      <FlatList
        ListHeaderComponent={() => (
          <FlatList
            style={{ borderBottomWidth: 1, borderBottomColor: "#e3e3e3" }}
            horizontal={true}
            data={friends}
            keyExtractor={(key) => key.id}
            renderItem={({ item }) => <ListHeader item={item} />}
          />
        )}
        showsVerticalScrollIndicator={false}
        data={dataCollection}
        renderItem={({ item, index }) => <Card cardData={item} index={index} />}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // ListFooterComponent={() => <Text>hello world</Text>}
        // initialScrollIndex={1}
      />
    </Layout>
  );
};

export default HomeScreen;
