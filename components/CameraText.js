import React from "react";
import { View, Text } from "react-native";
import AppLoading from "expo-app-loading";

const CameraText = (props) => {
  return (
    <View
      style={{
        backgroundColor: props.color,
        paddingLeft: 20,
        paddingRight: 20,
        height: 40,
        borderRadius: 5,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontFamily: "RobotoMono_500Medium",
          fontSize: 16,
        }}
      >
        {props.text}
      </Text>
    </View>
  );
};

export default CameraText;
