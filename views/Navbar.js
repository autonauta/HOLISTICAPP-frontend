import React from 'react';
import {StyleSheet, View, Text, PixelRatio} from 'react-native';
import {Button} from 'react-native-paper';
import {mainColor, secondaryColor} from '../config';

function Navbar({
  navigation,
  userLogged,
  userCalendar,
  token,
  setModalVisible,
}) {
  const profileNavigation = () => {
    if (userLogged.isTherapist === false) {
      navigation.navigate('Profile', {userLogged, token});
    } else {
      navigation.navigate('TherapistProfile', {
        userLogged,
        userCalendar,
        token,
      });
    }
  };
  return (
    <View style={styles.navbar}>
      <Button
        labelStyle={styles.buttonIcon}
        icon="menu"
        color="black"
        color="transparent"
        style={styles.buttons}></Button>
      <Button
        labelStyle={styles.buttonIcon}
        icon="view-dashboard"
        color="black"
        style={styles.buttons}>
        <Text style={styles.icons}></Text>
      </Button>
      <Button
        labelStyle={styles.buttonIcon}
        icon="store"
        color="black"
        style={styles.buttons}>
        <Text style={styles.icons}></Text>
      </Button>
      <Button
        labelStyle={styles.buttonIcon}
        icon="filter"
        color="black"
        style={styles.buttons}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.icons}></Text>
      </Button>
      <Button
        labelStyle={styles.buttonIcon}
        icon="account"
        color="black"
        style={styles.buttons}
        onPress={profileNavigation}></Button>
    </View>
  );
}
var NAV_HEIGHT = 50;
var ICON_SIZE = 30;
var NAV_MARGIN_TOP = 20;
if (PixelRatio.get() <= 2) {
  NAV_HEIGHT = 60;
  NAV_MARGIN_TOP = 0;
  ICON_SIZE = 24;
}
const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    height: NAV_HEIGHT,
    marginTop: NAV_MARGIN_TOP,
    backgroundColor: mainColor,
    flexDirection: 'row',
  },
  buttons: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonIcon: {
    fontSize: ICON_SIZE,
    color: 'white',
  },
});

export default Navbar;
