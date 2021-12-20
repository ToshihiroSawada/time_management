/* eslint-disable no-else-return */
/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View } from 'react-native';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase';

//DateTimePickerをインポート
import DateTimePicker from '@react-native-community/datetimepicker';

//DropDownListを使用するためにDropDownPickerとIconをインポート
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

import Loading from '../components/Loading';

class EditScreen extends React.Component {
  state = {
    id: '',
    key: '',
    startTime: new Date(),
    // startTimeText: '00:00',
    endTime: new Date(),
    // endTimeText: '00:00',
    title: '',
    value: '',
    // color: 'white',
    show: false,
    date: new Date(),
    mode: 'time',
    startOrEnd: 'start',
    titleErrorMessage: [],
    timeErrorMessage: [],
    isLoading: false,
  }

  componentDidMount() {
    //新しく作成する場合の処理(idで判別し、startTime・endTimeにTimeZoneでタップした時間を入れる)
    //また、startTimeMinutes・endTimeMinutesに00を入れる。
    try {
      //TODO: データ順序がStartStopとTimezoneで合わない。
      //const { state } = this.props.navigation.state.params;だとTimezoneから遷移すると正しく表示されず、
      //const { params } = this.props.navigation.state;だとStartStopから遷移すると正しく表示されない。
      //データ順序が合うように修正する。
      const { key } = this.props.navigation;
      const { params } = this.props.navigation.state;
      const startTime = new Date(params.startTime);
      const endTime = new Date(params.startTime);
      const startTimeText = `${startTime.getHours()}:${startTime.getMinutes()}`;
      // console.log(startTime, startTimeText);
      const endTimeText = `${endTime.getHours()}:${endTime.getMinutes()}`;
      const { id } = params;
      const { title } = params;
      const { value } = params;
      const { color } = params;
      this.setState({
        startTime,
        endTime,
        startTimeText,
        endTimeText,
        id,
        title,
        key,
        value,
        color,
      });
    }
    catch (err) {
      console.log('EditScreen\nERROR:', err);
    }
    console.log(this.state);
  }

  //開始時刻と終了時刻をタップした際にTimePickerを表示する
  handleSubmit(startOrEnd) {
    //startTimeかendTimeかどちらを変更するのか判別する為に、stateのstartOrEndを変更する
    this.setState({
      startOrEnd,
      show: true
    });
  }

  onChange = (_event, selectedDate) => {
    this.setState({ show: false });
    const currentDate = selectedDate;

    //時間の"時間"上2桁だけを抽出。
    let hour = currentDate.toLocaleString({ timeZone: 'Asia/Tokyo' }).substring(11, 13);
    //時間が1桁(00〜09)だった場合、見た目を考慮して1桁表示とする
    if (hour < 10) {
      hour = hour.substring(1);
    }

    if (this.state.startOrEnd === 'start') {
      this.setState({
        startTime: hour,
      });
    }
    else {
      this.setState({
        endTime: hour,
      });
    }

    //dateへ日本時間に変換してセットする
    this.setState({ date: currentDate });
  };

  //TimeZoneのViewを更新する
  returnPlan() {
    const update = this.props.navigation.state.params[3];
    update();
  }

  async updatePlan() {
    const returnNum = await this.checkState();
    if (returnNum === 1) { return; }
    const { id } = this.state;
    const { state } = this;
    //DB格納用にデータを編集
    this.addDataToFirebase(state.key, state.title, state.startTime, state.endTime, state.value, state.color, id);
  }

