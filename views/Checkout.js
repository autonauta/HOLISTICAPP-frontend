import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  PixelRatio,
  Image,
  View,
} from 'react-native';

import {mainColor, tertiaryColor} from '../config';
import PayModal from './modals/PayModal';

const defaultImage = require('../assets/avatar.png');
function Checkout({route, navigation}) {
  const userLogged = route.params.userLogged;
  const {type, day, hour, token, name, _id, image, online} = route.params;

  const [payModalVisible, setPayModalVisible] = useState(false);

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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={mainColor}
        showHideTransition={'fade'}
      />
      <Text style={styles.title}>Comprar sesión</Text>
      <Image style={styles.image} source={getImage(image)}></Image>
      <View style={{paddingBottom: 20, width: '100%'}}>
        <Text style={styles.subtitle1}>{`Terapeuta: ${name}`}</Text>
        <Text style={styles.subtitle2}>{`Tipo de sesión: ${
          type == 'online'
            ? 'online'
            : type == 'presencial'
            ? 'presencial'
            : 'atemporal'
        }`}</Text>

        {type != 'atemporal' && (
          <>
            <Text style={styles.subtitle2}>{`Fecha: ${day.split('-')[2]}-${
              day.split('-')[1]
            }-${day.split('-')[0]}`}</Text>
            <Text style={styles.subtitle3}>{`Hora: ${hour} horas`}</Text>
          </>
        )}
      </View>
      <Pressable style={styles.button} onPress={() => setPayModalVisible(true)}>
        <Text style={styles.buttonText}>IR A PAGO</Text>
      </Pressable>
      <PayModal
        setPayModalVisible={setPayModalVisible}
        payModalVisible={payModalVisible}
        token={token}
        userLogged={userLogged}
        navigation={navigation}
        name={name}
        _id={_id}
        day={day}
        hour={hour}
        type={type}
        online={online}
      />
    </SafeAreaView>
  );
}
var TITLE_FONT_SIZE = 40;
var TITLE_MARGIN_BOTTOM = 20;
if (PixelRatio.get() <= 2) {
  TITLE_FONT_SIZE = 30;
  TITLE_MARGIN_BOTTOM = 0;
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flex: 1,
    backgroundColor: mainColor,
    alignItems: 'center',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    color: tertiaryColor,
    fontSize: TITLE_FONT_SIZE,
    marginBottom: TITLE_MARGIN_BOTTOM,
  },
  subtitle1: {
    color: tertiaryColor,
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  subtitle2: {
    color: tertiaryColor,
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  subtitle3: {
    color: tertiaryColor,
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    width: '95%',
    backgroundColor: '#1fc362',
    elevation: 2,
  },
  buttonText: {
    color: 'white',
  },
});
export default Checkout;
