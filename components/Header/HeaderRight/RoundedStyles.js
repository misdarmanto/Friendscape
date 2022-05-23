import { View, TouchableOpacity } from "react-native";
import { widthPercentage } from "../../../global/Dimensions";
import { styles } from "./headerRightStyle";

export default RoundedStyles = ({ children, onPress}) => (
  <View style={{ marginHorizontal: widthPercentage(3) }}>
    <TouchableOpacity onPress={onPress} style={styles.rounded}>
      {children}
    </TouchableOpacity>
  </View>
);
