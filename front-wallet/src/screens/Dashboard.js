import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import AppScreen from "../components/AppScreen";
import InvestmentBox from "../components/InvestmentBox";
import { Colors } from "../components/styles";
import dataApi from "./../services/data";



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const Dashboard = () => {
  const [user, setUser] = useState();


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUser()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getUser = async () => {
    const { data: data, ok: response, status } = await dataApi.getUser();
    console.log(data.balance);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AppScreen>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.white} />
        }
      >
        <View style={styles.container}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Hola {user && user.name}</Text>
          </View>
          {user && (
            <InvestmentBox
              investments={user.investments}
              balance={user.balance}
            />
          )}

          <Text>Es un Dashboard</Text>
        </View>
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBox: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: Colors.white,
  },
});
export default Dashboard;
