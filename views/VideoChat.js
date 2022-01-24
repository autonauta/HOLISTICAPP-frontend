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
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerId, setPeerId] = useState();
  const [remotePeer, setRemotePeer] = useState(null);
  const [camera, setCamera] = useState(true);
  let appDate = new Date(item.appointmentDate.day);
  let todayDate = new Date();
  let thisMonth = appDate.getMonth() === todayDate.getMonth();
  let thisDay = todayDate.getDate() === appDate.getDate();
  let notToday = !thisMonth || thisMonth && appDate.getDate() > todayDate.getDate();
  let today = thisMonth && thisDay;
  
  
  
  
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
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: Dimensions.get('window').height,
        height: Dimensions.get('window').width,
        frameRate: 30,
        facingMode: camera ? 'user' : 'environment',
        deviceId: videoSourceId,
      },
    });
    console.log("Stream: " + JSON.stringify(stream));
    setLocalStream(stream);
  };
  const stopLocalStream = ()=>{
      localStream.getTracks().forEach(function(track) {
          if (track.readyState == 'live') {
              track.stop();
          }
      });
      setLocalStream(null);
  }
  const changeCamera = () => {
    setCamera(!camera);
    getLocalStream();
  };
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
    let myPeer = new Peer();
    
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
  },[])
 
  useEffect(() => {
    socket.on('user_connected', (peer) => {
      callRemoteUser(peer);
      
    });
    socket.on('user_disconnected', () => {
      setUserConnected(false);
      console.log('received user disconnected from socket');
    });
  }, [socket]);
  return localStream ? (
    <SafeAreaView style={styles.videoContainer}>
      <StatusBar
        animated={true}
        backgroundColor={mainColor}
        barStyle={'default'}
        showHideTransition={'fade'}
      />
      <Text style={styles.title}>Video llamada</Text>
      <View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}>
        <RTCView
          objectFit="cover"
          style={{
            width: '100%',
            height: '100%',
          }}
          streamURL={localStream.toURL()}
        />
        {remoteStream && <RTCView
          objectFit="cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '30%',
            height: '30%',
          }}
          streamURL={remoteStream.toURL()}
        />}
        <Button
          style={{
            width: '100%',
            height: 40,
            bottom: 100,
            left: 0,
            zIndex: 100,
          }}
          mode="contained"
          onPress={() => {
            stopLocalStream();
          }}>
          stop
        </Button>
      </View>
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
  
});

export default VideoChat;
