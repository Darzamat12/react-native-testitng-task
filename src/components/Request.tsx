import * as React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import {Card} from 'react-native-elements'
import {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Weather } from './Weather';
import {
    Alert,
    Modal,
    TouchableHighlight,
  } from "react-native";

const Stack = createStackNavigator();

export const Request = (props:any):any=>{
    const [height, setHeight]=useState(60)
    const [isOpened, setIsOpened]= useState(false)
    const [position, setPosition]=useState<any>('relative')

    const date=`${props.locations.date.month}/${props.locations.date.day}  ${props.locations.date.hour}:${props.locations.date.minute}`
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
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      ><View>
        <Text style={styles.textStyle}>{date}</Text>
    <Text style={styles.textStyle}>{props.location.cords.principalSubdivision}{','}{props.location.cords.locality}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );

    // return <View style={{width:'100%', margin:0, padding:0, borderColor:'red', position:'relative' }} >

    //             <TouchableOpacity onPress={pressHandler} style={{width:'100%', margin:0, padding:0, borderColor:'red'}}>
                    
    //                 <Text>{props.request.date.month}</Text>
    //                 <Text>{props.request.coords.principalSubdivision}</Text>
    //                 {isOpened? <Weather weather={props.request.weather}></Weather> : <></>}
                    
    //             </TouchableOpacity>
            
    // </View>
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      
      
      
    },
    modalView: {
        display:'flex',
        justifyContent:'space-between',
      
      height:768,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "flex-start",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#0e069e",
      borderRadius: 20,
      width:'100%',
      padding: 10,
      elevation: 2,
      marginTop:10,
      alignItems:'flex-start'
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "left"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  