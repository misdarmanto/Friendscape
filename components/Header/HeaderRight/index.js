import { useNavigation } from "@react-navigation/native";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import Notification from "./Notification";
import { useContextApi } from "../../../lib/hooks/useContextApi";
import { TouchableOpacity } from "react-native";
import { widthPercentage } from "../../../global/Dimensions";

export default HeaderRight = () => {
  const navigation = useNavigation();
  const { currentUserData } = useContextApi();

  const findTotalOfMessageNotification = () => {
    let total = 0;
    currentUserData.chatId.forEach((value) => {
      total += value.newMessageTotal;
    });
    return total;
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notification")}
          style={{ paddingHorizontal: widthPercentage(2) }}
        >
          <EvilIcons name="heart" size={40} color={"#000"} />
        </TouchableOpacity>
        <Notification NotificationLength={currentUserData.notification.match} />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ListChat")}
          style={{ paddingHorizontal: widthPercentage(2) }}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={30}
            color="black"
          />
        </TouchableOpacity>
        <Notification NotificationLength={findTotalOfMessageNotification()} />
      </View>
    </View>
  );
};
