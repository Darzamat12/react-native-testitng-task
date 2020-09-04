import * as React from 'react'
import {useState, useEffect} from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView,  } from 'react-native'
import {connect, useSelector} from 'react-redux'
import {Request} from './Request'
import {Card, } from 'react-native-elements'

const HistoryScreen = (props:any):any=>{
    const requests:any=useSelector(state=>state)
    if(!requests) return
    useEffect(()=>{
        console.log(requests)
    },[])
    return <SafeAreaView >
                <ScrollView style={{marginTop:19}}>
                    
                        {requests.locations.locations.map((request:any, index:number)=>
                        <Request 
                        locations={requests.locations.locations[index]} 
                        weather={requests.weather.weather[index]} 
                        key={request.locations.locations[index].date.id}/>)}
                    
                </ScrollView>
    </SafeAreaView>
}

export default HistoryScreen