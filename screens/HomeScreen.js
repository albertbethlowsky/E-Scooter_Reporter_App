import React, { useEffect, useState, useRef } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  Alert,
  Animated,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import Button from "../components/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import SvgUri from "expo-svg-uri";
import OverlayHome from "../components/OverlayHome";

const HomeScreen = ({ navigation }) => {
  const transform = useRef(new Animated.Value(-280)).current;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isPress, setIsPress] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log(errorMsg);
        navigation.goBack();
      } else {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", onbackpress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onbackpress);
      };
    }, [])
  );

  function onbackpress() {
    Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  }

  function animate() {
    if (isPress) {
      setIsPress(false);
      Animated.timing(transform, {
        toValue: -280,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      setIsPress(true);
      Animated.timing(transform, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }

  if (location == null) {
    return (
      <View style={[styles.loading]}>
        <ActivityIndicator size="large" color="#E77F64" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        zoomEnabled={true}
        showsUserLocation={true}
        followsUserLocation={true}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => {
          if (isPress) {
            animate();
          }
        }}
      />

      <View style={styles.menuButton}>
        <TouchableOpacity
          onPress={() => {
            animate();
          }}
        >
          <SvgUri
            width="60"
            height="60"
            source={require("../assets/Icons/profile_icon.svg")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.reportButton}>
        <Button nav={navigation} navDir="Camera" text="Report" color="orange" />
      </View>
      <OverlayHome animate={animate} transform={transform} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  reportButton: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 35,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  menuButton: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 40,
    paddingLeft: 25,
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  overlay: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: 280,
    backgroundColor: "#000",
  },
  overlayShow: {
    height: Dimensions.get("window").height,
    width: 280,
    backgroundColor: "#000",
  },
});

export default HomeScreen;
