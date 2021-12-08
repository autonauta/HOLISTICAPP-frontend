import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  PixelRatio,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//---------------------------------IMPORTS-----------------------------
import {mainColor, secondaryColor, tertiaryColor, textColor1} from '../config';
import PasswordChange from './modals/PasswordChange';
import ImageChange from './modals/ImageChange';
import UserTypeChange from './modals/UserTypeChange';
import Step1 from './therapist_upgrade/Step1';
import Step2 from './therapist_upgrade/Step2';
import Step3 from './therapist_upgrade/Step3';
import Step4 from './therapist_upgrade/Step4';
import Step5 from './therapist_upgrade/Step5';

const defaultImage = require('../assets/avatar.png');

function Profile({navigation, route}) {
  let {userLogged} = route.params;
  const token = route.params.token;
  //-------------------------------------------------------------------------------------------
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTerapeutaVisible, setModalTerapeutaVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  //-------------------------------------------------------------------------------------------
  const [step1Visible, setStep1Visible] = useState(false);
  const [step2Visible, setStep2Visible] = useState(false);
  const [step3Visible, setStep3Visible] = useState(false);
  const [step4Visible, setStep4Visible] = useState(false);
  const [step5Visible, setStep5Visible] = useState(false);
  //-------------------------------------------------------------------------------------------
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [categories, setCategories] = useState('');
  const [description, setDescription] = useState('');
  //-------------------------------------------------------------------------------------------
  const [presencial, setPresencial] = useState(false);
  const [online, setOnline] = useState(false);
  const [atemporal, setAtemporal] = useState(false);
  //-------------------------------------------------------------------------------------------
  const [presencialStartHour, setPresencialStartHour] = useState();
  const [presencialEndHour, setPresencialEndHour] = useState();
  const [presencialSessionDuration, setPresencialSessionDuration] = useState();
  //-------------------------------------------------------------------------------------------
  const [onlineStartHour, setOnlineStartHour] = useState();
  const [onlineEndHour, setOnlineEndHour] = useState();
  const [onlineSessionDuration, setOnlineSessionDuration] = useState();
  //-------------------------------------------------------------------------------------------
  //-------------------------------Week day presencial variables ---------------------------------------
  const [pSunday, setPSunday] = useState(false);
  const [pMonday, setPMonday] = useState(false);
  const [pTuesday, setPTuesday] = useState(false);
  const [pWednesday, setPWednesday] = useState(false);
  const [pThursday, setPThursday] = useState(false);
  const [pFriday, setPFriday] = useState(false);
  const [pSaturday, setPSaturday] = useState(false);
  //-------------------------------Week day online variables ---------------------------------------
  const [oSunday, setOSunday] = useState(false);
  const [oMonday, setOMonday] = useState(false);
  const [oTuesday, setOTuesday] = useState(false);
  const [oWednesday, setOWednesday] = useState(false);
  const [oThursday, setOThursday] = useState(false);
  const [oFriday, setOFriday] = useState(false);
  const [oSaturday, setOSaturday] = useState(false);

  const logOut = () => {
    const keys = ['xauthtoken', 'user', 'userCalendar'];
    AsyncStorage.multiRemove(keys).then(res => {
      console.log('Items removed from storage');
      navigation.navigate('Login');
    });
  };
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  const getImage = image => {
    if (
      typeof image === 'undefined' ||
      image === null ||
      typeof image === 'string' ||
      isEmpty(image) == true ||
      image.uri == null
    ) {
      return defaultImage;
    } else {
      return image;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}></View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={getImage(userLogged.image)}></Image>
        <Text
          style={styles.imageButton}
          onPress={() => {
            setImageModalVisible(true);
          }}>
          CAMBIAR
        </Text>
      </View>
      <View style={styles.profile}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text style={styles.textName}>{userLogged.name}</Text>
          <Text style={styles.textData}>{userLogged.email}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Pressable
          style={styles.buttonPassword}
          mode="contained"
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={styles.buttonText}>CAMBIAR PASSWORD</Text>
        </Pressable>
        <Pressable
          style={styles.buttonPassword}
          mode="contained"
          onPress={() => {
            setModalTerapeutaVisible(true);
          }}>
          <Text style={styles.buttonText}>SER TERAPEUTA!</Text>
        </Pressable>
        <Pressable
          style={styles.buttonLogout}
          mode="contained"
          onPress={() => {
            logOut();
          }}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </Pressable>
      </View>
      <PasswordChange
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        token={token}
        userLogged={userLogged}
        navigation={navigation}
      />
      <ImageChange
        imageModalVisible={imageModalVisible}
        setImageModalVisible={setImageModalVisible}
        token={token}
        userLogged={userLogged}
        navigation={navigation}
      />
      <UserTypeChange
        modalTerapeutaVisible={modalTerapeutaVisible}
        setModalTerapeutaVisible={setModalTerapeutaVisible}
        token={token}
        userLogged={userLogged}
        navigation={navigation}
        step1Visible={step1Visible}
        setStep1Visible={setStep1Visible}
      />
      <Step1
        modalTerapeutaVisible={modalTerapeutaVisible}
        setModalTerapeutaVisible={setModalTerapeutaVisible}
        step1Visible={step1Visible}
        setStep1Visible={setStep1Visible}
        step2Visible={step2Visible}
        setStep2Visible={setStep2Visible}
        userLogged={userLogged}
        name={name}
        setName={setName}
        lastName={lastName}
        setLastName={setLastName}
        phone={phone}
        setPhone={setPhone}
      />
      <Step2
        categories={categories}
        setCategories={setCategories}
        step1Visible={step1Visible}
        setStep1Visible={setStep1Visible}
        step2Visible={step2Visible}
        setStep2Visible={setStep2Visible}
        step3Visible={step3Visible}
        setStep3Visible={setStep3Visible}
        description={description}
        setDescription={setDescription}
      />
      <Step3
        step2Visible={step2Visible}
        setStep2Visible={setStep2Visible}
        step3Visible={step3Visible}
        setStep3Visible={setStep3Visible}
        step4Visible={step4Visible}
        setStep4Visible={setStep4Visible}
        step5Visible={step5Visible}
        setStep5Visible={setStep5Visible}
        presencial={presencial}
        online={online}
        atemporal={atemporal}
        setPresencial={setPresencial}
        setOnline={setOnline}
        setAtemporal={setAtemporal}
      />
      <Step4
        step3Visible={step3Visible}
        setStep3Visible={setStep3Visible}
        step4Visible={step4Visible}
        setStep4Visible={setStep4Visible}
        step5Visible={step5Visible}
        setStep5Visible={setStep5Visible}
        presencial={presencial}
        online={online}
        presencialStartHour={presencialStartHour}
        setPresencialStartHour={setPresencialStartHour}
        presencialEndHour={presencialEndHour}
        setPresencialEndHour={setPresencialEndHour}
        presencialSessionDuration={presencialSessionDuration}
        setPresencialSessionDuration={setPresencialSessionDuration}
        onlineStartHour={onlineStartHour}
        setOnlineStartHour={setOnlineStartHour}
        onlineEndHour={onlineEndHour}
        setOnlineEndHour={setOnlineEndHour}
        onlineSessionDuration={onlineSessionDuration}
        setOnlineSessionDuration={setOnlineSessionDuration}
        pSunday={pSunday}
        pMonday={pMonday}
        pTuesday={pTuesday}
        pWednesday={pWednesday}
        pThursday={pThursday}
        pFriday={pFriday}
        pSaturday={pSaturday}
        setPSunday={setPSunday}
        setPMonday={setPMonday}
        setPTuesday={setPTuesday}
        setPWednesday={setPWednesday}
        setPThursday={setPThursday}
        setPFriday={setPFriday}
        setPSaturday={setPSaturday}
        oSunday={oSunday}
        oMonday={oMonday}
        oTuesday={oTuesday}
        oWednesday={oWednesday}
        oThursday={oThursday}
        oFriday={oFriday}
        oSaturday={oSaturday}
        setOSunday={setOSunday}
        setOMonday={setOMonday}
        setOTuesday={setOTuesday}
        setOWednesday={setOWednesday}
        setOThursday={setOThursday}
        setOFriday={setOFriday}
        setOSaturday={setOSaturday}
      />
      <Step5
        step3Visible={step3Visible}
        setStep3Visible={setStep3Visible}
        step4Visible={step4Visible}
        setStep4Visible={setStep4Visible}
        step5Visible={step5Visible}
        setStep5Visible={setStep5Visible}
        presencial={presencial}
        online={online}
        atemporal={atemporal}
        name={name}
        lastName={lastName}
        phone={phone}
        description={description}
        categories={categories}
        presencialStartHour={presencialStartHour}
        presencialEndHour={presencialEndHour}
        presencialSessionDuration={presencialSessionDuration}
        onlineStartHour={onlineStartHour}
        onlineEndHour={onlineEndHour}
        onlineSessionDuration={onlineSessionDuration}
        pMonday={pMonday}
        pTuesday={pTuesday}
        pWednesday={pWednesday}
        pThursday={pThursday}
        pFriday={pFriday}
        pSaturday={pSaturday}
        pSunday={pSunday}
        oMonday={oMonday}
        oTuesday={oTuesday}
        oWednesday={oWednesday}
        oThursday={oThursday}
        oFriday={oFriday}
        oSaturday={oSaturday}
        oSunday={oSunday}
        token={token}
        navigation={navigation}
      />
      <View style={styles.covering}></View>
    </SafeAreaView>
  );
}
var TEXT_NAME_SIZE = 40;
var TOP_HEIGHT = 140;
var IMAGE_HEIGHT = 160;
var BUTTON_HEIGHT = 40;
var BUTTON_FONT_SIZE = 16;
var BUTTON_MARGIN_BOTTOM = 20;

