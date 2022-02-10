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
  ActivityIndicator,
  StatusBar,
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
const showAlert = message => {
  Alert.alert(
    'Ups!!',
    message, //modificar al error real
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  );
};
//Function for storing data in local
const _storeData = async (keyName, value) => {
  try {
    await AsyncStorage.setItem(keyName, value);
  } catch (error) {
    console.log(error);
  }
};

function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  //Function for posting the data to the backend server
  const submitData = async () => {
    setLoggingIn(true);
    const loginData = {email, password};
    try {
      const res = await fetch(`${API_URL}/auth`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (data.error) {
        showAlert(data.error);
      } else if (data.token) {
        const token = data.token;
        const userLogged = data.user;
        _storeData('xauthtoken', JSON.stringify(token));
        _storeData('user', JSON.stringify(userLogged));
        console.log('User correctly logged in');
        setPassword('');
        setEmail('');
        setLoggingIn(false);
        navigation.navigate('Home', {token, userLogged});
      }
    } catch (err) {
      showAlert(
        '¡Ese usuario no existe o el password es incorrecto. Verifica tus datos!',
      );
      setLoggingIn(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={mainColor}
        barStyle={'default'}
        showHideTransition={'none'}
      />
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
        {loggingIn ? <ActivityIndicator size="small" color="white" /> : 'Login'}
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
//Telefonos con resoluciones medias
var TITLE_FONT_SIZE;
var LABEL_FONT_SIZE;
var IMAGE_SIZE;
var IMAGE_MARGIN_BOTTOM;
var INPUT_WIDTH;
var INPUT_PADDING;
var TEXTINPUT_FONT_SIZE;
var TITLE_MARGIN_BOTTOM;
var BUTTON_WIDTH;
var BUTTON_MARGIN_TOP;
var INPUT_MARGIN_BOTTOM;
var TEXT_BUTTON_FONT_SIZE;

<<<<<<< Updated upstream
=======
//Telefonos con resoluciones altas
if (PixelRatio.get() >= 2.8 && PixelRatio.get() < 3.6) {
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
  INPUT_MARGIN_BOTTOM = 10;
  TEXT_BUTTON_FONT_SIZE = 14;
}
>>>>>>> Stashed changes
//Telefonos con resoluciones medianas
if (PixelRatio.get() >= 2.2 && PixelRatio.get() < 3.6) {
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
  INPUT_MARGIN_BOTTOM = 10;
  TEXT_BUTTON_FONT_SIZE = 16;
}
//Telefonos con resoluciones pequeñas
if (PixelRatio.get() >= 1 && PixelRatio.get() < 2.2) {
  TITLE_FONT_SIZE = 25;
  LABEL_FONT_SIZE = 16;
  IMAGE_SIZE = 60;
  IMAGE_MARGIN_BOTTOM = 20;
  INPUT_WIDTH = '90%';
  INPUT_PADDING = 5;
  TEXTINPUT_FONT_SIZE = 16;
  TITLE_MARGIN_BOTTOM = 0;
  BUTTON_WIDTH = '90%';
  BUTTON_MARGIN_TOP = 0;
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
