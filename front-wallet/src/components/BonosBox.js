import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Colors } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";

const BonosBox = ({ bonos, investments }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    if (!investments.find((x) => x._id === item._id)) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate("Trade", { item: item })}
          key={item._id}
        >
          <View style={styles.balanceBox}>
            <View>
              <Text style={styles.balanceTitle}>{item.name}</Text>
            </View>
            <View>
              <Text style={styles.balance}>
                ${item.price[Object.keys(item.price).pop()].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </Text>
              <Text style={styles.date}>
                Ultima actualizacion: {Object.keys(item.price).pop()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={styles.boxContainer}>
      <View style={[styles.titleBox, { marginTop: 30 }]}>
        <Text style={styles.titleText}>BONOS</Text>
      </View>

      <View>
        <SafeAreaView>
        <FlatList
          data={bonos}
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
    width: "95  %",
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingBottom: 40,
    shadowColor: Colors.white,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 2,
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    paddingVertical: 15,
  },
  balanceTitle: {
    color: Colors.lightblue,
    fontWeight: "bold",
    fontSize: 20,
  },
  balance: {
    fontSize: 24,
    textAlign: "right",
  },
  date: {
    textAlign: "right",
    fontSize: 12,
    color: Colors.grey,
    marginTop: 10,
  },
});

export default BonosBox;
