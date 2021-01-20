import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  Keyboard,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import Home from './src/components/Home';
import Splash from './src/components/Splash';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const main = require('./src/assets/images/main.jpeg');
const width = Dimensions.get('window').width;

const App: () => React$Node = () => {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState(false);
  const [splash, setSplash] = useState(true);

  const handleChange = (e) => {
    setInput(e);
    setSearch(false);
  };

  const handleSearch = () => {
    if (input !== '' || input !== ' ') {
      setSearch(true);
      Keyboard.dismiss();
    }
    if (input === '' || input === ' ') {
      setSearch(false);
    }
  };

  useEffect(() => {
    splashScreen = async () => {
      return new Promise((resolve) =>
        setTimeout(() => {
          setSplash(false);
        }, 2000),
      );
    };
    splashScreen();
  }, []);

  if (splash === true) {
    return <Splash />;
  }

  return (
    <>
      <StatusBar backgroundColor="black" />
      <View style={styles.head}>
        <Text style={styles.heading}>Weather App</Text>
        <FontAwesome5 name="cloud-sun-rain" size={36} style={styles.cloud} />
      </View>

      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          onChangeText={(e) => {
            handleChange(e);
          }}
          placeholder="Enter City Name"
          underlineColorAndroid="transparent"
          returnKeyType="search"
          onSubmitEditing={() => {
            handleSearch();
          }}
        />
        <Entypo
          style={styles.searchIcon}
          name="magnifying-glass"
          size={28}
          onPress={() => {
            handleSearch();
          }}
        />
      </View>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#312c51'}}
        behavior={'height'}
        keyboardVerticalOffset={-225}>
        <View style={styles.home}>
          {search ? (
            <Home search={input} />
          ) : (
            <ImageBackground
              source={main}
              style={styles.main}></ImageBackground>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    width: width,
    height: '100%',
  },
  head: {
    backgroundColor: '#312c51',
    height: 90,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 34,
    color: '#f1aa9b',
  },
  cloud: {
    color: '#f0c38e',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f1f1',
    borderColor: '#bbbbbb',
    borderWidth: 4,
  },
  searchIcon: {
    paddingRight: 20,
    color: '#424242',
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#f8f1f1',
    color: '#424242',
    fontSize: 20,
  },
  home: {
    backgroundColor: '#312c51',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
