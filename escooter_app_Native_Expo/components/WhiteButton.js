import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {
  useFonts,
  RobotoMono_500Medium,
} from '@expo-google-fonts/roboto-mono';
import { AppLoading } from 'expo';

const WhiteButton = () => {
  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  if (!fontsLoaded) {
      return <AppLoading />;
  }

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity title="Press me" style={styles.greyButton}>
            <Text style={styles.greyFont}>Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({

    greyButton: {
      borderRadius: 90,
      backgroundColor: '#FFFFFF',
      width: 200,
      height: 48,
      alignItems: 'center',
      padding: 8,
    },

    buttonContainer: {
      alignItems: 'center',     
      justifyContent: "center",
      paddingTop: 15,
    },

    container: {
      alignItems: 'center',     
      justifyContent: "center",
      paddingTop: 15,
    },

    greyFont: {
      fontFamily: 'RobotoMono_500Medium',
      fontSize: 24,
      color: '#2F4357',
    },
});

export default WhiteButton;