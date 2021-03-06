import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

const CustomButton = ({ onPress, text, style, textStyle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.orangeButton, style]}
          onPress={onPress}
        >
          <Text style={[styles.whiteFont, textStyle]}>{text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orangeButton: {
    borderRadius: 90,
    backgroundColor: "#E77F64",
    width: 200,
    height: 48,
    alignItems: "center",
    padding: 8,
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  whiteFont: {
    fontFamily: "RobotoMono_500Medium",
    fontSize: 24,
    color: "#fff",
  },
});

export default CustomButton;
