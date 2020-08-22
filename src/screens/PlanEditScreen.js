/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

import DateTimePicker from '@react-native-community/datetimepicker';

class PlanEditScreen extends React.Component {
  state = {
    show: false,
    sTime: this.props.navigation.state.params.startTime,
    eTime: this.props.navigation.state.params.endTime,
    date: new Date(),
    mode: 'time',
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
    this.setState({ sTime: digitDetection });

    //dateへ日本時間に変換してセットする
    this.setState({ date: currentDate });
  };

  //開始時刻と終了時刻をタップした際にTimePickerを表示する
  handleSubmit() {
    this.setState({ show: true });
  }

  render() {
    const plan = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { this.handleSubmit(); }}>
          <Text style={styles.startTimeText}>開始時刻： 【{this.state.sTime}:00】</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.handleSubmit(); }}>
          <Text style={styles.endTimeText}>終了時刻： 【{this.state.eTime}:00】</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>タイトル</Text>
        <TextInput style={styles.title} placeholder="タイトル入力">{plan.title}</TextInput>
        <Text style={styles.titleText}>内容</Text>
        <TextInput style={styles.textBox} multiline placeholder="予定詳細">{plan.value}</TextInput>
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
      </View>
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
  },
  endTimeText: {
    fontSize: 30,
  },
  titleText: {
    marginTop: 20,
    fontSize: 30,
    borderTopWidth: 1,
  },
  title: {
    width: 300,
    height: 40,
    fontSize: 30,
    backgroundColor: '#aaa',
  },
  textBox: {
    marginTop: 10,
    fontSize: 20,
    width: 300,
    height: 200,
    borderBottomColor: '#aaa',
    backgroundColor: '#eee',
  },
  okButton: {
    backgroundColor: '#f0f',
    width: 75,
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  okButtonText: {
    fontSize: 25,
    color: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default PlanEditScreen;
