import React, { useEffect, useState } from "react";
import { heightPercentage, widthPercentage } from "../../global/Dimensions";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import ImageRounded from "../Images/ImagesRounded";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./cardStyles";
import Wrapper from "../Wrapper";
import TextParagraph from "../Text/TextParagraph";
import TextTitle from "../Text/TextTitle";
import ButtonPrimary from "../Buttons/ButtonPrimary";
import { useAlgorithm } from "../../lib/hooks/useAlgorithm";
import { useContextApi } from "../../lib/hooks/useContextApi";
import BannerAd from "../AdMob/BannerAd";
import { Primary } from "../../global/Colors";
import RewardedAdd from "../AdMob/RewardedAdd";
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import ModalStyle from "../ModalStyle";
import shareThisApp from "../../lib/functions/playStore/shareFunction";

const Card = ({ cardData, index }) => {
  const { handleUserLike } = useAlgorithm();
  const navigation = useNavigation();
  const { currentUserData } = useContextApi();
  const [buttonTitle, setButtonTitle] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [count, setCount] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const imageUrl =
    "https://firebasestorage.googleapis.com/v0/b/chatapp-cebed.appspot.com/o/defaultImages%2Favatar.jpeg?alt=media&token=791ae238-6189-4d66-b299-862bcc98f3b4";

  const navigateToUserDetail = async () => {
    navigation.navigate("UserDetails", { userTargetData: cardData });
  };

  // check apakah user target sedang menunggu konfirmasi dari user saat ini (btn title "Terima")
  const isWaitToConfirm = currentUserData.userAlreadyLikes.includes(
    cardData.id
  );
  // chek apakah user saat ini sedang menunggu konfirmasi dari user target (btn title "menunggu konfirmasi")
  const confirmThisUser = currentUserData.userLikes.includes(cardData.id);
  // chek apakah chat room sudah ada ( return function boolean)
  const isChatRoomExist = () => {
    return (
      currentUserData.chatId.filter((id) => {
        return id.userChatTargetId === cardData.id;
      }).length !== 0
    );
  };

  // arahkan ke Message screen
  const navigateToMessageScreen = () => {
    const findChatRoomObject = currentUserData.chatId.filter(
      (chatRef) => chatRef.userChatTargetId === cardData.id
    );
    navigation.navigate("Message", {
      chatRef: findChatRoomObject[0].chatRef,
      userProfile: cardData.userProfile,
      name: cardData.name,
      userTargetId: cardData.id,
    });
  };

  const buttonActionOnPress = () => {
    console.log(count);
    if (count % 5 === 0) {
      RewardedAdd();
      setCount(1);
    }
    setCount(count + 1);
    // jika menungu konfirmasi maka berhentikan eksekusi
    if (isWaitToConfirm) return;

    if (confirmThisUser) {
      handleUserLike(cardData);
      setButtonTitle("Kirim Pesan...");
      return;
    }

    // jika chat room ada, arahkan ke message screen
    if (isChatRoomExist()) {
      navigateToMessageScreen();
      return;
    }
    // jika button title "Terima" atau "ajak jadian" eksekusi handleUserLike
    handleUserLike(cardData).then(() => setButtonTitle("Tunggu Konfirmasi"));
  };

  useEffect(() => {
    if (isWaitToConfirm) {
      setButtonTitle("Tunggu konfirmasi");
    } else if (confirmThisUser) {
      setButtonTitle("Terima");
    } else if (isChatRoomExist()) {
      setButtonTitle("Kirim Pesan...");
    } else {
      setButtonTitle("Ajak jadian");
    }
  }, []);

  const handleImageOnScrollRight = (event) => {
    if (event.nativeEvent.contentOffset.x > 0) {
      setImageIndex(1);
    } else {
      setImageIndex(0);
    }
  };

  return (
    <View>
      <Wrapper
        wrapperStyle={{
          marginBottom: 0,
          paddingHorizontal: widthPercentage(2),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ImageRounded
            onPress={navigateToUserDetail}
            source={{ uri: cardData.userProfile.imageUri || imageUrl }}
            size={45}
          />
          <TextTitle TextStyles={{ fontSize: 16 }}>
            {cardData.name} {cardData.age}
          </TextTitle>
        </View>
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </TouchableOpacity>
      </Wrapper>
      <ScrollView horizontal pagingEnabled onScroll={(e) => handleImageOnScrollRight(e)}>
        {cardData.images.map((item, index) => {
          return (
            <Image
              key={index}
              source={{ uri: item.imageUri || null }}
              style={{
                width: widthPercentage(100),
                height: heightPercentage(70),
              }}
            />
          );
        })}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: heightPercentage(1),
        }}
      >
        {cardData.images.length > 1 &&
          cardData.images.map((data, index) => {
            const isActive = index === imageIndex;
            return <Indicator key={index} isActive={isActive} />;
          })}
      </View>
      <View
        style={{
          paddingHorizontal: widthPercentage(2.5),
          paddingBottom: heightPercentage(2),
        }}
      >
        <TextParagraph
          style={{ paddingVertical: heightPercentage(1), color: "gray" }}
        >
          {cardData.description}
        </TextParagraph>
        <ButtonPrimary
          title={buttonTitle}
          onPress={buttonActionOnPress}
          full={true}
          buttonStyle={{ paddingVertical: heightPercentage(0) }}
        />
      </View>
      {index % 3 === 0 && index !== 0 && <BannerAd />}
      <ModalStyle modalVisible={showModal} setModalVisible={setShowModal}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: heightPercentage(5),
          }}
        >
          <IconCircle title={"Share"} onPress={shareThisApp}>
            <Entypo name="share" size={30} color="gray" />
          </IconCircle>
          <IconCircle title={"Blokir"} onPress={() => setShowModal(!showModal)}>
            <MaterialCommunityIcons
              name="account-remove"
              size={30}
              color="gray"
            />
          </IconCircle>
          <IconCircle
            isDanger={true}
            title={"Report"}
            onPress={() => {
              navigation.navigate("Report", { userTargetId: cardData.id });
              setShowModal(!showModal);
            }}
          >
            <AntDesign name="warning" size={30} color="#FF2372" />
          </IconCircle>
        </View>
      </ModalStyle>
    </View>
  );
};

const IconCircle = ({ children, title, onPress, isDanger }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          height: 50,
          width: 50,
          borderRadius: 50 / 2,
          borderWidth: 1,
          borderColor: isDanger ? "#FF2372" : "gray",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </TouchableOpacity>
      <Text style={{ color: isDanger ? "#FF2372" : "gray" }}>{title}</Text>
    </View>
  );
};

const Indicator = ({ isActive }) => {
  return (
    <View
      style={{
        backgroundColor: (isActive && Primary) || "#c5c5c5",
        width: 12,
        height: 12,
        borderRadius: 12 / 2,
        marginHorizontal: widthPercentage(0.5),
      }}
    ></View>
  );
};

export default Card;
