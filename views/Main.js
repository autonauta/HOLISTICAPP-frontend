import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  PixelRatio,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {Card, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navbar from '../views/Navbar';
import Filters from '../views/modals/Filters';
import {
  API_URL,
  mainColor,
  secondaryColor,
  tertiaryColor,
  textColor1,
} from '../config';
const defaultImage = require('../assets/avatar.png');
//--------------------------MAIN EXPORT FUNCTION------------------------------------------
function Main({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //------------------------------States for user data and user Calendar data----------------
  const [userLogged, setUserLogged] = useState({});
  const [userCalendar, setUserCalendar] = useState({});
  const [token, setToken] = useState('');
  //------------------------------Function for checking if the user is logged..............---
  const isAuth = async () => {
    let token = await AsyncStorage.getItem('xauthtoken');
    if (token !== null) {
      token = JSON.parse(token);
      setToken(token);
      console.log(`Token found, user Logedin`);
      let user = await AsyncStorage.getItem('user');
      let calendar = await AsyncStorage.getItem('userCalendar');
      user = JSON.parse(user);
      calendar = JSON.parse(calendar);
      setUserLogged(user);
      setUserCalendar(calendar);
      getTherapistsData();
      console.log(user, calendar);
    } else {
      console.log('No token found, no user logged in');
      navigation.navigate('Login');
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      isAuth();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );

  //------------------------------Function for Querying the therapists available..............
  const getTherapistsData = async () => {
    setLoading(true);
    await fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(results => {
        const therapists = results;
        setData(therapists);
        setLoading(false);
      });
  };
  //------------------------------Function for Rendering the Therapists cards..............
  const renderList = item => {
    const getStars = rating => {
      var starString = '';
      for (let i = 0; i < rating; i++) {
        starString += '\u272A';
      }
      return starString;
    };
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
    return userLogged.name != item.name ? (
      <Card
        style={styles.myCard}
        onPress={() =>
          navigation.navigate('Therapist', {item, token, userLogged})
        }>
        <View style={styles.cardView}>
          <Image style={styles.image} source={getImage(item.image)}></Image>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.specialization}</Text>
            <View
              style={{
                width: '100%',
                height: 30,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}></View>
          </View>
          <View style={styles.typeOf}>
            <Text style={styles.cardStars}>{getStars(item.rating)}</Text>
          </View>
        </View>
      </Card>
    ) : (
      <View></View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={mainColor}
        barStyle={'default'}
        showHideTransition={'none'}
      />
      <Text style={styles.title}>holisticapp</Text>

      <Navbar
        navigation={navigation}
        userLogged={userLogged}
        setUserLogged={setUserLogged}
        token={token}
        userCalendar={userCalendar}
        setUserCalendar={setUserCalendar}
        setModalVisible={setModalVisible}
      />
      {loading ? (
        <ActivityIndicator size="large" color={secondaryColor} />
      ) : (
        <FlatList
          style={styles.flatList}
          data={data}
          renderItem={({item}) => {
            return renderList(item);
          }}
          keyExtractor={item => `${item._id}`}
          onRefresh={() => getTherapistsData()}
          refreshing={loading}></FlatList>
      )}
      <Filters
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={data}
        setData={setData}
        setLoading={setLoading}
      />
    </SafeAreaView>
  );
}
var TITLE_FONT_SIZE = 35;
var TITLE_HEIGHT = 40;
var PROMOS_HEIGHT = 140;
var CARD_HEIGHT = 140;
var IMAGE_HEIGHT = 100;
var CARD_TITLE = 20;
var CARD_SUBTITLE = 15;
var STARS_SIZE = 20;
var NAV_HEIGHT = 60;

var STATUS_BAR_HEIGHT = StatusBar.currentHeight;
var CONTAINER_HEIGHT =
  Dimensions.get('screen').height - StatusBar.currentHeight;

if (PixelRatio.get() <= 2) {
  TITLE_FONT_SIZE = 22;
  PROMOS_HEIGHT = 110;
  CARD_HEIGHT = 85;
  IMAGE_HEIGHT = 60;
  CARD_TITLE = 16;
  CARD_SUBTITLE = 12;
  STARS_SIZE = 20;
  NAV_HEIGHT = 60;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
    height: CONTAINER_HEIGHT,
    alignItems: 'center',
  },
  promos: {
    width: '100%',
    height: PROMOS_HEIGHT,
    backgroundColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  title: {
    color: tertiaryColor,
    fontSize: TITLE_FONT_SIZE,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: 10,
    height: TITLE_HEIGHT,
  },
  flatList: {
    width: '96%',
  },
  myCard: {
    height: CARD_HEIGHT,
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: 'transparent',
  },
  cardView: {
    height: '100%',
    paddingLeft: 10,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_HEIGHT,
    marginRight: 25,
    borderRadius: 20,
  },
  cardText: {
    flex: 1,
    height: '80%',
    justifyContent: 'flex-start',
  },
  typeOf: {
    flex: 0.7,
    height: '80%',
    marginRight: 3,
    justifyContent: 'flex-end',
  },
  cardTitle: {
    color: mainColor,
    fontWeight: '700',
    fontSize: CARD_TITLE,
    justifyContent: 'center',
  },
  cardSubtitle: {color: tertiaryColor, fontSize: CARD_SUBTITLE},
  cardStars: {
    fontSize: STARS_SIZE,
    fontWeight: '700',
    color: tertiaryColor,
    marginTop: 0,
    textAlign: 'right',
  },
  button: {
    width: '60%',
    marginTop: 40,
    backgroundColor: secondaryColor,
  },
});

export default Main;
