import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  Alert,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Pressable,
  PixelRatio,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Card, Button} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserTypeChange from './UserTypeChange';
import ImageChange from './ImageChange';

import {API_URL, mainColor, secondaryColor} from '../config';
const defaultImage = require('../assets/user.png');
const categories = [
  'biomagnetismo',
  'aromaterapia',
  'acupunctura',
  'masajes',
  'tarot',
  'musicoterapia',
  'nutricion',
  'psicologia',
  'transgeneracional',
  'veterinaria',
];
const HourDropdown = [
  '04:00',
  '04:30',
  '05:00',
  '05:30',
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '11:30',
  '11:00',
  '12:30',
  '12:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
  '24:00',
];
const durationDropdown = [
  '00:30',
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
];

function TherapistProfile({navigation, route}) {
  let {userLogged} = route.params;
  let {userCalendar} = route.params;
  const token = route.params.token;
  //--------------------- for state variables for editing profile -------------
  const [descriptionEditing, setDescriptionEditing] = useState(false);
  const [dayEditing, setDayEditing] = useState(false);
  const [startHourEditing, setStartHourEditing] = useState(false);
  const [endHourEditing, setEndHourEditing] = useState(false);
  const [durationEditing, setDurationEditing] = useState(false);
  const [categoryEditing, setCategoryEditing] = useState(true);

  const [text, setText] = useState(userLogged.description);
  const [category, setCategory] = useState(
    userLogged.category ? userLogged.category : 'categoría',
  );
  const [startHour, setStartHour] = useState(
    userCalendar ? userCalendar.startHour : '09:00',
  );
  const [endHour, setEndHour] = useState(
    userCalendar ? userCalendar.endHour : '20:00',
  );
  const [sessionDuration, setSessionDuration] = useState(
    userCalendar.duration ? userCalendar.duration : '02:00',
  );
  //-------------------------------Week day variables ---------------------------------------
  const [sunday, setSunday] = useState(
    userCalendar ? userCalendar.days[0] : false,
  );
  const [monday, setMonday] = useState(
    userCalendar ? userCalendar.days[1] : false,
  );
  const [tuesday, setTuesday] = useState(
    userCalendar ? userCalendar.days[2] : false,
  );
  const [wednesday, setWednesday] = useState(
    userCalendar ? userCalendar.days[3] : false,
  );
  const [thursday, setThursday] = useState(
    userCalendar ? userCalendar.days[4] : false,
  );
  const [friday, setFriday] = useState(
    userCalendar ? userCalendar.days[5] : false,
  );
  const [saturday, setSaturday] = useState(
    userCalendar ? userCalendar.days[6] : false,
  );

  //-------------------------------flatlist loading variable --------------------------------
  const [loading, setLoading] = useState(false);
  //-----------------------------modalTerapeuta--------------------------------------------
  const [modalTerapeutaVisible, setModalTerapeutaVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  //-------------------------------checkboxes enable/disable variable -----------------------
  const [checkBoxDisabled, setCheckBoxDisabled] = useState(true);
  const [data, setData] = useState([
    {
      _id: '20987345647839283748',
      image: {
        uri: 'https://res.cloudinary.com/highdatamx/image/upload/v1625023395/HOLISTICAPP/qb5t4x3qesc9oxys9naw.jpg',
      },
      title: 'Diploma ejemplo 1',
      description: 'Este es mi titulo para estar mame y mame',
    },
    {
      _id: '209874548839283748',
      image: {
        uri: 'https://res.cloudinary.com/highdatamx/image/upload/v1625023395/HOLISTICAPP/qb5t4x3qesc9oxys9naw.jpg',
      },
      title: 'Diploma ejemplo 2',
      description: 'Este es mi titulo para estar mame y mame',
    },
    {
      _id: '8172736464647839283748',
      image: {
        uri: 'https://res.cloudinary.com/highdatamx/image/upload/v1625023395/HOLISTICAPP/qb5t4x3qesc9oxys9naw.jpg',
      },
      title: 'Diploma ejemplo 3',
      description: 'Este es mi titulo para estar mame y mame',
    },
    {
      _id: '209873456478374645372829',
      image: {
        uri: 'https://res.cloudinary.com/highdatamx/image/upload/v1625023395/HOLISTICAPP/qb5t4x3qesc9oxys9naw.jpg',
      },
      title: 'Diploma ejemplo 4',
      description: 'Este es mi titulo para estar mame y mame',
    },
  ]);

  const logOut = () => {
    const keys = ['xauthtoken', 'user'];
    AsyncStorage.multiRemove(keys).then(res => {
      console.log('Items removed from storage');
      navigation.navigate('Login');
    });
  };

  const _storeData = async (keyName, value) => {
    try {
      await AsyncStorage.setItem(keyName, value);
    } catch (error) {
      console.log(error);
    }
  };
  const changeDescription = () => {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('xAuthToken', JSON.parse(token));
    return fetch(`${API_URL}/profile/edit`, {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify({
        description: text,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setText(text);
        userLogged = {...userLogged, description: text};
        console.log(JSON.stringify(userLogged));
        _storeData('user', JSON.stringify(userLogged));
        console.log(JSON.stringify(data));
        Alert.alert(
          `Perfecto ${userLogged.name}!`,
          `Hemos actualizado tu descripción.`,
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('ok');
              },
            },
          ],
        );
      })
      .catch(err => {
        console.log(err);
        Alert.alert(`Lo sentimos ${userLogged.name}!`, `${err}`, [
          {
            text: 'OK',
            onPress: () => {
              console.log('ok');
            },
          },
        ]);
      });
  };
  const changeSchedule = () => {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('xAuthToken', JSON.parse(token));
    let days = {
      0: sunday,
      1: monday,
      2: tuesday,
      3: wednesday,
      4: thursday,
      5: friday,
      6: saturday,
    };
    const array = [{days}, {startHour}, {endHour}, {duration: sessionDuration}];
    console.log(`From change schedule before fetch: ${JSON.stringify(array)}`);
    return fetch(`${API_URL}/profile/calendar`, {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify(array),
    })
      .then(res => res.json())
      .then(data => {
        let days = {
          0: sunday,
          1: monday,
          2: tuesday,
          3: wednesday,
          4: thursday,
          5: friday,
          6: saturday,
        };
        userLogged = {...userLogged, days};
        _storeData('user', JSON.stringify(userLogged));
        console.log(
          `From received changeschedule fetch: ${JSON.stringify(data)}`,
        );
        Alert.alert(
          `Perfecto ${userLogged.name}!`,
          `Hemos actualizado tu horario.`,
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('ok');
              },
            },
          ],
        );
      })
      .catch(err => {
        console.log(err);
        Alert.alert(
          `Lo sentimos ${userLogged.name}!`,
          `Hubo un error al actualizar tu perfil. Por favor intenta de nuevo mas tarde!`,
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('ok');
              },
            },
          ],
        );
      });
  };
  const changeCategory = () => {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('xAuthToken', JSON.parse(token));
    console.log(
      `From changecategory: ${JSON.stringify({specialization: category})}`,
    );
    return fetch(`${API_URL}/profile/edit`, {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify({
        specialization: category,
      }),
    })
      .then(data => {
        setMonday(monday);
        setTuesday(tuesday);
        setWednesday(wednesday);
        setThursday(thursday);
        setFriday(friday);
        setSaturday(saturday);
        setSunday(sunday);
        console.log(data);
        userLogged = {...userLogged, specialization: category};
        _storeData('user', JSON.stringify(userLogged));
        Alert.alert(
          `Perfecto ${userLogged.name}!`,
          `Hemos actualizado tu categoría.`,
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('ok');
              },
            },
          ],
        );
      })
      .catch(err => {
        console.log(err);
        Alert.alert(
          `Lo sentimos ${userLogged.name}!`,
          `Hubo un error al actualizar tu categoria. Por favor intenta de nuevo mas tarde!`,
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('ok');
              },
            },
          ],
        );
      });
  };

  const checkbox = {
    style: {
      true: dayEditing ? 'purple' : 'grey',
      false: dayEditing ? 'white' : 'grey',
    },
  };
  const numerosHorarioInicio = {
    color: startHourEditing ? 'orange' : 'grey',
    fontSize: 30,
  };
  const textInputStyle = {
    width: '60%',
    marginBottom: 4,
    borderWidth: 2,
    borderColor: startHourEditing ? 'white' : 'transparent',
    borderRadius: 8,
    padding: 10,
    color: startHourEditing ? 'orange' : 'grey',
    fontSize: 30,
  };
  const numerosHorarioFin = {...numerosHorarioInicio};
  const numerosDuracion = {...numerosHorarioFin};

  const editDescription = () => {
    if (descriptionEditing === false) {
      setDescriptionEditing(true);
    } else {
      changeDescription();
      setDescriptionEditing(false);
    }
  };
  const editSchedule = () => {
    if (dayEditing === false) {
      setDurationEditing(true);
      setEndHourEditing(true);
      setStartHourEditing(true);
      setDayEditing(true);
      setCheckBoxDisabled(false);
    } else {
      changeSchedule();
      setDurationEditing(false);
      setEndHourEditing(false);
      setStartHourEditing(false);
      setDayEditing(false);
      setCheckBoxDisabled(true);
    }
  };
  const editCategory = () => {
    if (categoryEditing === true) {
      setCategoryEditing(false);
    } else {
      changeCategory();
      setCategoryEditing(true);
    }
  };

  const renderList = item => {
    const getImage = image => {
      if (
        typeof image === 'undefined' ||
        image === null ||
        typeof image === 'string'
      ) {
        return defaultImage;
      } else {
        return image;
      }
    };
    return (
      <Card
        style={styles.myCard}
        onPress={() => navigation.navigate('TherapistDocument', {item})}>
        <View style={styles.cardView}>
          <Image style={styles.cardimage} source={getImage(item.image)}></Image>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.description}</Text>
          </View>
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
      <View style={styles.header}>
        <Pressable
          onLongPress={() => {
            setImageModalVisible(true);
          }}>
          <Image
            style={styles.image}
            source={userLogged.image ? userLogged.image : defaultImage}></Image>
        </Pressable>

        <View style={styles.userBox}>
          <Text style={styles.title}>{userLogged.name}</Text>
          <Text style={styles.subtitle}>
            {userLogged.specialization
              ? userLogged.specialization
              : 'Specialization'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonLogout}
          mode="contained"
          onPress={() => {
            logOut();
          }}>
          <Text style={styles.logoutButtonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.description}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.subtitles}>Categoría:</Text>
            <Text onPress={editCategory} style={styles.textbutton}>
              {categoryEditing ? 'Editar' : 'Guardar'}
            </Text>
          </View>
          <SelectDropdown
            disabled={categoryEditing}
            buttonStyle={{
              width: '100%',
              height: 40,
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: categoryEditing ? 'grey' : 'white',
              borderRadius: 8,
              marginBottom: 20,
            }}
            buttonTextStyle={{color: categoryEditing ? 'grey' : 'orange'}}
            dropdownStyle={{
              backgroundColor: 'black',
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 8,
            }}
            rowTextStyle={{color: 'white'}}
            defaultButtonText={
              userLogged.specialization
                ? userLogged.specialization
                : 'Selecciona una categoría'
            }
            data={categories}
            onSelect={(selectedItem, index) => {
              setCategory(selectedItem);
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.subtitles}>Descripción:</Text>
            <Text onPress={editDescription} style={styles.textbutton}>
              {descriptionEditing ? 'Guardar' : 'Editar'}
            </Text>
          </View>
          <TextInput
            style={{
              backgroundColor: 'black',
              minHeight: 200,
              textAlignVertical: 'top',
              borderWidth: 1,
              borderColor: descriptionEditing ? 'white' : 'grey',
              color: descriptionEditing ? 'white' : 'grey',
              fontSize: 18,
              borderRadius: 5,
              justifyContent: 'flex-start',
            }}
            onChangeText={text => setText(text)}
            value={text}
            editable={descriptionEditing}
            multiline
            maxLength={750}
          />
        </View>
        <View style={styles.description}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.subtitles}>Documentos:</Text>
            <Text style={styles.textbutton}>Agregar</Text>
          </View>
          <View>
            {loading ? (
              <ActivityIndicator size="large" color={mainColor} />
            ) : (
              <FlatList
                style={styles.flatList}
                data={data}
                renderItem={({item}) => {
                  return renderList(item);
                }}
                scrollEnabled={false}
                keyExtractor={item => `${item._id}`}></FlatList>
            )}
          </View>
        </View>

        <View style={styles.description2}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.subtitles}>Horario:</Text>
            <Text onPress={editSchedule} style={styles.textbutton}>
              {dayEditing ? 'Guardar' : 'Editar'}
            </Text>
          </View>
          <View style={styles.diasSemana}>
            <View style={styles.diasBlocks}>
              <Text style={styles.diasText}>L</Text>
              <CheckBox
                disabled={checkBoxDisabled}
                tintColors={checkbox.style}
                value={monday}
                onValueChange={value => setMonday(value)}
                style={styles.checkbox}
              />
            </View>
            <View style={styles.diasBlocks}>
              <Text style={styles.diasText}>M</Text>
              <CheckBox
                disabled={checkBoxDisabled}
                tintColors={checkbox.style}
                value={tuesday}
                onValueChange={value => setTuesday(value)}
                style={styles.checkbox}
              />
            </View>
            <View style={styles.diasBlocks}>
              <Text style={styles.diasText}>M</Text>
              <CheckBox
                disabled={checkBoxDisabled}
                tintColors={checkbox.style}
                value={wednesday}
                onValueChange={value => setWednesday(value)}
                style={styles.checkbox}
              />
            </View>
            <View style={styles.diasBlocks}>
              <Text style={styles.diasText}>J</Text>
              <CheckBox
                disabled={checkBoxDisabled}
                tintColors={checkbox.style}
                value={thursday}
                onValueChange={value => setThursday(value)}
                style={styles.checkbox}
              />
            </View>
            <View style={styles.diasBlocks}>
              <Text style={styles.diasText}>V</Text>
              <CheckBox
                disabled={checkBoxDisabled}
                tintColors={checkbox.style}
                value={friday}
                onValueChange={value => setFriday(value)}
                style={styles.checkbox}
              />
            </View>
            <View style={styles.diasBlocks}>
              <Text style={styles.diasText}>S</Text>
              <CheckBox
                disabled={checkBoxDisabled}
                tintColors={checkbox.style}
                value={saturday}
                onValueChange={value => setSaturday(value)}
                style={styles.checkbox}
              />
            </View>
            <View style={styles.diasBlocks}>
              <Text style={styles.diasText}>D</Text>
              <CheckBox
                disabled={checkBoxDisabled}
                tintColors={checkbox.style}
                value={sunday}
                onValueChange={value => setSunday(value)}
                style={checkbox.style}
              />
            </View>
          </View>
          <View style={styles.horario}>
            <View style={styles.limits}>
              <Text style={styles.limitsText}>Inicio del día</Text>
              <SelectDropdown
                disabled={!startHourEditing}
                buttonStyle={{
                  width: '60%',
                  backgroundColor: 'black',
                  borderWidth: 1,
                  borderColor: startHourEditing ? 'white' : 'grey',
                  borderRadius: 8,
                  marginBottom: 20,
                }}
                buttonTextStyle={{
                  color: !startHourEditing ? 'grey' : 'orange',
                  fontSize: 25,
                }}
                dropdownStyle={{
                  backgroundColor: 'black',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 8,
                }}
                rowTextStyle={{color: 'orange'}}
                defaultButtonText={startHour}
                data={HourDropdown}
                onSelect={(selectedItem, index) => {
                  setStartHour(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
            <View style={styles.limits}>
              <Text style={styles.limitsText}>Fin del día</Text>
              <SelectDropdown
                disabled={!startHourEditing}
                buttonStyle={{
                  width: '60%',
                  backgroundColor: 'black',
                  borderWidth: 1,
                  borderColor: startHourEditing ? 'white' : 'grey',
                  borderRadius: 8,
                  marginBottom: 20,
                }}
                buttonTextStyle={{
                  color: !startHourEditing ? 'grey' : 'orange',
                  fontSize: 25,
                }}
                dropdownStyle={{
                  backgroundColor: 'black',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 8,
                }}
                rowTextStyle={{color: 'orange'}}
                defaultButtonText={endHour}
                data={HourDropdown}
                onSelect={(selectedItem, index) => {
                  setEndHour(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
          </View>
          <View style={styles.limits}>
            <Text style={styles.limitsText}>Duración de la sesión</Text>
            <SelectDropdown
              disabled={!startHourEditing}
              buttonStyle={{
                width: '30%',
                backgroundColor: 'black',
                borderWidth: 1,
                borderColor: startHourEditing ? 'white' : 'grey',
                borderRadius: 8,
                marginBottom: 20,
              }}
              buttonTextStyle={{
                color: !startHourEditing ? 'grey' : 'orange',
                fontSize: 25,
              }}
              dropdownStyle={{
                backgroundColor: 'black',
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 8,
              }}
              rowTextStyle={{color: 'orange'}}
              defaultButtonText={sessionDuration}
              data={durationDropdown}
              onSelect={(selectedItem, index) => {
                setSessionDuration(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
        </View>
        <Button
          style={styles.buttonPassword}
          mode="contained"
          onPress={() => {
            setModalTerapeutaVisible(true);
          }}>
          DEJAR DE SERVIR AL MUNDO!
        </Button>
        <View style={{height: 48, width: "100%", backgroundColor: secondaryColor}}></View>
      </ScrollView>
      <UserTypeChange
        modalTerapeutaVisible={modalTerapeutaVisible}
        setModalTerapeutaVisible={setModalTerapeutaVisible}
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
    </SafeAreaView>
  );
}
var IMAGE_SIZE = 80;
var TITLE_FONT_SIZE = 30;
var SUBTITLE_FONT_SIZE = 28;
var LOGOUT_BUTTON_PADDING = 10;
var LOGOUT_BUTTON_FONT_SIZE = 16;
var SUBTITLES_FONT_SIZE = 22;
var CARDIMAGE_SIZE = 50;
var CARD_TITLE_FONT_SIZE = 20;
var CARD_HEIGHT = 60;
var CARD_SUBTITLE_FONT_SIZE = 15;
var DIAS_FONT_SIZE = 20;
var LIMITS_FONT_SIZE = 22;
if (PixelRatio.get() <= 2) {
  IMAGE_SIZE = 60;
  TITLE_FONT_SIZE = 18;
  SUBTITLE_FONT_SIZE = 15;
  LOGOUT_BUTTON_PADDING = 8;
  LOGOUT_BUTTON_FONT_SIZE = 12;
  SUBTITLES_FONT_SIZE = 18;
  CARD_HEIGHT = 40;
  CARDIMAGE_SIZE = 32;
  CARD_TITLE_FONT_SIZE = 14;
  CARD_SUBTITLE_FONT_SIZE = 10;
  DIAS_FONT_SIZE = 14;
  LIMITS_FONT_SIZE = 18;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: secondaryColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dropdown: {
    width: '100%',
    backgroundColor: 'red',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 10,
    marginBottom: 20,
  },
  userBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: TITLE_FONT_SIZE,
    marginLeft: 10,
  },
  subtitle: {
    color: 'orange',
    fontSize: SUBTITLE_FONT_SIZE,
  },
  subtitles: {
    color: 'white',
    fontSize: SUBTITLES_FONT_SIZE,
  },
  calendar: {
    width: Dimensions.get('window').width,
    alignSelf: 'center',
  },
  agenda: {
    width: Dimensions.get('window').width,
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: 40,
  },
  description: {
    width: Dimensions.get('window').width,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
  },
  description2: {
    width: Dimensions.get('window').width,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
  },
  textbutton: {
    fontSize: SUBTITLES_FONT_SIZE,
    color: 'orange',
  },
  input: {},
  flatList: {
    width: '100%',
  },
  myCard: {
    width: '100%',
    margin: 1,
    height: CARD_HEIGHT,
    borderRadius: 5,
  },
  cardView: {
    height: '100%',
    paddingLeft: 10,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  cardimage: {
    height: CARDIMAGE_SIZE,
    width: CARDIMAGE_SIZE,
    marginRight: 25,
  },
  cardText: {
    flex: 1,
    height: '80%',
    justifyContent: 'space-around',
  },
  cardTitle: {
    color: 'black',
    fontSize: CARD_TITLE_FONT_SIZE,
    justifyContent: 'center',
  },
  cardSubtitle: {color: 'black', fontSize: CARD_SUBTITLE_FONT_SIZE},
  diasSemana: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
  },
  diasBlocks: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diasText: {
    color: 'white',
    fontWeight: '700',
    fontSize: DIAS_FONT_SIZE,
  },
  horario: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    marginBottom: 20,
  },
  limits: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  limitsText: {
    marginBottom: 8,
    color: 'white',
    fontSize: LIMITS_FONT_SIZE,
  },
  numerosHorario: {
    marginBottom: 8,
    color: 'orange',
    fontSize: 30,
    fontWeight: '700',
  },
  buttonLogout: {
    padding: LOGOUT_BUTTON_PADDING,
    fontSize: 10,
    backgroundColor: 'orange',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: LOGOUT_BUTTON_FONT_SIZE,
    fontWeight: '700',
  },
  buttonPassword: {
    width: '100%',
    padding: 8,
    marginBottom: 20,
  },
});

export default TherapistProfile;
