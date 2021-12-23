import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Colors } from "./styles";

const InvestmentBox = ({trade, bonos}) => {
    
  const renderItem = ({item}) => {
    return(
      <View>
        <Text>{item.name}</Text>
      </View>
    )
  }
  return (
    <View style={styles.boxContainer}>
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>CUENTAS (U$S)</Text>
      </View>
      <View>
          <FlatList 
            data={bonos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    width: "95  %",
    height: 200,
    backgroundColor: Colors.white,
  },
  titleBox: {
      height: 40,
      justifyContent: 'center',
      paddingLeft: 20
  },
  titleText: {
    fontWeight: 'bold',
    color: Colors.black
  }
});

export default InvestmentBox;
