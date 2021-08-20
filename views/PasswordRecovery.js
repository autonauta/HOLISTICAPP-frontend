import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL, mainColor, secondaryColor} from '../config';

const iconImage = require('../assets/icon.png');

function passwordRecovery() {
  const [email, setEmail] = useState('');
  const submitData = () => {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    return fetch(`${API_URL}/profile/passwordRecovery`, {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify({
        email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        let {token} = data;
        if (data) {
          Alert.alert(
            `Perfecto!`,
            `Hemos enviado una solicitud a tu correo para que puedas actualizar tu contraseña! Te esperamos pronto!`,
            [
              {
                text: 'OK',
                onPress: () => {
                  console.log('OK pressed');
                },
              },
            ],
          );
        } else
          console.log('Server response was error or not token were received');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Ups!!', `${err}`, [
          {text: 'NIMODO', onPress: () => console.log('OK Pressed')},
        ]);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image source={iconImage} style={styles.image}></Image>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: secondaryColor,
    paddingTop: 20,
  },
  title: {
    width: '60%',
    color: 'white',
    fontSize: 35,
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
    color: 'white',
    fontSize: 20,
  },
  label: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  button: {
    width: '90%',
    marginTop: 40,
    backgroundColor: mainColor,
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
