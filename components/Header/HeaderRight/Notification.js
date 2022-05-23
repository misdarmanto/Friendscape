import { Text } from "react-native";
import { styles } from "./headerRightStyle";

export default Notification = ({ NotificationLength }) => {
  return (
    NotificationLength !== 0 && (
      <Text style={styles.notification}>{NotificationLength}</Text>
    )
  );
};
