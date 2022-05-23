import React, { useState } from "react";
import { Gray, Blue } from "../../../global/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default CheckBox = ({}) => {
  const [checked, setChecked] = useState(false);
  return checked ? (
    <MaterialIcons
      name="check-box"
      size={35}
      color={Blue}
      onPress={() => setChecked(!checked)}
    />
  ) : (
    <MaterialIcons
      name="check-box-outline-blank"
      size={35}
      color={Gray}
      onPress={() => setChecked(!checked)}
    />
  );
};
