import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Weather } from "./Weather";
import { Modal, TouchableHighlight } from "react-native";

const Stack = createStackNavigator();

export const Request = (props: any): any => {
  const { month, day, hour, minute } = props.locations.date;
  const date = `${month}/${day} ${hour}:${minute}`;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Weather weather={props.weather}></Weather>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#010b8b" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyleClose}>Hide</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={{width:"100%"}}>
          <Text style={styles.textStyle}>{date}</Text>
          <Text style={styles.textStyle}>
            {props.locations.cords.principalSubdivision}
            {", "}
            {props.locations.cords.locality}
          </Text>
      <Text style={styles.coords}>{props.locations.cords.latitude}{', '}{props.locations.cords.longitude}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  coords: {
    fontSize:16,
    color: "#fecc50",
    textAlign:"right"
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    display: "flex",
    justifyContent: "space-between",
    height: 768,
    backgroundColor: "#1e0521",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#0e069e",
    borderRadius: 20,
    width: "100%",
    padding: 10,
    elevation: 2,
    marginTop: 10,
    alignItems: "center",
  },
  textStyle: {
    fontSize:16,
    color: "#fecc50",
    fontWeight: "bold",
    textAlign: "left",
  },
  textStyleClose: {
    textAlign: "right",
    color: "#fecc50",
    fontWeight: "bold",
  }
});
