import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import {mediaDevices, RTCView} from 'react-native-webrtc';
import Peer from 'react-native-peerjs';
import {useFocusEffect} from '@react-navigation/native';
import {mainColor, tertiaryColor, SOCKET_IO} from '../config';

import io from 'socket.io-client';
var socket;

const getSocket = async () => {
  socket = await io.connect(SOCKET_IO);
};

function VideoChat({route}) {
  const {userLogged, item} = route.params;
  const [remoteStream, setRemoteStream] = useState(null);
  const [lStream, setLStream] = useState(null);
  const [camera, setCamera] = useState(true);
  const isTheTherapist = userLogged._id === item.userIdTherapist;
  let appDate = new Date(item.appointmentDate.day);
  let todayDate = new Date();
  todayDate = new Date(
    todayDate.getTime() - todayDate.getTimezoneOffset() * 60 * 1000,
  );
  let thisMonth = appDate.getMonth() === todayDate.getMonth();
  let thisDay = todayDate.getUTCDate() === appDate.getUTCDate();
  let notToday =
    !thisMonth || (thisMonth && appDate.getDate() > todayDate.getDate());
  let today = thisMonth && thisDay;
  let now = todayDate.getUTCHours() >= appDate.getUTCHours();
  let missingHours = appDate.getUTCHours() - todayDate.getUTCHours();
  console.log('today Date: ', todayDate);
  console.log('app date: ', appDate);
  console.log('today day: ', todayDate.getUTCDate());
  console.log('today month: ', todayDate.getMonth());
  console.log('app day: ', appDate.getUTCDate());
  console.log('app month: ', appDate.getMonth());
  var myPeer = null;
  var call = null;
  const room = item._id;
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
  //Set comunication when the user enters the view
  const setComunication = async () => {
    console.log('entered set comunication');
    const sourceInfos = await mediaDevices.enumerateDevices();
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
        width: Dimensions.get('window').height / 2,
        height: Dimensions.get('window').width / 2,
        frameRate: {
          ideal: 60,
          min: 15,
        },
        facingMode: camera ? 'user' : 'environment',
        deviceId: videoSourceId,
      },
    });
    if (stream) {
      console.log('Local stream generated: ', stream);
      setLStream(stream);
    }
    myPeer = await new Peer();
    //Listener for joining room as soon as it has the peer

    myPeer.on('open', peer => {
      console.log('Local peer open with ID', peer);
      socket.emit('join_video_room', room, peer);
    });
    //Listener for receiving the call when the first user make it
    myPeer.on('call', receivedCall => {
      console.log('Call received form other user');
      call = receivedCall;
      call.answer(stream);
      call.on('stream', remoteStream => {
        setRemoteStream(remoteStream);
      });
    });

    //When the other user joins the socket room
    socket.on('user_connected', peer => {
      console.log('form user connected myPeer: ', myPeer);
      console.log('form user connected peer: ', peer);
      console.log('form user connected stream: ', stream);
      call = myPeer.call(peer, stream);
      call.on('stream', remoteStream => {
        setRemoteStream(remoteStream);
      });
    });
    //When the other user grts disconnected, end connections
    socket.on('user_disconnected', () => {
      if (call) {
        console.log('entered to call close');
        call.close();
        call = null;
      }
      setRemoteStream(null);
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      if (today && now) {
        getSocket();
        setComunication();
        console.log('Entered useFocusEffect setting comunication');
      }

      return () => {
        // Do something when the screen is unfocused
        if (call) {
          call.close();
          call = null;
          console.log('call.close called from leaving the view');
        }
        if (myPeer) myPeer.destroy();
        if (socket) socket.emit('leave_room', room);
        console.log('video chat screen unfocused');
      };
    }, []),
  );
  return (
    <SafeAreaView style={styles.videoContainer}>
      <StatusBar
        animated={true}
        backgroundColor={mainColor}
        barStyle={'default'}
        showHideTransition={'fade'}
      />
      <Text style={styles.title}>Video llamada</Text>
      {remoteStream ? (
        <View
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}>
          <View style={styles.backStream}>
            <RTCView
              style={{width: '100%', height: '100%'}}
              objectFit="cover"
              streamURL={remoteStream.toURL()}
            />
          </View>
          <View style={styles.frontStream}>
            <RTCView
              objectFit="cover"
              style={{width: '100%', height: '100%'}}
              streamURL={lStream.toURL()}
              mirror={true}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.frontNoStream}>
            {lStream && (
              <>
                <RTCView
                  objectFit="cover"
                  style={{width: '100%', height: '100%'}}
                  streamURL={lStream.toURL()}
                  mirror={true}
                />
                <View
                  style={{
                    position: 'relative',
                    bottom: Dimensions.get('window').height / 1.5,
                    width: '80%',
                    backgroundColor: 'rgba(4, 118, 208, 0.9)',
                    justifyContent: 'center',
                    borderRadius: 10,
                    padding: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      fontWeight: '700',
                      color: 'white',
                    }}>
                    ¡Espera a que el otro usuario se conecte!
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      )}
      {isTheTherapist ? (
        <View style={styles.infoContainer}>
          {notToday && (
            <Text
              style={
                styles.legend
              }>{`Tu cita está programada para el dìa: `}</Text>
          )}
          {notToday && (
            <Text style={styles.legend}>{`${
              item.appointmentDate.day.split('T')[0].split('-')[2]
            } de ${selectMonth(
              item.appointmentDate.day.split('T')[0].split('-')[1],
            )}`}</Text>
          )}
          {today && !now && (
            <Text
              style={
                styles.legend
              }>{`Tu cita está programada para las: `}</Text>
          )}
          {today && !now && (
            <Text
              style={
                styles.legendBig
              }>{`${item.appointmentDate.hour} horas`}</Text>
          )}
          {today && !now && (
            <Text style={styles.legend}>{`${
              missingHours > 1 ? 'Faltan' : 'Falta'
            } ${missingHours} ${
              missingHours > 1 ? 'horas' : 'hora'
            } para que puedas iniciar la llamada`}</Text>
          )}
        </View>
      ) : (
        <View style={styles.infoContainer}>
          {notToday && (
            <Text
              style={
                styles.legend
              }>{`Tu cita está programada para el dìa: `}</Text>
          )}
          {notToday && (
            <Text style={styles.legend}>{`${
              item.appointmentDate.day.split('T')[0].split('-')[2]
            } de ${selectMonth(
              item.appointmentDate.day.split('T')[0].split('-')[1],
            )}`}</Text>
          )}
          {today && !now && (
            <Text
              style={
                styles.legend
              }>{`Tu cita está programada para las: `}</Text>
          )}
          {today && !now && (
            <Text
              style={
                styles.legend
              }>{`${item.appointmentDate.hour} horas`}</Text>
          )}
          {today && !now && (
            <Text style={styles.legend}>{`${
              missingHours > 1 ? 'Faltan' : 'Falta'
            } ${missingHours} ${
              missingHours > 1 ? 'horas' : 'hora'
            } para que el terapeuta pueda iniciar la llamada. ¡Regresa mas tarde!`}</Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
var CONTAINER_HEIGHT = Dimensions.get('screen').height;
var TITLE_FONT_SIZE = 35;
var TITLE_HEIGHT = 50;
var LEGEND_SIZE = 20;
const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    backgroundColor: mainColor,
    height: CONTAINER_HEIGHT,
    alignItems: 'center',
  },
  infoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('screen').width,
    paddingRight: 20,
    paddingLeft: 20,
    height: CONTAINER_HEIGHT,
    backgroundColor: 'transparent',
    justifyContent: 'center',
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
    color: 'white',
    fontSize: LEGEND_SIZE,
    marginBottom: 10,
  },
  legendBig: {
    color: 'white',
    fontSize: LEGEND_SIZE + 10,
    marginBottom: 10,
  },
  label: {
    color: 'black',
    fontSize: 15,
    alignSelf: 'flex-start',
  },
  frontStream: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '30%',
    height: '30%',
    zIndex: 100,
  },
  frontNoStream: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    alignItems: 'center',
  },
  backStream: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    backgroundColor: 'red',
  },
  userConnected: {
    color: 'green',
    fontSize: 16,
    fontWeight: '700',
  },
  userDisconnected: {
    color: 'red',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default VideoChat;
