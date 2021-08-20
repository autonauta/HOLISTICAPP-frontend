import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  PixelRatio,
} from 'react-native';
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
        style={styles.buttons}></Button>
      <Button
        labelStyle={styles.buttonIcon}
        icon="view-dashboard"
        style={styles.buttons}>
        <Text style={styles.icons}></Text>
      </Button>
      <Button
        labelStyle={styles.buttonIcon}
        icon="store"
        style={styles.buttons}>
        <Text style={styles.icons}></Text>
      </Button>
      <Button
        labelStyle={styles.buttonIcon}
        icon="filter"
        style={styles.buttons}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.icons}></Text>
      </Button>
      <Button
        labelStyle={styles.buttonIcon}
        icon="account"
        style={styles.buttons}
        onPress={profileNavigation}></Button>

    </View>
  );
}
var NAV_HEIGHT = 50;
var ICON_SIZE = 30;
if (PixelRatio.get() <= 2) {
  NAV_HEIGHT = 60;
  ICON_SIZE = 24;
}
const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    height: NAV_HEIGHT,
    marginTop: 20,
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
