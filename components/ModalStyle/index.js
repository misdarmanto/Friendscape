import React from "react";
import { Modal, View } from "react-native";
import { styles } from "./modalStyles";
import ButtonSecondary from "../Buttons/ButtonSecondary";

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
            {children}
            <ButtonSecondary
              onPress={() => {
                setModalVisible(!modalVisible);
                buttonOnPress !== undefined && buttonOnPress();
              }}
            >
              {buttonTitle}
            </ButtonSecondary>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalStyle;
