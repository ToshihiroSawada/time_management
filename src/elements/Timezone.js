/* eslint-disable no-param-reassign */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Timezone extends React.Component {
  state = {
    array: this.props.timeItemList,
    id: this.props.id,
  }

  //ViewをPushする処理
  viewPush(viewStack, key, array, i, j, loopflag) {
    //destinationScreenにどこの画面に遷移するのかを格納する
    // eslint-disable-next-line no-var
    let destinationScreen;
    if (this.state.id === 'Plan') {
      destinationScreen = 'PlanEdit';
    }
    else {
      destinationScreen = 'ResultEdit';
    }

    let textStack;
    if (loopflag === true) {
      textStack = '〃';
    }
    else {
        textStack = array[j].title;
    }
    viewStack.push(
      // eslint-disable-next-line max-len
      <TouchableOpacity style={styles.timeView} id={this.state.id} onPress={() => { this.props.navigation.navigate(destinationScreen, array[j]); }}>
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
    key += 1;
    this.viewPush(viewStack, key, array, i, j);
    //ArrayのstartTimeHourとendTimeHourが一致しない場合の処理(endTimeHourと一致するまでループ(Planの内容は同じ))
    if (array[j].startTimeHour !== array[j].endTimeHour) {
      i += 1;
      for (; i < array[j].endTimeHour; i += 1) {
        this.viewPush(viewStack, key, array, i, j, loopflag);
      }
      this.viewPush(viewStack, key, array, i, j, loopflag);
      loopflag = false;
    }
    return [key, i, j];
  }

  render() {
    const { array } = this.state;
    //予定の個数を数えるカウンター
    const planCounter = array.length;
    let key = 0;
    const viewStack = [];
    //予定が存在しているか確認する用のフラグ
    let planFlag = false;
    //24時間分の予定をスタックする
    for (let i = 0; i <= 24; i += 1) {
      let j = 0;
      let k = 0;
      for (k = 0; k < 60; k += 1) {
        for (j = 0; j < planCounter; j += 1) {
          // eslint-disable-next-line eqeqeq
          if (i == array[j].startTimeHour && k == array[j].startTimeMinutes) {
            planFlag = true;
            break;
          }
        }
        if (planFlag === true) {
          break;
        }
      }
      //フラグが立った場合Viewをpushする
      if (planFlag === true) {
        [key, i, j] = this.viewCreate(key, viewStack, array, i, j);
      }
      //フラグが立たなかった場合、時間のみ記述した空のViewをPushする
      else {
        key += 1;
        viewStack.push(
          <TouchableOpacity style={styles.timeView}>
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
