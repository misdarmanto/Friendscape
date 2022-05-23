import React from "react";
import { TouchableOpacity } from "react-native";
import { styles } from "./listStyles";

const List = ({ children, listStyles, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.list, listStyles]}>
      {children}
    </TouchableOpacity>
  );
};

export default List;
