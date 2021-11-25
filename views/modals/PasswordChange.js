import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';

import {
  API_URL,
  mainColor,
  secondaryColor,
  textColor1,
  textColor2,
} from '../../config';

function PasswordChange({
  navigation,
  modalVisible,
  setModalVisible,
  token,
  userLogged,
}) {
  const [password, setPassword] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const _storeData = async (keyName, value) => {
    try {
      await AsyncStorage.setItem(keyName, value);
    } catch (error) {
      console.log(error);
    }
  };
  const logOut = () => {
    const keys = ['xauthtoken', 'user'];
    AsyncStorage.multiRemove(keys).then(res => {
      console.log(
        'Items removed from storage: User Logged out for password change',
      );
      navigation.navigate('Login');
    });
  };
  const submitData = () => {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('xAuthToken', token);
    return fetch(`${API_URL}/profile/edit`, {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify({
        password,
        passConfirm,
      }),
    })
      .then(data => {
        _storeData('xauthtoken', JSON.stringify(data.confirmationCode));
        setModalVisible(!modalVisible);
        setPassword('');
        setPassConfirm('');
        Alert.alert(
          `Perfecto ${userLogged.name}!`,
          `Hemos actualizado tu contraseña. Por favor inicia sesión de nuevo.`,
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
        console.log(JSON.stringify(err));
      });
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Cambio de Password</Text>
            <View style={styles.formView}>
              <View style={styles.textInputView}>
                <Text style={styles.label}>contraseña</Text>
                <TextInput
                  style={styles.textInput}
                  secureTextEntry
                  value={password}
                  onChangeText={text => setPassword(text)}></TextInput>
              </View>
              <View style={styles.textInputView}>
                <Text style={styles.label}>confirmar contraseña</Text>
                <TextInput
                  style={styles.textInput}
                  secureTextEntry
                  value={passConfirm}
                  onChangeText={text => setPassConfirm(text)}></TextInput>
              </View>
            </View>
            <View style={styles.buttons}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setPassword('');
                  setPassConfirm('');
                }}>
                <Text style={styles.textStyle}>CANCELAR</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonAplicar]}
                onPress={() => submitData()}>
                <Text style={styles.textStyle}>APLICAR</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const theme = {
  colors: {
    primary: mainColor,
  },
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    elevation: 1,
  },
  modalView: {
    width: Dimensions.get('window').width,
    paddingTop: 10,
    backgroundColor: mainColor,
    borderTopRightRadius: 60,
    alignItems: 'center',
    shadowColor: 'black',
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
  modalText: {
    width: '100%',
    textAlign: 'center',
    color: textColor2,
    fontSize: 30,
    marginBottom: 25,
  },
  formView: {
    width: '100%',
    padding: 5,
    marginBottom: 20,
    alignItems: 'center',
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
});

export default PasswordChange;
