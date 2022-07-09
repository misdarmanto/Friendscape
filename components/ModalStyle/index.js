import React from "react";
import { Modal, View, TouchableOpacity } from "react-native";
import { styles } from "./modalStyles";
import ButtonSecondary from "../Buttons/ButtonSecondary";
import { AntDesign } from "@expo/vector-icons";

const ModalStyle = ({
  children,
  modalVisible,
  setModalVisible,
  buttonTitle,
  buttonOnPress,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FFC1D8",
                  height: 35,
                  width: 35,
                  borderRadius: 35 / 2,
                }}
              >
                <AntDesign name="close" size={25} color="#FF2372" />
              </TouchableOpacity>
            </View> */}

            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalStyle;
