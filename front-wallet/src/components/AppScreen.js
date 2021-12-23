import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "./styles";
import {Constants} from 'expo-constants'

const { width } = Dimensions.get('window');


const AppScreen = ({ children }) => {
  return (
    <View style={styles.container}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue
  }
});

export default AppScreen;
