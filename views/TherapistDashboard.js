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
import {API_URL, tertiaryColor} from '../config';
import {mainColor, secondaryColor, textColor1, textColor2} from '../config';

var pixelRatio;
const getIconSize = () => {
  pixelRatio = PixelRatio.get();
  if (pixelRatio < 1.4) return 30;
  else if (pixelRatio > 1.4 && pixelRatio < 2) return 20;
  else return 40;
};
const iconSize = getIconSize();

function TherapistDashboard({route, navigation}) {
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
        type: 'therapist',
      }),
    })
      .then(response => response.json())
      .then(res => {
        const data = res;
        console.log(data);
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
    if (item.type === 'online')
      navigation.navigate('VideoChat', {item, token, userLogged});
    else if (item.type === 'presencial')
      navigation.navigate('Chat', {item, token, userLogged});
    else navigation.navigate('MediaChat', {item, token, userLogged});
  };

  const renderList = item => {
    const cardApointeeName = {
      color:
        item.type == 'atemporal'
          ? 'gray'
          : item.type == 'online'
          ? tertiaryColor
          : secondaryColor,
      fontSize: APOINTEE_NAME_SIZE,
      fontWeight: '700',
    };

    return (
      <Card style={styles.myCard} onPress={() => navigateTo(item)}>
        <View style={styles.cardView}>
          <View
            style={
              item.type == 'online'
                ? styles.cardTextOnline
                : item.type == 'atemporal'
                ? styles.cardTextAtemporal
                : styles.cardTextPresencial
            }>
            <Text style={styles.cardTitle}>
              {TransformDate(item.appointmentDate.day)}
            </Text>
            <Text style={styles.cardSubtitle}>{item.appointmentDate.hour}</Text>
          </View>
          <View style={styles.typeOf}>
            {item.type === 'online' ? (
              <Icon
                style={{alignSelf: 'flex-start', marginLeft: 10, marginTop: 10}}
                name="connected-tv"
                size={ICON_SIZE}
                color={textColor2}
              />
            ) : item.type === 'presencial' ? (
              <Icon
                style={{alignSelf: 'flex-start', marginLeft: 10, marginTop: 10}}
                name="group"
                size={ICON_SIZE}
                color={textColor2}
              />
            ) : (
              <Icon
                style={{alignSelf: 'flex-start', marginLeft: 10, marginTop: 10}}
                name="timer-off"
                size={ICON_SIZE}
                color={textColor2}
              />
            )}
            <Text style={cardApointeeName}>{item.appointeeName}</Text>
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
          NO TIENES PACIENTES CON CITA
        </Text>
      )}
    </SafeAreaView>
  );
}

//RESPONSIVE STYLES BASED ON PIXEL RATIO
var CARD_HEIGHT;
var CARD_TITLE;
var CARD_SUBTITLE;
var APOINTEE_NAME_SIZE;
var TITLE_FONT_SIZE;
var ICON_SIZE;

//Telefonos con resoluciones medias
if (PixelRatio.get() >= 2.2 && PixelRatio.get() < 3.6) {
  CARD_HEIGHT = 160;
  CARD_TITLE = 18;
  CARD_SUBTITLE = 15;
  APOINTEE_NAME_SIZE = 30;
  TITLE_FONT_SIZE = 30;
  ICON_SIZE = 26;
}
//Telefonos con resoluciones bajas
if (PixelRatio.get() >= 1 && PixelRatio.get() < 2.2) {
  CARD_HEIGHT = 120;
  CARD_TITLE = 14;
  CARD_SUBTITLE = 14;
  APOINTEE_NAME_SIZE = 24;
  TITLE_FONT_SIZE = 25;
  ICON_SIZE = 22;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
    alignItems: 'center',
    paddingBottom: 10,
  },
  title: {
    color: tertiaryColor,
    fontSize: TITLE_FONT_SIZE,
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
    height: '25%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: tertiaryColor,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTextPresencial: {
    width: '100%',
    height: '25%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: secondaryColor,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTextAtemporal: {
    width: '100%',
    height: '25%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: 'grey',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeOf: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardTitle: {
    color: textColor1,
    fontSize: CARD_TITLE,
  },
  cardSubtitle: {color: textColor1, fontSize: CARD_SUBTITLE},
  noAppointmentsText: {
    color: textColor2,
  },
});

export default TherapistDashboard;
