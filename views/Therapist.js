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
import Icon from 'react-native-vector-icons/MaterialIcons';
const defaultImage = require('../assets/avatar.png');

//--------------------------MAIN EXPORT FUNCTION--------------------------
function Therapist({navigation, route}) {
  const {
    name,
    lastName,
    calendar,
    image,
    description,
    _id,
    online,
    presencial,
    atemporal,
    categories,
  } = route.params.item;
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
          <Text style={styles.name}>{lastName}</Text>
          <Text style={styles.props}>
            {categories.map(category => {
              return <Text key={category}>{category}, </Text>;
            })}
          </Text>
          <View style={styles.typeView}>
            {presencial && (
              <View style={styles.typeElement}>
                <Icon
                  style={styles.icon}
                  name="group"
                  size={30}
                  color={textColor2}
                />
                <Text style={styles.types}>presencial</Text>
              </View>
            )}
            {online && (
              <View style={styles.typeElement}>
                <Icon
                  style={styles.icon}
                  name="connected-tv"
                  size={30}
                  color={textColor2}
                />
                <Text style={styles.types}>online</Text>
              </View>
            )}
            {atemporal && (
              <View style={styles.typeElement}>
                <Icon
                  style={styles.icon}
                  name="timer-off"
                  size={30}
                  color={textColor2}
                />
                <Text style={styles.types}>sin tiempo</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.scroll}>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.buttons}>
          {online && (
            <Button
              style={styles.button}
              mode="contained"
              icon="rss"
              onPress={() => {
                navigation.navigate('OnlineCalendar', {
                  name,
                  image,
                  calendar,
                  token,
                  userLogged,
                  _id,
                  online: true,
                });
              }}>
              CITA ONLINE
            </Button>
          )}
          {presencial && (
            <Button
              style={styles.button}
              mode="contained"
              icon="account-multiple"
              onPress={() => {
                navigation.navigate('PresencialCalendar', {
                  name,
                  image,
                  calendar,
                  token,
                  userLogged,
                  _id,
                  online: false,
                });
              }}>
              CITA PRESENCIAL
            </Button>
          )}
          {atemporal && (
            <Button
              style={styles.button}
              mode="contained"
              icon="timer-off"
              onPress={() => {
                navigation.navigate('Atemporal', {
                  name,
                  image,
                  token,
                  userLogged,
                  _id,
                  online: false,
                });
              }}>
              CONSULTA SIN TIEMPO
            </Button>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

//RESPONSIVE STYLES BASED ON PIXEL RATIO
var IMAGE_SIZE;
var IMAGE_MARGIN_TOP;
var NAME_SIZE;
var DESCRIPTION_SIZE;
var PROPS_SIZE;
var TOP_HEIGHT;
//Telefonos con resoluciones altas
if (PixelRatio.get() >= 2.8 && PixelRatio.get() < 3.6) {
  IMAGE_SIZE = 150;
  IMAGE_MARGIN_TOP = IMAGE_SIZE / -2;
  NAME_SIZE = 30;
  DESCRIPTION_SIZE = 18;
  PROPS_SIZE = 26;
  TOP_HEIGHT = 120;
}
//Telefonos con resoluciones medias
if (PixelRatio.get() >= 2.2 && PixelRatio.get() < 3.6) {
  IMAGE_SIZE = 150;
  IMAGE_MARGIN_TOP = IMAGE_SIZE / -2;
  NAME_SIZE = 30;
  DESCRIPTION_SIZE = 18;
  PROPS_SIZE = 26;
  TOP_HEIGHT = 120;
}
//Telefonos con resoluciones bajas
if (PixelRatio.get() >= 1 && PixelRatio.get() < 2.2) {
  IMAGE_SIZE = 100;
  IMAGE_MARGIN_TOP = IMAGE_SIZE / -2;
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
  typeView: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingTop: 10,
  },
  typeElement: {
    flexDirection: 'row',
  },
  types: {
    color: textColor2,
    fontSize: 20,
    marginLeft: 10,
  },
  buttons: {
    width: '90%',
    justifyContent: 'flex-start',
    paddingTop: 20,
    marginBottom: 30,
  },
  button: {
    width: '100%',
    marginTop: 10,
    backgroundColor: mainColor,
  },
});

export default Therapist;
