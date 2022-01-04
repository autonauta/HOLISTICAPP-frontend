import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Dimensions,
  Pressable,
  PixelRatio,
} from 'react-native';
import {
  API_URL,
  mainColor,
  secondaryColor,
  textColor1,
  textColor2,
} from '../../config';
import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown';

const dropdownCategories = [
  'biomagnetismo',
  'aromaterapia',
  'acupunctura',
  'masajes',
  'tarot',
  'musicoterapia',
  'nutricion',
  'psicologia',
  'transgeneracional',
  'veterinaria',
];
const checkBoxTheme = {
  true: secondaryColor,
  false: 'grey',
};
function Step2({
  categories,
  setCategories,
  step1Visible,
  step2Visible,
  setStep1Visible,
  setStep2Visible,
  step3Visible,
  setStep3Visible,
  description,
  setDescription,
}) {
  const [cat1Active, setCat1Active] = useState(false);
  const [cat2Active, setCat2Active] = useState(false);
  const [cat3Active, setCat3Active] = useState(false);
  const [category1, setCategory1] = useState(null);
  const [category2, setCategory2] = useState(null);
  const [category3, setCategory3] = useState(null);

  const charactersLeft = () => {
    return 750 - description.length;
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={step2Visible}
        onRequestClose={() => {
          setStep2Visible(!step2Visible);
        }}>
        <View style={styles.centeredView}>
          <View
            style={{
              width: Dimensions.get('window').width,
              paddingTop: 20,
              borderTopEndRadius: 30,
              borderTopStartRadius: 30,
              alignItems: 'center',
              backgroundColor: mainColor,
            }}>
            <Text style={styles.title}>Categoría</Text>
            <View style={styles.formView}>
              <Text
                style={{
                  width: '70%',
                  textAlign: 'center',
                  color: secondaryColor,
                  fontSize: QUESTION_SIZE,
                  marginBottom: 25,
                }}>{`Puedes agregar hasta 3`}</Text>
            </View>

            <View style={styles.inputView}>
              <CheckBox
                disabled={cat3Active || cat2Active}
                tintColors={checkBoxTheme}
                value={cat1Active}
                onValueChange={value => {
                  setCat1Active(value);
                }}
                style={styles.checkbox}
              />

              <SelectDropdown
                disabled={!cat1Active}
                buttonStyle={{
                  width: '80%',
                  height: 40,
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: cat1Active ? secondaryColor : 'grey',
                  borderRadius: 8,
                }}
                buttonTextStyle={{
                  color: cat1Active ? secondaryColor : 'grey',
                }}
                dropdownStyle={{
                  backgroundColor: secondaryColor,
                  borderWidth: 1,
                  borderColor: 'transparent',
                  borderRadius: 8,
                }}
                rowTextStyle={{color: 'white', fontWeight: '700'}}
                defaultButtonText={
                  category1 != null ? category1 : 'Selecciona una categoría'
                }
                data={dropdownCategories}
                onSelect={(selectedItem, index) => {
                  setCategory1(selectedItem);
                }}
                buttonTextAfterSelection={selectedItem => {
                  return selectedItem;
                }}
                rowTextForSelection={item => {
                  return item;
                }}
              />
            </View>

            {cat1Active ? (
              <View style={styles.inputView}>
                <CheckBox
                  disabled={cat3Active}
                  tintColors={checkBoxTheme}
                  value={cat2Active}
                  onValueChange={value => {
                    setCat2Active(value);
                  }}
                  style={styles.checkbox}
                />

                <SelectDropdown
                  disabled={!cat2Active}
                  buttonStyle={{
                    width: '80%',
                    height: 40,
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: cat2Active ? secondaryColor : 'transparent',
                    borderRadius: 8,
                  }}
                  buttonTextStyle={{
                    color: cat2Active ? secondaryColor : 'transparent',
                  }}
                  dropdownStyle={{
                    backgroundColor: secondaryColor,
                    borderWidth: 1,
                    borderColor: 'transparent',
                    borderRadius: 8,
                  }}
                  rowTextStyle={{color: 'white', fontWeight: '700'}}
                  defaultButtonText={'Selecciona una categoría'}
                  data={dropdownCategories}
                  onSelect={(selectedItem, index) => {
                    setCategory2(selectedItem);
                  }}
                  buttonTextAfterSelection={selectedItem => {
                    return selectedItem;
                  }}
                  rowTextForSelection={item => {
                    return item;
                  }}
                />
              </View>
            ) : (
              <View></View>
            )}
            {cat1Active && cat2Active ? (
              <View style={styles.inputView}>
                <CheckBox
                  tintColors={checkBoxTheme}
                  value={cat3Active}
                  onValueChange={value => {
                    setCat3Active(value);
                  }}
                  style={styles.checkbox}
                />

                <SelectDropdown
                  disabled={!cat3Active}
                  buttonStyle={{
                    width: '80%',
                    height: 40,
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: cat3Active ? secondaryColor : 'transparent',
                    borderRadius: 8,
                  }}
                  buttonTextStyle={{
                    color: cat3Active ? secondaryColor : 'transparent',
                  }}
                  dropdownStyle={{
                    backgroundColor: secondaryColor,
                    borderWidth: 1,
                    borderColor: 'transparent',
                    borderRadius: 8,
                  }}
                  rowTextStyle={{color: 'white', fontWeight: '700'}}
                  defaultButtonText={'Selecciona una categoría'}
                  data={dropdownCategories}
                  onSelect={(selectedItem, index) => {
                    setCategory3(selectedItem);
                  }}
                  buttonTextAfterSelection={selectedItem => {
                    return selectedItem;
                  }}
                  rowTextForSelection={item => {
                    return item;
                  }}
                />
              </View>
            ) : (
              <View></View>
            )}
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.subtitles}>
                Agrega una breve descripción de lo que haces y conoces!
              </Text>
            </View>
            <TextInput
              style={{
                width: '94%',
                minHeight: 200,
                textAlignVertical: 'top',
                borderWidth: 1,
                borderColor: secondaryColor,
                color: secondaryColor,
                fontSize: 18,
                borderRadius: 5,
                justifyContent: 'flex-start',
              }}
              onChangeText={text => setDescription(text)}
              value={description}
              editable={true}
              multiline
              maxLength={750}
            />
            <Text style={styles.charactersLeft}>
              {charactersLeft()} caracteres restantes
            </Text>
            <View style={styles.buttons}>
              <Pressable
                style={[styles.button, styles.buttonAplicar]}
                onPress={() => {
                  setStep1Visible(!step1Visible);
                  setStep2Visible(!step2Visible);
                }}>
                <Text style={styles.textStyle}>ATRAS</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  var categoryArray = [category1, category2, category3];
                  var checkboxArray = [cat1Active, cat2Active, cat3Active];
                  var array = [];
                  for (var cat = 0; cat <= 2; cat++) {
                    if (checkboxArray[cat] === true) {
                      array = [...array, categoryArray[cat]];
                    }
                  }
                  setCategories(array);
                  setStep3Visible(!step3Visible);
                  setStep2Visible(!step2Visible);
                }}>
                <Text style={styles.textStyle}>SIGUIENTE</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

