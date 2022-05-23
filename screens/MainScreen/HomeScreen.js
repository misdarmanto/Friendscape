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
import { FlatList, RefreshControl } from "react-native";
import { getObjectFromLocalStorage } from "../../lib/functions/asyncStorage/localStorage";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [dataCollection, setDataCollection] = useState([]);
  const navigation = useNavigation();
  const { shareDataCollection } = useContextApi();

  const onRefresh = useCallback(() => {
    const getDataFromLocalStorage = async () => {
      const data = await getObjectFromLocalStorage("@dataCollection");
      data.sort((a, b) => 0.5 - Math.random());
      setDataCollection(data);
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

  useEffect(() => {
    setDataCollection(shareDataCollection);
  }, []);

  return (
    <Layout style={{ paddingHorizontal: 0 }}>
      <FlatList
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
