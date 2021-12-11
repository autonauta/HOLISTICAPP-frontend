import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  Pressable,
  PixelRatio,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyBfdjVIdrtudPD1ykRCR6S8Zf8Nt9T2Q18'); // use a valid API key
import {
  API_URL,
  mainColor,
  secondaryColor,
  textColor1,
  tertiaryColor,
} from '../../config';

function Step4({
  step3Visible,
  setStep3Visible,
  step4Visible,
  setStep4Visible,
  step5Visible,
  setStep5Visible,
  online,
  presencial,
  presencialStartHour,
  setPresencialStartHour,
  presencialEndHour,
  setPresencialEndHour,
  presencialSessionDuration,
  setPresencialSessionDuration,
  onlineStartHour,
  setOnlineStartHour,
  onlineEndHour,
  setOnlineEndHour,
  onlineSessionDuration,
  setOnlineSessionDuration,
  pSunday,
  pMonday,
  pTuesday,
  pWednesday,
  pThursday,
  pFriday,
  pSaturday,
  oSunday,
  oMonday,
  oTuesday,
  oWednesday,
  oThursday,
  oFriday,
  oSaturday,
  setPSunday,
  setPMonday,
  setPTuesday,
  setPWednesday,
  setPThursday,
  setPFriday,
  setPSaturday,
  setOSunday,
  setOMonday,
  setOTuesday,
  setOWednesday,
  setOThursday,
  setOFriday,
  setOSaturday,
}) {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [precision, setPrecision] = useState();
  const [street, setStreet] = useState();
  const [colony, setColony] = useState();
  const [city, setCity] = useState();
  const HourDropdown = [
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '11:30',
    '11:00',
    '12:30',
    '12:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
    '24:00',
  ];
  const durationDropdown = [
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
  ];
  const checkBoxTheme = {
    true: secondaryColor,
    false: 'grey',
  };
  const getAddress = (lat, lon) => {
    Geocoder.from(lat, lon)
      .then(json => {
        var street = json.results[0].address_components[1].long_name;
        var colony = json.results[0].address_components[2].long_name;
        var city = json.results[0].address_components[3].long_name;
        console.log('Street: ', street);
        console.log('Colony: ', colony);
        console.log('Ciudad: ', city);
        setStreet(street);
        setColony(colony);
        setCity(city);
      })
      .catch(error => console.warn(error));
  };
  const getGPS = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        setPrecision(location.accuracy);
        getAddress(location.latitude, location.longitude);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };
  //useEffect(() => {
  //getGPS();
  //}, []);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={step4Visible}
        onRequestClose={() => {
          setStep4Visible(!step4Visible);
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
            <Text style={styles.title}>
              {presencial && online
                ? 'Crea tus calendarios'
                : 'Crea tu calendario'}
            </Text>
            {presencial ? (
              <View style={styles.typeContainer}>
                <Text style={styles.subtitle}>Presencial</Text>
                <View style={styles.diasSemana}>
                  <View style={styles.diasBlocks}>
                    <Text style={styles.diasText}>L</Text>
                    <CheckBox
                      disabled={oMonday}
                      tintColors={checkBoxTheme}
                      value={pMonday}
                      onValueChange={value => setPMonday(value)}
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.diasBlocks}>
                    <Text style={styles.diasText}>M</Text>
                    <CheckBox
                      disabled={oTuesday}
                      tintColors={checkBoxTheme}
                      value={pTuesday}
                      onValueChange={value => setPTuesday(value)}
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.diasBlocks}>
                    <Text style={styles.diasText}>M</Text>
                    <CheckBox
                      disabled={oWednesday}
                      tintColors={checkBoxTheme}
                      value={pWednesday}
                      onValueChange={value => setPWednesday(value)}
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.diasBlocks}>
                    <Text style={styles.diasText}>J</Text>
                    <CheckBox
                      disabled={oThursday}
                      tintColors={checkBoxTheme}
                      value={pThursday}
                      onValueChange={value => setPThursday(value)}
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.diasBlocks}>
                    <Text style={styles.diasText}>V</Text>
                    <CheckBox
                      disabled={oFriday}
                      tintColors={checkBoxTheme}
                      value={pFriday}
                      onValueChange={value => setPFriday(value)}
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.diasBlocks}>
                    <Text style={styles.diasText}>S</Text>
                    <CheckBox
                      disabled={oSaturday}
                      tintColors={checkBoxTheme}
                      value={pSaturday}
                      onValueChange={value => setPSaturday(value)}
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.diasBlocks}>
                    <Text style={styles.diasText}>D</Text>
                    <CheckBox
                      disabled={oSunday}
                      tintColors={checkBoxTheme}
                      value={pSunday}
                      onValueChange={value => setPSunday(value)}
                      style={styles.checkbox}
                    />
                  </View>
                </View>
                <View style={styles.horario}>
                  <View style={styles.limits}>
                    <Text style={styles.limitsText}>Primera sesión</Text>
                    <SelectDropdown
                      disabled={
                        oMonday &&
                        oTuesday &&
                        oWednesday &&
                        oThursday &&
                        oFriday &&
                        oSaturday &&
                        oSunday
                      }
                      buttonStyle={{
                        width: '80%',
                        height: 40,
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor:
                          oMonday &&
                          oTuesday &&
                          oWednesday &&
                          oThursday &&
                          oFriday &&
                          oSaturday &&
                          oSunday
                            ? 'gray'
                            : tertiaryColor,
                        borderRadius: 8,
                        marginBottom: 20,
                      }}
                      buttonTextStyle={{
                        color:
                          oMonday &&
                          oTuesday &&
                          oWednesday &&
                          oThursday &&
                          oFriday &&
                          oSaturday &&
                          oSunday
                            ? 'gray'
                            : tertiaryColor,
                      }}
                      dropdownStyle={{
                        backgroundColor: secondaryColor,
                        borderWidth: 1,
                        borderColor: 'transparent',
                        borderRadius: 8,
                      }}
                      rowTextStyle={{color: 'white', fontWeight: '700'}}
                      defaultButtonText={
                        presencialStartHour ? presencialStartHour : 'Click'
                      }
                      data={HourDropdown}
                      onSelect={(selectedItem, index) => {
                        setPresencialStartHour(selectedItem);
                      }}
                      buttonTextAfterSelection={selectedItem => {
                        return selectedItem;
                      }}
                      rowTextForSelection={item => {
                        return item;
                      }}
                    />
                  </View>
                  <View style={styles.limits}>
                    <Text style={styles.limitsText}>Ultima sesión</Text>
                    <SelectDropdown
                      disabled={
                        oMonday &&
                        oTuesday &&
                        oWednesday &&
                        oThursday &&
                        oFriday &&
                        oSaturday &&
                        oSunday
                      }
                      buttonStyle={{
                        width: '80%',
                        height: 40,
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor:
                          oMonday &&
                          oTuesday &&
                          oWednesday &&
                          oThursday &&
                          oFriday &&
                          oSaturday &&
                          oSunday
                            ? 'gray'
                            : tertiaryColor,
                        borderRadius: 8,
                        marginBottom: 20,
                      }}
                      buttonTextStyle={{
                        color:
                          oMonday &&
                          oTuesday &&
                          oWednesday &&
                          oThursday &&
                          oFriday &&
                          oSaturday &&
                          oSunday
                            ? 'gray'
                            : tertiaryColor,
                      }}
                      dropdownStyle={{
                        backgroundColor: secondaryColor,
                        borderWidth: 1,
                        borderColor: 'transparent',
                        borderRadius: 8,
                      }}
                      rowTextStyle={{color: 'white', fontWeight: '700'}}
                      defaultButtonText={
                        presencialEndHour ? presencialEndHour : 'Click'
                      }
                      data={HourDropdown}
                      onSelect={(selectedItem, index) => {
                        setPresencialEndHour(selectedItem);
                      }}
                      buttonTextAfterSelection={selectedItem => {
                        return selectedItem;
                      }}
                      rowTextForSelection={item => {
                        return item;
                      }}
                    />
                  </View>
                </View>
                <View style={styles.horario}>
                  <View style={styles.limits}>
                    <Text style={styles.limitsText}>Duración de la sesión</Text>
                    <SelectDropdown
                      disabled={
                        oMonday &&
                        oTuesday &&
                        oWednesday &&
                        oThursday &&
                        oFriday &&
                        oSaturday &&
                        oSunday
                      }
                      buttonStyle={{
                        width: '35%',
                        height: 40,
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor:
                          oMonday &&
                          oTuesday &&
                          oWednesday &&
                          oThursday &&
                          oFriday &&
                          oSaturday &&
                          oSunday
                            ? 'gray'
                            : tertiaryColor,
                        borderRadius: 8,
                        marginBottom: 20,
                      }}
                      buttonTextStyle={{
                        color:
                          oMonday &&
                          oTuesday &&
                          oWednesday &&
                          oThursday &&
                          oFriday &&
                          oSaturday &&
                          oSunday
                            ? 'gray'
                            : tertiaryColor,
                      }}
                      dropdownStyle={{
                        backgroundColor: secondaryColor,
                        borderWidth: 1,
                        borderColor: 'transparent',
                        borderRadius: 8,
                      }}
                      rowTextStyle={{color: 'white', fontWeight: '700'}}
                      defaultButtonText={
                        presencialSessionDuration
                          ? presencialSessionDuration
                          : 'Click'
                      }
                      data={durationDropdown}
                      onSelect={(selectedItem, index) => {
                        setPresencialSessionDuration(selectedItem);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View></View>
            )}
            {online ? (
              <View style={styles.typeContainer}>
                <Text style={styles.subtitle}>Online</Text>
                <View style={styles.diasSemana}>
                  <View style={styles.diasBlocks}>
                    <Text style={styles.diasText}>L</Text>
                    <CheckBox
                      disabled={pMonday}
                      tintColors={checkBoxTheme}
                      value={oMonday}
                      onValueChange={value => setOMonday(value)}
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.diasBlocks}>
                    <Text style={styles.diasText}>M</Text>
                    <CheckBox
                      disabled={pTuesday}
                      tintColors={checkBoxTheme}
                      value={oTuesday}
                      onValueChange={value => setOTuesday(value)}
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.diasBlocks}>
                    <Text style={styles.diasText}>M</Text>
                    <CheckBox
                      disabled={pWednesday}
                      tintColors={checkBoxTheme}
                      value={oWednesday}
                      onValueChange={value => setOWednesday(value)}
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.diasBlocks}>
                    <Text style={styles.diasText}>J</Text>
                    <CheckBox
                      disabled={pThursday}
                      tintColors={checkBoxTheme}
                      value={oThursday}
                      onValueChange={value => setOThursday(value)}
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.diasBlocks}>
                    <Text style={styles.diasText}>V</Text>
                    <CheckBox
                      disabled={pFriday}
                      tintColors={checkBoxTheme}
                      value={oFriday}
                      onValueChange={value => setOFriday(value)}
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.diasBlocks}>
                    <Text style={styles.diasText}>S</Text>
                    <CheckBox
                      disabled={pSaturday}
                      tintColors={checkBoxTheme}
                      value={oSaturday}
                      onValueChange={value => setOSaturday(value)}
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.diasBlocks}>
                    <Text style={styles.diasText}>D</Text>
                    <CheckBox
                      disabled={pSunday}
                      tintColors={checkBoxTheme}
                      value={oSunday}
                      onValueChange={value => setOSunday(value)}
                      style={styles.checkbox}
                    />
                  </View>
                </View>
                <View style={styles.horario}>
                  <View style={styles.limits}>
                    <Text style={styles.limitsText}>Primera sesión</Text>
                    <SelectDropdown
                      disabled={
                        pMonday &&
                        pTuesday &&
                        pWednesday &&
                        pThursday &&
                        pFriday &&
                        pSaturday &&
                        pSunday
                      }
                      buttonStyle={{
                        width: '80%',
                        height: 40,
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor:
                          pMonday &&
                          pTuesday &&
                          pWednesday &&
                          pThursday &&
                          pFriday &&
                          pSaturday &&
                          pSunday
                            ? 'gray'
                            : tertiaryColor,
                        borderRadius: 8,
                        marginBottom: 20,
                      }}
                      buttonTextStyle={{
                        color:
                          pMonday &&
                          pTuesday &&
                          pWednesday &&
                          pThursday &&
                          pFriday &&
                          pSaturday &&
                          pSunday
                            ? 'gray'
                            : tertiaryColor,
                      }}
                      dropdownStyle={{
                        backgroundColor: secondaryColor,
                        borderWidth: 1,
                        borderColor: 'transparent',
                        borderRadius: 8,
                      }}
                      rowTextStyle={{color: 'white', fontWeight: '700'}}
                      defaultButtonText={
                        onlineStartHour ? onlineStartHour : 'Click'
                      }
                      data={HourDropdown}
                      onSelect={(selectedItem, index) => {
                        setOnlineStartHour(selectedItem);
                      }}
                      buttonTextAfterSelection={selectedItem => {
                        return selectedItem;
                      }}
                      rowTextForSelection={item => {
                        return item;
                      }}
                    />
                  </View>
                  <View style={styles.limits}>
                    <Text style={styles.limitsText}>Ultima sesión</Text>
                    <SelectDropdown
                      disabled={
                        pMonday &&
                        pTuesday &&
                        pWednesday &&
                        pThursday &&
                        pFriday &&
                        pSaturday &&
                        pSunday
                      }
                      buttonStyle={{
                        width: '80%',
                        height: 40,
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor:
                          pMonday &&
                          pTuesday &&
                          pWednesday &&
                          pThursday &&
                          pFriday &&
                          pSaturday &&
                          pSunday
                            ? 'gray'
                            : tertiaryColor,
                        borderRadius: 8,
                        marginBottom: 20,
                      }}
                      buttonTextStyle={{
                        color:
                          pMonday &&
                          pTuesday &&
                          pWednesday &&
                          pThursday &&
                          pFriday &&
                          pSaturday &&
                          pSunday
                            ? 'gray'
                            : tertiaryColor,
                      }}
                      dropdownStyle={{
                        backgroundColor: secondaryColor,
                        borderWidth: 1,
                        borderColor: 'transparent',
                        borderRadius: 8,
                      }}
                      rowTextStyle={{color: 'white', fontWeight: '700'}}
                      defaultButtonText={
                        onlineEndHour ? onlineEndHour : 'Click'
                      }
                      data={HourDropdown}
                      onSelect={(selectedItem, index) => {
                        setOnlineEndHour(selectedItem);
                      }}
                      buttonTextAfterSelection={selectedItem => {
                        return selectedItem;
                      }}
                      rowTextForSelection={item => {
                        return item;
                      }}
                    />
                  </View>
                </View>
                <View style={styles.horario}>
                  <View style={styles.limits}>
                    <Text style={styles.limitsText}>Duración de la sesión</Text>
                    <SelectDropdown
                      disabled={
                        pMonday &&
                        pTuesday &&
                        pWednesday &&
                        pThursday &&
                        pFriday &&
                        pSaturday &&
                        pSunday
                      }
                      buttonStyle={{
                        width: '35%',
                        height: 40,
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor:
                          pMonday &&
                          pTuesday &&
                          pWednesday &&
                          pThursday &&
                          pFriday &&
                          pSaturday &&
                          pSunday
                            ? 'gray'
                            : tertiaryColor,
                        borderRadius: 8,
                        marginBottom: 30,
                      }}
                      buttonTextStyle={{
                        color:
                          pMonday &&
                          pTuesday &&
                          pWednesday &&
                          pThursday &&
                          pFriday &&
                          pSaturday &&
                          pSunday
                            ? 'gray'
                            : tertiaryColor,
                      }}
                      dropdownStyle={{
                        backgroundColor: secondaryColor,
                        borderWidth: 1,
                        borderColor: 'transparent',
                        borderRadius: 8,
                      }}
                      rowTextStyle={{color: 'white', fontWeight: '700'}}
                      defaultButtonText={
                        onlineSessionDuration ? onlineSessionDuration : 'Click'
                      }
                      data={durationDropdown}
                      onSelect={(selectedItem, index) => {
                        setOnlineSessionDuration(selectedItem);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                    />
                  </View>
                  {/* <View style={styles.limits}>
                    <Text style={styles.limitsText}>Break</Text>
                    <SelectDropdown
                      disabled={
                        pMonday &&
                        pTuesday &&
                        pWednesday &&
                        pThursday &&
                        pFriday &&
                        pSaturday &&
                        pSunday
                      }
                      buttonStyle={{
                        width: '80%',
                        height: 40,
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor:
                          pMonday &&
                          pTuesday &&
                          pWednesday &&
                          pThursday &&
                          pFriday &&
                          pSaturday &&
                          pSunday
                            ? 'gray'
                            : tertiaryColor,
                        borderRadius: 8,
                        marginBottom: 30,
                      }}
                      buttonTextStyle={{
                        color:
                          pMonday &&
                          pTuesday &&
                          pWednesday &&
                          pThursday &&
                          pFriday &&
                          pSaturday &&
                          pSunday
                            ? 'gray'
                            : tertiaryColor,
                      }}
                      dropdownStyle={{
                        backgroundColor: secondaryColor,
                        borderWidth: 1,
                        borderColor: 'transparent',
                        borderRadius: 8,
                      }}
                      rowTextStyle={{color: 'white', fontWeight: '700'}}
                      defaultButtonText={
                        onlineSessionDuration ? onlineSessionDuration : 'Click'
                      }
                      data={durationDropdown}
                      onSelect={(selectedItem, index) => {
                        setOnlineBreak(selectedItem);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                    />
                  </View> */}
                </View>
              </View>
            ) : (
              <View></View>
            )}
            <Text style={styles.subtitle}>latitude: {latitude}</Text>
            <Text style={styles.subtitle}>longitud: {longitude}</Text>
            <Text style={styles.subtitle}>precision: {precision}</Text>
            <Text style={styles.subtitle}>calle: {street}</Text>
            <Text style={styles.subtitle}>colonia: {colony}</Text>
            <Text style={styles.subtitle}>ciudad: {city}</Text>

            <Pressable
              style={[styles.buttonCancel]}
              onPress={() => {
                getGPS();
              }}>
              <Text style={styles.buttonText}>ATRAS</Text>
            </Pressable>
            <View style={styles.buttons}>
              <Pressable
                style={[styles.buttonCancel]}
                onPress={() => {
                  setStep3Visible(!step3Visible);
                  setStep4Visible(!step4Visible);
                }}>
                <Text style={styles.buttonText}>ATRAS</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonAplicar]}
                onPress={() => {
                  setStep4Visible(!step4Visible);
                  setStep5Visible(!step5Visible);
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

var DIAS_FONT_SIZE = 20;
var LIMITS_FONT_SIZE = 22;
if (PixelRatio.get() <= 2) {
  IMAGE_SIZE = 60;
  TITLE_FONT_SIZE = 18;
  SUBTITLE_FONT_SIZE = 15;
  LOGOUT_BUTTON_PADDING = 8;
  LOGOUT_BUTTON_FONT_SIZE = 12;
  SUBTITLES_FONT_SIZE = 18;
  CARD_HEIGHT = 40;
  CARDIMAGE_SIZE = 32;
  CARD_TITLE_FONT_SIZE = 14;
  CARD_SUBTITLE_FONT_SIZE = 10;
  DIAS_FONT_SIZE = 14;
  LIMITS_FONT_SIZE = 18;
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  typeContainer: {
    width: '100%',
  },
  title: {
    color: secondaryColor,
    fontWeight: 'bold',
    fontSize: 28,
  },
  subtitle: {
    color: secondaryColor,
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: secondaryColor,
    paddingLeft: 10,
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
  diasSemana: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
  },
  diasBlocks: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diasText: {
    color: tertiaryColor,
    fontWeight: '700',
    fontSize: DIAS_FONT_SIZE,
  },
  horario: {
    width: '100%',
    flexDirection: 'row',
  },
  limits: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  limitsText: {
    marginBottom: 8,
    color: secondaryColor,
    fontSize: LIMITS_FONT_SIZE,
  },
});
export default Step4;
