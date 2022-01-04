import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  StatusBar,
  PixelRatio,
  ScrollView,
} from 'react-native';
import {
  mainColor,
  secondaryColor,
  tertiaryColor,
  textColor1,
  textColor2,
} from '../config';

const defaultImage = require('../assets/avatar.png');

function Calendars({route, navigation}) {
  const {name, image, token, _id} = route.params;
  const userLogged = route.params.userLogged;

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    if (month < 10) {
      month = '0' + month;
    }

    return year + '-' + month + '-' + date;
  };

  const getImage = image => {
    if (
      typeof image === 'undefined' ||
      image === null ||
      typeof image === 'string' ||
      image.uri == null
    ) {
      return defaultImage;
    } else {
      return image;
    }
  };
  const paySession = hour => {
    navigation.navigate('Checkout', {
      hour,
      day,
      token,
      name,
      userLogged,
      _id,
      image,
      specialization,
    });
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
        <Image style={styles.image} source={getImage(image)}></Image>
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>Consulta sin tiempo</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
var IMAGE_SIZE = 90;
var TITLE_FONT_SIZE = 40;
var SUBTITLE_FONT_SIZE = 30;
PixelRatio.get();
if (PixelRatio.get() <= 2) {
  IMAGE_SIZE = 60;
  TITLE_FONT_SIZE = 28;
  SUBTITLE_FONT_SIZE = 20;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    backgroundColor: mainColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 10,
    paddingBottom: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    color: 'white',
    fontSize: TITLE_FONT_SIZE,
    marginLeft: 20,
  },
  subtitle: {
    color: 'white',
    fontSize: SUBTITLE_FONT_SIZE,
    marginLeft: 20,
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: 10,
  },
});

export default Calendars;
