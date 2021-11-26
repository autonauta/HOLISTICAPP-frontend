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
import {API_URL, mainColor, secondaryColor, textColor1} from '../../config';

function Step3({
  name,
  lastName,
  phone,
  setName,
  setLastName,
  setPhone,
  modalTerapeutaVisible,
  setModalTerapeutaVisible,
  step1Visible,
  step2Visible,
  step3Visible,
  setStep1Visible,
  setStep2Visible,
  setStep3Visible,
  userLogged,
}) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={step3Visible}
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
              backgroundColor: mainColor,
            }}>
            <Text style={styles.title}>Tipo de servicio</Text>

            <View style={styles.buttons}>
              <Pressable
                style={[styles.button, styles.buttonAplicar]}
                onPress={() => {
                  setStep2Visible(!step2Visible);
                  setStep3Visible(!step3Visible);
                }}>
                <Text style={styles.textStyle}>ATRAS</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setStep3Visible(!step3Visible);
                  setStep4Visible(!step4Visible);
                }}>
                <Text style={styles.textStyle}>SIGUIENTE</Text>
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
var INPUT_WIDTH = '96%';
var INPUT_PADDING = 10;
var LABEL_FONT_SIZE = 24;
var TEXTINPUT_FONT_SIZE = 20;
var INPUT_MARGIN_BOTTOM = 10;
if (PixelRatio.get() <= 2) {
  FORM_MARGIN_BOTTOM = 15;
  TITLE_FONT_SIZE = 23;
  QUESTION_SIZE = 18;
  INPUT_WIDTH = '90%';
  INPUT_PADDING = 6;
  LABEL_FONT_SIZE = 17;
  INPUT_MARGIN_BOTTOM = 10;
  TEXTINPUT_FONT_SIZE = 18;
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
    color: secondaryColor,
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
  },
  textInputView: {
    width: INPUT_WIDTH,
    alignItems: 'center',
    textAlign: 'left',
    marginBottom: INPUT_MARGIN_BOTTOM,
  },
  textInputViewLast: {
    width: INPUT_WIDTH,
    alignItems: 'center',
    textAlign: 'left',
    marginBottom: 60,
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
  buttons: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 48,
  },
  buttonCancel: {
    borderRadius: 10,
    backgroundColor: '#1fc362',
    padding: 10,
    elevation: 3,
    width: '30%',
  },
  buttonAplicar: {
    borderRadius: 10,
    backgroundColor: 'red',
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

export default Step3;
