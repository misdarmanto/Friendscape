import React, { useLayoutEffect } from "react";
import Layout from "../layouts";
import { Text, FlatList } from "react-native";
import List from "../components/List";
import { heightPercentage, widthPercentage } from "../global/Dimensions";
import TextTitle from "../components/Text/TextTitle";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../lib/database/firebase";
import { useContextApi } from "../lib/hooks/useContextApi";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderLeftArrow from "../components/Header/HeaderLeftArrow";

const ReportScreen = () => {
  const reportMessage = [
    { id: 1, message: "Saya tidak menyukainya" },
    { id: 2, message: "Perundungan (bullying) atau pelecehan" },
    { id: 3, message: "Ketelanjangan atau aktivitas seksual" },
    { id: 4, message: "Ujaran atau simbol kebencian" },
    { id: 5, message: "Pelanggaran hak kekayaan intelektual" },
  ];

  const { currentUserData } = useContextApi();
  const { userTargetId } = useRoute().params;
  const navigation = useNavigation();

  const onPressList = async (message) => {
    const report = {
      pelapor: currentUserData.id,
      dilaporkan: userTargetId,
      message: message,
      time: Timestamp.now(),
    };
    try {
      const collectionRef = doc(
        db,
        "Report",
        `${currentUserData.id}_${Timestamp.now().seconds}`
      );
      await setDoc(collectionRef, { report });
    } catch (err) {
      console.error(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderLeftArrow />,
    });
  }, []);

  return (
    <Layout>
      <TextTitle
        TextStyles={{
          paddingHorizontal: widthPercentage(2),
          paddingVertical: heightPercentage(5),
          fontSize: 18,
        }}
      >
        Mengapa anda melaporkan postingan ini?
      </TextTitle>

      <FlatList
        data={reportMessage}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List onPress={() => onPressList(item.message)}>
            <Text
              style={{ fontSize: 16, paddingVertical: heightPercentage(1) }}
            >
              {item.message}
            </Text>
          </List>
        )}
      />
    </Layout>
  );
};

export default ReportScreen;
