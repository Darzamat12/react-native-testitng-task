import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { addLocation, fetchWeather } from "../redux/actions";
import { Weather } from "./Weather";
import { TouchableHighlight } from "react-native-gesture-handler";
import { ICurrentDate, IСoords } from "../interfaces";

export default function MainScreen() {
  const dispatch = useDispatch();
  const [currentCords, setCurrentCords] = useState<IСoords>();
  const requests: any = useSelector<any>((state) => state);

  async function getGeoLocation() {
    const response = await fetch("https://ipinfo.io/json?token=07485324dbcde1");
    const json = await response.json();
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${
        json.loc.split(",")[0]
      }&longitude=${json.loc.split(",")[1]}&localityLanguage=en`
    );
    const result = await res.json();
    setCurrentCords({
      longitude: json.loc.split(",")[1],
      latitude: json.loc.split(",")[0],
      continent: result.continent,
      countryName: result.countryName,
      principalSubdivision: result.principalSubdivision,
      locality: result.locality,
    });
  }

  const handleClick = (): void => {
    dispatch(
      fetchWeather({
        longitude: currentCords?.longitude,
        latitude: currentCords?.latitude,
      })
    );

    const date = new Date();
    const newDate: ICurrentDate = {
      month: "0" + (date.getMonth() + 1).toString().slice(-2),
      day: "0" + date.getDate().toString().slice(-2),
      hour: date.getHours(),
      minute: date.getMinutes(),
      id: Date.now().toString(),
    };

    dispatch(addLocation({ cords: currentCords, date: newDate }));
  };

  useEffect(() => {
    getGeoLocation();
  }, []);
  return (
    <View style={styles.mainScreen}>
      <Weather
        weather={requests.weather.weather[requests.weather.weather.length - 1]}
      />
      {currentCords ? (
        <Card containerStyle={styles.card}>
          <Text style={styles.city}>{currentCords?.principalSubdivision}</Text>
          <Text style={styles.locality}>{currentCords?.locality}</Text>
          <Text
            style={styles.location}
          >{`${currentCords?.countryName}, ${currentCords?.continent}`}</Text>
          <Text
            style={styles.location}
          >{`${currentCords?.latitude}, ${currentCords?.longitude}`}</Text>
        </Card>
      ) : (
        <></>
      )}

      <TouchableHighlight style={styles.button} onPress={() => handleClick()}>
        <Text style={styles.buttonText}>LOAD</Text>
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#1e0521",
  },
  card: {
    backgroundColor: "#010b8b",
    borderWidth: 3,
    borderColor: "#ff6d69",
    borderRadius: 20,
    display: "flex",
  },
  coords: {
    color: "white",
  },
  locality: {
    color: "#fecc50",
    fontSize: 18,
    textAlign: "center",
    paddingBottom: 25,
  },

  city: {
    color: "#fecc50",
    fontSize: 32,
    textAlign: "center",
  },
  location: {
    color: "#fecc50",
    fontSize: 18,
  },

  button: {
    width: 260,
    height: 40,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#ff6d69",
    backgroundColor: "#010b8b",
  },
  buttonText: {
    fontSize: 26,

    color: "#fecc50",
    textAlign: "center",
  },
});
