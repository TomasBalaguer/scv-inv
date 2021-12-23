import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppScreen from "../components/AppScreen";
import InvestmentBox from "../components/InvestmentBox";
import { Colors } from "../components/styles";
import dataApi from './../services/data'



const Dashboard = () => {

const [user, setUser] = useState()

const getUser = async () => {
    const { data:data, ok:response, status } = await dataApi.getUser();
    console.log(response)
    setUser(data)
}

useEffect(() => {
    getUser()
}, [])

const BONOS = [
    {
        id: 1,
        name: 'Bono A23',
        price: {
            "10/10/2021" : 8,
            "18/10/2021" : 12
        }
    },
    {
        id: 2,
        name: 'Cocal-Cola',
        price: {
            "12/10/2021" : 2500,
            "19/10/2021" : 2200
        }
    },
    {
        id: 3,
        name: 'Bonos A42',
        price: 120
    },
    {
        id: 4,
        name: 'Apple',
        price: 5000
    }
]

const INVESTMENTS = [
    {
        id: 1,
        date: '10/10/2021',
        bono_id: 1,
        qty: 2000,
        unit_price: 8,
        total: 16000
    },
    {
        id: 2,
        date: '12/10/2021',
        bono_id: 2,
        qty: 150,
        unit_price: 2500,
        total: 375000
    },
    {
        id: 3,
        date: '18/10/2021',
        bono_id: 1,
        qty: 1000,
        unit_price: 12,
        total: 12000
    },
    {
        id: 4,
        date: '19/10/2021',
        bono_id: 2,
        qty: 50,
        unit_price: 2200,
        total: 110000
    }
]

  return (
    <AppScreen>
      <View style={styles.container}>
          <View style={styles.titleBox}>
              <Text style={styles.title}>Hola {user && user.name}</Text>
          </View>
        <InvestmentBox 
        trade={INVESTMENTS}
        bonos={BONOS}
        />
        <Text>Es un Dashboard</Text>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleBox: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: Colors.white
    }
});
export default Dashboard;
