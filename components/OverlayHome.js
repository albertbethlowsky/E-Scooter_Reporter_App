import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SvgUri from "expo-svg-uri";
import Headline from "./Headline";
import * as storage from "../data_model/Storage";
import OverlayReport from "./OverlayReport";
import LogOutButton from "./LogOutButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect } from "@react-navigation/native";

const OverlayHome = (props) => {
  const [reports, setReports] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fillreports();
      console.log("GOGO");
    }, [])
  );

  useEffect(() => {
    console.log();
    fillreports();
  }, []);

  function fillreports() {
    const temparr = [];
    storage.getUserReports().forEach((obj) => {
      const address = obj.address;
      const imageURI = obj.imageURL;
      const date = obj.timestamp.seconds;

      var time = new Date(1970, 0, 1); // Epoch
      time.setSeconds(date);
      const key = obj.uuid;
      temparr.push(
        <OverlayReport
          address={address}
          imageURI={imageURI}
          key={key}
          date={time.toLocaleString()}
        />
      );
    });
    setReports(temparr);
  }

  return (
    <Animated.View
      style={{
        position: "absolute",
        justifyContent: "space-between",
        width: Dimensions.get("window").width * 0.8,
        backgroundColor: "rgba(47, 67, 87, 0.9)",
        alignSelf: "stretch",
        height: Dimensions.get("window").height,
        left: 0,
        flex: 1,
        transform: [{ translateX: props.transform }],
      }}
    >
      <View style={{ flex: 0.5 }}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-start",
            borderRadius: 20,
            paddingLeft: 20,
            paddingTop: 20,
          }}
          onPress={() => {
            props.animate();
          }}
        >
          <SvgUri
            width="35"
            height="35"
            source={require("../assets/Icons/Group.svg")}
          ></SvgUri>
        </TouchableOpacity>
        <Headline text="Reports" flex={{ flex: 1 }} />
      </View>
      <SafeAreaView
        style={{
          height: Dimensions.get("window").height * 0.75,
        }}
      >
        <ScrollView>{reports}</ScrollView>
      </SafeAreaView>

      <View
        style={{
          alignSelf: "center",
          marginBottom: 20,
          height: Dimensions.get("window").height * 0.05,
        }}
      >
        <LogOutButton nav={props.nav} />
      </View>
    </Animated.View>
  );
};

export default OverlayHome;
