import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
const logo = require('../assets/images/logo.png');

const Splash = () => {
    return(
    <View style={styles.splash}>
        <Image source = {logo} style={styles.logo} />
        <Text style = {styles.text}>Weather App</Text>
    </View>)
}

const styles = StyleSheet.create({
    splash:{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 200,
        height: 200,
    },
    text: {
        marginTop: 320,
        fontSize: 30,
        color: "orange"
    }
})

export default Splash;