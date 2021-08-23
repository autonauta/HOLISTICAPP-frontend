import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import {mainColor, secondaryColor, textColor1, textColor2} from '../config';
const defaultImage = require('../assets/avatar.png');
const noDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed felis eget velit aliquet sagittis id consectetur purus ut. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet.\n Volutpat odio facilisis mauris sit amet massa vitae tortor condimentum. Pellentesque nec nam aliquam sem et tortor consequat. Id eu nisl nunc mi ipsum faucibus vitae. Quam elementum pulvinar etiam non. Volutpat diam ut venenatis tellus in metus. Malesuada fames ac turpis egestas maecenas. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Mattis pellentesque id nibh tortor id aliquet lectus proin.';
//--------------------------MAIN EXPORT FUNCTION--------------------------
function Therapist({navigation, route}) {
  const {name, email, calendar, image, description, specialization} =
    route.params.item;
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
    <View style={styles.container}>
      <View style={styles.top}></View>
      <Image style={styles.image} source={getImage(image)}></Image>
      <ScrollView style={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.props}>{email}</Text>
        </View>
        <Text style={styles.description}>{description ?? noDescription}</Text>
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => {
              navigation.navigate('Calendar', {
                name,
                image,
                calendar,
                specialization,
              });
            }}>
            CALENDAR
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: secondaryColor,
  },
  top: {
    width: '100%',
    height: 100,
    backgroundColor: mainColor,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 73,
    marginTop: -75,
    marginBottom: 10,
  },
  scroll: {
    width: Dimensions.get('window').width - 25,
  },
  card: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: '700',
    color: mainColor,
  },
  props: {
    fontSize: 20,
    color: textColor1,
  },
  description: {
    color: textColor1,
    fontSize: 18,
    marginTop: 10,
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    marginTop: 40,
    backgroundColor: mainColor,
  },
});

export default Therapist;
