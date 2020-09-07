import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Request } from "./Request";
import { clearHistory } from "../redux/actions";
import { TouchableHighlight } from "react-native-gesture-handler";


const HistoryScreen = (props: any): any => {
  const requests: any = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearHistory());
  };

  if (requests.locations.locations.length === 0)
    return (
      <View style={styles.noHistory}>
        <Text style={styles.noHistoryText}>No history yet</Text>
      </View>
    );
  else
    return (
      <SafeAreaView style={styles.historyScreen}>
        <ScrollView style={{ marginTop: 19 }}>
          {requests.locations.locations.map((request: any, index: number) => (
            <Request
              locations={request}
              weather={requests.weather.weather[index]}
              key={request.date.id}
            />
          ))}
        </ScrollView>
        
          <TouchableHighlight style={styles.clear} onPress={handleClick}>
            <Text style={styles.clearText}>Clear history</Text>
          </TouchableHighlight>
        
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  historyScreen: {
    backgroundColor: "#1e0521",
    height: "100%",
  },
  clearHistory: {
    position: "absolute",
    top: 700,
    left: 160,
  },
  noHistory: {
    height:"100%",
    backgroundColor: "#1e0521"
  },
  noHistoryText: {
    color: "#fecc50",
    position: "absolute",
    top: 100,
    left: 50,
    fontSize: 48,
  },

  clear:{
    backgroundColor: "green",
    borderWidth: 3,
    borderColor: "#ff6d69",
    borderRadius: 20,
    marginBottom:30,
    width:250,
    left:70,
  },
  clearText:{
      fontSize:32,
      padding:5,
  }
});

export default HistoryScreen;
