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
import Icon from 'react-native-vector-icons/MaterialIcons';
import Navbar from '../views/Navbar';
import Filters from '../views/modals/Filters';
import {
  API_URL,
  mainColor,
  secondaryColor,
  tertiaryColor,
  textColor2,
} from '../config';
const defaultImage = require('../assets/avatar.png');
//--------------------------MAIN EXPORT FUNCTION------------------------------------------
function Main({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [therapists, setTherapists] = useState([]);
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
      user = JSON.parse(user);
      setUserLogged(user);
      getTherapistsData();
      console.log(user);
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
  const showAlert = message => {
    Alert.alert(
      'Ups!!',
      message, //modificar al error real
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    );
  };
  //------------------------------Function for Querying the therapists available..............
  const getTherapistsData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/users`);
      const results = await res.json();
      if (results.error) {
        showAlert(results.error);
      } else {
        const therapists = results;
        setTherapists(therapists);
        setLoading(false);
      }
    } catch (err) {
      showAlert(err);
    }
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
    return (
      userLogged._id != item._id && (
        <Card
          style={styles.myCard}
          onPress={() =>
            navigation.navigate('Therapist', {item, token, userLogged})
          }>
          <View style={styles.cardView}>
            <Image style={styles.image} source={getImage(item.image)}></Image>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              {item.categories && (
                <Text style={styles.cardSubtitle}>{item.categories[0]}</Text>
              )}
              {item.categories && (
                <Text style={styles.cardSubtitle}>{item.categories[1]}</Text>
              )}
              {item.categories && (
                <Text style={styles.cardSubtitle}>{item.categories[2]}</Text>
              )}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginTop: 10,
                }}>
                {item.online && (
                  <Icon
                    style={styles.icon}
                    name="connected-tv"
                    size={20}
                    color={textColor2}
                  />
                )}
                {item.presencial && (
                  <Icon
                    style={styles.icon}
                    name="group"
                    size={20}
                    color={textColor2}
                  />
                )}
                {item.atemporal && (
                  <Icon
                    style={styles.icon}
                    name="timer-off"
                    size={20}
                    color={textColor2}
                  />
                )}
              </View>
            </View>
            <View style={styles.typeOf}>
              <Text style={styles.cardStars}>{getStars(item.rating)}</Text>
            </View>
          </View>
        </Card>
      )
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
          data={therapists}
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
        therapists={therapists}
        setTherapists={setTherapists}
        setLoading={setLoading}
      />
    </SafeAreaView>
  );
}
var TITLE_FONT_SIZE;
var TITLE_HEIGHT;
var PROMOS_HEIGHT;
var CARD_HEIGHT;
var IMAGE_HEIGHT;
var CARD_TITLE;
var CARD_SUBTITLE;
var STARS_SIZE;
var NAV_HEIGHT;

var STATUS_BAR_HEIGHT = StatusBar.currentHeight;
var CONTAINER_HEIGHT =
  Dimensions.get('screen').height - StatusBar.currentHeight;

if (PixelRatio.get() <= 2) {
}

//RESPONSIVE STYLES BASED ON PIXEL RATIO

//Telefonos con resoluciones altas
if (PixelRatio.get() >= 2.8 && PixelRatio.get() < 3.6) {
  TITLE_FONT_SIZE = 31;
  TITLE_HEIGHT = 40;
  PROMOS_HEIGHT = 140;
  CARD_HEIGHT = 160;
  IMAGE_HEIGHT = 100;
  CARD_TITLE = 28;
  CARD_SUBTITLE = 15;
  STARS_SIZE = 20;
  NAV_HEIGHT = 60;
}
//Telefonos con resoluciones medias
if (PixelRatio.get() >= 2.2 && PixelRatio.get() < 2.8) {
  TITLE_FONT_SIZE = 30;
  TITLE_HEIGHT = 40;
  PROMOS_HEIGHT = 140;
  CARD_HEIGHT = 150;
  IMAGE_HEIGHT = 100;
  CARD_TITLE = 28;
  CARD_SUBTITLE = 15;
  STARS_SIZE = 20;
  NAV_HEIGHT = 60;
}
//Telefonos con resoluciones bajas
if (PixelRatio.get() >= 1 && PixelRatio.get() < 2.2) {
  TITLE_FONT_SIZE = 25;
  PROMOS_HEIGHT = 110;
  CARD_HEIGHT = 100;
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
    flex: 1,
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
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_HEIGHT,
    alignSelf: 'flex-start',
    marginRight: 25,
    borderRadius: 20,
  },
  cardText: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-start',
  },
  typeOf: {
    flex: 0.7,
    height: '100%',
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
    textAlign: 'right',
  },
  button: {
    width: '60%',
    marginTop: 40,
    backgroundColor: secondaryColor,
  },
  icon: {
    color: textColor2,
    marginRight: 10,
  },
});

export default Main;
