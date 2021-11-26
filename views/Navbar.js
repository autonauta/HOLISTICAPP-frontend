import React from 'react';
import {StyleSheet, View, PixelRatio, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {mainColor, secondaryColor} from '../config';

function Navbar({
  navigation,
  userLogged,
  setUserLogged,
  userCalendar,
  setUserCalendar,
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
      {userLogged.isTherapist ? (
        <Button
          labelStyle={styles.buttonIcon}
          icon="stethoscope"
          color="black"
          color="transparent"
          style={styles.button}></Button>
      ) : (
        <View></View>
      )}
      <Button
        labelStyle={styles.buttonIcon}
        icon="view-dashboard"
        color={secondaryColor}
        style={styles.button}
        onPress={dashboardNavigation}></Button>
      <Button
        labelStyle={styles.buttonIcon}
        icon="store"
        color={secondaryColor}
        style={styles.button}
        onPress={storeNavigation}></Button>
      <Button
        labelStyle={styles.buttonIcon}
        icon="filter"
        color={secondaryColor}
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
        }}></Button>
      <Button
        labelStyle={styles.buttonIcon}
        icon="account"
        color={secondaryColor}
        style={styles.button}
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
    width: '96%',
    height: NAV_HEIGHT,
    marginTop: NAV_MARGIN_TOP,
    backgroundColor: mainColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    height: '100%',
    flex: 1,
  },
  buttonIcon: {
    fontSize: ICON_SIZE,
    color: 'white',
    marginLeft: 3,
  },
});

export default Navbar;
