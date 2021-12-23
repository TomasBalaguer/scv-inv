import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppScreen from "../components/AppScreen";
import Buy from "../components/Buy";
import { Colors } from "../components/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import dataApi from './../services/data'

const Trade = ({ route }) => {
  const { item } = route.params;
  const [bono, setBono] = useState()

  const getBono = async () => {
    const { data: data, ok: response, status } = await dataApi.getBono(item._id);
    console.log(data);
    setBono(data)
  }

  useEffect(() => {
    getBono()
  }, [])
  console.log(item);
  return (
    <AppScreen>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"always"}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.box}>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <View style={styles.infoBox}>
              <View style={styles.cotizacionBox}>
                <Text style={styles.cotizacionText}>Cotizacion actual:</Text>
                <View>
                  <Text style={styles.cotizacion}>{bono && bono.price[Object.keys(bono.price).pop()]}</Text>
                  <Text style={styles.date}>
                    Ultima actualizacion: {Object.keys(item.price).pop()}
                  </Text>
                </View>
              </View>

              <View style={styles.cotizacionBox}>
                <Text style={styles.cotizacionText}>Cantidad:</Text>
                <View>
                  <Text style={styles.cotizacion}>
                    {item.qty ? item.qty : 0}
                  </Text>
                </View>
              </View>

              <View style={styles.cotizacionBox}>
                <Text style={styles.cotizacionText}>Valor:</Text>
                <View>
                  <Text style={styles.cotizacion}>
                    ${item.qty ? item.qty * item.price : 0}
                  </Text>
                </View>
              </View>
            </View>

            <Buy item={item} bono={bono} />

            {item.qty && <Buy item={item}  bono={bono} type='sell'/>}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "95%",
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
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    textTransform: "uppercase",
    color: Colors.grey,
  },
  cotizacionBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  cotizacionText: {
    fontSize: 18,
    width: "40%",
  },
  cotizacion: {
    fontSize: 40,
    textAlign: "right",
  },
  date: {
    fontSize: 12,
  },
});

export default Trade;
