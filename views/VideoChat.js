import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

import {
  API_URL,
  SOCKET_IO,
  mainColor,
  secondaryColor,
  tertiaryColor,
  textColor1,
  textColor2,
} from '../config';

function VideoChat({route}) {
  const {token, userLogged, item} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={mainColor}
        barStyle={'default'}
        showHideTransition={'fade'}
      />
      <Text style={styles.title}>Video llamada</Text>
    </SafeAreaView>
  );
}
var CONTAINER_HEIGHT = Dimensions.get('screen').height;
var TITLE_FONT_SIZE = 35;
var TITLE_HEIGHT = 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
    height: CONTAINER_HEIGHT,
    alignItems: 'center',
  },
  title: {
    color: tertiaryColor,
    fontSize: TITLE_FONT_SIZE,
    fontWeight: '600',
    paddingLeft: 10,
    height: TITLE_HEIGHT,
    backgroundColor: mainColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    paddingTop: 7,
    width: Dimensions.get('window').width,
  },
  textInputView: {
    width: '80%',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 5,
    marginLeft: 10,
    paddingLeft: 10,
    backgroundColor: textColor1,
    color: 'black',
    fontSize: 16,
    elevation: 3,
  },
  button: {
    width: '15%',
    height: '100%',
    paddingLeft: 20,
    marginRight: 5,
    borderRadius: 100,
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'black',
    fontSize: 15,
    alignSelf: 'flex-start',
  },
  messageContainer: {
    width: '100%',
  },
  messageBubbleMe: {
    minWidth: '30%',
    maxWidth: '90%',
    padding: 8,
    paddingRight: 20,
    paddingBottom: 5,
    borderRadius: 15,
    alignSelf: 'flex-end',
    backgroundColor: mainColor,
    marginBottom: 8,
    elevation: 3,
  },
  messageBubbleYou: {
    minWidth: '30%',
    maxWidth: '90%',
    padding: 8,
    alignSelf: 'flex-start',
    paddingRight: 20,
    borderRadius: 15,
    marginBottom: 8,
    backgroundColor: secondaryColor,
    elevation: 3,
  },
  messageText: {
    color: 'white',
    fontSize: 17,
  },
  messageTime: {
    alignSelf: 'flex-end',
    color: textColor2,
  },
  footer: {
    paddingTop: 10,
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userConnected: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
    paddingLeft: 10,
  },
  userDisconnected: {
    fontSize: 18,
    fontWeight: '700',
    color: 'gray',
    marginBottom: 5,
    paddingLeft: 10,
  },
});

export default VideoChat;