import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  StatusBar,
  PixelRatio,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-paper';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {mainColor, secondaryColor, tertiaryColor} from '../config';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'En',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul.',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ],
  dayNamesShort: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

const defaultImage = require('../assets/avatar.png');
let smallPhone = false;
if (PixelRatio.get() <= 2) smallPhone = true;
else smallPhone = false;

function Calendars({route, navigation}) {
  const {name, image, specialization, token, _id} = route.params;
  const userLogged = route.params.userLogged;
  const userCalendar = route.params.calendar[0];
  const [hours, setHours] = useState([]);

  const [markedDates] = useState(
    userCalendar ? userCalendar.availableDays : {},
  );
  const [loading, setLoading] = useState(false);
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    if (month < 10) {
      month = '0' + month;
    }

    return year + '-' + month + '-' + date;
  };
  const [day, setDay] = useState(getCurrentDate());
  let yearFontSize = 43;
  let monthFontSize = 30;
  let dayFontSize = 50;
  if (PixelRatio.get() <= 2) {
    yearFontSize = 30;
    monthFontSize = 28;
    dayFontSize = 40;
  }
  let yearStyle = {
    display: hours.length > 0 ? 'flex' : 'none',
    color: tertiaryColor,
    fontSize: yearFontSize,
    fontWeight: '700',
  };
  let dayStyle = {
    marginRight: 20,
    display: hours.length > 0 ? 'flex' : 'none',
    color: tertiaryColor,
    fontSize: dayFontSize,
    fontWeight: '700',
  };
  let monthStyle = {
    marginRight: 20,
    display: hours.length > 0 ? 'flex' : 'none',
    color: secondaryColor,
    fontSize: monthFontSize,
    fontWeight: '700',
  };
  const getHoursOfDaySelected = day => {
    setLoading(true);
    setDay(day);
    setHours(
      userCalendar.availableDays[day]
        ? userCalendar.availableDays[day].hour
        : [],
    );
    setLoading(false);
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
  const paySession = hour => {
    navigation.navigate('CheckoutTest', {
      hour,
      day,
      token,
      name,
      userLogged,
      _id,
      image,
      specialization,
    });
  };
  const renderList = item => {
    return (
      <Card
        style={styles.myCard}
        onPress={() => {
          paySession(item.hour);
        }}>
        <View style={smallPhone ? styles.cardViewSmall : styles.cardView}>
          <Text style={smallPhone ? styles.cardTitleSmall : styles.cardTitle}>
            {item.hour}
          </Text>
        </View>
      </Card>
    );
  };
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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={mainColor}
        barStyle={'default'}
        showHideTransition={'fade'}
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 5,
          paddingLeft: 10,
          paddingBottom: 10,
          marginBottom: 20,
        }}>
        <Image style={styles.image} source={getImage(image)}></Image>
        <View>
          <Text style={styles.titleName}>{name}</Text>
          <Text style={styles.subtitle}>{specialization}</Text>
        </View>
      </View>

      {smallPhone ? (
        <ScrollView style={{width: '100%'}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={styles.tick}>
              <Text style={styles.tickText}>X</Text>
            </View>
            <Text style={{color: secondaryColor, fontSize: 20}}>
              Días disponibles
            </Text>
          </View>
          <Calendar
            style={styles.calendar}
            theme={theme}
            monthFormat={'MMMM'}
            markedDates={markedDates}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              getHoursOfDaySelected(day.dateString);
            }}
            onDayLongPress={day => {
              getHoursOfDaySelected(day.dateString);
            }}
            onMonthChange={month => {
              setHours([]);
            }}
            hideExtraDays={true}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMMM yyyy'}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={dayStyle}>{day.split('-')[2]}</Text>
            <Text style={monthStyle}>{selectMonth(day.split('-')[1])}</Text>
            <Text style={yearStyle}>{day.split('-')[0]}</Text>
          </View>
          <FlatList
            style={styles.flatList}
            data={hours}
            renderItem={({item}) => {
              return renderList(item);
            }}
            keyExtractor={item => `${item.id}`}
            scrollEnabled={false}></FlatList>
        </ScrollView>
      ) : (
        <View style={{width: '100%'}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={styles.tick}>
              <Text style={styles.tickText}>X</Text>
            </View>
            <Text style={{color: secondaryColor, fontSize: 20}}>
              Días disponibles
            </Text>
          </View>
          <Calendar
            style={styles.calendar}
            theme={theme}
            monthFormat={'MMMM'}
            markedDates={markedDates}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              getHoursOfDaySelected(day.dateString);
            }}
            onDayLongPress={day => {
              getHoursOfDaySelected(day.dateString);
            }}
            onMonthChange={month => {
              setHours([]);
            }}
            hideExtraDays={true}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMMM yyyy'}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={dayStyle}>{day.split('-')[2]}</Text>
            <Text style={monthStyle}>{selectMonth(day.split('-')[1])}</Text>
            <Text style={yearStyle}>{day.split('-')[0]}</Text>
          </View>
          <FlatList
            style={styles.flatList}
            data={hours}
            renderItem={({item}) => {
              return renderList(item);
            }}
            keyExtractor={item => `${item.id}`}
            scrollEnabled={true}></FlatList>
        </View>
      )}
    </SafeAreaView>
  );
}
var IMAGE_SIZE = 80;
var TITLE_FONT_SIZE = 40;
var SUBTITLE_FONT_SIZE = 30;
var TICK_SIZE = 30;
var TICK_TEXT_SIZE = 18;
var DAY_FONT_SIZE = 18;
var MONTH_FONT_SIZE = 24;
var HEADER_FONT_SIZE = 16;
PixelRatio.get();
if (smallPhone <= 2) {
  IMAGE_SIZE = 60;
  TITLE_FONT_SIZE = 28;
  SUBTITLE_FONT_SIZE = 20;
  TICK_SIZE = 20;
  TICK_TEXT_SIZE = 14;
  DAY_FONT_SIZE = 14;
  HEADER_FONT_SIZE = 12;
  MONTH_FONT_SIZE = 20;
}
const theme = {
  calendarBackground: mainColor,
  textSectionTitleColor: tertiaryColor,
  selectedDayBackgroundColor: secondaryColor,
  selectedDayTextColor: mainColor,
  todayTextColor: tertiaryColor,
  dayTextColor: '#a4a5a7',
  textDisabledColor: '#a4a5a7',
  arrowColor: secondaryColor,
  monthTextColor: secondaryColor,
  textDayFontWeight: '700',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '700',
  textDayFontSize: DAY_FONT_SIZE,
  textMonthFontSize: MONTH_FONT_SIZE,
  textDayHeaderFontSize: HEADER_FONT_SIZE,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    backgroundColor: mainColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleName: {
    color: 'white',
    fontSize: TITLE_FONT_SIZE,
    marginLeft: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: SUBTITLE_FONT_SIZE,
    marginLeft: 10,
  },
  tick: {
    width: TICK_SIZE,
    height: TICK_SIZE,
    borderRadius: TICK_SIZE / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  tickText: {fontSize: TICK_TEXT_SIZE, fontWeight: '700', color: mainColor},
  calendar: {
    width: Dimensions.get('screen').width,
    alignSelf: 'center',
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: 20,
  },
  flatListContainer: {
    width: Dimensions.get('window').width,
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'red',
  },
  flatList: {
    width: '100%',
  },
  myCard: {
    width: '100%',
    marginBottom: 1,
    borderRadius: 8,
  },
  cardView: {
    height: 80,
    paddingLeft: 10,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    backgroundColor: secondaryColor,
    borderRadius: 8,
  },
  cardViewSmall: {
    height: 60,
    paddingLeft: 10,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    backgroundColor: secondaryColor,
    borderRadius: 8,
  },
  cardText: {
    flex: 1,
    height: '80%',
    justifyContent: 'space-around',
  },
  cardTitle: {
    color: tertiaryColor,
    fontSize: 25,
    fontWeight: '400',
    justifyContent: 'center',
  },
  cardTitleSmall: {
    color: tertiaryColor,
    fontSize: 20,
    fontWeight: '400',
    justifyContent: 'center',
  },
});

export default Calendars;
