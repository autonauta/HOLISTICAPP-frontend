import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  Dimensions,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  API_URL,
  mainColor,
  secondaryColor,
  textColor2,
  tertiaryColor,
  CLOUDINARY_URL,
  UPLOAD_PRESET,
  CLOUD_NAME,
} from '../../config';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

function ImageChange({
  navigation,
  imageModalVisible,
  setImageModalVisible,
  token,
  userLogged,
  setUserLogged,
}) {
  const _storeData = async (keyName, value) => {
    console.log('entered to sotre data');
    try {
      await AsyncStorage.setItem(keyName, value);
    } catch (error) {
      console.log(error);
    }
  };
  const logOut = () => {
    const keys = ['xauthtoken', 'user'];
    AsyncStorage.multiRemove(keys).then(res => {
      console.log(
        'Items removed from storage: User Logged out for password change',
      );
      navigation.navigate('Login');
    });
  };

  const submitData = imageUrl => {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('xAuthToken', token);
    console.log(`From submit data object to send to API: ${imageUrl}`);
    fetch(`${API_URL}/profile/edit`, {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify({
        image: {uri: imageUrl},
      }),
    })
      .then(data => {
        console.log(`Response from API change image: ${JSON.stringify(data)}`);
        user = {...userLogged, image: {uri: imageUrl}};
        setUserLogged(user);
        _storeData('user', JSON.stringify(user));
        Alert.alert(
          `Perfecto ${userLogged.name}!`,
          `Hemos actualizado tu imagen.`,
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK pressed');
              },
            },
          ],
        );
        console.log(`Converted on image update: ${JSON.stringify(userLogged)}`);
        setImageModalVisible(!imageModalVisible);
      })
      .catch(err => {
        console.log(err);
        Alert.alert(
          `Lo sentimos ${userLogged.name}!`,
          `Hubo un error al actualizar tu imagen. Por favor intenta mas tarde`,
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK PRESSED');
              },
            },
          ],
        );
      });
  };
  const uploadImage = img => {
    const data = new FormData();
    data.append('file', img);
    data.append('upload_preset', UPLOAD_PRESET);
    data.append('cloud_name', CLOUD_NAME);

    try {
      fetch(CLOUDINARY_URL, {
        method: 'post',
        body: data,
      })
        .then(res => res.json())
        .then(receivedImage => {
          console.log(receivedImage.url);
          submitData(receivedImage.url);
        });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  const pickPhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 600,
      height: 600,
      cropping: true,
    }).then(res => {
      if (res) {
        let newFile = {
          uri: res.path,
          type: `image/${res.path.split('.')[2]}`,
          name: `${userLogged.email}_image.${res.path.split('.')[2]}`,
        };
        uploadImage(newFile);
      } else console.log('Error check image cancelled');
    });
  };
  const pickPhotoFromCamera = async () => {
    var granted = '';
    if (Platform.OS === 'ios') {
      granted = 'ios';
      console.log(`From pick camera: ${Platform.OS}`);
    } else {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'HolisticApp Camera Permission',
          message:
            'Requerimos de tu permiso para acceder a tu camara ' +
            'para actualizar tu perfil correctamente.',
          buttonNegative: 'DENEGAR',
          buttonPositive: 'PERMITIR',
        },
      );
    }
    if (granted === PermissionsAndroid.RESULTS.GRANTED || granted === 'ios') {
      ImagePicker.openCamera({
        width: 600,
        height: 600,
        cropping: true,
      }).then(res => {
        if (res) {
          let newFile = {
            uri: res.path,
            type: `image/${res.path.split('.')[2]}`,
            name: `${userLogged.email}_image.${res.path.split('.')[2]}`,
          };
          uploadImage(newFile);
        } else console.log('Error check image cancelled');
      });
    } else {
      console.log('Camera permission denied');
    }
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => {
          setImageModalVisible(!imageModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Cambio de Imagen</Text>
            <View style={styles.formView}>
              <Button
                labelStyle={styles.buttonIcon}
                style={styles.buttonAplicar}
                icon="folder-image"
                color="black"
                onPress={pickPhotoFromGallery}></Button>
              <Button
                labelStyle={styles.buttonIcon}
                style={styles.buttonAplicar}
                icon="camera-iris"
                color="black"
                onPress={pickPhotoFromCamera}></Button>
            </View>
            <View style={styles.buttons}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setImageModalVisible(!imageModalVisible);
                }}>
                <Text style={styles.textStyle}>CANCELAR</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const theme = {
  colors: {
    primary: mainColor,
  },
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    elevation: 1,
  },
  modalView: {
    width: Dimensions.get('window').width,
    paddingTop: 10,
    backgroundColor: secondaryColor,
    borderTopRightRadius: 50,
    alignItems: 'center',
    elevation: 5,
  },
  buttons: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 48,
  },
  buttonAplicar: {
    borderRadius: 8,
    backgroundColor: tertiaryColor,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  buttonIcon: {
    fontSize: 40,
    color: 'white',
  },
  textStyle: {
    fontSize: 15,
    color: '#f34950',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    width: '100%',
    textAlign: 'center',
    color: mainColor,
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 25,
  },
  formView: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textInput: {
    width: '100%',
    marginBottom: 4,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
    padding: 10,
    color: 'white',
    fontSize: 20,
  },
  label: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'flex-start',
  },
});

export default ImageChange;
