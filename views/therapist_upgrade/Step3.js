import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Dimensions,
  Pressable,
  Alert,
  PixelRatio,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {API_URL, mainColor, secondaryColor, textColor1} from '../../config';

function Step3({
  step2Visible,
  step3Visible,
  step4Visible,
  step5Visible,
  setStep2Visible,
  setStep3Visible,
  setStep4Visible,
  setStep5Visible,
  presencial,
  online,
  atemporal,
  setPresencial,
  setOnline,
  setAtemporal,
}) {
  const checkBoxTheme = {
    true: secondaryColor,
    false: 'grey',
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={step3Visible}
        onRequestClose={() => {
          setStep3Visible(!step3Visible);
        }}>
        <View style={styles.centeredView}>
          <View
            style={{
              width: Dimensions.get('window').width,
              paddingTop: 20,
              borderTopEndRadius: 30,
              borderTopStartRadius: 30,
              alignItems: 'center',
              backgroundColor: mainColor,
            }}>
            <Text style={styles.title}>Tipo de consulta</Text>
            <View style={styles.formView}>
              <View style={styles.checkboxView}>
                <CheckBox
                  tintColors={checkBoxTheme}
                  value={presencial}
                  onValueChange={value => setPresencial(value)}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>Presencial</Text>
              </View>
              <View style={styles.checkboxView}>
                <CheckBox
                  tintColors={checkBoxTheme}
                  value={online}
                  onValueChange={value => setOnline(value)}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>Online</Text>
              </View>
              <View style={styles.checkboxView}>
                <CheckBox
                  tintColors={checkBoxTheme}
                  value={atemporal}
                  onValueChange={value => setAtemporal(value)}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>Atemporal</Text>
              </View>
            </View>
            <View style={styles.buttons}>
              <Pressable
                style={[styles.buttonCancel]}
                onPress={() => {
                  setStep2Visible(!step2Visible);
                  setStep3Visible(!step3Visible);
                }}>
                <Text style={styles.buttonText}>ATRAS</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonAplicar]}
                onPress={() => {
                  if (presencial === false && online === false) {
                    setStep3Visible(!step3Visible);
                    setStep5Visible(!step5Visible);
                  } else {
                    setStep3Visible(!step3Visible);
                    setStep4Visible(!step4Visible);
                  }
                }}>
                <Text style={styles.buttonText}>SIGUIENTE</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

var LABEL_SIZE = 20;
if (PixelRatio.get() <= 2) {
  LABEL_SIZE = 15;
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    color: secondaryColor,
    fontWeight: 'bold',
    fontSize: 28,
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
  buttonText: {
    color: textColor1,
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'center',
  },
  formView: {
    width: '100%',
    padding: 5,
    paddingLeft: 15,
    marginBottom: 20,
  },
  checkboxView: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: LABEL_SIZE,
    color: 'white',
  },
});

export default Step3;
