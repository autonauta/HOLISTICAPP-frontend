import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
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
import {CommonActions} from '@react-navigation/native';
import {API_URL, mainColor, secondaryColor, textColor1} from '../config';

const iconImage = require('../assets/icon.png');

function passwordRecovery({navigation}) {
  const [email, setEmail] = useState('');
  const goToLogin = CommonActions.reset({
    index: 0,
    routes: [{name: 'Login'}],
    key: null,
  });
  const submitData = () => {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    return fetch(`${API_URL}/auth/reset`, {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify({
        email,
      }),
    })
      .then(data => {
        if (data) {
          Alert.alert(
            `Perfecto!`,
            `Hemos enviado una solicitud a tu correo para que puedas actualizar tu contraseña! Te esperamos pronto!`,
            [
              {
                text: 'OK',
                onPress: () => {
                  console.log('OK pressed');
                  navigation.dispatch(goToLogin);
                },
              },
            ],
          );
        } else
          console.log('Server response was error or not token were received');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Ups!!', `Algo malo ha ocurrido!`, [
          {text: 'NIMODO', onPress: () => console.log('OK Pressed')},
        ]);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Image source={iconImage} style={styles.image}></Image> */}
      <Text style={styles.title}>Recuperación de contraseña</Text>
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
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => {
          submitData();
        }}>
        Enviar
      </Button>
    </SafeAreaView>
  );
}
let titleFontSize = 35;
if (PixelRatio.get() <= 2) {
  titleFontSize = 20;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: mainColor,
    paddingTop: 20,
  },
  title: {
    width: '60%',
    color: secondaryColor,
    fontSize: titleFontSize,
    marginBottom: 30,
    textAlign: 'center',
  },
  textInputView: {
    width: '90%',
    alignItems: 'center',
    textAlign: 'left',
  },
  textInput: {
    width: '100%',
    marginBottom: 4,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
    padding: 10,
    color: secondaryColor,
    fontSize: 20,
  },
  label: {
    color: secondaryColor,
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  button: {
    width: '90%',
    marginTop: 40,
    backgroundColor: '#1fc362',
    marginBottom: 20,
  },
  textButton: {
    marginTop: 30,
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: '20%',
  },
  textButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default passwordRecovery;
