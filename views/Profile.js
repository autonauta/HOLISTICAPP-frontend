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
/* import Step2 from './therapist_upgrade/Step2';
import Step3 from './therapist_upgrade/Step3';
import Step4 from './therapist_upgrade/Step4'; */

const defaultImage = require('../assets/avatar.png');

function Profile({navigation, route}) {
  let {userLogged} = route.params;
  const token = route.params.token;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTerapeutaVisible, setModalTerapeutaVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [step1Visible, setStep1Visible] = useState(false);
  const [step2Visible, setStep2Visible] = useState(false);
  const [step3Visible, setStep3Visible] = useState(false);
  const [step4Visible, setStep4Visible] = useState(false);

  const logOut = () => {
    const keys = ['xauthtoken', 'user'];
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
        token={token}
        userLogged={userLogged}
        navigation={navigation}
      />
      {/* <Step2
        step2Visible={step2Visible}
        setStep2Visible={setStep2Visible}
        token={token}
        userLogged={userLogged}
        navigation={navigation}
      />
      <Step3
        step3Visible={step3Visible}
        setStep3Visible={setStep3Visible}
        token={token}
        userLogged={userLogged}
        navigation={navigation}
      />
      <Step4
        step4Visible={step4Visible}
        setStep4Visible={setStep4Visible}
        token={token}
        userLogged={userLogged}
        navigation={navigation}
      /> */}
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
    backgroundColor: textColor1,
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
});

export default Profile;
