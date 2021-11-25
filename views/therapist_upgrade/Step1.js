import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  Pressable,
  Alert,
  PixelRatio,
} from 'react-native';
import {API_URL, mainColor, secondaryColor, textColor1} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Step1({
  modalTerapeutaVisible,
  setModalTerapeutaVisible,
  step1Visible,
  setStep1Visible,
  setStep2Visible,
  token,
  userLogged,
  navigation,
}) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={step1Visible}
        onRequestClose={() => {
          setStep1Visible(!step1Visible);
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
            <Text style={styles.title}>Datos personales</Text>

            <View style={styles.buttons}>
              <Pressable
                style={[styles.button, styles.buttonAplicar]}
                onPress={() => {
                  setStep1Visible(!step1Visible);
                  setModalTerapeutaVisible(!modalTerapeutaVisible);
                }}>
                <Text style={styles.textStyle}>ATRAS</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setStep1Visible(!step1Visible);
                  setStep2Visible(!step2Visible);
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
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  formView: {
    width: '100%',
    marginBottom: FORM_MARGIN_BOTTOM,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  title: {
    color: textColor1,
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'center',
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
});

export default Step1;
