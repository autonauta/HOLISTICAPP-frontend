import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  PixelRatio,
} from 'react-native';
import {Button} from 'react-native-paper';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
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

import io from 'socket.io-client';
var socket;

function Chat({route}) {
  const {token, userLogged, item} = route.params;
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [userConnected, setUserConnected] = useState();
  const [loading, setLoading] = useState(false);

  const getSocket = async () => {
    socket = await io.connect(SOCKET_IO);
    socket.on('receive_message', data => {
      setMessageList(list => [...list, data]);
    });
    socket.on('user_connected', () => {
      setUserConnected(true);
    });
    socket.on('user_disconnected', () => {
      setUserConnected(false);
      console.log('received user disconnected from socket');
    });
    joinRoom();
  };

  const joinRoom = async () => {
    const roomInfo = {
      room: item._id,
      TherapistId: item.userIdTherapist,
      ClientId: item.userIdApointee,
    };
    await socket.emit('join_chat_room', roomInfo);
  };
  const leaveRoom = async room => {
    await socket.emit('leave_room', room);
  };
  const makeId = () => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const getMinutes = () => {
    const minutes = new Date(Date.now()).getMinutes();
    if (minutes < 10) {
      return '0' + minutes;
    } else return minutes;
  };
  //------------------------------Function for Querying the messages available..............
  const getMessages = () => {
    setLoading(true);
    try {
      fetch(`${API_URL}/messages/${item._id}`)
        .then(res => res.json())
        .then(response => {
          if (response.error) {
            setLoading(false);
          } else if (response) {
            setMessageList(response);
            setLoading(false);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        key: makeId(),
        room: item._id,
        author: userLogged.name,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ':' + getMinutes(),
      };

      await socket.emit('send_message', messageData);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    getSocket();
    getMessages();
    return () => {
      setMessageList([]);
    };
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        leaveRoom(item._id);
      };
    }, []),
  );
  const renderList = item => {
    return (
      <View style={styles.messageContainer}>
        <View
          style={
            item.author === userLogged.name
              ? styles.messageBubbleMe
              : styles.messageBubbleYou
          }>
          <Text style={styles.messageText}>{item.message}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
      </View>
    );
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
          flex: 1,
          width: '100%',
          alignItems: 'center',
          paddingBottom: 60,
        }}>
        <Text style={styles.title}>Mensajes directos</Text>
        <View
          style={{
            width: '100%',
            backgroundColor: mainColor,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Text
            style={
              userConnected ? styles.userConnected : styles.userDisconnected
            }>
            {userConnected ? 'online' : 'offline'}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={secondaryColor} />
        ) : (
          <AutoScrollFlatList
            style={styles.flatList}
            data={messageList}
            renderItem={({item}) => {
              return renderList(item);
            }}
            keyExtractor={item => `${item.key}`}
            onRefresh={() => getMessages()}
            refreshing={loading}
          />
        )}
      </View>
      <View style={styles.footer}>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textInput}
            value={currentMessage}
            onChangeText={text => setCurrentMessage(text)}></TextInput>
        </View>
        <Button
          style={styles.button}
          icon="send"
          mode="contained"
          onPress={() => {
            sendMessage();
          }}></Button>
      </View>
    </SafeAreaView>
  );
}
var TITLE_FONT_SIZE;
var MESSAGE_SIZE;
var TIME_SIZE;
var TEXT_INPUT_WIDTH;
var TEXT_INPUT_FONT_SIZE;
var BUTTON_WIDTH;
var BUTTON_HEIGHT;

//Telefonos con resoluciones medianas
if (PixelRatio.get() >= 2.2 && PixelRatio.get() < 3.6) {
  TITLE_FONT_SIZE = 30;
  MESSAGE_SIZE = 18;
  TIME_SIZE = 16;
  TEXT_INPUT_WIDTH = '98%';
  TEXT_INPUT_FONT_SIZE = 16;
  BUTTON_WIDTH = '15%';
  BUTTON_HEIGHT = '90%';
}
//Telefonos con resoluciones pequeñas
if (PixelRatio.get() >= 1 && PixelRatio.get() < 2.2) {
  TITLE_FONT_SIZE = 25;
  MESSAGE_SIZE = 14;
  TIME_SIZE = 12;
  TEXT_INPUT_WIDTH = '95%';
  TEXT_INPUT_FONT_SIZE = 14;
  BUTTON_WIDTH = '5%';
  BUTTON_HEIGHT = '90%';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    color: tertiaryColor,
    fontSize: TITLE_FONT_SIZE,
    fontWeight: '600',
    paddingLeft: 10,
    backgroundColor: mainColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    paddingTop: 7,
    width: Dimensions.get('window').width,
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
    justifyContent: 'center',
  },
  textInputView: {
    flex: 100,
    alignItems: 'center',
  },
  textInput: {
    width: TEXT_INPUT_WIDTH,
    height: '80%',
    borderRadius: 15,
    paddingLeft: 10,
    backgroundColor: 'lightgrey',
    color: 'black',
    fontSize: TEXT_INPUT_FONT_SIZE,
    elevation: 3,
  },
  button: {
    flex: 0.1,
    height: BUTTON_HEIGHT,
    paddingLeft: 20,
    marginRight: 5,
    borderRadius: 20,
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
    fontSize: MESSAGE_SIZE,
  },
  messageTime: {
    alignSelf: 'flex-end',
    color: 'gray',
    fontSize: TIME_SIZE,
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

export default Chat;
