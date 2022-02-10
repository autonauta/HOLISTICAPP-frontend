import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import {Button} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import {
  API_URL,
  mainColor,
  secondaryColor,
  tertiaryColor,
  VIDEO_UPLOAD_PRESET,
  CLOUDINARY_VIDEO_URL,
  CLOUD_NAME,
} from '../config';
function MediaChat({navigation, route}) {
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const {token, userLogged, item} = route.params;
  const getMessages = () => {
    setLoading(true);
    try {
      fetch(`${API_URL}/messages/media/${item._id}`)
        .then(res => res.json())
        .then(response => {
          if (response.error) {
            console.error(`${response.message}`);
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
  const submitData = videoUrl => {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('xAuthToken', token);
    const messageData = {
      key: makeId(),
      TherapistId: item.userIdTherapist,
      ClientId: item.userIdApointee,
      room: item._id,
      author: userLogged._id,
      media: {uri: videoUrl},
      time: new Date(Date.now()).getTime(),
    };
    fetch(`${API_URL}/messages/media`, {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify(messageData),
    })
      .then(data => {
        console.log(`Response from API change image: ${JSON.stringify(data)}`);
        getMessages();
      })
      .catch(err => {
        console.log(err);
      });
  };
  const uploadVideo = file => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', VIDEO_UPLOAD_PRESET);
    data.append('cloud_name', CLOUD_NAME);

    try {
      fetch(CLOUDINARY_VIDEO_URL, {
        method: 'post',
        body: data,
      })
        .then(res => res.json())
        .then(receivedVideo => {
          console.log(receivedVideo);
          console.log(receivedVideo.url);
          submitData(receivedVideo.secure_url);
        });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  const addMedia = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      if (video) {
        console.log(JSON.stringify(video));
        let newFile = {
          uri: video.path,
          type: `video/${video.path.split('.')[2]}`,
          name: `${userLogged.email}_video.${video.path.split('.')[2]}`,
        };
        console.log(JSON.stringify(newFile));
        uploadVideo(newFile);
      } else console.log('Error video not found');
    });
  };

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
  useEffect(() => {
    getMessages();
  }, []);
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
        <Text style={styles.title}>Media Chat</Text>
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
      <Button
        style={styles.button}
        icon="camera"
        mode="contained"
        onPress={() => {
          addMedia();
        }}>
        SUBE UN VIDEO
      </Button>
    </SafeAreaView>
  );
}

var CONTAINER_HEIGHT =
  Dimensions.get('screen').height - StatusBar.currentHeight;
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
    backgroundColor: tertiaryColor,
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
    color: 'black',
    fontSize: 17,
  },
  messageTime: {
    alignSelf: 'flex-end',
    color: 'black',
  },
  button: {
    width: '90%',
    position: 'absolute',
    bottom: 30,
    right: 30,
    paddingLeft: 18,
    borderRadius: 8,
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
});

export default MediaChat;
