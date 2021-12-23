import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { Colors } from "./styles";

const Buy = ({ item, type, bono }) => {
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState();
  const [price, setPrice] = useState(bono ? bono.price[Object.keys(bono.price).pop()] : item.price)
  
const getTotalPrice = (e) => {
    console.log(price)
    setQty(e)
    setTotal(e * price);
  };

  const getTotalPriceSell = (e) => {
    if (e > item.qty) {
      setQty(item.qty);
      setTotal(0)
      return;
    }
    setQty(e);
    setTotal(e * price);
  };
  return (
    <View style={styles.container}>
      <View style={{ width: "35%" }}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          returnKeyType="done"
          onChangeText={(e) =>
            type == "sell" ? getTotalPriceSell(e) : getTotalPrice(e)
          }
          value={qty}
        />
        <Text style={styles.totalPrice}>${total}</Text>
      </View>
      <View style={{ width: "50%" }}>
        <TouchableOpacity>
          <View
            style={[
              styles.button,
              type == "sell" && { backgroundColor: "red" },
            ]}
          >
            <Text style={styles.buttonText}>
              {type == "sell" ? "Vender" : "Comprar"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.grey,
    width: "100%",
    borderRadius: 10,
    height: 40,
    textAlign: "center",
    fontSize: 30,
  },
  totalPrice: {
    textAlign: "center",
    marginTop: 5,
  },
  button: {
    height: 40,
    width: "100%",
    backgroundColor: "green",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "500",
  },
});

export default Buy;
