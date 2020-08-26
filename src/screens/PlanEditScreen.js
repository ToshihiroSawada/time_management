/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';

import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

class PlanEditScreen extends React.Component {
  state = {
    show: false,
    sTime: this.props.navigation.state.params.startTime,
    eTime: this.props.navigation.state.params.endTime,
    date: new Date(),
    mode: 'time',
    startOrEnd: 'start',
  }

  onChange = (_event, selectedDate) => {
    this.setState({ show: false });
    const { date } = this.state;
    const currentDate = selectedDate || date;

    //時間の上2桁だけを抽出する。
    let digitDetection = currentDate.toLocaleString({ timeZone: 'Asia/Tokyo' }).substring(11, 13);
    //時間が1桁(00〜09)だった場合、見た目を考慮して1桁表示とする
    if (digitDetection < 10) {
      digitDetection = digitDetection.substring(1);
    }

    if (this.state.startOrEnd === 'start') {
      this.setState({ sTime: digitDetection });
    }
    else {
      this.setState({ eTime: digitDetection });
    }

    //dateへ日本時間に変換してセットする
    this.setState({ date: currentDate });
  };

  //開始時刻と終了時刻をタップした際にTimePickerを表示する
  handleSubmit(startOrEnd) {
    //sTimeかeTimeかどちらを変更するのか判別する為に、stateのstartOrEndを変更する
    this.setState({ startOrEnd });
    this.setState({ show: true });
  }

  render() {
    const plan = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => { this.handleSubmit('start'); }}>
          <Text style={styles.startTimeText}>開始時刻： 【{this.state.sTime}:00】</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.handleSubmit('end'); }}>
          <Text style={styles.endTimeText}>終了時刻： 【{this.state.eTime}:00】</Text>
        </TouchableOpacity>
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
        <TextInput style={styles.titleText} placeholder="タイトル入力">{plan.title}</TextInput>
        <Text style={styles.title}>内容</Text>
        <KeyboardAvoidingView behavior="padding">
          <TextInput style={styles.textBox} multiline placeholder="予定詳細">{plan.value}</TextInput>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.okButton}>
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>
        {this.state.show && (
          <DateTimePicker
            testID="showTimepicker"
            value={this.state.date}
            mode={this.state.mode}
            is24Hour
            display="default"
            onChange={this.onChange}
          />
        )}
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

export default PlanEditScreen;
