import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Colors } from "./styles";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

const InvestmentBox = ({ balance, investments }) => {
  const navigation = useNavigation()
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('Trade', {item: item})} key={item._id}>
        <View style={styles.balanceBox}>
          <View>
            <Text style={styles.balanceTitle}>{item.name}</Text>
          </View>
          <View>
            <Text style={styles.balance}>${(item.qty * item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
            <Text style={styles.qty}>{item.qty} un.</Text>
          </View>
        </View>
        </TouchableOpacity>
    );
  };
  return (
    <View style={styles.boxContainer}>
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>CUENTAS (U$S)</Text>
      </View>
      <View style={styles.balanceBox}>
        <View>
          <Text style={styles.balanceTitle}>Caja</Text>
        </View>
        <View>
          <Text style={styles.balance}>${balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
        </View>
      </View>

      <View style={[styles.titleBox, {marginTop: 30}]}>
        <Text style={styles.titleText}>INVERSIONES</Text>
      </View>

      <View>
        <SafeAreaView>
        <FlatList
          data={investments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        </SafeAreaView>
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
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 1
  },
  titleBox: {
    height: 40,
    justifyContent: "center",
  },
  titleText: {
    fontWeight: "bold",
    color: Colors.grey,
  },
  balanceBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    paddingVertical: 15
  },
  balanceTitle: {
    color: Colors.lightblue,
    fontWeight: "bold",
    fontSize: 20,
  },
  balance: {
    fontSize: 24,
  },
  qty: {
    textAlign: 'right'
  }
});

export default InvestmentBox;
