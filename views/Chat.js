import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import io from 'socket.io-client';
import {mainColor, secondaryColor} from '../config';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

const socket = io.connect('http://highdatamx.com:3000');

function Chat({route}) {
  const {token, userLogged, item} = route.params;
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const makeId = () => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
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
      setMessageList(list => [...list, messageData]);
      setCurrentMessage('');
    }
  };
  useEffect(() => {
    socket.on('receive_message', data => {
      console.log(`Received message from the server: ${data.message}`);
      setMessageList(list => [...list, data]);
    });
  }, [socket]);

  const joinRoom = () => {
    socket.emit('join_room', item._id);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      joinRoom();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
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
          <Text style={styles.messageAuthor}>{item.author}</Text>
          <Text style={styles.messageText}>{item.message}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Text>Live Chat</Text>
      <Text>{item.therapistName}</Text>
      <Text>{item.appointeeName}</Text>
      <Text>{item.appointmentDate.day.split('T')[0].split('-')[2]}</Text>
      <Text>{item.appointmentDate.hour}</Text>
      <View style={styles.textInputView}>
        <Text style={styles.label}>contraseña</Text>
        <TextInput
          style={styles.textInput}
          value={currentMessage}
          onChangeText={text => setCurrentMessage(text)}></TextInput>
      </View>
      <Button
        style={styles.buttonLogout}
        mode="contained"
        onPress={() => {
          sendMessage();
        }}>
        SEND
      </Button>
      <View>
        <FlatList
          style={styles.flatList}
          data={messageList}
          renderItem={({item}) => {
            return renderList(item);
          }}
          keyExtractor={item => `${item.key}`}></FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInputView: {
    width: '100%',
    alignItems: 'center',
    textAlign: 'left',
    marginBottom: 5,
  },
  textInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    padding: 5,
    color: 'black',
    fontSize: 12,
  },
  buttonLogout: {
    width: '100%',
    backgroundColor: 'green',
    padding: 8,
    marginBottom: 20,
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
    width: '50%',
    padding: 5,
    borderRadius: 4,
    alignSelf: 'flex-end',
    backgroundColor: mainColor,
    marginBottom: 5,
  },
  messageBubbleYou: {
    padding: 5,
    width: '50%',
    borderRadius: 4,

    backgroundColor: secondaryColor,
  },
  messageText: {
    color: 'white',
  },
  messageTime: {
    alignSelf: 'flex-end',
    color: 'grey',
  },
  textFrameMe: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
  },
  textFrameYou: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Chat;
