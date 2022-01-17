import React, {useState} from 'react';

import {
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Text,
  Dimensions,
  StyleSheet,
  PixelRatio,
  View,
} from 'react-native';
import {Card} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  API_URL,
  mainColor,
  secondaryColor,
  tertiaryColor,
  textColor1,
  textColor2,
} from '../config';

function Dashboard({route, navigation}) {
  let {token, userLogged} = route.params;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAppointments = () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('xAuthToken', token);

    fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        type: 'user',
      }),
    })
      .then(response => response.json())
      .then(res => {
        const data = res;
        setAppointments(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      getAppointments();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );
  const selectMonth = m => {
    if (m == '01') return 'ENERO';
    else if (m == '02') return 'FEBRERO';
    else if (m == '03') return 'MARZO';
    else if (m == '04') return 'ABRIL';
    else if (m == '05') return 'MAYO';
    else if (m == '06') return 'JUNIO';
    else if (m == '07') return 'JULIO';
    else if (m == '08') return 'AGOSTO';
    else if (m == '09') return 'SEPTIEMBRE';
    else if (m == '10') return 'OCTUBRE';
    else if (m == '11') return 'NOVIEMBRE';
    else if (m == '12') return 'DICIEMBRE';
  };
  const TransformDate = date => {
    const month = selectMonth(date.split('-')[1]);
    const day = date.split('T')[0].split('-').pop();
    return month + ' ' + day;
  };
  const navigateTo = item => {
    if (item.online === true)
      navigation.navigate('VideoChat', {item, token, userLogged});
    else if (item.online === false)
      navigation.navigate('Chat', {item, token, userLogged});
    else navigation.navigate('Atemporal', {item, token, userLogged});
  };
  const renderList = item => {
    return (
      <Card style={styles.myCard} onPress={() => navigateTo(item)}>
        <View style={styles.cardView}>
          <View
            style={
              item.online === true
                ? styles.cardTextOnline
                : styles.cardTextPresencial
            }>
            <Text style={styles.cardTitle}>
              {TransformDate(item.appointmentDate.day)}
            </Text>
            <Text style={styles.cardSubtitle}>{item.appointmentDate.hour}</Text>
          </View>
          <View style={styles.typeOf}>
            {item.online ? (
              <Icon
                style={{alignSelf: 'flex-start', marginLeft: 10}}
                name="connected-tv"
                size={40}
                color={textColor2}
              />
            ) : (
              <Icon
                style={{alignSelf: 'flex-start', marginLeft: 10}}
                name="group"
                size={40}
                color={textColor2}
              />
            )}
            <Text style={styles.cardApointeeName}>{item.therapistName}</Text>
          </View>
        </View>
      </Card>
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
      <Text style={styles.title}>dashboard</Text>
      {loading ? (
        <ActivityIndicator size="large" color={secondaryColor} />
      ) : appointments.length != 0 ? (
        <FlatList
          style={styles.flatList}
          data={appointments}
          renderItem={({item}) => {
            return renderList(item);
          }}
          keyExtractor={item => `${item._id}`}
          onRefresh={() => getAppointments()}
          refreshing={loading}></FlatList>
      ) : (
        <Text style={styles.noAppointmentsText}>
          NO TIENES NINGUN SERVICIO PENDIENTE
        </Text>
      )}
    </SafeAreaView>
  );
}

var CONTAINER_HEIGHT =
  Dimensions.get('screen').height - StatusBar.currentHeight;
var CARD_HEIGHT = 180;
var CARD_TITLE = 20;
var CARD_SUBTITLE = 15;
var NAME_SIZE = 40;

var CONTAINER_HEIGHT =
  Dimensions.get('screen').height - StatusBar.currentHeight;

if (PixelRatio.get() <= 2) {
  CARD_HEIGHT = 80;
  CARD_TITLE = 16;
  CARD_SUBTITLE = 15;
  NAME_SIZE = 30;
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor,
    height: CONTAINER_HEIGHT,
    alignItems: 'center',
  },
  title: {
    color: tertiaryColor,
    fontSize: 35,
    fontWeight: '600',
    padding: 10,
    alignSelf: 'flex-start',
    marginLeft: 10,
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
    borderRadius: 10,
    backgroundColor: 'white',
  },
  cardTextOnline: {
    width: '100%',
    height: '30%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: tertiaryColor,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTextPresencial: {
    width: '100%',
    height: '30%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: secondaryColor,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeOf: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: textColor1,
    fontSize: CARD_TITLE,
    justifyContent: 'center',
  },
  cardSubtitle: {color: textColor1, fontSize: 22},
  cardApointeeName: {color: tertiaryColor, fontSize: 40, fontWeight: '700'},
  noAppointmentsText: {
    marginTop: 30,
    color: textColor1,
  },
});
export default Dashboard;