var STATUS_BAR_HEIGHT = StatusBar.currentHeight;
var CONTAINER_HEIGHT =
  Dimensions.get('screen').height - StatusBar.currentHeight;
if (PixelRatio.get() <= 2) {
  BUTTON_HEIGHT = 25;
  BUTTON_FONT_SIZE = 11;
  BUTTON_MARGIN_BOTTOM = 10;
  TEXT_NAME_SIZE = 30;
  TOP_HEIGHT = 80;
  IMAGE_HEIGHT = 100;
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flex: 1,
    alignItems: 'center',
    backgroundColor: secondaryColor,
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
  },
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_HEIGHT,
    borderRadius: 40,
    marginTop: -IMAGE_HEIGHT / 2,
  },
  top: {
    width: '100%',
    height: TOP_HEIGHT,
    backgroundColor: mainColor,
  },
  profile: {
    width: '100%',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  textName: {
    color: mainColor,
    fontSize: TEXT_NAME_SIZE,
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  textData: {
    color: textColor1,
    fontSize: 20,
    alignSelf: 'flex-start',
    fontWeight: '600',
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    marginBottom: 30,
  },
  buttonPassword: {
    width: '100%',
    marginBottom: BUTTON_MARGIN_BOTTOM,
    backgroundColor: mainColor,
    height: BUTTON_HEIGHT,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  buttonLogout: {
    width: '100%',
    backgroundColor: 'red',
    padding: 8,
    marginBottom: 20,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  imageButton: {
    borderRadius: 8,
    color: tertiaryColor,
    fontWeight: '700',
    fontSize: 15,
    padding: 5,
    paddingRight: 20,
    paddingLeft: 20,
  },
  buttonText: {
    fontSize: BUTTON_FONT_SIZE,
    color: 'white',
  },
  covering: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
  },
});

export default Profile;
