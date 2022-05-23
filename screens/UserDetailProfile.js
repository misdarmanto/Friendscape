import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../layouts";
import { ScrollView } from "react-native";
import TextTitle from "../components/Text/TextTitle";
import { heightPercentage, widthPercentage } from "../global/Dimensions";
import ImageRounded from "../components/Images/ImagesRounded";
import { useContextApi } from "../lib/hooks/useContextApi";
import ModalStyle from "../components/ModalStyle";
import ImageWraper from "../components/Images/ImageWraper";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import TextParagraph from "../components/Text/TextParagraph";
import Wrapper from "../components/Wrapper";
import { useAlgorithm } from "../lib/hooks/useAlgorithm";
import { Primary } from "../global/Colors";
import HeaderLeftArrow from "../components/Header/HeaderLeftArrow";

const UserDetailProfile = () => {
  const { userTargetData } = useRoute().params;
  const { currentUserData } = useContextApi();
  const { handleUserLike } = useAlgorithm();
  const navigation = useNavigation();

  const [buttonTitle, setButtonTitle] = useState("");

  // check apakah user target sedang menunggu konfirmasi dari user saat ini (btn title "Terima")
  const waitToConfirm = currentUserData.userAlreadyLikes.includes(
    userTargetData.id
  );
  // chek apakah user saat ini sedang menunggu konfirmasi dari user target (btn title "menunggu konfirmasi")
  const confirmThisUser = currentUserData.userLikes.includes(userTargetData.id);
  // chek apakah chat room sudah ada ( return function boolean)
  const isChatRoomExist = () => {
    return (
      currentUserData.chatId.filter(
        (id) => id.userChatTargetId === userTargetData.id
      ).length !== 0
    );
  };

  // arahkan ke Message screen
  const navigateToMessageScreen = () => {
    const findChatRoomObject = currentUserData.chatId.filter(
      (chatRef) => chatRef.userChatTargetId === userTargetData.id
    );
    navigation.navigate("Message", {
      chatRef: findChatRoomObject[0].chatRef,
      userProfile: userTargetData.userProfile,
      name: userTargetData.name,
      userTargetId: userTargetData.id,
    });
  };

  const buttonActionOnPress = () => {
    // jika chat room ada, arahkan ke message screen
    if (isChatRoomExist()) {
      navigateToMessageScreen();
      return;
    }
    // jika menungu konfirmasi maka berhentikan eksekusi
    if (waitToConfirm) return;
    // jika button title "Terima" atau "ajak jadian" eksekusi handleUserLike
    handleUserLike(userTargetData).then(() => {
      setButtonTitle("Kirim pesan...");
    });
  };

  useEffect(() => {
    if (waitToConfirm) {
      setButtonTitle("Tunggu konfirmasi");
    } else if (confirmThisUser) {
      setButtonTitle("Terima");
    } else if (isChatRoomExist()) {
      setButtonTitle("Kirim pesan...");
    } else {
      setButtonTitle("Ajak jadian");
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderLeftArrow />,
    });
  }, []);

  return (
    <Layout style={{ paddingHorizontal: widthPercentage(1) }}>
      <ScrollView>
        {/* imgae Profile */}
        <Wrapper wrapperStyle={{ justifyContent: "flex-start" }}>
          <ImageRounded
            source={{ uri: userTargetData.userProfile.imageUri }}
            size={60}
            opacity={1}
            onPress={() =>
              navigation.navigate("ImageDetail", {
                imageUri: userTargetData.userProfile.imageUri,
              })
            }
          />
          <TextTitle style={{ paddingHorizontal: widthPercentage(3) }}>
            {userTargetData.name} {userTargetData.age}
          </TextTitle>
        </Wrapper>

        <TextParagraph style={{ paddingHorizontal: widthPercentage(2) }}>
          {userTargetData.description}
        </TextParagraph>

        {/* button action ajak jadian */}
        <ButtonPrimary
          title={buttonTitle || "ajak jadian"}
          full={true}
          onPress={buttonActionOnPress}
        />

        {/* image wrapper */}
        <ImageWraper
          imageArray={userTargetData.images}
          styles={{ marginTop: heightPercentage(5) }}
        />
      </ScrollView>
    </Layout>
  );
};

export default UserDetailProfile;
