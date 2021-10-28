import React, {useState} from 'react';
import {
  StatusBar,
  Dimensions,
  PixelRatio,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
  FlatList,
  View,
  Image,
  Pressable,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Card} from 'react-native-paper';
import {
  API_URL,
  mainColor,
  secondaryColor,
  tertiaryColor,
  textColor2,
} from '../../config';
import {Button} from 'react-native-paper';
import {callExpression} from '@babel/types';
const defaultImage = require('../../assets/avatar.png');
function StoreHome({navigation, route}) {
  const {token, userLogged} = route.params;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();
  const getProducts = () => {
    setLoading(true);

    try {
      fetch(`${API_URL}/products`)
        .then(res => res.json())
        .then(results => {
          const productsReceived = results;
          setProducts(productsReceived);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      getProducts();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );
  const renderList = item => {
    const getImage = image => {
      if (
        typeof image === 'undefined' ||
        image === null ||
        typeof image === 'string' ||
        image.uri == null
      ) {
        return defaultImage;
      } else {
        return image;
      }
    };

    return (
      <Card
        style={styles.myCard}
        onPress={() =>
          navigation.navigate('Product', {userLogged, token, item})
        }>
        <View style={styles.cardView}>
          <Image style={styles.image} source={getImage(item.image)}></Image>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{item.productName}</Text>
            <Text style={styles.cardSubtitle}>{item.productDescription}</Text>
          </View>
          <View style={styles.typeOf}>
            <Text style={styles.cardCategory}>{item.productCategory}</Text>
            <Text style={styles.cardPrice}>$ {item.productPrice} MXN</Text>
          </View>
        </View>
      </Card>
    );
    {
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={mainColor}
        barStyle={'default'}
        showHideTransition={'none'}
      />
      <Text style={styles.title}>Holomarket</Text>
      <View style={styles.filterBar}>
        <Pressable style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filtros</Text>
        </Pressable>
        <Button
          labelStyle={styles.buttonIcon}
          icon="shopping"
          color="black"
          color="transparent"
          style={styles.button}></Button>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={secondaryColor} />
      ) : (
        <FlatList
          style={styles.flatList}
          data={products}
          renderItem={({item}) => {
            return renderList(item);
          }}
          keyExtractor={item => `${item._id}`}
          onRefresh={() => getProducts()}
          refreshing={loading}></FlatList>
      )}
    </SafeAreaView>
  );
}
var TITLE_FONT_SIZE = 35;
var TITLE_HEIGHT = 40;
var CARD_HEIGHT = 140;
var IMAGE_HEIGHT = 100;
var CARD_TITLE = 20;
var CARD_CATEGORY = 16;
var CARD_SUBTITLE = 15;
var ICON_SIZE = 30;
var FILTER_BAR_HEIGHT = 100;
var FILTER_FONT_SIZE = 25;

var CONTAINER_HEIGHT =
  Dimensions.get('screen').height - StatusBar.currentHeight;
if (PixelRatio.get() <= 2) {
  FILTER_BAR_HEIGHT = 60;
  FILTER_FONT_SIZE = 20;
  ICON_SIZE = 25;
  TITLE_FONT_SIZE = 22;
  CARD_HEIGHT = 85;
  IMAGE_HEIGHT = 60;
  CARD_TITLE = 13;
  CARD_CATEGORY = 12;
  CARD_SUBTITLE = 11;
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor,
    height: CONTAINER_HEIGHT,
    alignItems: 'center',
  },
  title: {
    color: tertiaryColor,
    fontSize: TITLE_FONT_SIZE,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: 10,
    height: TITLE_HEIGHT,
  },
  flatList: {
    width: '96%',
  },
  myCard: {
    height: CARD_HEIGHT,
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: 'transparent',
  },
  cardView: {
    height: '100%',
    paddingLeft: 10,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_HEIGHT,
    marginRight: 25,
    borderRadius: 20,
  },
  cardText: {
    flex: 1,
    height: '90%',
    justifyContent: 'flex-start',
  },
  typeOf: {
    flex: 0.6,
    height: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: mainColor,
    fontSize: CARD_TITLE,
    fontWeight: '700',
    justifyContent: 'center',
  },
  cardCategory: {
    color: textColor2,
    fontSize: CARD_CATEGORY,
    fontWeight: '700',
    justifyContent: 'center',
  },
  cardPrice: {
    color: tertiaryColor,
    fontSize: CARD_CATEGORY,
    fontWeight: '700',
    justifyContent: 'center',
  },
  cardSubtitle: {color: 'black', fontSize: CARD_SUBTITLE},
  filterBar: {
    width: '100%',
    height: FILTER_BAR_HEIGHT,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButton: {
    width: 100,
  },
  filterButtonText: {
    color: tertiaryColor,
    fontSize: FILTER_FONT_SIZE,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    fontSize: ICON_SIZE,
    color: tertiaryColor,
  },
});

export default StoreHome;
