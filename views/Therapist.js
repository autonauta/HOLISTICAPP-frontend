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
} from 'react-native';
import {Button} from 'react-native-paper';
import {mainColor, secondaryColor, tertiaryColor, textColor1} from '../config';
const defaultImage = require('../assets/avatar.png');
const noDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed felis eget velit aliquet sagittis id consectetur purus ut. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet.\n Volutpat odio facilisis mauris sit amet massa vitae tortor condimentum. Pellentesque nec nam aliquam sem et tortor consequat. Id eu nisl nunc mi ipsum faucibus vitae. Quam elementum pulvinar etiam non. Volutpat diam ut venenatis tellus in metus. Malesuada fames ac turpis egestas maecenas. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Mattis pellentesque id nibh tortor id aliquet lectus proin.';
//--------------------------MAIN EXPORT FUNCTION--------------------------
function Therapist({navigation, route}) {
  const {name, email, calendar, image, description, specialization, _id} =
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
          <Text style={styles.description}>{description ?? noDescription}</Text>
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
var IMAGE_MARGIN_TOP = IMAGE_SIZE / -3;
var NAME_SIZE = 30;
var DESCRIPTION_SIZE = 18;
var PROPS_SIZE = 26;
var TOP_HEIGHT = 70;
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
    backgroundColor: secondaryColor,
  },
  scrollView: {
    flex: 1,
    backgroundColor: secondaryColor,
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
    width: Dimensions.get('window').width - 25,
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
    color: textColor1,
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
