import * as React from 'react';
import {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';
import {Card} from 'react-native-elements'
import {connect, useDispatch} from 'react-redux'
import {createRequest, addLocation, fetchWeather} from '../redux/actions'
import {Weather} from './Weather'

interface Request {
    date: CurrentDate
    id: string
    weather:Weather | undefined
    coords:Сoords | undefined
}

interface CurrentDate {
    month: string
    day: string
    hour: number
    minute: number
}
interface Сoords {
    longitude?:string
    latitude?:string
    continent?:string
    countryName?:string
    principalSubdivision?:string
    locality?:string
}

interface Weather {
    temp?:number
    feels_like?:number
    description?:string
    wind?:number
    humidity?:number
    icon?:string

}

function MainScreen(props:any) {
    const dispatch=useDispatch()
    const [currentCords,setCurrentCords]=useState<Сoords>()
    const [weather, setWeather]=useState<Weather>()
        // async function getWeather(){
        //     const a = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${currentCords?.latitude}&lon=${currentCords?.longitude}&units=metric&type=like&&APPID=56c5a38b11c4c56fbcf54f474a72d731`)
        //     const b = await a.json()
        //     setWeather({
        //         temp:b.list[0].main.temp,
        //         feels_like:b.list[0].main.feels_like,
        //         humidity:b.list[0].main.humidity,
        //         description:b.list[0].weather[0].description,
        //         wind: b.list[0].wind.speed,
        //         icon: b.list[0].weather[0].icon,
        //     })
           
            
        // }
    
        async function getGeoLocation() {

          const a = await fetch('https://ipinfo.io/json?token=07485324dbcde1')
          const b = await a.json()
          const t= await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${b.loc.split(',')[0]}&longitude=${b.loc.split(',')[1]}&localityLanguage=en`)
            const c = await t.json()
          setCurrentCords({
            longitude:b.loc.split(',')[1],
            latitude:b.loc.split(',')[0],
            continent: c.continent,
            countryName: c.countryName,
            principalSubdivision: c.principalSubdivision,
            locality: c.locality,
            })
        }

        const handleClick=():void=>{
          
          dispatch(fetchWeather({
            longitude:currentCords?.longitude,
            latitude:currentCords?.latitude
          }))
            // getWeather()
            const date= new Date()
            // const newRequest: Request={
               const newDate={
                    month: ('0'+(date.getMonth()+1).toString().slice(-2)),
                    day: ('0'+(date.getDay()-1).toString().slice(-2)),
                    hour: date.getHours(),
                    minute: date.getMinutes(),
                    id: Date.now().toString()
                }
            //     id: date.toString(),
            //     weather: weather,
            //  a   coords: currentCords
            // }
            
            // props.createRequest(newRequest)
            props.addLocation({cords:currentCords,date:newDate})

            console.log(props.requests)
        }

      useEffect(()=>{
          getGeoLocation()
      },[])
    return (
      <View  style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Weather weather={weather}/>
          <Card containerStyle={styles.card}>
        <Text style={styles.coords}>{currentCords?.continent}{currentCords?.countryName}{currentCords?.latitude}{currentCords?.locality}{currentCords?.longitude}{currentCords?.principalSubdivision}</Text>
        </Card>
        <Button onPress={handleClick} title='load'/>
      </View>
    );
  }
  const styles=StyleSheet.create({
    card:{
    backgroundColor:'#0be7fb',
    borderWidth:0,
    borderRadius:20
    },
    coords:{
      color:'white'
    }


  })

  const mapDispatchToProps={
      addLocation
  }

  const MapStateToProps = (state:any)=>{
    return {
        requests: state
    }
}

  export default connect(MapStateToProps, mapDispatchToProps)(MainScreen)

