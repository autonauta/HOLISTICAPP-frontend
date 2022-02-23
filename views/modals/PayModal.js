import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Modal,
  Pressable,
  Alert,
  TextInput,
  ActivityIndicator,
  PixelRatio,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {API_URL, mainColor, secondaryColor, textColor2} from '../../config';
import {useState} from 'react';
import {createTokenWithCard, Openpay} from 'openpay-react-native';
const merchantId = 'mld1bopn3wpit9sejucx';
const publicKey = 'pk_425ef633b7ea415da285c4909781424c';
/* if(Platform.OS == "android") openpay.setup('mld1bopn3wpit9sejucx', 'pk_425ef633b7ea415da285c4909781424c'); */

function PayModal({
  payModalVisible,
  setPayModalVisible,
  token,
  userLogged,
  name,
  _id,
  day,
  hour,
  navigation,
  type,
  online,
}) {
  const [cardNumber, setCardNumber] = useState('4111111111111111');
  const [cardHolder, setCardHolder] = useState('CESAR ALANIS NUNEZ');
  const [monthExp, setMonthExp] = useState('02');
  const [yearExp, setYearExp] = useState('25');
  const [CVV, setCVV] = useState('432');
  //const [cardToken, setCardToken] = useState();
  const [deviceSId, setDeviceSId] = useState();
  const [loading, setLoading] = useState(false);
  var cardToken;
  const goToHome = CommonActions.reset({
    index: 1,
    routes: [
      {name: 'Home'},
      userLogged.isTherapist
        ? {name: 'TherapistDashboard', params: {userLogged, token}}
        : {name: 'Dashboard', params: {userLogged, token}},
    ],
    key: null,
  });
  const generateToken = async () => {
    setLoading(true);
    try {
      let token = await createTokenWithCard({
        holder_name: cardHolder,
        cvv2: CVV,
        expiration_month: monthExp,
        card_number: cardNumber,
        expiration_year: yearExp,
        isProductionMode: false,
        merchantId: merchantId,
        publicKey: publicKey,
      });

      if (token) {
        console.log('token generado:', token.id);
        cardToken = token;
        //setCardToken(token);
        submitData();
      }
    } catch (e) {
      console.error(e);
    }
  };
  const successToken = response => {
    console.log(response);
    Alert.alert('Token generado', response.id, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };
  const failToken = response => {
    console.log('failToken');
    console.log(response);
    Alert.alert('Datos inválidos', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const deviceSession = response => {
    console.log('deviceSession');
    console.log(response);
    setDeviceSId(response);
  };

  const submitData = () => {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('xAuthToken', token);
    const toSendData = {
      sessiondId: deviceSId,
      cardToken: cardToken,
      method: 'card',
      amount: 500,
      currency: 'MXN',
      description: `Pago de sesión con ${name}`,
      customer: {
        name: cardHolder.split(' ')[0],
        last_name: cardHolder.split(' ')[1],
        email: userLogged.email,
      },
      cardHolder: cardHolder,
      therapist_id: _id,
      day,
      hour,
      type,
      online,
    };
    console.log('What is going to be fetched: ', toSendData);
    fetch(`${API_URL}/payment/charge`, {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify(toSendData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(`Data received on fetch: ${data}`);
        if (data._id) {
          setLoading(false);
          Alert.alert(
            `Perfecto ${userLogged.name}!`,
            `Pago relizado con exito!`,
            [
              {
                text: 'OK',
                onPress: () => {
                  setPayModalVisible(false);
                  navigation.dispatch(goToHome);
                  console.log('OK pressed');
                },
              },
            ],
          );
        } else {
          setLoading(false);
          Alert.alert(
            `Upss ${userLogged.name}!`,
            `Respuesta mala del servidor`,
            [
              {
                text: 'OK',
                onPress: () => {
                  setPayModalVisible(false);
                  console.log('OK pressed');
                },
              },
            ],
          );
        }
      })
      .catch(e => {
        setLoading(false);
        console.error(`Error del fetch al server: ${e}`);
      });
  };
  /* const generatePayRequest = () => {
    setLoading(true);
    if(Platform.OS == "android") {
    openpay.getDeviceSessionId().then(sessionId => {
      deviceSId = sessionId;
      console.log(`Device session Id: ${deviceSId}`);
    });
    
    openpay.createCardToken({
        holder_name: cardHolder,
        card_number: cardNumber,
        expiration_month: monthExp,
        expiration_year: yearExp,
        cvv2: CVV,
      })
      .then(receivedToken => {
        console.log(receivedToken);
        cardToken = receivedToken;
        console.log(`Card token: ${cardToken}`);
        submitData();
      });
    }else console.log("Running on IOS");
  }; */

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={payModalVisible}
        onRequestClose={() => {
          setPayModalVisible(!payModalVisible);
        }}>
        <Openpay
          isProductionMode={false}
          merchantId={merchantId}
          publicKey={publicKey}
          //address={address} //optional
          successToken={successToken}
          failToken={failToken}
          deviceSession={deviceSession}
          buttonText="Pagar"
          custom={true}
        />
        <View style={styles.centeredView}>
          <View
            style={{
              width: Dimensions.get('window').width,
              paddingTop: 20,
              paddingHorizontal: 10,
              borderTopRightRadius: 80,
              alignItems: 'center',
              shadowColor: secondaryColor,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              backgroundColor: secondaryColor,
            }}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                color: mainColor,
                fontSize: 30,
                fontWeight: '700',
                marginBottom: 25,
              }}>
              PAGA TU SESIÓN
            </Text>
            <View style={styles.formView}>
              <View style={styles.textInputView}>
                <Text style={styles.label}>Tarjeta de crédito o débito</Text>
                <TextInput
                  style={styles.textInput}
                  value={cardNumber}
                  textContentType="creditCardNumber"
                  keyboardType="number-pad"
                  onChangeText={text => setCardNumber(text)}></TextInput>
              </View>
            </View>
            <View style={styles.formView}>
              <View style={styles.textInputView}>
                <Text style={styles.label}>Nombre del titular</Text>
                <TextInput
                  style={styles.textInput}
                  value={cardHolder}
                  textContentType="name"
                  autoCapitalize="characters"
                  onChangeText={text => setCardHolder(text)}></TextInput>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={styles.formView2}>
                <View style={styles.textInputView}>
                  <Text style={styles.label}>Mes de exp.</Text>
                  <TextInput
                    style={styles.textInput}
                    value={monthExp}
                    textContentType="creditCardNumber"
                    keyboardType="number-pad"
                    onChangeText={text => setMonthExp(text)}></TextInput>
                </View>
              </View>
              <View style={styles.formView2}>
                <View style={styles.textInputView}>
                  <Text style={styles.label}>Año de exp.</Text>
                  <TextInput
                    style={styles.textInput}
                    value={yearExp}
                    textContentType="creditCardNumber"
                    keyboardType="number-pad"
                    onChangeText={text => setYearExp(text)}></TextInput>
                </View>
              </View>
            </View>
            <View style={{alignSelf: 'flex-start', width: '40%'}}>
              <View style={styles.textInputView}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.textInput}
                  secureTextEntry
                  value={CVV}
                  textContentType="creditCardNumber"
                  onChangeText={text => setCVV(text)}></TextInput>
              </View>
            </View>
            {loading ? (
              <View style={styles.buttons}>
                <ActivityIndicator size="large" color={mainColor} />
              </View>
            ) : (
              <View style={styles.buttons}>
                <Pressable
                  style={[styles.button, styles.buttonCancel]}
                  onPress={() => {
                    setPayModalVisible(!payModalVisible);
                  }}>
                  <Text style={styles.textStyle}>CANCELAR</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonAplicar]}
                  onPress={() => {
                    generateToken();
                  }}>
                  <Text style={styles.textStyle}>ACEPTAR</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
var INPUT_PADDING = 10;
var TEXTINPUT_FONT_SIZE = 20;
var INPUT_WIDTH = '100%';
var INPUT_MARGIN_BOTTOM = 10;
var LABEL_FONT_SIZE = 20;

if (PixelRatio.get() <= 2) {
  INPUT_PADDING = 5;
  TEXTINPUT_FONT_SIZE = 15;
  LABEL_FONT_SIZE = 15;
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    elevation: 1,
  },
  buttons: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 48,
  },
  buttonCancel: {
    borderRadius: 10,
    backgroundColor: 'red',
    padding: 10,
    elevation: 2,
    width: '30%',
  },
  buttonAplicar: {
    borderRadius: 10,
    backgroundColor: '#1fc362',
    padding: 10,
    elevation: 2,
    width: '30%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
    padding: INPUT_PADDING,
    color: 'white',
    fontSize: TEXTINPUT_FONT_SIZE,
  },
  modalQuestion: {
    width: '50%',
    textAlign: 'center',
    color: 'orangered',
    fontSize: 24,
    marginBottom: 25,
  },
  formView: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  formView2: {
    width: '40%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textInputView: {
    width: INPUT_WIDTH,
    alignItems: 'center',
    textAlign: 'left',
    marginBottom: INPUT_MARGIN_BOTTOM,
  },
  label: {
    color: 'white',
    fontSize: LABEL_FONT_SIZE,
    alignSelf: 'flex-start',
  },
});

export default PayModal;
