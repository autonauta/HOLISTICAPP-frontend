import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  PixelRatio,
  StatusBar,
} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageChange from './modals/ImageChange';

import {mainColor, tertiaryColor, textColor1} from '../config';
const defaultImage = require('../assets/avatar.png');
const categories = [
  'biomagnetismo',
  'aromaterapia',
  'acupunctura',
  'masajes',
  'tarot',
  'musicoterapia',
  'nutricion',
  'psicologia',
  'transgeneracional',
  'veterinaria',
];
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

function TherapistProfile({navigation, route}) {
  //--------------------------Variables for user and calendar------------------
  let {token} = route.params;
  const userRoute = route.params.userLogged;
  const [userLogged, setUserLogged] = useState(userRoute);

  //-----------------------------modalTerapeuta--------------------------------------------
  const [modalTerapeutaVisible, setModalTerapeutaVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  //-------------------------------checkboxes enable/disable variable -----------------------

  const logOut = () => {
    const keys = ['xauthtoken', 'user', 'userCalendar'];
    AsyncStorage.multiRemove(keys).then(res => {
      console.log('Items removed from storage');
    });
    navigation.navigate('Login');
  };
  const _storeData = async (keyName, value) => {
    try {
      await AsyncStorage.setItem(keyName, value);
    } catch (error) {
      console.log(error);
    }
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
      <StatusBar
        animated={true}
        backgroundColor={mainColor}
        barStyle={'default'}
        showHideTransition={'fade'}
      />
      <View style={styles.header}>
        <View style={styles.imageBox}>
          <Image
            style={styles.image}
            source={getImage(userLogged.image)}></Image>
          <Pressable
            onPress={() => {
              setImageModalVisible(true);
            }}>
            <Text style={styles.imageChangeText}>cambiar</Text>
          </Pressable>
        </View>

        <View style={styles.userBox}>
          <Text style={styles.title}>{userLogged.name}</Text>
          <View style={styles.categoriesView}>
            {userLogged.categories.map(category => {
              return (
                <Text key={category} style={styles.subtitle}>
                  {category}{' '}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          style={styles.buttonPassword}
          mode="contained"
          onPress={() => {
            setModalTerapeutaVisible(true);
          }}>
          DEJAR DE SERVIR AL MUNDO!
        </Button>
        <Button
          style={styles.buttonLogout}
          mode="contained"
          onPress={() => {
            logOut();
          }}>
          LOGOUT
        </Button>
      </View>

      <ImageChange
        imageModalVisible={imageModalVisible}
        setImageModalVisible={setImageModalVisible}
        token={token}
        userLogged={userLogged}
        setUserLogged={setUserLogged}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}
var IMAGE_SIZE = 90;
var TITLE_FONT_SIZE = 35;
var SUBTITLE_FONT_SIZE = 20;
var LOGOUT_BUTTON_FONT_SIZE = 16;
var SUBTITLES_FONT_SIZE = 22;
var CARD_HEIGHT = 60;
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
  container: {
    flex: 1,
    backgroundColor: mainColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 10,
    marginBottom: 20,
  },
  userBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  categoriesView: {
    width: '100%',
    flexWrap: 'wrap',
  },
  title: {
    color: tertiaryColor,
    fontSize: TITLE_FONT_SIZE,
    fontWeight: '700',
  },
  subtitle: {
    color: textColor1,
    fontSize: SUBTITLE_FONT_SIZE,
    fontWeight: '700',
  },
  imageBox: {
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: 20,
  },
  imageChangeText: {
    color: tertiaryColor,
    fontSize: 16,
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    marginBottom: 30,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: LOGOUT_BUTTON_FONT_SIZE,
    fontWeight: '700',
  },
  buttonPassword: {
    width: '100%',
    backgroundColor: tertiaryColor,
    padding: 2,
    marginBottom: 20,
  },
  buttonLogout: {
    width: '100%',
    padding: 2,
    backgroundColor: 'red',
    marginBottom: 20,
  },
});

export default TherapistProfile;
