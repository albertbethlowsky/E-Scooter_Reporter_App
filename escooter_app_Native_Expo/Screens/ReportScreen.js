import React, { useState } from "react";
import { View, StyleSheet} from "react-native";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { AppLoading } from "expo";
import Headline from "../components/Headline.js";

const ReportScreen = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
      RobotoMono_500Medium,
    });
  
    if (!fontsLoaded) {
      return <AppLoading />;
    }
  
    return (
      <View style={styles.container}>
        <Headline text="Your report" flex={{ flex: 0.2 }}/>
        
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      paddingLeft: 15,
      paddingRight: 15,
      flex: 1,
      backgroundColor: "#2F4357",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: 50,
    },
    description: {
      fontFamily: "RobotoMono_500Medium",
      color: "#FBEFE8",
      fontSize: 18,
      lineHeight: 36,
      textAlign: "center",
    },
    infoText: {
      fontFamily: "RobotoMono_500Medium",
      color: "#FBEFE8",
      fontSize: 18,
      lineHeight: 36,
      textAlign: "center",
      flex: 0.3,
    },
    buttons: {
      paddingTop: 20,
      flex: 1,
    },
  });
  
  export default ReportScreen;
  