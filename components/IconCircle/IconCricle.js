import { TouchableOpacity } from "react-native";
import { Primary } from "../../global/Colors";
import { heightPercentage, widthPercentage } from "../../global/Dimensions";

export default IconCircle = ({ children, onPress, styles }) => {
  return (
    <TouchableOpacity
      style={[
        {
          borderRadius: 50 / 2,
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: widthPercentage(2),
        },
        styles,
      ]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};
