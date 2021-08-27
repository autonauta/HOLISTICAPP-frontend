import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Alert,
  Image,
  TextInput,
  PixelRatio,
} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  API_URL,
  mainColor,
  secondaryColor,
  textColor1,
  textColor2,
} from '../config';

const iconImage = require('../assets/icon.png');

function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const _storeData = async (keyName, value) => {
    try {
      await AsyncStorage.setItem(keyName, value);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('Login screen focused');
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('Login screen unfucused');
      };
    }, []),
  );
  //------------------------Codigo para tamaños de letra responsivos-------------------------------

  const submitData = () => {
    fetch(`${API_URL}/auth`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          const token = data.token;
          const userLogged = data.user;
          let userCalendar = {};
          if (data.calendar) {
            userCalendar = data.calendar;
            _storeData('userCalendar', JSON.stringify(userCalendar));
          }
          _storeData('xauthtoken', JSON.stringify(token));
          _storeData('user', JSON.stringify(userLogged));
          console.log('User correctly logged in');
          console.log(JSON.stringify(userLogged));
          console.log(JSON.stringify(userCalendar));
          setPassword('');
          setEmail('');
          navigation.navigate('Home', {token, userLogged, userCalendar});
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Ups!!', `Algo malo hasucedido! \n Error: ${err}`, [
          {text: 'NIMODO', onPress: () => console.log('OK Pressed')},
        ]);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={iconImage} style={styles.image}></Image>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputsView}>
        <View style={styles.textInputView}>
          <Text style={styles.label}>correo</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCompleteType="email"
            onChangeText={text => setEmail(text)}></TextInput>
        </View>
        <View style={styles.textInputView}>
          <Text style={styles.label}>contraseña</Text>
          <TextInput
            style={styles.textInput}
            autoCompleteType="password"
            value={password}
            textContentType="password"
            secureTextEntry
            onChangeText={text => setPassword(text)}></TextInput>
        </View>
      </View>

      <Button
        style={styles.button}
        mode="contained"
        onPress={() => {
          submitData();
        }}>
        Login
      </Button>
      <View style={styles.textButtonsContainer}>
        <Text
          style={styles.textButton}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          Registrate gratis!
        </Text>
        <Text
          style={styles.textButton}
          onPress={() => {
            navigation.navigate('PasswordRecovery');
          }}>
          Recuperar contraseña!
        </Text>
      </View>
    </SafeAreaView>
  );
}

var TITLE_FONT_SIZE = 40;
var LABEL_FONT_SIZE = 24;
var IMAGE_SIZE = 80;
var IMAGE_MARGIN_BOTTOM = 20;
var INPUT_WIDTH = '100%';
var INPUT_PADDING = 10;
var TEXTINPUT_FONT_SIZE = 20;
var TITLE_MARGIN_BOTTOM = 0;
var BUTTON_WIDTH = '100%';
var BUTTON_MARGIN_TOP = 0;
var INPUT_MARGIN_BOTTOM = 10;
var TEXT_BUTTON_FONT_SIZE = 18;
if (PixelRatio.get() <= 2) {
  TITLE_FONT_SIZE = 30;
  TITLE_MARGIN_BOTTOM = 0;
  LABEL_FONT_SIZE = 17;
  IMAGE_SIZE = 70;
  IMAGE_MARGIN_BOTTOM = 0;
  INPUT_WIDTH = '90%';
  INPUT_PADDING = 6;
  TEXTINPUT_FONT_SIZE = 18;
  BUTTON_WIDTH = '90%';
  BUTTON_MARGIN_TOP = 0;
  INPUT_MARGIN_BOTTOM = 0;
  INPUT_MARGIN_BOTTOM = 10;
  TEXT_BUTTON_FONT_SIZE = 14;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: mainColor,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: TITLE_FONT_SIZE,
    marginBottom: TITLE_MARGIN_BOTTOM,
  },
  inputsView: {
    width: '100%',
    alignItems: 'center',
  },
  textInputView: {
    width: INPUT_WIDTH,
    alignItems: 'center',
    textAlign: 'left',
    marginBottom: INPUT_MARGIN_BOTTOM,
  },
  textInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
    padding: INPUT_PADDING,
    color: 'white',
    fontSize: TEXTINPUT_FONT_SIZE,
  },
  label: {
    color: 'white',
    fontSize: LABEL_FONT_SIZE,
    alignSelf: 'flex-start',
  },
  button: {
    width: BUTTON_WIDTH,
    marginTop: BUTTON_MARGIN_TOP,
    backgroundColor: '#1fc362',
    color: 'black',
  },
  textButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textButton: {
    color: 'white',
    fontSize: TEXT_BUTTON_FONT_SIZE,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginBottom: IMAGE_MARGIN_BOTTOM,
  },
});

export default Login;
