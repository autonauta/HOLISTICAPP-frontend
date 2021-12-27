import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  Modal,
  Dimensions,
  Pressable,
  PixelRatio,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  API_URL,
  mainColor,
  secondaryColor,
  textColor1,
  textColor2,
} from '../../config';

function Step5({
  step3Visible,
  setStep3Visible,
  step4Visible,
  setStep4Visible,
  step5Visible,
  setStep5Visible,
  presencial,
  online,
  atemporal,
  name,
  lastName,
  phone,
  categories,
  presencialStartHour,
  presencialEndHour,
  presencialSessionDuration,
  onlineStartHour,
  onlineEndHour,
  onlineSessionDuration,
  pMonday,
  pTuesday,
  pWednesday,
  pThursday,
  pFriday,
  pSaturday,
  pSunday,
  oMonday,
  oTuesday,
  oWednesday,
  oThursday,
  oFriday,
  oSaturday,
  oSunday,
  token,
  navigation,
  description,
}) {
  const [sendingData, setSendingData] = useState(false);
  const logOut = () => {
    const keys = ['xauthtoken', 'user', 'userCalendar'];
    AsyncStorage.multiRemove(keys).then(res => {
      console.log('Items removed from storage');
    });
    navigation.navigate('Login');
  };
  const submitData = () => {
    setSendingData(true);
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('xAuthToken', token);
    const pDays = {
      0: pSunday,
      1: pMonday,
      2: pTuesday,
      3: pWednesday,
      4: pThursday,
      5: pFriday,
      6: pSaturday,
    };
    const oDays = {
      0: oSunday,
      1: oMonday,
      2: oTuesday,
      3: oWednesday,
      4: oThursday,
      5: oFriday,
      6: oSaturday,
    };
    const data = {
      name,
      lastName,
      phone,
      categories,
      presencial,
      online,
      atemporal,
      pDays,
      presencialStartHour,
      presencialEndHour,
      presencialSessionDuration,
      oDays,
      onlineStartHour,
      onlineEndHour,
      onlineSessionDuration,
      description,
    };
    console.log(data);
    fetch(`${API_URL}/profile/edit`, {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify(data),
    }).then(data => {
      if (data.error) {
        Alert.alert('Ups!!', `${data.error}`, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        setSendingData(false);
      } else {
        console.log(JSON.stringify(data));
        Alert.alert(`Perfecto!`, `Hemos actualizado tu perfil`, [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
              setStep5Visible(!step5Visible);
              logOut();
            },
          },
        ]);
        setSendingData(false);
      }
    });
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={step5Visible}
        onRequestClose={() => {
          setStep5Visible(!step5Visible);
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
            <Text style={styles.title}>Revisa tus datos!</Text>
            <Text style={styles.data}>Nombre: {name}</Text>
            <Text style={styles.data}>Apellidos: {lastName}</Text>
            <Text style={styles.data}>Telefono: {phone}</Text>
            <Text style={styles.data}>
              Categorías: {categories[0]}
              {categories[1] ? ', ' : ''}
              {categories[1]}
              {categories[2] ? ', ' : ''}
              {categories[2]}
            </Text>
            <Text style={styles.data}>Descripción: {description}</Text>
            {presencial ? (
              <>
                <Text style={styles.data}>Horario Presencial</Text>
                <Text style={styles.data}>
                  Días: {pMonday ? 'Lunes' : ''}
                  {pTuesday ? ', ' : ''}
                  {pTuesday ? 'Martes' : ''}
                  {pWednesday ? ', ' : ''}
                  {pWednesday ? 'Miércoles' : ''}
                  {pThursday ? ', ' : ''}
                  {pThursday ? 'Jueves' : ''}
                  {pFriday ? ', ' : ''}
                  {pFriday ? 'Viernes' : ''}
                  {pSaturday ? ', ' : ''}
                  {pSaturday ? 'Sábado' : ''}
                  {pSunday ? ', ' : ''}
                  {pSunday ? 'Domingo' : ''}
                </Text>
                <Text style={styles.data}>
                  Primera sesión: {presencialStartHour} hrs
                </Text>
                <Text style={styles.data}>
                  Ultima sesión: {presencialEndHour} hrs
                </Text>
                <Text style={styles.data}>
                  Duración de sesión: {presencialSessionDuration} hrs
                </Text>
              </>
            ) : (
              <Text style={{marginBottom: -16}}></Text>
            )}
            {online ? (
              <>
                <Text style={styles.data}>Horario Online</Text>
                <Text style={styles.data}>
                  Días: {oMonday ? 'Lunes' : ''}
                  {oTuesday ? ', ' : ''}
                  {oTuesday ? 'Martes' : ''}
                  {oWednesday ? ', ' : ''}
                  {oWednesday ? 'Miércoles' : ''}
                  {oThursday ? ', ' : ''}
                  {oThursday ? 'Jueves' : ''}
                  {oFriday ? ', ' : ''}
                  {oFriday ? 'Viernes' : ''}
                  {oSaturday ? ', ' : ''}
                  {oSaturday ? 'Sábado' : ''}
                  {oSunday ? ', ' : ''}
                  {oSunday ? 'Domingo' : ''}
                </Text>
                <Text style={styles.data}>
                  Primera sesión: {onlineStartHour} hrs
                </Text>
                <Text style={styles.data}>
                  Ultima sesión: {onlineEndHour} hrs
                </Text>
                <Text style={styles.data}>
                  Duración de sesión: {onlineSessionDuration} hrs
                </Text>
              </>
            ) : (
              <Text style={{marginBottom: -16}}></Text>
            )}

            <View style={styles.buttons}>
              <Pressable
                style={[styles.buttonCancel]}
                onPress={() => {
                  if (presencial === false && online === false) {
                    setStep3Visible(!step3Visible);
                    setStep5Visible(!step5Visible);
                  } else {
                    setStep4Visible(!step4Visible);
                    setStep5Visible(!step5Visible);
                  }
                }}>
                <Text style={styles.buttonText}>ATRAS</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonAplicar]}
                onPress={() => {
                  submitData();
                }}>
                <Text style={styles.buttonText}>
                  {sendingData ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    'Enviar'
                  )}
                </Text>
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
  title: {
    color: secondaryColor,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitles: {
    fontSize: 14,
    paddingLeft: 15,
    color: secondaryColor,
  },
  buttons: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 40,
    marginBottom: 48,
  },
  buttonAplicar: {
    borderRadius: 10,
    backgroundColor: '#1fc362',
    padding: 10,
    elevation: 3,
    width: '30%',
  },
  buttonCancel: {
    borderRadius: 10,
    backgroundColor: 'red',
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
  charactersLeft: {
    paddingLeft: 15,
    alignSelf: 'flex-start',
    color: secondaryColor,
  },
  data: {
    color: secondaryColor,
    fontSize: 22,
    alignSelf: 'flex-start',
    paddingLeft: 15,
  },
});

export default Step5;
