import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {Button} from 'react-native-paper';
import {
  mediaDevices,
  RTCView,
} from 'react-native-webrtc';
import Peer from 'react-native-peerjs';
import {useFocusEffect} from '@react-navigation/native';
import {
  mainColor,
  secondaryColor,
  tertiaryColor,
  PEER_JS_URL,
  PEER_JS_PORT,
  SOCKET_IO,
} from '../config';

import io from 'socket.io-client';
const socket = io.connect(SOCKET_IO);



function VideoChat({route}) {
  const {token, userLogged, item} = route.params;
  const [remoteStream, setRemoteStream] = useState(null);
  const [lStream, setLStream] = useState(null);
  const [peerId, setPeerId] = useState();
  const [remotePeer, setRemotePeer] = useState(null);
  const [camera, setCamera] = useState(true);
  const [userConnected, setUserConnected] = useState();
  let appDate = new Date(item.appointmentDate.day);
  let todayDate = new Date();
  let thisMonth = appDate.getMonth() === todayDate.getMonth();
  let thisDay = todayDate.getDate() === appDate.getDate();
  let notToday = !thisMonth || thisMonth && appDate.getDate() > todayDate.getDate();
  let today = thisMonth && thisDay;
  const myPeer = new Peer();
  
  
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
  let localStream;
  const getLocalStream = async () => {
    console.log('isFront: ' + camera);
    const sourceInfos = await mediaDevices.enumerateDevices();
    console.log('source Infos: ' + sourceInfos);
    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if (
        sourceInfo.kind == 'videoinput' &&
        sourceInfo.facing == (camera ? 'front' : 'environment')
      ) {
        videoSourceId = sourceInfo.deviceId;
        console.log(videoSourceId);
      }
    }
    localStream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: Dimensions.get('window').height,
        height: Dimensions.get('window').width,
        frameRate: 30,
        facingMode: camera ? 'user' : 'environment',
        deviceId: videoSourceId,
      },
    });
    console.log("Stream: " + JSON.stringify(localStream));
    myPeer.on("open", myPeerId =>{
      console.log('Local peer open with ID', myPeerId);
      joinRoom(myPeerId);
    })
    myPeer.on("call", call=>{
      call.answer(localStream);
      call.on("stream", remoteStream=>{
        setRemoteStream(remoteStream);
      })
    })
    socket.on('user_connected', (peer) => {
      console.log("myPeer: " , myPeer);
      const call = myPeer.call(peer, localStream);
      console.log("Call: ", call);
      call.on("stream", remoteStream=>{
      setRemoteStream(remoteStream);
      })
    });
    socket.on('user_disconnected', () => {
      setUserConnected(false); 
      setRemoteStream(null);
      console.log('received user disconnected from socket');
    });
    console.log("local stream: ",localStream);
    setLStream(localStream);
  };
  const stopLocalStream = () =>{
    localStream.getTracks().forEach(function(track) {
        if (track.readyState == 'live') {
            track.stop();
        }
    });
  }
  const joinRoom = async (peer) => {
    const room = item._id;
    const id = peer;
    await socket.emit('join_video_room', room, id);
  };
  const leaveRoom = async room => {
    await socket.emit('leave_room', room);
  };
  const callRemoteUser = (peer)=>{
    const call = myPeer.call(peer, localStream);
    call.on("stream", remoteStream=>{
    setRemoteStream(remoteStream);
    })
   }
   useEffect(()=>{
    getLocalStream();
   },[])
   useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        leaveRoom(item._id);
        stopLocalStream();
        console.log('video chat screen unfocused');
      };
    }, []),
  );
  
  return lStream ? (
    <SafeAreaView style={styles.videoContainer}>
      <StatusBar
        animated={true}
        backgroundColor={mainColor}
        barStyle={'default'}
        showHideTransition={'fade'}
      />
      <Text style={styles.title}>Video llamada</Text>
      {remoteStream ? 
      <View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}>
          <View style={styles.backStream}>
          <RTCView
          style={{width: "100%", height: "100%"}}
          objectFit="cover"
          streamURL={remoteStream.toURL()}
          />
          </View>
          <View style={styles.frontStream}>
        <RTCView
        objectFit="cover"
          style={{width: "100%", height: "100%"}}
          streamURL={lStream.toURL()}
        />
          </View>
      </View> : <View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}>
          <View style={styles.frontNoStream}>
        <RTCView
        objectFit="cover"
          style={{width: "100%", height: "100%"}}
          streamURL={lStream.toURL()}
        />
          </View>
      </View>}
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.videoContainer}>
      <StatusBar
        animated={true}
        backgroundColor={mainColor}
        barStyle={'default'}
        showHideTransition={'fade'}
      />
      <Text style={styles.title}>Video llamada</Text>
      <View style={styles.container}>
      {notToday && <Text style = {styles.legend}>{`Tu cita está programada para el dìa: `}</Text>}
      {notToday && <Text style = {styles.legend}>{`${item.appointmentDate.day.split("T")[0].split("-")[2]} de ${selectMonth(item.appointmentDate.day.split("T")[0].split("-")[1])}`}</Text>}
      {today && <Text style = {styles.legend}>{`Tu cita está programada para las: `}</Text>}
      {today && <Text style = {styles.legend}>{`${item.appointmentDate.hour} horas`}</Text>}
      </View>
      <Button
          style={{
            width: '100%',
            height: 40,
            position: 'absolute',
            bottom: 20,
            left: 0,
          }}
          mode="contained"
          onPress={() => {
            getLocalStream();
          }}>
          start
        </Button>
      
    </SafeAreaView>
  );
}
var CONTAINER_HEIGHT = Dimensions.get('screen').height;
var TITLE_FONT_SIZE = 35;
var TITLE_HEIGHT = 50;
const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    backgroundColor: mainColor, 
    height: CONTAINER_HEIGHT,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: mainColor, 
    height: CONTAINER_HEIGHT,
    justifyContent: "center",
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
  legend: {
    color: "white",
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
  frontStream: {
    position: "absolute",
    top: 0,
    left: 0,
    width: '30%',
    height: '30%',
    zIndex: 100,
  },
  frontNoStream: {
    position: "absolute",
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
  backStream: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    backgroundColor: "red"
  }
  
});

export default VideoChat;
