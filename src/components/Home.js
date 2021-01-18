import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { create } from 'react-test-renderer';
import {weatherApi} from '../api/weatherApi';

function Home(props){
  const [weather,setWeather]=useState({})
  const [loading,setLoading]=useState(true)
  const [icon,setIcon]=useState("")
  const [dn,setDn]=useState("")

  const weatherIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`
  useEffect(()=>{
    async function weather(){
      const weather = await weatherApi(props.search)
      setWeather(weather)
      setIcon(weather.icon)
      if(weather.icon.includes("d")){
        setDn("day")
      }
      else if(weather.icon.includes("n")){
        setDn("night")
      }
      setLoading(false)
    }
    weather()
  },[props.search])

  return (
    <View>
      {
      loading ? 
      (<ActivityIndicator size="large" color="#ffffff" />):
      (((weather === undefined) ? 
      (<Text style={styles.notfound}>City Not Found</Text>): 
      (<View 
       style={[styles.card,
       ((dn === "day")?
       (styles.day):
       (((dn === "night")?
       (styles.night):
       (styles.notset)
       )))]}>
        <Text>City: {weather.city},{weather.country}</Text>
        <Text>Temprature: {weather.temprature}&deg;C</Text>
        <Text> {weather.status}</Text>
        <Image source={{uri: weatherIcon}} style={{width: 40, height: 40}} />
      </View>)
      ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  notfound: {
    fontSize : 40,
    color: "#ffffff"
  },
  card:{
    backgroundColor: "#ffffff",
    height: 300,
    width: 350,
    borderRadius: 6,
    color: "black"
  },
  day: {
    backgroundColor : "#fffff1"
  },
  night: {
    backgroundColor : "#000000"
  },
  notset: {
    backgroundColor : "red"
  }
  
})

export default Home;