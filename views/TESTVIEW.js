
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  PixelRatio,
  SafeAreaView,
  StatusBar
} from 'react-native';

function TESTVIEW(props) {
    return (
        <SafeAreaView style={{height: Dimensions.get("screen").height - StatusBar.currentHeight, backgroundColor: "red", flexDirection: "column-reverse", alignItems: "center"}}>
            <Text>Hola</Text>
        </SafeAreaView>
    );
}

export default TESTVIEW;