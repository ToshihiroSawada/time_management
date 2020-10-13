/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View } from 'react-native';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';

//DateTimePickerをインポート
import DateTimePicker from '@react-native-community/datetimepicker';

//DropDownListを使用するためにDropDownPickerとIconをインポート
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

import firebase from 'firebase';

class PlanEditScreen extends React.Component {
  state = {
    startTime: this.props.navigation.state.params[0].startTime,
    startTimeMinutes: '00',
    endTime: this.props.navigation.state.params[0].endTime,
    endTimeMinutes: '00',
    title: this.props.navigation.state.params[0].title,
    value: this.props.navigation.state.params[0].value,
    color: this.props.navigation.state.params[0].color,
    show: false,
    date: new Date(),
    mode: 'time',
    startOrEnd: 'start',
    errorMessage: [],
  }

  componentDidMount() {
    //startTime・endTimeどちらかでもundifinedだった場合見栄を考慮し0にする
    if (this.state.startTime === undefined || this.state.endTime === undefined) {
      this.setState({ startTime: 0 });
      this.setState({ endTime: 0 });
    }

    //新しく作成する場合の処理(idで判別し、startTime・endTimeにTimeZoneでタップした時間を入れる)
    const { params } = this.props.navigation.state;
    try {
      if (params[1] === 'newPlan') {
        this.setState({ startTime: params[0] });
        this.setState({ endTime: params[0] });
      }
    }
    catch (err) {
      console.log('ERROR:', err);
    }
  }

  onChange = (_event, selectedDate) => {
    this.setState({ show: false });
    const currentDate = selectedDate;

    //時間の"時間"上2桁だけを抽出。
    let hour = currentDate.toLocaleString({ timeZone: 'Asia/Tokyo' }).substring(11, 13);
    //時間の"分"だけを抽出。
    const minutes = currentDate.toLocaleString({ timeZone: 'Asia/Tokyo' }).substring(14, 16);

    //時間が1桁(00〜09)だった場合、見た目を考慮して1桁表示とする
    if (hour < 10) {
      hour = hour.substring(1);
    }

    if (this.state.startOrEnd === 'start') {
      this.setState({ startTime: hour });
      this.setState({ startTimeMinutes: minutes });
    }
    else {
      this.setState({ endTime: hour });
      this.setState({ endTimeMinutes: minutes });
    }

    //dateへ日本時間に変換してセットする
    this.setState({ date: currentDate });
  };

  //開始時刻と終了時刻をタップした際にTimePickerを表示する
  handleSubmit(startOrEnd) {
    //startTimeかendTimeかどちらを変更するのか判別する為に、stateのstartOrEndを変更する
    this.setState({ startOrEnd });
    this.setState({ show: true });
  }

  async updatePlan() {
    //データ格納に使用する日付データを取得
    const date = this.props.navigation.state.params[2];
    const { year } = date;
    const { month } = date;
    const { day } = date;

    const { state } = this;
    //DB格納用にデータを編集
    const addDBStartTime = `${state.startTime}:${state.startTimeMinutes}`;
    const addDBEndTime = `${state.endTime}:${state.endTimeMinutes}`;
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    if (state.value === undefined) {
      this.setState({ value: '' });
    }
    if (state.color === undefined) {
      this.setState({ color: 'white' });
    }

    if (state.title === undefined) {
      const errorMessage = [];
      errorMessage.push(
        <View>
          <Text>タイトルを入力してください</Text>
        </View>
      );
      this.setState({ errorMessage });
    }
    db.collection(`users/${currentUser.uid}/plans/${year}/${month}/${day}/plans/`).add({
      startTime: addDBStartTime,
      endTime: addDBEndTime,
      title: state.title,
      value: state.value,
      color: state.color,
    })
      .then(() => {
        this.props.navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { state } = this;
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => { this.handleSubmit('start'); }}>
          <Text style={styles.startTimeText}>開始時刻： 【{state.startTime}:{state.startTimeMinutes}】</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.handleSubmit('end'); }}>
          <Text style={styles.endTimeText}>終了時刻： 【{state.endTime}:{state.endTimeMinutes}】</Text>
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
          defaultValue={this.state.color}
          onChangeItem={(item) => { this.setState({ color: item.value }); }}
        />
        { this.state.errorMessage }
        <Text style={styles.title}>タイトル</Text>
        <TextInput
          style={styles.titleText}
          placeholder="タイトル入力"
          value={state.title}
          onChangeText={(text) => { this.setState({ title: text }); }}
        />
        <Text style={styles.title}>内容</Text>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.textBox}
            multiline
            placeholder="予定詳細"
            value={state.value}
            onChangeText={(text) => { this.setState({ value: text }); }}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.okButton} onPress={this.updatePlan.bind(this)}>
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
