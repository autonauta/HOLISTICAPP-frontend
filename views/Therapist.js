import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  PixelRatio,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Button} from 'react-native-paper';
import {
  mainColor,
  secondaryColor,
  tertiaryColor,
  textColor1,
  textColor2,
} from '../config';
const defaultImage = require('../assets/avatar.png');

//--------------------------MAIN EXPORT FUNCTION--------------------------
function Therapist({navigation, route}) {
  const {name, calendar, image, description, specialization, _id} =
    route.params.item;
  const token = route.params.token;
  const userLogged = route.params.userLogged;
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
        showHideTransition={'none'}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.top}></View>
        <Image style={styles.image} source={getImage(image)}></Image>
        <View style={styles.card}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.props}>{specialization}</Text>
        </View>
        <View style={styles.scroll}>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => {
              navigation.navigate('Calendar', {
                name,
                image,
                calendar,
                specialization,
                token,
                userLogged,
                _id,
              });
            }}>
            PROGRAMA UNA CITA
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
var IMAGE_SIZE = 150;
var IMAGE_MARGIN_TOP = IMAGE_SIZE / -2;
var NAME_SIZE = 30;
var DESCRIPTION_SIZE = 18;
var PROPS_SIZE = 26;
var TOP_HEIGHT = 120;
if (PixelRatio.get() <= 2) {
  IMAGE_SIZE = 100;
  NAME_SIZE = 24;
  DESCRIPTION_SIZE = 14;
  PROPS_SIZE = 16;
  TOP_HEIGHT = 70;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  top: {
    width: Dimensions.get('window').width,
    height: TOP_HEIGHT,
    backgroundColor: mainColor,
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: 20,
    marginTop: IMAGE_MARGIN_TOP,
    marginBottom: 10,
  },
  scroll: {
    width: '90%',
  },
  card: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  name: {
    fontSize: NAME_SIZE,
    fontWeight: '700',
    color: mainColor,
  },
  props: {
    fontSize: PROPS_SIZE,
    color: tertiaryColor,
  },
  description: {
    width: '96%',
    color: textColor2,
    fontSize: DESCRIPTION_SIZE,
    marginTop: 10,
  },
  buttons: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    marginTop: 40,
    backgroundColor: mainColor,
  },
});

export default Therapist;
