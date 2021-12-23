import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Colors } from "./styles";

const PieChartBox = ({ user }) => {
  const [data, setData] = useState();
  const [valorTotal, setValorTotal] = useState(0);
  console.log(user);

  const colos = [
      'red','blue','orange', 'yellow'
  ]
  useEffect(() => {
    if (user) formatData();
  }, []);

  const formatData = () => {
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
      color ++
    });
    total += user.balance;
    setData(array);
    setValorTotal(total)
  };

  return (
    <View style={styles.boxContainer}>
      <View>
        <Text style={styles.title}>Valor Total de cartera: ${user && valorTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
      </View>
      {data && (
        <PieChart
          data={data}
          width={Dimensions.get("screen").width}
          height={300}
          chartConfig={{
            backgroundColor: Colors.white,
            backgroundGradientFrom: Colors.white,
            backgroundGradientTo: Colors.white,
            color: () => Colors.blue,
          }}
          accessor={"amount"}
          backgroundColor={"transparent"}
          hasLegend={false}
          paddingLeft={Dimensions.get("screen").width / 5}
          // center={[0, 0]}
          // absolute
        />
      )}
      <View>
          {data.map((e)=>{
              return(
                <View style={styles.refBox}>
                <View style={[styles.refColor, {backgroundColor: e.color}]}></View>
                <View><Text style={styles.refText}>{e.name}: ${e.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text></View>
              </View>
              )
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    width: "95%",
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingBottom: 40,
    shadowColor: Colors.white,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 30,
  },
  title: {
      textAlign: 'center',
      marginTop: 15,
      fontSize: 20,
      fontWeight: 'bold'
  },
  refBox: {
      flexDirection: 'row',
      marginBottom: 5
  },
  refColor: {
      width: 20,
      height: 20
  },
  refText: {
      marginLeft: 10,
      fontWeight: '500',
      fontSize: 16
  }
});

export default PieChartBox;