var QUESTION_SIZE = 25;
var TITLE_FONT_SIZE = 28;
var FORM_MARGIN_BOTTOM = 20;
var INPUT_WIDTH = '96%';
var INPUT_PADDING = 10;
var LABEL_FONT_SIZE = 24;
var TEXTINPUT_FONT_SIZE = 20;
var INPUT_MARGIN_BOTTOM = 10;
if (PixelRatio.get() <= 2) {
  FORM_MARGIN_BOTTOM = 15;
  TITLE_FONT_SIZE = 23;
  QUESTION_SIZE = 18;
  INPUT_WIDTH = '90%';
  INPUT_PADDING = 6;
  LABEL_FONT_SIZE = 17;
  INPUT_MARGIN_BOTTOM = 10;
  TEXTINPUT_FONT_SIZE = 18;
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  formView: {
    width: '100%',
    marginBottom: FORM_MARGIN_BOTTOM,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  title: {
    color: secondaryColor,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  subtitles: {
    fontSize: 14,
    paddingLeft: 15,
    color: secondaryColor,
  },
  inputView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  inputViewLast: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 80,
  },
  checkbox: {
    transform: [{scaleX: 1.3}, {scaleY: 1.3}],
    height: '100%',
  },
  buttons: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 40,
    marginBottom: 48,
  },
  buttonCancel: {
    borderRadius: 10,
    backgroundColor: '#1fc362',
    padding: 10,
    elevation: 3,
    width: '30%',
  },
  buttonAplicar: {
    borderRadius: 10,
    backgroundColor: 'red',
    padding: 10,
    elevation: 3,
    width: '30%',
  },
  textStyle: {
    color: textColor1,
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'center',
  },
  charactersLeft: {
    paddingLeft: 15,
    alignSelf: 'flex-start',
    color: secondaryColor,
  },
});

export default Step2;
