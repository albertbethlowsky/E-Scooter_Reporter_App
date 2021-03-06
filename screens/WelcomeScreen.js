import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";
import Headline from "../components/Headline";
import * as storage from "../data_model/Storage";
import * as firebaseDataBase from "../data_model/Firebase";
import SvgUri from "expo-svg-uri";
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ marginRight: 15, marginLeft: 15 }}>
        <Headline text="Welcome!" />
        <Text style={styles.fontStyle}>How would you like to use the app?</Text>
        <TouchableOpacity
          onPress={async () => {
            const result = await firebaseDataBase.signInWithGoogleAsync();
            if (result.type === "success") {
              storage.setUser(result.user.user.email);

              navigation.navigate("Home");
            } else {
              console.log("Something went wrong");
            }
          }}
          style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 90,
            backgroundColor: "#E77F64",
            width: 250,
            height: 48,
            padding: 8,
            textAlign: "center",
          }}
        >
          <SvgUri
            source={require("../assets/brand_logos/logo_google.svg")}
            width="20"
            height="35"
            style={{ paddingLeft: 0, alignSelf: "flex-start" }}
          />
          <Text
            style={{
              fontFamily: "RobotoMono_500Medium",
              fontSize: 16,
              color: "#fff",
              paddingLeft: 10,
            }}
          >
            Sign in with Google
          </Text>
        </TouchableOpacity>

        <Text style={styles.fontStyleforOr}>or</Text>
        <View style={styles.buttonview}>
          <CustomButton
            onPress={() => {
              console.log("Setting guest to true");
              navigation.push("Home");
            }}
            text="Continue as guest"
            style={{ justifyContent: "center" }}
            textStyle={{ fontSize: 16 }}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: "RobotoMono_500Medium",
    color: "#FBEFE8",
    fontSize: 18,
    lineHeight: 36,
    textAlign: "center",
    paddingBottom: 30,
  },

  fontStyleforOr: {
    fontFamily: "RobotoMono_500Medium",
    color: "#FBEFE8",
    fontSize: 18,
    lineHeight: 36,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },

  container: {
    flex: 1,
    backgroundColor: "#2F4357",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {},
});

export default WelcomeScreen;
