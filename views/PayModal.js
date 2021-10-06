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
} from 'react-native';
import {API_URL, mainColor, secondaryColor, textColor2} from '../config';
import openpay from 'react-native-openpay';
import {useState} from 'react';

openpay.setup('mld1bopn3wpit9sejucx', 'pk_425ef633b7ea415da285c4909781424c');

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
}) {
  const [deviceSessionId, setDeviceSessionId] = useState('');
  const [cardToken, setCardToken] = useState('');
  const [cardNumber, setCardNumber] = useState('4111111111111111');
  const [cardHolder, setCardHolder] = useState('CESAR ALANIS NUNEZ');
  const [monthExp, setMonthExp] = useState('02');
  const [yearExp, setYearExp] = useState('25');
  const [CVV, setCVV] = useState('432');
  const [loading, setLoading] = useState(false);

  const submitData = () => {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('xAuthToken', token);
    fetch(`${API_URL}/payment/charge`, {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify({
        cardToken,
        method: 'card',
        amount: 500,
        currency: 'MXN',
        description: `Pago de sesión con ${name}`,
        order_id: 'oid-000666',
        sessiondId: deviceSessionId,
        customer: {
          name: cardHolder.split(' ')[0],
          last_name: cardHolder.split(' ')[1],
          email: userLogged.email,
        },
        cardHolder: cardHolder,
        therapist_id: _id,
        day: day.split('-')[2],
        hour,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(`Data received on fetch: ${JSON.stringify(data)}`);
        if (data.authorization) {
          setLoading(false);
          Alert.alert(
            `Perfecto ${userLogged.name}!`,
            `Pago relizado con exito!`,
            [
              {
                text: 'OK',
                onPress: () => {
                  setPayModalVisible(false);
                  navigation.navigate('Home');
                  console.log('OK pressed');
                },
              },
            ],
          );
        }
      })
      .catch(err => {
        setLoading(false);
        console.error(`Error del fetch al server: ${JSON.stringify(err)}`);
        Alert.alert(
          `Upss ${userLogged.name}!`,
          `Error al comunicarse con el servidor!`,
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
      });
  };
  const generatePayRequest = () => {
    setLoading(true);
    openpay.getDeviceSessionId().then(sessionId => {
      setDeviceSessionId(sessionId);
      console.log(`Device session Id: ${sessionId}`);
      generateCardToken();
    });
  };
  const generateCardToken = () => {
    try {
      openpay
        .createCardToken({
          holder_name: cardHolder,
          card_number: cardNumber,
          expiration_month: monthExp,
          expiration_year: yearExp,
          cvv2: CVV,
        })
        .then(cardToken => {
          if (cardToken) {
            setCardToken(cardToken);
            console.log(`Card token: ${cardToken}`);
            submitData();
          }
        });
    } catch (error) {
      console.error(`Error al crear token de tarjeta: ${error}`);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={payModalVisible}
        onRequestClose={() => {
          setPayModalVisible(!payModalVisible);
        }}>
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
              backgroundColor: mainColor,
            }}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                color: secondaryColor,
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
                <ActivityIndicator size="large" color={secondaryColor} />
              </View>
            ) : (
              <View style={styles.buttons}>
                <Pressable
                  style={[styles.button, styles.buttonAplicar]}
                  onPress={() => {
                    generatePayRequest();
                  }}>
                  <Text style={styles.textStyle}>ACEPTAR</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonCancel]}
                  onPress={() => {
                    setPayModalVisible(!payModalVisible);
                  }}>
                  <Text style={styles.textStyle}>CANCELAR</Text>
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
    color: textColor2,
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

export default PayModal;
