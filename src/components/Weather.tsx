import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export const Weather = ({ weather }: any): any => {
  if (weather) {
    return (
      <View style={styles.weather}>
        <Text style={styles.maintemp}>
          {Math.round(weather.temp)}
          {"°C"}
          <Image
            style={{ width: 50, height: 50 }}
            source={{
              uri: `http://openweathermap.org/img/w/${weather.icon}.png`,
            }}
          ></Image>
        </Text>
        <Text style={styles.details}>{weather.description}</Text>
        <Text style={styles.details}>
          {"Feels like "}
          {Math.round(weather.feels_like)}
        </Text>
        <Text style={styles.details}>
          {"Wind "}
          {weather.wind}
          {"M/S"}
        </Text>
        <Text style={styles.details}>
          {"Humidity "}
          {weather.humidity}
          {"%"}
        </Text>
      </View>
    );
  } else return <View></View>;
};

const styles = StyleSheet.create({
  maintemp: {
    fontSize: 52,
    color: "#fecc50",
  },

  weather: {
    backgroundColor: "#010b8b",
    borderColor: "#ff6d69",
    borderWidth: 2,
    padding: 50,
    borderRadius: 20,
  },

  details: {
    fontSize: 18,
    color: "#fecc50",
    fontStyle: "italic",
  },
});
