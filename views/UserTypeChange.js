import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {
  API_URL,
  mainColor,
  secondaryColor,
  textColor1,
  textColor2,
} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSafeArea} from 'react-native-safe-area-context';
import {useState} from 'react';

function UserTypeChange({
  modalTerapeutaVisible,
  setModalTerapeutaVisible,
  token,
  userLogged,
  navigation,
}) {
  const [therapistStatus, setTherapistStatus] = useState(
    userLogged.isTherapist,
  );

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
              borderTopRightRadius: 80,
              alignItems: 'center',
              shadowColor: secondaryColor,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              backgroundColor:
                userLogged.isTherapist == true ? secondaryColor : mainColor,
            }}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                color:
                  userLogged.isTherapist == true ? mainColor : secondaryColor,
                fontSize: 30,
                fontWeight: '700',
                marginBottom: 25,
              }}>
              {therapistStatus == true
                ? 'Dejar de ser terapeuta!'
                : 'Ser terapeuta!'}
            </Text>
            <View style={styles.formView}>
              <Text style={styles.modalQuestion}>
                {therapistStatus === true
                  ? 'Seguro que quieres dejar de servir al mundo?'
                  : 'Seguro que quieres ponerte al servicio del mundo?'}
              </Text>
            </View>
            <View style={styles.buttons}>
              <Pressable
                style={[styles.button, styles.buttonAplicar]}
                onPress={() => {
                  changeToTherapist();
                  setModalTerapeutaVisible(!modalTerapeutaVisible);
                }}>
                <Text style={styles.textStyle}>ACEPTAR</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setModalTerapeutaVisible(!modalTerapeutaVisible);
                }}>
                <Text style={styles.textStyle}>CANCELAR</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    elevation: 1,
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
    elevation: 2,
    width: '30%',
  },
  buttonAplicar: {
    borderRadius: 10,
    backgroundColor: '#1fc362',
    padding: 10,
    elevation: 2,
    width: '30%',
  },
  textStyle: {
    color: textColor2,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalQuestion: {
    width: '50%',
    textAlign: 'center',
    color: 'orangered',
    fontSize: 24,
    marginBottom: 25,
  },
  formView: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
});

export default UserTypeChange;
