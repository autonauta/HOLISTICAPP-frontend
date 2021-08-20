import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import {Card} from 'react-native-paper';
import {Calendar} from 'react-native-calendars';
import {API_URL, mainColor, secondaryColor} from '../config';

import {LocaleConfig} from 'react-native-calendars';

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

const defaultImage = require('../assets/user.png');

function Calendars({route}) {
  const {name, image, specialization} = route.params;
  const userCalendar = route.params.calendar[0];
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
  const getHoursOfDaySelected = day => {
    setLoading(true);
    setHours(userCalendar.availableDays[day].hour);
    setDay(day);
    setLoading(false);
  };
  const [hours, setHours] = useState([]);
  const [day, setDay] = useState(getCurrentDate());

  const theme = {
    calendarBackground: secondaryColor,
    textSectionTitleColor: 'orange',
    selectedDayBackgroundColor: mainColor,
    selectedDayTextColor: 'white',
    todayTextColor: 'orange',
    dayTextColor: 'grey',
    textDisabledColor: 'grey',
    dotColor: '#00adf5',
    arrowColor: mainColor,
    selectedDotColor: '#ffffff',
    monthTextColor: 'white',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 24,
    textDayHeaderFontSize: 20,
  };
  const renderList = item => {
    return (
      <Card style={styles.myCard}>
        <View style={styles.cardView}>
          <Text style={styles.title}>{item.hour}</Text>
        </View>
      </Card>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={secondaryColor}
        barStyle={"default"}
        showHideTransition={"fade"} />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 5,
          paddingBottom: 10,
          marginBottom: 20,
        }}>
        <Image
          style={styles.image}
          source={image ? image : defaultImage}></Image>
        <View>
          <Text style={styles.titleName}>{name}</Text>
          <Text style={styles.subtitle}>{specialization}</Text>
        </View>
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
      <Text style={styles.title}>HORARIO</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          style={styles.flatList}
          data={hours}
          renderItem={({item}) => {
            return renderList(item);
          }}
          keyExtractor={item => `${item.id}`}></FlatList>
      </View>
      <View style={{height: 48, width: "100%", backgroundColor: secondaryColor}}></View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    paddingTop: 10,
    backgroundColor: secondaryColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 25,
    marginLeft: 10,
  },
  titleName: {
    color: 'white',
    fontSize: 40,
    marginLeft: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 30,
    marginLeft: 10,
  },
  calendar: {
    width: Dimensions.get("screen").width,
    alignSelf: 'center',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  flatListContainer: {
    width: Dimensions.get('window').width,
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  flatList: {
    width: '100%',
  },
  myCard: {
    width: '100%',
    marginBottom: 8,
    borderRadius: 8,
  },
  cardView: {
    paddingLeft: 10,
    paddingRight: 8,
    flexDirection: 'row',
    backgroundColor: mainColor,
    borderRadius: 8,
  },
  cardText: {
    flex: 1,
    height: '80%',
    justifyContent: 'space-around',
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
  },
  cardSubtitle: {color: 'white', fontSize: 15},
  cardStars: {
    fontSize: 25,
    color: 'orange',
    marginTop: 10,
  },
  button: {
    width: '60%',
    marginTop: 40,
    backgroundColor: secondaryColor,
  },
});

export default Calendars;
