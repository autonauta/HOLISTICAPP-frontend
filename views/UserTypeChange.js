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
import {API_URL, mainColor, secondaryColor} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

function UserTypeChange({
  modalTerapeutaVisible,
  setModalTerapeutaVisible,
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
    myHeaders.append('xAuthToken', JSON.parse(token));
    const therapistIsTrue = !userLogged.isTherapist;
    fetch(`${API_URL}/profile/edit`, {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify({
        isTherapist: therapistIsTrue,
      }),
    })
      .then(res => res.json())
      .then(data => {
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
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Transformación de usuarios</Text>
            <View style={styles.formView}>
              <Text style={styles.modalQuestion}>
                {userLogged.isTherapist === true
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
  modalView: {
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: secondaryColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttons: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
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
    backgroundColor: mainColor,
    padding: 10,
    elevation: 2,
    width: '30%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 25,
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
