import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import AppScreen from "../components/AppScreen";
import BonosBox from "../components/BonosBox";
import InvestmentBox from "../components/InvestmentBox";
import PieChart from "../components/PieChart";
import { Colors } from "../components/styles";
import dataApi from "./../services/data";



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const Dashboard = ({navigation}) => {
  const [user, setUser] = useState();
  const [bonos, setBonos] = useState();
  const [chartData, setChartData] = useState();
  const [valorTotal, setValorTotal] = useState(0)


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUser()
    getBonos()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getUser = async () => {
    const { data: data, ok: response, status } = await dataApi.getUser();
    console.log(response);
    pieData(data)
    setUser(data);
  };

  const getBonos = async () => {
    const { data: data, ok: response, status } = await dataApi.getBonos();
    console.log(data.balance);
    setBonos(data);
  }

  const pieData = (user) => {
    const colos = ["red", "blue", "orange", "yellow"];
    var total = 0;
    var color = 0;
    var array = [];
    array.push({
      name: "Caja",
      amount: user.balance,
      color: "green",
    });

    user.investments.forEach((element) => {
      total += element.qty * element.price;
      array.push({
        name: element.name,
        amount: element.qty * element.price,
        color: colos[color],
      });
      color++;
    });
    total += user.balance;
    setChartData(array);
    setValorTotal(total);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUser()
      getBonos();
    });
    return unsubscribe;
 
  }, [navigation]);

  return (
    <AppScreen>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.white}/>
        }
      >
        <View style={styles.container}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Hola {user && user.name}</Text>
          </View>
          <View style={styles.investmentBox}>
          {user && (
            <InvestmentBox
              investments={user.investments}
              balance={user.balance}
            />
          )}  
          </View>
     
          {bonos && user && (
            <BonosBox
              investments={user.investments}
              bonos={bonos}
            />
          )}  

            {
              user && 
              <PieChart 
              data={chartData}
              valorTotal={valorTotal}
              />   
            }



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
  investmentBox: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 25
  }
});
export default Dashboard;
