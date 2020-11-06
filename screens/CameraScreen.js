import React, { useState, useEffect, useRef } from "react";
import {
	Text,
	ActivityIndicator,
	TouchableOpacity,
	View,
	StyleSheet,
} from "react-native";
import { Permissions } from "expo";
import { Camera } from "expo-camera";
import SvgUri from "expo-svg-uri";
import CameraText from "../components/CameraText";
import * as globals from "../components/Global";
import * as FileSystem from "expo-file-system";

const CameraSceen = ({ navigation }) => {
	const [hasPermission, setHasPermission] = useState(null);
	const [age, setAge] = useState(false);
	const [cameraRef, setCameraRef] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	function goBack() {
		navigation.goBack();
	}

	if (hasPermission === null) {
		return (
			<View style={[styles.loading]}>
				<ActivityIndicator size="large" color="#E77F64" />
			</View>
		);
	}
	if (hasPermission === false) {
		goBack({ navigation });
		alert("No access to Camera");
		return (
			<View style={[styles.loading]}>
				<ActivityIndicator size="large" color="#E77F64" />
				<Text>No access to camera</Text>
			</View>
		);
	}

	return (
		<Camera
			ratio="16:9"
			style={StyleSheet.absoluteFill}
			type={type}
			ref={(ref) => {
				setCameraRef(ref);
			}}
		>
			<View
				style={{
					display: "flex",
					flex: 1,
					backgroundColor: "transparent",
					flexDirection: "column",
					paddingTop: 50,
				}}
			>
				<View
					style={{
						flex: 1,
						alignSelf: "center",
						alignItems: "center",
						paddingTop: 30,
					}}
				>
					<CameraText text="Take a picture of the incident" />
				</View>

				<TouchableOpacity
					style={{
						flex: 0.25,
						alignSelf: "center",
						alignItems: "flex-start",
						paddingBottom: 0,
					}}
					onPress={async () => {
						if (cameraRef) {
							let photo = await cameraRef.takePictureAsync();
							console.log("Saved Photo in:");
							console.log(photo.uri);
              //TODO: Use photo uri path to send to Report.
							navigation.push("QRScreen");
						}
					}}
				>
					<SvgUri
						width="76"
						height="76"
						source={require("../assets/Icons/take_photo.svg")}
					/>
				</TouchableOpacity>
			</View>
		</Camera>
	);
};

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	noCamera: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default CameraSceen;