  async addDataToFirebase(key, title, startTime, endTime, value, color, id) {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    //keyが存在しない場合、CloudFirebaseにデータを登録する
    if (key === '') {
      await db.collection(`users/${currentUser.uid}/${id}/`).add({
        startTime,
        endTime,
        title,
        value,
        color,
      })
        .then(() => {
          this.props.navigation.goBack();
          this.setState({ isLoading: false });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //keyが存在する場合、CloudFirebaseのデータを更新する
    else {
      await db.collection(`users/${currentUser.uid}/${id}`).doc(this.state.key).update({
        startTime,
        endTime,
        title,
        value,
        color,
      })
        .then(() => {
          this.returnPlan();
          this.props.navigation.goBack();
          this.setState({ isLoading: false });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //state内のundifined等を解決するメソッド
  async checkState() {
    const { state } = this;
    const errorMessage = [];
    //ローディング画面を起動
    this.setState({ isLoading: true });
    //stateのvalueがundifinedだった場合空白文字をセットする
    if (state.value === undefined) {
      this.setState({ value: '' });
    }
    //stateのcolorがundifinedだった場合whiteをセットする
    if (state.color === undefined) {
      this.setState({ color: 'white' });
    }
    //DateTimePickerで、時間をさかのぼって登録した際にエラー用のViewをプッシュして終了する
    if (state.startTime > state.endTime) {
      errorMessage.push(
        <View>
          <Text style={styles.errorMessage}>開始時間と終了時間を確認してください</Text>
        </View>
      );
      this.setState({
        timeErrorMessage: errorMessage,
        isLoading: false,
      });
      return 1;
    }
    //エラーを解決した場合に表示されたままになってしまうため、空にする
    else {
      this.setState({ timeErrorMessage: [] });
    }

    //stateのtitileがundifined、または空文字("")だった場合エラー用のViewをプッシュして終了する
    if (state.title === undefined || state.title === '') {
      errorMessage.push(
        <View>
          <Text style={styles.errorMessage}>タイトルを入力してください</Text>
        </View>
      );
      this.setState({
        titleErrorMessage: errorMessage,
        isLoading: false,
      });
      return 1;
    }
    //エラーを解決した場合に表示されたままになってしまうため、空にする
    else {
      this.setState({ titleErrorMessage: [] });
    }
    return 0;
  }

  render() {
    const { state } = this;
    const viewStack = [];
    console.log('1111111111111111111');
    console.log('params', this.props);
    try {
      if (this.props.navigation.state.params[4] === 'plans') {
        viewStack.push(
          <View>
            <TouchableOpacity onPress={() => { this.handleSubmit('start'); }}>
              <Text style={styles.startTimeText}>開始時刻： 【{state.startTimeText}】</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.handleSubmit('end'); }}>
              <Text style={styles.endTimeText}>終了時刻： 【{state.endTimeText}】</Text>
            </TouchableOpacity>
          </View>
        );
      }
      else {
        viewStack.push(
          <View>
            <Text style={styles.startTimeText}>開始時刻:【{state.startTimeText}】</Text>
            <Text style={styles.endTimeText}>終了時刻:【{state.endTimeText}】</Text>
          </View>
        );
      }
    }
    catch (err) { console.log(err); }
    console.log('2222222222222222');
    return (
      <ScrollView style={styles.container}>
        {this.state.timeErrorMessage}
        {viewStack}
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
        <Text style={styles.title}>タイトル</Text>
        {this.state.titleErrorMessage}
        <TextInput
          style={styles.titleText}
          placeholder="タイトル入力"
          value={state.title}
          onChangeText={(text) => { this.setState({ title: text }); }}
        />
        <Text style={styles.title}>内容</Text>
        <KeyboardAvoidingView behavior="position">
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
            value={this.state.date}
            mode={this.state.mode}
            is24Hour
            display="default"
            onChange={this.onChange}
          />
        )}
        <Loading text="読み込み中" isLoading={this.state.isLoading} />
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
    height: 40,
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    borderTopWidth: 1,
  },
  titleText: {
    height: 40,
    fontSize: 30,
    backgroundColor: '#f0fff0',
  },
  textBox: {
    marginTop: 10,
    fontSize: 20,
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
  errorMessage: {
    color: 'red',
  }
});

export default EditScreen;
