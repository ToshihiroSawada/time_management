/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import firebase from 'firebase';

class Timezone extends React.Component {
  state = {
    array: [],
    id: this.props.id,
    year: 0,
    month: 0,
    day: 0,
  }

  componentDidMount() {
    const ParamsDay = this.props.navigation.state.params.day;
    const year = ParamsDay.year.toString();
    const month = ParamsDay.month.toString();
    const day = ParamsDay.day.toString();
    this.setState({ year });
    this.setState({ month });
    this.setState({ day });
    this.viewUpdate();
  }

  returnPlan() {
    this.viewUpdate();
  }

  //CloudFireStoreのデータを削除する処理
  async deletePlan(key, id) {
    const { state } = this;
    const { year } = state;
    const { month } = state;
    const { day } = state;
    //名前が微妙に違うため、idをDBの名前に変更する
    if (id === 'Plan') {
      id = 'plans';
    }
    else {
      id = 'results';
    }
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    await db.collection(`users/${currentUser.uid}/plans/${year}/${month}/${day}/${id}/`)
    .doc(key)
    .delete()
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
    });

    this.viewUpdate();
  }

  Longtap(key, id) {
    Alert.alert(
      '削除',
      '削除しますか？',
      [
        {
          text: 'いいえ',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'はい',
          onPress: () => this.deletePlan(key, id),
        }
      ],
      { cancelable: false }
    );
  }

  async viewUpdate() {
    const ParamsDay = this.props.navigation.state.params.day;
    const year = ParamsDay.year.toString();
    const month = ParamsDay.month.toString();
    const day = ParamsDay.day.toString();
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const { id } = this.state;
    //読み込みが始まった段階でロードのActivityIndicatorを表示する
    const loading = this.props.loadState[1];
    loading();
    if (id === 'Plan') {
      await db.collection(`users/${currentUser.uid}/plans/${year}/${month}/${day}/plans/`).get().then((querySnapshot) => {
        const planData = [];
        querySnapshot.forEach((doc) => {
            planData.push({ ...doc.data(), key: doc.id });
        });
        this.setState({ array: planData });
      });
    }
    else {
      await db.collection(`users/${currentUser.uid}/plans/${year}/${month}/${day}/results`).get().then((querySnapshot) => {
        const resultData = [];
        querySnapshot.forEach((doc) => {
            resultData.push({ ...doc.data(), key: doc.id });
        });
        this.setState({ array: resultData });
      });
    }

    //読み込みが終わった段階でロードのActivityIndicatorを非表示にする
    const loaded = this.props.loadState[0];
    loaded();
  }

  //ViewをPushする処理
  viewPush(viewStack, key, array, i, j, loopflag) {
    let textStack;
    if (loopflag === true) {
      textStack = '〃';
    }
    else {
        textStack = array[j].title;
    }
    const { state } = this;
    const { year } = state;
    const { month } = state;
    const { day } = state;
    //EditScreenへ受け渡すデータをひとまとめにする
    const cache = [array[j], this.props.navigation.state.params.day.dateString, { year, month, day }, this.returnPlan.bind(this), this.state.id];
    viewStack.push(
      //ロングタップ時の削除に使用するため、PlanのkeyをLongtapひいてはdeletePlanへ渡す。
      // eslint-disable-next-line max-len
      <TouchableOpacity style={styles.timeView} onPress={() => { this.props.navigation.navigate('Edit', cache); }} onLongPress={() => { this.Longtap(key, this.state.id); }}>
        <Text style={styles.timeText} key={key}>{i}:00</Text>
        <View style={[styles.plan, { backgroundColor: array[j].color }]}>
          <Text style={styles.matterText}>{textStack}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  //同じ予定で何回Pushするのか判定する処理
  viewCreate(key, viewStack, array, i, j) {
    //ループ処理中か判断するフラグ
    let loopflag = true;
    this.viewPush(viewStack, key, array, i, j);
    //ArrayのstartTimeとendTimeが一致しない場合の処理(endTimeと一致するまでループ(Planの内容は同じ))
    if (array[j].startTime !== array[j].endTime) {
      i += 1;
      for (; i < array[j].endTime; i += 1) {
        this.viewPush(viewStack, key, array, i, j, loopflag);
      }
      this.viewPush(viewStack, key, array, i, j, loopflag);
      loopflag = false;
    }
    return [key, i, j];
  }

  render() {
    const { array } = this.state;
    const { state } = this;
    const { year } = state;
    const { month } = state;
    const { day } = state;

    let planCounter = 0;
    //予定の個数を数えるカウンター
    try {
      planCounter = Object.keys(array).length;
    }
    catch (err) {
      console.log('ERROR', err);
    }
    let key;
    const viewStack = [];
    //予定が存在しているか確認する用のフラグ
    let planFlag = false;
    //24時間分の予定をスタックする
    for (let i = 0; i <= 24; i += 1) {
      let j = 0;
      for (j = 0; j < planCounter; j += 1) {
        try {
          if (array[j].startTime.match(/:/) !== null) {
            let cacheArray = array[j].startTime.toString().split(':');
            array[j].startTime = cacheArray[0];
            array[j].startTimeMinutes = cacheArray[1];
            cacheArray = array[j].endTime.toString().split(':');
            array[j].endTime = cacheArray[0];
            array[j].endTimeMinutes = cacheArray[1];
          }
          // eslint-disable-next-line eqeqeq
          if (i == array[j].startTime) {
            key = array[j].key;
            planFlag = true;
            break;
          }
        }
        catch (err) {
          console.log('ERROR:', err);
        }
      }
      //フラグが立った場合Viewをpushする
      if (planFlag === true) {
        [key, i, j] = this.viewCreate(key, viewStack, array, i, j);
      }
      //フラグが立たなかった場合、時間のみ記述した空のViewをPushする
      else {
        key = i;
        const cache = [i, 'newPlan', { year, month, day }, this.returnPlan.bind(this), this.state.id];
        viewStack.push(
          <TouchableOpacity style={styles.timeView} onPress={() => { this.props.navigation.navigate('Edit', cache); }}>
            <Text style={styles.timeText} key={key}>{i}:00</Text>
          </TouchableOpacity>
        );
      }
      planFlag = false;
    }
    return (
      <View style={styles.container}>
        {viewStack}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '200%',
    width: '100%',
  },
  timeText: {
    fontSize: 20,
  },
  timeView: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'mediumaquamarine',
  },
  plan: {
    flex: 1,
    marginTop: -30,
    marginLeft: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matterText: {
    fontSize: 20,
  }
});

export default Timezone;
