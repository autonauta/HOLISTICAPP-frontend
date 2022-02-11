import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {mainColor} from '../config';

function VideoPlayer({route, navigation}) {
  const item = route.params.item;
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('cover');
  const onSeek = seek => {
    //HAndler for seeking in search bar
    videoPlayer.current.seek(seek);
  };
  const onPaused = playerState => {
    //HAndler for video pause
    setPaused(!paused);
    setPlayerState(playerState);
  };
  const onReplay = () => {
    //HAndler for video replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };
  const onProgress = data => {
    //Handler for video replay
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };
  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };
  const onLoadStart = data => setIsLoading(true);
  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);
  const onError = () => alert('¡Ups!', error);
  const exitFullScreen = () => {
    alert('Exited full screen');
  };
  const enterFullScreen = () => {};
  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };
  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );
  const onSeeking = currentTime => setCurrentTime(currentTime);
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
        <Video
          onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          paused={paused}
          ref={videoPlayer}
          resizeMode={screenType}
          onFullScreen={isFullScreen}
          source={item.media}
          style={styles.mediaPlayer}
          volume={10}
        />
        <MediaControls
          duration={duration}
          isLoading={isLoading}
          mainColor={mainColor}
          onFullScreen={onFullScreen}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          playerState={playerState}
          progress={currentTime}
          toolbar={renderToolbar()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
    width: Dimensions.get('window').width,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});

export default VideoPlayer;
