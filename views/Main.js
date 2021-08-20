import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  PixelRatio,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Card, Button} from 'react-native-paper';


import Navbar from '../views/Navbar';
import Filters from '../views/Filters';
import {API_URL, mainColor, secondaryColor} from '../config';
const defaultImage = require('../assets/user.png');
//--------------------------MAIN EXPORT FUNCTION--------------------------
function Main({navigation, route}) {
  const {userLogged} = route.params;
  const token = route.params.token;
  const {userCalendar} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //------------------------------Function for Querying the therapists available..............
  const getTherapistsData = () => {
    setLoading(true);
    try {
      fetch(`${API_URL}/users`)
        .then(res => res.json())
        .then(results => {
          const therapists = results;
          setData(therapists);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const renderList = item => {
    const getStars = (rating, image) => {
      var starString = '';
      for (let i = 0; i < rating; i++) {
        starString += '* ';
      }
      return starString;
    };
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
        isEmpty(image) == true
      ) {
        return defaultImage;
      } else {
        return image;
      }
    };

    return (
      <Card
        style={styles.myCard}
        onPress={() => navigation.navigate('Therapist', {item})}>
        <View style={styles.cardView}>
          <Image style={styles.image} source={getImage(item.image)}></Image>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.specialization}</Text>
          </View>
          <View style={styles.typeOf}>
            <Text style={styles.cardSubtitle}></Text>
            <Text style={styles.cardStars}>{getStars(item.rating)}</Text>
          </View>
        </View>
      </Card>
    );
  };
  useEffect(() => {
    getTherapistsData();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={mainColor}
        barStyle={"default"}
        showHideTransition={"none"} />
      <Text style={styles.title}>holisticapp</Text>
      
      <Navbar
        navigation={navigation}
        userLogged={userLogged}
        token={token}
        userCalendar={userCalendar}
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
      <View style={{height: 48, width: "100%", backgroundColor: secondaryColor}}></View>
      <Filters
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={data}
        setData={setData}
        setLoading={setLoading}
      />
       
    </View>
  );
}
var TITLE_FONT_SIZE = 30;
var PROMOS_HEIGHT = 140;
var CARD_HEIGHT = 90;
var IMAGE_HEIGHT = 70;
var CARD_TITLE = 20;
var CARD_SUBTITLE = 15;
var STARS_SIZE = 25;
var NAV_HEIGHT = 60;

var STATUS_BAR_HEIGHT = StatusBar.currentHeight;
var CONTAINER_HEIGHT = Dimensions.get('screen').height - StatusBar.currentHeight;

if (PixelRatio.get() <= 2) {
  TITLE_FONT_SIZE = 20;
  PROMOS_HEIGHT = 110;
  CARD_HEIGHT = 60;
  IMAGE_HEIGHT = 45;
  CARD_TITLE = 16;
  CARD_SUBTITLE = 12;
  STARS_SIZE = 20;
  NAV_HEIGHT = 60;
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor,
    height: CONTAINER_HEIGHT,
    alignItems: "center",
  },
  promos: {
    width: '100%',
    height: PROMOS_HEIGHT,
    backgroundColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: TITLE_FONT_SIZE,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginLeft: 10,
    height: 40,
    marginTop: 10,
  },
  flatList: {
    width: "100%",
  },
  myCard: {
    height: CARD_HEIGHT,
  },
  cardView: {
    height: '100%',
    paddingLeft: 10,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    backgroundColor: secondaryColor,
  },
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_HEIGHT,
    marginRight: 25,
    borderRadius: 35,
  },
  cardText: {
    flex: 1,
    height: '80%',
    justifyContent: 'space-around',
  },
  typeOf: {
    flex: 0.5,
    height: '90%',
    justifyContent: 'space-around',
  },
  cardTitle: {
    color: 'white',
    fontSize: CARD_TITLE,
    justifyContent: 'center',
  },
  cardSubtitle: {color: 'white', fontSize: CARD_SUBTITLE},
  cardStars: {
    fontSize: STARS_SIZE,
    color: 'orange',
    marginTop: 10,
  },
  button: {
    width: '60%',
    marginTop: 40,
    backgroundColor: secondaryColor,
  },
});

export default Main;
