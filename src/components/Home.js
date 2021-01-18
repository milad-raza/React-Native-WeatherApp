import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { create } from 'react-test-renderer';
import {weatherApi} from '../api/weatherApi';
const width = Dimensions.get('window').width; 
const day = require("../assets/images/day.jpeg");
const night = require("../assets/images/night.jpeg")

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
      if(weather.icon){
        setIcon(weather.icon)
      if(weather.icon.includes("d")){
        setDn("day")
      }
      else if(weather.icon.includes("n")){
        setDn("night")
      }
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

      ((weather.error === "error") ? 
      (<Text style={styles.notfound}>City Not Found</Text>): 

      (<ImageBackground source={(dn === "day") ? day : night} style={styles.image}>
      <View 
       style={styles.card}>
        <Text style={(dn === "day")?styles.day:styles.night}>{weather.city},{weather.country}</Text>
        <Text style={(dn === "day")?styles.day:styles.night}>{weather.temprature}&deg;C</Text>
        <Text style={(dn === "day")?styles.day:styles.night}> 
          {weather.status} 
          <Image source={{uri: weatherIcon}} style={{width: 40, height: 40}} />
        </Text>
      </View>
      </ImageBackground>)

      )
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
    marginBottom: 150
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    height : "100%",
    width: width
  },
  day:{
    fontSize: 50,
    fontWeight: "bold",
    color: "#0f0901",
  },
  night:{
    fontSize: 50,
    fontWeight: "bold",
    color: "#ffffe1"
  }

  
})

export default Home;