import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
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
const socket = io.connect(SOCKET_IO);

function Chat({route}) {
  const {token, userLogged, item} = route.params;
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [userConnected, setUserConnected] = useState();
  const [loading, setLoading] = useState(false);

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
            console.error(`${response.error}`);
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

  const joinRoom = async () => {
    const roomInfo = {
      room: item._id,
      TherapistId: item.userIdTherapist,
      ClientId: item.userIdApointee,
    };
    await socket.emit('join_room', roomInfo);
  };
  const leaveRoom = async room => {
    await socket.emit('leave_room', room);
  };

  useEffect(() => {
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
  }, [socket]);

  useEffect(() => {
    joinRoom();
    getMessages();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        leaveRoom(item._id);
        console.log('chat screen unfocused');
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
      <View
        style={{
          width: '100%',
          height: Dimensions.get('window').height - 120,
          alignItems: 'center',
        }}>
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
var CONTAINER_HEIGHT = Dimensions.get('screen').height;
var TITLE_FONT_SIZE = 35;
var TITLE_HEIGHT = 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    elevation: 5,
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
