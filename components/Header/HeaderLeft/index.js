import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useContextApi } from "../../../lib/hooks/useContextApi";
import ImageRounded from "../../Images/ImagesRounded";
import TextFormat from "../../Text/TextFormat";

export default HeaderLeft = () => {
  const navigation = useNavigation();
  const { currentUserData } = useContextApi();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ImageRounded
        source={{ uri: currentUserData.userProfile.imageUri }}
        size={45}
        onPress={() => navigation.navigate("Profile")}
      />
      <TextFormat text={currentUserData.name} />
    </View>
  );
};
