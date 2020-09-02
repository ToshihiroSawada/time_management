/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';

//DropDownListを使用するためにDropDownPickerとIconをインポート
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

class ResultEditScreen extends React.Component {
  render() {
    const result = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.startTimeText}>開始時刻： 【{result.startTimeHour}:{result.startTimeMinutes}】</Text>
        </View>
        <View>
          <Text style={styles.endTimeText}>終了時刻： 【{result.endTimeHour}:{result.startTimeMinutes}】</Text>
        </View>
        <DropDownPicker
          containerStyle={styles.dropDownPicker}
          zIndex={200}
          placeholder="色を選択"
          items={[
            { label: 'white', value: 'white', icon: () => <Icon name="box" size={18} color="white" /> },
            { label: 'red', value: 'red', icon: () => <Icon name="box" size={18} color="red" /> },
            { label: 'blue', value: 'blue', icon: () => <Icon name="box" size={18} color="blue" /> },
            { label: 'green', value: 'green', icon: () => <Icon name="box" size={18} color="green" /> },
          ]}
        />
        <Text style={styles.title}>タイトル</Text>
        <TextInput style={styles.titleText} placeholder="タイトル入力">{result.title}</TextInput>
        <Text style={styles.title}>内容</Text>
        <KeyboardAvoidingView behavior="padding">
          <TextInput style={styles.textBox} multiline placeholder="予定詳細">{result.value}</TextInput>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.okButton} this>
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
  },
  startTimeText: {
    fontSize: 30,
    marginBottom: 5,
    backgroundColor: '#f0fff0',
  },
  endTimeText: {
    fontSize: 30,
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 10,
    backgroundColor: '#f0fff0',
  },
  dropDownPicker: {
    width: 300,
    height: 40,
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    borderTopWidth: 1,
  },
  titleText: {
    width: 300,
    height: 40,
    fontSize: 30,
    backgroundColor: '#f0fff0',
  },
  textBox: {
    marginTop: 10,
    fontSize: 20,
    width: 300,
    height: 200,
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f0fff0',
  },
  okButton: {
    backgroundColor: '#f0f',
    width: 75,
    height: 50,
    marginTop: 10,
    marginBottom: 40,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  okButtonText: {
    fontSize: 25,
    color: '#fff',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 100,
  },
});

export default ResultEditScreen;
