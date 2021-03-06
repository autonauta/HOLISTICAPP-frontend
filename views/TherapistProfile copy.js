import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  Alert,
  ScrollView,
  Pressable,
  PixelRatio,
  StatusBar,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Card, Button} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserTypeChange from './modals/UserTypeChange';
import ImageChange from './modals/ImageChange';

import {
  API_URL,
  mainColor,
  secondaryColor,
  tertiaryColor,
  textColor1,
  textColor2,
} from '../config';
const defaultImage = require('../assets/avatar.png');
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
  //--------------------------Variables for user and calendar------------------
  let {userCalendar, userLogged, token} = route.params;
  //--------------------- for state variables for editing profile -------------
  const [descriptionEditing, setDescriptionEditing] = useState(false);
  const [dayEditing, setDayEditing] = useState(false);
  const [startHourEditing, setStartHourEditing] = useState(false);
  const [endHourEditing, setEndHourEditing] = useState(false);
  const [durationEditing, setDurationEditing] = useState(false);
  const [categoryEditing, setCategoryEditing] = useState(true);

  const [description, setDescription] = useState(userLogged.description);
  const [category, setCategory] = useState(userLogged.specialization);
  const [startHour, setStartHour] = useState(userCalendar.startHour);
  const [endHour, setEndHour] = useState(userCalendar.endHour);
  const [sessionDuration, setSessionDuration] = useState(userCalendar.duration);
  //-------------------------------Week day variables ---------------------------------------
  const [sunday, setSunday] = useState(
    userCalendar.days ? userCalendar.days[0] : false,
  );
  const [monday, setMonday] = useState(
    userCalendar.days ? userCalendar.days[1] : false,
  );
  const [tuesday, setTuesday] = useState(
    userCalendar.days ? userCalendar.days[2] : false,
  );
  const [wednesday, setWednesday] = useState(
    userCalendar.days ? userCalendar.days[3] : false,
  );
  const [thursday, setThursday] = useState(
    userCalendar.days ? userCalendar.days[4] : false,
  );
  const [friday, setFriday] = useState(
    userCalendar.days ? userCalendar.days[5] : false,
  );
  const [saturday, setSaturday] = useState(
    userCalendar.days ? userCalendar.days[6] : false,
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
    const keys = ['xauthtoken', 'user', 'userCalendar'];
    AsyncStorage.multiRemove(keys).then(res => {
      console.log('Items removed from storage');
    });
    navigation.navigate('Login');
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
    myHeaders.append('xAuthToken', token);
    return fetch(`${API_URL}/profile/edit`, {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify({
        description,
      }),
    })
      .then(data => {
        setDescription(description);
        userLogged = {...userLogged, description};
        _storeData('user', JSON.stringify(userLogged));
        Alert.alert(
          `Perfecto ${userLogged.name}!`,
          `Hemos actualizado tu descripci??n.`,
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
    myHeaders.append('xAuthToken', token);
    let days = {
      0: sunday,
      1: monday,
      2: tuesday,
      3: wednesday,
      4: thursday,
      5: friday,
      6: saturday,
    };
    const scheduleSettings = [
      {days},
      {startHour},
      {endHour},
      {duration: sessionDuration},
    ];
    console.log(
      `From change schedule before fetch: ${JSON.stringify(scheduleSettings)}`,
    );
    return fetch(`${API_URL}/profile/calendar`, {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify(scheduleSettings),
    })
      .then(data => {
        const days = {
          0: sunday,
          1: monday,
          2: tuesday,
          3: wednesday,
          4: thursday,
          5: friday,
          6: saturday,
        };
        userCalendar = {...userCalendar, days};
        _storeData('userCalendar', JSON.stringify(userCalendar));
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
    myHeaders.append('xAuthToken', token);
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
        userLogged = {...userLogged, specialization: category};
        _storeData('user', JSON.stringify(userLogged));
        Alert.alert(
          `Perfecto ${userLogged.name}!`,
          `Hemos actualizado tu categor??a.`,
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
      true: dayEditing ? textColor1 : 'grey',
      false: dayEditing ? secondaryColor : 'grey',
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
      <StatusBar
        animated={true}
        backgroundColor={mainColor}
        barStyle={'default'}
        showHideTransition={'fade'}
      />
      <View style={styles.header}>
        <View style={styles.imageBox}>
          <Image
            style={styles.image}
            source={getImage(userLogged.image)}></Image>
          <Pressable
            onPress={() => {
              setImageModalVisible(true);
            }}>
            <Text style={styles.imageChangeText}>cambiar</Text>
          </Pressable>
        </View>

        <View style={styles.userBox}>
          <Text style={styles.title}>{userLogged.name}</Text>
          <Text style={styles.subtitle}>
            {userLogged.specialization
              ? userLogged.specialization
              : 'Specialization'}
          </Text>
        </View>
      </View>
      <ScrollView style={{width: '100%'}}>
        <View style={styles.description}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.subtitles}>Categor??a:</Text>
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
              borderColor: categoryEditing ? textColor2 : textColor1,
              borderRadius: 8,
              marginBottom: 20,
            }}
            buttonTextStyle={{
              color: categoryEditing ? textColor2 : 'white',
            }}
            dropdownStyle={{
              backgroundColor: secondaryColor,
              borderWidth: 1,
              borderColor: 'transparent',
              borderRadius: 8,
            }}
            rowTextStyle={{color: 'white', fontWeight: '700'}}
            defaultButtonText={
              userLogged.specialization
                ? userLogged.specialization
                : 'Selecciona una categor??a'
            }
            data={categories}
            onSelect={(selectedItem, index) => {
              setCategory(selectedItem);
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem;
            }}
            rowTextForSelection={item => {
              return item;
            }}
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.subtitles}>Descripci??n:</Text>
            <Text onPress={editDescription} style={styles.textbutton}>
              {descriptionEditing ? 'Guardar' : 'Editar'}
            </Text>
          </View>
          <TextInput
            style={{
              minHeight: 200,
              textAlignVertical: 'top',
              borderWidth: 1,
              borderColor: descriptionEditing ? textColor1 : textColor2,
              color: descriptionEditing ? 'white' : 'grey',
              fontSize: 18,
              borderRadius: 5,
              justifyContent: 'flex-start',
            }}
            onChangeText={text => setDescription(text)}
            value={description}
            editable={descriptionEditing}
            multiline
            maxLength={750}
          />
        </View>
        {/* <View style={styles.description}>
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
        </View> */}

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
              <Text style={styles.limitsText}>Primera sesi??n</Text>
              <SelectDropdown
                disabled={!startHourEditing}
                buttonStyle={{
                  width: '60%',
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: startHourEditing ? secondaryColor : 'grey',
                  borderRadius: 8,
                  marginBottom: 20,
                }}
                buttonTextStyle={{
                  color: !startHourEditing ? 'grey' : tertiaryColor,
                  fontSize: 25,
                }}
                dropdownStyle={{
                  backgroundColor: secondaryColor,
                  borderWidth: 1,
                  borderColor: secondaryColor,
                  borderRadius: 8,
                }}
                rowTextStyle={{color: tertiaryColor}}
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
              <Text style={styles.limitsText}>??ltima sesi??n</Text>
              <SelectDropdown
                disabled={!startHourEditing}
                buttonStyle={{
                  width: '60%',
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: startHourEditing ? secondaryColor : 'grey',
                  borderRadius: 8,
                  marginBottom: 20,
                }}
                buttonTextStyle={{
                  color: !startHourEditing ? 'grey' : tertiaryColor,
                  fontSize: 25,
                }}
                dropdownStyle={{
                  backgroundColor: secondaryColor,
                  borderWidth: 1,
                  borderColor: secondaryColor,
                  borderRadius: 8,
                }}
                rowTextStyle={{color: tertiaryColor}}
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
            <Text style={styles.limitsText}>Duraci??n de la sesi??n</Text>
            <SelectDropdown
              disabled={!startHourEditing}
              buttonStyle={{
                width: '30%',
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: startHourEditing ? secondaryColor : 'grey',
                borderRadius: 8,
                marginBottom: 20,
              }}
              buttonTextStyle={{
                color: !startHourEditing ? 'grey' : tertiaryColor,
                fontSize: 25,
              }}
              dropdownStyle={{
                backgroundColor: secondaryColor,
                borderWidth: 1,
                borderColor: secondaryColor,
                borderRadius: 8,
              }}
              rowTextStyle={{color: tertiaryColor}}
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
        <Button
          style={styles.buttonLogout}
          mode="contained"
          onPress={() => {
            logOut();
          }}>
          LOGOUT
        </Button>
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
var IMAGE_SIZE = 90;
var TITLE_FONT_SIZE = 35;
var SUBTITLE_FONT_SIZE = 28;
var LOGOUT_BUTTON_FONT_SIZE = 16;
var SUBTITLES_FONT_SIZE = 22;
var CARD_HEIGHT = 60;
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
    backgroundColor: mainColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  dropdown: {
    width: '100%',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 10,
    marginBottom: 20,
  },
  userBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  title: {
    color: tertiaryColor,
    fontSize: TITLE_FONT_SIZE,
    fontWeight: '700',
  },
  subtitle: {
    color: textColor1,
    fontSize: SUBTITLE_FONT_SIZE,
    fontWeight: '700',
  },
  subtitles: {
    color: tertiaryColor,
    fontWeight: '700',
    fontSize: SUBTITLES_FONT_SIZE,
  },
  calendar: {
    width: Dimensions.get('window').width,
    alignSelf: 'center',
  },
  agenda: {
    width: Dimensions.get('window').width,
  },
  imageBox: {
    alignItems: 'center',
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: 20,
  },
  imageChangeText: {
    color: tertiaryColor,
    fontSize: 16,
  },
  description: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 10,
  },
  description2: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    marginBottom: 10,
  },
  textbutton: {
    fontSize: SUBTITLES_FONT_SIZE,
    color: textColor1,
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
    color: tertiaryColor,
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
    color: tertiaryColor,
    fontSize: LIMITS_FONT_SIZE,
  },
  numerosHorario: {
    marginBottom: 8,
    color: secondaryColor,
    fontSize: 30,
    fontWeight: '700',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: LOGOUT_BUTTON_FONT_SIZE,
    fontWeight: '700',
  },
  buttonPassword: {
    width: '100%',
    backgroundColor: tertiaryColor,
    padding: 2,
    marginBottom: 20,
  },
  buttonLogout: {
    width: '100%',
    padding: 2,
    backgroundColor: 'red',
    marginBottom: 20,
  },
});

export default TherapistProfile;
