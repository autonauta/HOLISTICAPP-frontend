import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  Dimensions,
  PixelRatio,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import {API_URL, mainColor, secondaryColor} from '../config';

function Filters({modalVisible, setModalVisible, data, setData, setLoading}) {
  const [biomagnetismo, setBiomagnetismo] = useState(false);
  const [aromaterapia, setAromaterapia] = useState(false);
  const [acupunctura, setAcupunctura] = useState(false);
  const [masajes, setMasajes] = useState(false);
  const [tarot, setTarot] = useState(false);
  const [musicoterapia, setMusicoterapia] = useState(false);
  const [nutricion, setNutricion] = useState(false);
  const [psicologia, setPsicologia] = useState(false);
  const [transgeneracional, setTransgeneracional] = useState(false);
  const [veterinaria, setVeterinaria] = useState(false);

  const filters = {
    biomagnetismo,
    aromaterapia,
    acupunctura,
    masajes,
    tarot,
    musicoterapia,
    nutricion,
    psicologia,
    transgeneracional,
    veterinaria,
  };

  const submitData = () => {
    setLoading(true);
    try {
      fetch(`${API_URL}/users/filters`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      })
        .then(res => res.json())
        .then(results => {
          setData(results);
          console.log(data);
          setModalVisible(!modalVisible);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  //------------------------------------------MAIN RETURN---------------------------------------------
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Filtros</Text>
            <View style={styles.formView}>
              <View style={styles.checkboxView}>
                <CheckBox
                  tintColors={{true: 'purple', false: 'white'}}
                  value={biomagnetismo}
                  onValueChange={value => setBiomagnetismo(value)}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>biomagnetismo</Text>
              </View>
              <View style={styles.checkboxView}>
                <CheckBox
                  tintColors={{true: 'purple', false: 'white'}}
                  value={aromaterapia}
                  onValueChange={value => setAromaterapia(value)}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>aromaterapia</Text>
              </View>
              <View style={styles.checkboxView}>
                <CheckBox
                  tintColors={{true: 'purple', false: 'white'}}
                  value={acupunctura}
                  onValueChange={value => setAcupunctura(value)}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>acupunctura</Text>
              </View>
              <View style={styles.checkboxView}>
                <CheckBox
                  tintColors={{true: 'purple', false: 'white'}}
                  value={masajes}
                  onValueChange={value => setMasajes(value)}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>masajes</Text>
              </View>
              <View style={styles.checkboxView}>
                <CheckBox
                  tintColors={{true: 'purple', false: 'white'}}
                  value={tarot}
                  onValueChange={value => setTarot(value)}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>tarot</Text>
              </View>
              <View style={styles.checkboxView}>
                <CheckBox
                  tintColors={{true: 'purple', false: 'white'}}
                  value={musicoterapia}
                  onValueChange={value => setMusicoterapia(value)}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>musicoterapia</Text>
              </View>
              <View style={styles.checkboxView}>
                <CheckBox
                  tintColors={{true: 'purple', false: 'white'}}
                  value={nutricion}
                  onValueChange={value => setNutricion(value)}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>nutricion</Text>
              </View>
              <View style={styles.checkboxView}>
                <CheckBox
                  tintColors={{true: 'purple', false: 'white'}}
                  value={psicologia}
                  onValueChange={value => setPsicologia(value)}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>psicologia</Text>
              </View>
              <View style={styles.checkboxView}>
                <CheckBox
                  tintColors={{true: 'purple', false: 'white'}}
                  value={transgeneracional}
                  onValueChange={value => setTransgeneracional(value)}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>transgeneracional</Text>
              </View>
              <View style={styles.checkboxView}>
                <CheckBox
                  tintColors={{true: 'purple', false: 'white'}}
                  value={veterinaria}
                  onValueChange={value => setVeterinaria(value)}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>veterinaria</Text>
              </View>
            </View>
            <View style={styles.buttons}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.buttonText}>CANCELAR</Text>
              </Pressable>
              <Pressable
                icon="camera"
                style={[styles.button, styles.buttonAplicar]}
                onPress={() => submitData()}>
                <Text icon="camera" style={styles.buttonText}>
                  APLICAR
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
var TITLE_FONT_SIZE = 30;
var LABEL_SIZE = 20;
if (PixelRatio.get() <= 2) {
  TITLE_FONT_SIZE = 25;
  LABEL_SIZE = 18;
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
    shadowColor: secondaryColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: TITLE_FONT_SIZE,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
  },
  formView: {
    width: '100%',
    padding: 5,
    marginBottom: 20,
  },
  checkboxView: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  checkbox: {
    transform: [{scaleX: 1}, {scaleY: 1}],
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: LABEL_SIZE,
    color: 'white',
  },
  buttons: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
    backgroundColor: mainColor,
    padding: 10,
    elevation: 2,
    width: '30%',
  },
});

export default Filters;
