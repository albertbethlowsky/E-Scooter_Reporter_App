import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Alert, Modal } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import CameraText from "../components/CameraText";
import { Camera } from "expo-camera";
import BackButton from "../components/BackButton";
import CustomButton from "../components/CustomButton";
import * as storage from "../data_model/Storage";
import { useFocusEffect } from "@react-navigation/native";

const QRScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setScanned(false);
    }, [])
  );

  //Data variable is what needs to be stored in FireBase
  const handleBarCodeScanned = ({ type, data }) => {
    storage.getReport().setQR(data);
    setScanned(true);
    showModal();
    setTimeout(() => {
      navigation.push("Category");
    }, 1500);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 1500);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        ratio="16:9"
        style={StyleSheet.absoluteFill}
      >
        <View style={{ flex: 0.25 }}>
          <BackButton nav={navigation}></BackButton>
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              alignItems: "center",
              top: Dimensions.get("window").height / 7,
            }}
          >
            <CameraText text="Scan the QR-Code" color="#5B7282" />
          </View>
        </View>

        <View style={{ flex: 0.5, flexDirection: "row", display: "flex" }}>
          <Modal
            animationType="fade"
            transparent
            visible={modalVisible}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
          >
            <View style={styles.modalView}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#2F4357",
                  fontFamily: "RobotoMono_500Medium",
                }}
              >
                The QR-code was succesfully scanned!
              </Text>
            </View>
          </Modal>
          <View style={{ flex: 0.05 }} />
          <View
            style={{
              flex: 0.9,
              borderStyle: "dashed",
              borderRadius: 15,
              borderWidth: 5,
              borderColor: "#FBEFE8",
            }}
          />
          <View style={{ flex: 0.05 }} />
        </View>
        <View
          style={{
            flex: 0.25,
          }}
        >
          <View
            style={{
              width: 250,
              paddingTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <CustomButton
              onPress={() => {
                navigation.push("Category");
              }}
              text="Skip"
            />
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 0.1,
    marginTop: 400,
    marginHorizontal: 50,
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EBC2AD",
    flexDirection: "row",
    display: "flex",
  },
});

export default QRScreen;
