import React from 'react';
import {StyleSheet, View, Text, PixelRatio, Dimensions} from 'react-native';
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
  const dashboardNavigation = () => {
    if (userLogged.isTherapist === false) {
      navigation.navigate('Dashboard', {userLogged, token});
    } else {
      navigation.navigate('TherapistDashboard', {
        userLogged,
        token,
      });
    }
  };
  const storeNavigation = () => {
    navigation.navigate('StoreHome', {userLogged, token});
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
        style={styles.buttons}
        onPress={dashboardNavigation}></Button>
      <Button
        labelStyle={styles.buttonIcon}
        icon="store"
        color="black"
        style={styles.buttons}
        onPress={storeNavigation}></Button>
      <Button
        labelStyle={styles.buttonIcon}
        icon="filter"
        color="black"
        style={styles.buttons}
        onPress={() => {
          setModalVisible(true);
        }}></Button>
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
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttons: {
    width: Dimensions.get('window').width / 5,
    alignItems: 'flex-end',
    height: '100%',
  },
  buttonIcon: {
    fontSize: ICON_SIZE,
    color: 'white',
  },
});

export default Navbar;
