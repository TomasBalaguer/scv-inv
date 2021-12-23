import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Dashboard from "./src/screens/Dashboard";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Colors } from "./src/components/styles";
import Trade from "./src/screens/Trade";


const Stack = createNativeStackNavigator();

const CustomStatusBar = ({ backgroundColor, barStyle = "light" }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ height: insets.top, backgroundColor }}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        style={barStyle}
      />
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor={Colors.blue} />
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{headerShown: false}}>
          <Stack.Screen name="Dashboard" component={Dashboard} options={{unmountOnBlur: true}} />
          <Stack.Screen name="Trade" component={Trade} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
