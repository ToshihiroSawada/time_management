/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import firebase from 'firebase';

import timestampToDate from '../function/timestampToDate';

class Timezone extends React.Component {
  state = {
    array: [],
    id: this.props.id,
    year: 0,
    month: 0,
    day: 0,
  }

  async componentDidMount() {
    const ParamsDay = this.props.navigation.state.params.day;
    const year = ParamsDay.year.toString();
    const month = ParamsDay.month.toString();
    const day = ParamsDay.day.toString();

    await this.setState({
      year,
      month,
      day,
    });
    await this.viewUpdate();
  }

  returnPlan() {
    this.viewUpdate();
  }

  //CloudFireStoreのデータを削除する処理
  async deletePlan(id, key) {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    await db.collection(`users/${currentUser.uid}/${id}`)
      .doc(key)
      .delete()
      .then(() => {
      })
      .catch((err) => {
        console.log('ERRER:', err);
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
          onPress: () => { },
          style: 'cancel'
        },
        {
          text: 'はい',
          onPress: () => this.deletePlan(id, key),
        }
      ],
      { cancelable: false }
    );
  }

  async viewUpdate() {
    const { id } = this.state;
    const { year } = this.state;
    const { month } = this.state;
    const { day } = this.state;
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    //読み込みが始まった段階でロードのActivityIndicatorを表示する
    const loading = this.props.loadState[1];
    loading();

    //読み込み日付とその翌日分のtimestampを取得する。
    let timestamp = `${year}/${month}/${day} 00:00:00`;
    const startPoint = new Date(timestampToDate(timestamp));
    timestamp = `${year}/${month}/${parseInt(day, 10) + 1} 00:00:00`;
    const endPoint = new Date(timestampToDate(timestamp.toString()));
    //取得したtimestampを基に24時間分のplansとresultsを取得する(id = plans or results)
    await db.collection(`users/${currentUser.uid}/${id}/`).where('startTime', '>=', startPoint).where('startTime', '<=', endPoint).get().then((querySnapshot) => {
      const resultData = [];
      querySnapshot.forEach((doc) => {
        resultData.push({ ...doc.data(), key: doc.id });
      });
      this.setState({ array: resultData });
    });

    //取得したデータのstartTimeとendTimeをtimestamp型からDate型へ全て変換する
    const plans = [];
    this.state.array.forEach(
      (i) => {
        const startTime = timestampToDate(i.startTime.seconds * 1000);
        const endTime = timestampToDate(i.endTime.seconds * 1000);
        const { color } = i;
        const { title } = i;
        const { value } = i;
        const { key } = i;
        plans.push({
          startTime, endTime, color, title, value, key, id
        });
      }
    );
    this.setState({ array: plans });
    //読み込みが終わった段階でロードのActivityIndicatorを非表示にする
    const loaded = this.props.loadState[0];
    loaded();
  }

  //ViewをPushする処理
  viewPush(object, loopflag) {
    let textCahe;
    if (loopflag === true) {
      textCahe = '〃';
    }
    else {
      textCahe = object.title;
    }
    // const cache = {};
    // cache.dateString = this.props.navigation.state.params.day.dateString;
    // console.log(cache.dateString);
    // cache.id = this.state.id;
    // cache.returnPlan = this.returnPlan.bind(this);
    const { key } = object;
    const { color } = object;
    const startTimeH = new Date(object.startTime).getHours();
    // if (pushTime !== undefined) {
    //   startTimeH = pushTime;
    // }
    return (
      //ロングタップ時の削除に使用するため、PlanのkeyをLongtapひいてはdeletePlanへ渡す。
      <TouchableOpacity style={styles.timeView} onPress={() => { this.props.navigation.navigate('Edit', object); }} onLongPress={() => { this.Longtap(this.state.id, key); }}>
        <Text style={styles.timeText} key={key}>{startTimeH}:00</Text>
        <View style={[styles.plan, { backgroundColor: color }]}>
          <Text style={styles.matterText}>{textCahe}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  //TODO: 何故かループさせた時だけ処理が正しく動かないので修正する。
  //同じ予定で何回Pushするのか判定する処理
  viewCreate(object) {
    const viewArray = [];
    //ループ処理中か判断するフラグ
    let loopflag = true;
    viewArray.push(this.viewPush(object, loopflag = false));
    const start = new Date(object.startTime).getHours();
    const end = new Date(object.endTime).getHours();
    let pushTime;
    // ArrayのstartTimeとendTimeが一致しない場合の処理(endTimeと一致するまでループ(Planの内容は同じ))
    if (start !== end) {
      console.log('aaaaaaaaaaaaaaaa');
      for (pushTime = start + 1; pushTime <= end; pushTime += 1) {
        console.log(pushTime);
        viewArray.push(this.viewPush(object, loopflag));
      }
      loopflag = false;
      console.log('bbbbbbbbbbbbbb');
    }
    return [viewArray, end];
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
          const startTime = new Date(state.array[j].startTime);
          // eslint-disable-next-line eqeqeq
          if (i == startTime.getHours()) {
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
        let cacheView;
        [cacheView, i] = this.viewCreate(array[j]);
        viewStack.push(cacheView);
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
