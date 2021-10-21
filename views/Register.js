import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
  ScrollView,
  PixelRatio,
} from 'react-native';
import {Button} from 'react-native-paper';
import {
  API_URL,
  mainColor,
  secondaryColor,
  textColor1,
  textColor2,
} from '../config';

const iconImage = require('../assets/icon.png');

function Register({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passConfirm, setPassConfirm] = useState('');

  const submitData = () => {
    return fetch(`${API_URL}/users`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        passConfirm,
      }),
    })
      .then(res => res.json())
      .then(data => {
        Alert.alert(
          `Perfecto ${name}`,
          `Hemos enviado un correo de confirmación a ${email}. Por favor has click en el enlace que te enviamos para confirmar tu correo. Te esperamos!`,
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK Pressed');
                navigation.navigate('Login');
              },
            },
          ],
        );
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Ups!!', `Ha ocurrido un error`, [
          {text: 'NIMODO', onPress: () => console.log('OK Pressed')},
        ]);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={iconImage} style={styles.image}></Image>
      <Text style={styles.title}>Registrate!</Text>
      <ScrollView
        style={styles.inputsView}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.textInputView}>
          <Text style={styles.label}>nombre</Text>
          <TextInput
            style={styles.textInput}
            theme={theme}
            textContentType="emailAddress"
            label="Nombre"
            value={name}
            onChangeText={text => setName(text)}></TextInput>
        </View>
        <View style={styles.textInputView}>
          <Text style={styles.label}>correo</Text>
          <TextInput
            style={styles.textInput}
            label="e-mail"
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
            label="contraseña"
            value={password}
            textContentType="password"
            secureTextEntry
            onChangeText={text => setPassword(text)}></TextInput>
        </View>
        <View style={styles.textInputView}>
          <Text style={styles.label}>confirmar contraseña</Text>
          <TextInput
            style={styles.textInput}
            label="repite contraseña"
            value={passConfirm}
            textContentType="password"
            secureTextEntry
            onChangeText={text => setPassConfirm(text)}></TextInput>
        </View>

        <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            submitData();
          }}>
          Enviar
        </Button>
        <Text
          style={styles.textButton}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Ya tienes una cuenta?
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const theme = {
  colors: {
    primary: mainColor,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: mainColor,
    paddingTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 35,
    marginBottom: 30,
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
  inputsView: {
    width: '100%',
  },
  label: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  button: {
    width: '90%',
    marginTop: 40,
    backgroundColor: '#1fc362',
  },
  textButton: {
    marginTop: 30,
    marginBottom: 10,
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 80,
    height: 80,
  },
});

export default Register;
