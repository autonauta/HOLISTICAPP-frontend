import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Button, Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
//---------------------------------IMPORTS-----------------------------
import {
  API_URL,
  mainColor,
  secondaryColor,
  textColor1,
  textColor2,
} from '../config';
import PasswordChange from './PasswordChange';
import ImageChange from './ImageChange';
import UserTypeChange from './UserTypeChange';

const defaultImage = require('../assets/avatar.png');

function Profile({navigation, route}) {
  const {userLogged} = route.params;
  const token = route.params.token;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTerapeutaVisible, setModalTerapeutaVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const logOut = () => {
    const keys = ['xauthtoken', 'user'];
    AsyncStorage.multiRemove(keys).then(res => {
      console.log('Items removed from storage');
      navigation.navigate('Login');
    });
  };
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  const getImage = image => {
    console.log('From getImage: ', image);
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
      <View style={styles.top}></View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={getImage(userLogged.image)}></Image>
        <Text
          style={styles.imageButton}
          onPress={() => {
            setImageModalVisible(true);
          }}>
          CAMBIAR
        </Text>
      </View>
      <View style={styles.profile}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text style={styles.textName}>{userLogged.name}</Text>
          <Text style={styles.textData}>{userLogged.email}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          style={styles.buttonPassword}
          mode="contained"
          onPress={() => {
            setModalVisible(true);
          }}>
          CAMBIAR PASSWORD
        </Button>
        <Button
          style={styles.buttonPassword}
          mode="contained"
          onPress={() => {
            setModalTerapeutaVisible(true);
          }}>
          SOY TERAPEUTA!
        </Button>
      </View>
      <PasswordChange
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        token={token}
        userLogged={userLogged}
        navigation={navigation}
      />
      <ImageChange
        imageModalVisible={imageModalVisible}
        setImageModalVisible={setImageModalVisible}
        token={token}
        userLogged={userLogged}
        navigation={navigation}
      />
      <UserTypeChange
        modalTerapeutaVisible={modalTerapeutaVisible}
        setModalTerapeutaVisible={setModalTerapeutaVisible}
        token={token}
        userLogged={userLogged}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flex: 1,
    alignItems: 'center',
    backgroundColor: secondaryColor,
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginTop: -100,
  },
  top: {
    width: '100%',
    height: 150,
    backgroundColor: mainColor,
  },
  profile: {
    width: '100%',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  textName: {
    color: mainColor,
    fontSize: 40,
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  textData: {
    color: textColor1,
    fontSize: 20,
    alignSelf: 'flex-start',
    fontWeight: '600',
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    marginBottom: 30,
  },
  buttonPassword: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: mainColor,
    height: 40,
  },

  buttonLogout: {
    padding: 5,
    backgroundColor: 'orangered',
  },
  imageButton: {
    borderRadius: 8,
    color: textColor2,
    fontWeight: '700',
    fontSize: 15,
    backgroundColor: mainColor,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: -30,
  },
});

export default Profile;
