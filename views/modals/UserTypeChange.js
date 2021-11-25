import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Modal,
  Pressable,
  Alert,
  PixelRatio,
} from 'react-native';
import {API_URL, mainColor, secondaryColor, textColor1} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

function UserTypeChange({
  modalTerapeutaVisible,
  setModalTerapeutaVisible,
  step1Visible,
  setStep1Visible,
  token,
  userLogged,
  navigation,
}) {
  const logOut = () => {
    const keys = ['xauthtoken', 'user'];
    AsyncStorage.multiRemove(keys).then(res => {
      console.log('Items removed from storage');
      navigation.navigate('Login');
    });
  };
  const changeToTherapist = () => {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('xAuthToken', token);
    const newIsTherapistValue = !userLogged.isTherapist;
    fetch(`${API_URL}/profile/edit`, {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify({
        isTherapist: newIsTherapistValue,
      }),
    })
      .then(data => {
        setTherapistStatus(newIsTherapistValue);
        Alert.alert(
          `Perfecto ${userLogged.name}!`,
          `Hemos actualizado tu perfil. Por favor inicia sesión de nuevo.`,
          [
            {
              text: 'OK',
              onPress: () => {
                logOut();
              },
            },
          ],
        );
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Ups!!', `${err}`, [
          {text: 'NIMODO', onPress: () => console.log('OK Pressed')},
        ]);
      });
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalTerapeutaVisible}
        onRequestClose={() => {
          setModalTerapeutaVisible(!modalTerapeutaVisible);
        }}>
        <View style={styles.centeredView}>
          <View
            style={{
              width: Dimensions.get('window').width,
              paddingTop: 20,
              borderRadius: 20,
              alignItems: 'center',
              backgroundColor: userLogged.isTherapist
                ? secondaryColor
                : mainColor,
            }}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                color: userLogged.isTherapist ? mainColor : secondaryColor,
                fontSize: TITLE_FONT_SIZE,
                fontWeight: '700',
                marginBottom: 25,
              }}>
              {userLogged.isTherapist
                ? 'Dejar de ser terapeuta!'
                : 'Ser terapeuta!'}
            </Text>
            <View style={styles.formView}>
              <Text
                style={{
                  width: '70%',
                  textAlign: 'center',
                  color: userLogged.isTherapist ? mainColor : secondaryColor,
                  fontSize: QUESTION_SIZE,
                  marginBottom: 25,
                }}>{`Excelente ${userLogged.name}! Te vamos a pedir tus datos en 4 sencillos pasos. Quieres continuar?`}</Text>
            </View>
            <View style={styles.buttons}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setModalTerapeutaVisible(!modalTerapeutaVisible);
                }}>
                <Text style={styles.textStyle}>CANCELAR</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonAplicar]}
                onPress={() => {
                  setModalTerapeutaVisible(!modalTerapeutaVisible);
                  setStep1Visible(!step1Visible);
                }}>
                <Text style={styles.textStyle}>ACEPTAR</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
var QUESTION_SIZE = 25;
var TITLE_FONT_SIZE = 28;
var FORM_MARGIN_BOTTOM = 20;
if (PixelRatio.get() <= 2) {
  FORM_MARGIN_BOTTOM = 15;
  TITLE_FONT_SIZE = 23;
  QUESTION_SIZE = 18;
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttons: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 48,
  },
  buttonCancel: {
    borderRadius: 10,
    backgroundColor: 'red',
    padding: 10,
    elevation: 3,
    width: '30%',
  },
  buttonAplicar: {
    borderRadius: 10,
    backgroundColor: '#1fc362',
    padding: 10,
    elevation: 3,
    width: '30%',
  },
  textStyle: {
    color: textColor1,
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'center',
  },
  formView: {
    width: '100%',
    marginBottom: FORM_MARGIN_BOTTOM,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default UserTypeChange;
