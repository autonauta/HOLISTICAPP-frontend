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
import {API_URL, mainColor, secondaryColor} from '../config';
import PasswordChange from './PasswordChange';
import ImageChange from './ImageChange';
import UserTypeChange from './UserTypeChange';

const defaultImage = require('../assets/user.png');

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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.top}>
          <Button
            style={styles.buttonLogout}
            mode="contained"
            onPress={() => {
              logOut();
            }}>
            LOGOUT
          </Button>
        </View>
        <Image
          style={styles.image}
          source={userLogged.image ? userLogged.image : defaultImage}></Image>
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
          <Card style={styles.myCard}>
            <Text style={styles.text}>{userLogged.name}</Text>
          </Card>
          <Card style={styles.myCard}>
            <Text style={styles.text}>{userLogged.email}</Text>
          </Card>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
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
    backgroundColor: '#2a1d7d',
  },
  profile: {
    width: '100%',
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  myCard: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  text: {
    color: 'white',
    fontSize: 20,
    margin: 8,
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  buttonPassword: {
    width: '100%',
    marginBottom: 20,
  },
  buttonLogout: {
    marginTop: 1,
    padding: 5,
    backgroundColor: 'orangered',
  },
  imageButton: {
    borderRadius: 15,
    color: 'white',
    fontSize: 20,
    marginTop: -30,
    textShadowColor: secondaryColor,
    textShadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default Profile;
