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
  textColor1,
} from '../../config';
import {Button} from 'react-native-paper';
import {callExpression} from '@babel/types';
const defaultImage = require('../../assets/avatar.png');
function StoreHome({navigation, route}) {
  const {token} = route.params;
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
          console.log(`Producto seleccionado: ${item.productName}`)
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
var TITLE_FONT_SIZE = 30;
var TITLE_HEIGHT = 40;
var CARD_HEIGHT = 120;
var IMAGE_HEIGHT = 80;
var CARD_TITLE = 20;
var CARD_CATEGORY = 16;
var CARD_SUBTITLE = 15;
var ICON_SIZE = 30;
var CONTAINER_HEIGHT =
  Dimensions.get('screen').height - StatusBar.currentHeight;
if (PixelRatio.get() <= 2) {
  TITLE_FONT_SIZE = 20;
  CARD_HEIGHT = 60;
  IMAGE_HEIGHT = 45;
  CARD_TITLE = 16;
  CARD_SUBTITLE = 12;
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor,
    height: CONTAINER_HEIGHT,
    alignItems: 'center',
  },
  title: {
    color: secondaryColor,
    fontSize: TITLE_FONT_SIZE,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: 10,
    height: TITLE_HEIGHT,
  },
  flatList: {
    width: '100%',
  },
  myCard: {
    height: CARD_HEIGHT,
    borderRadius: 10,
    marginBottom: 5,
  },
  cardView: {
    height: '100%',
    paddingLeft: 10,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: secondaryColor,
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
    flex: 0.5,
    height: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: tertiaryColor,
    fontSize: CARD_TITLE,
    fontWeight: '700',
    justifyContent: 'center',
  },
  cardCategory: {
    color: tertiaryColor,
    fontSize: CARD_CATEGORY,
    fontWeight: '700',
    justifyContent: 'center',
  },
  cardPrice: {
    color: textColor1,
    fontSize: CARD_CATEGORY,
    fontWeight: '700',
    justifyContent: 'center',
  },
  cardSubtitle: {color: 'black', fontSize: CARD_SUBTITLE},
  filterBar: {
    width: '100%',
    height: 100,
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
    color: secondaryColor,
    fontSize: 25,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    fontSize: ICON_SIZE,
    color: 'white',
  },
});

export default StoreHome;
