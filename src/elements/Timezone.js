/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Timezone extends React.Component {
  state = {
    array: this.props.timeItemList,
  }

  //ArrayのstartTimeとendTimeが一致する場合の処理
  viewPush(viewStack, key, array, i, j) {
    viewStack.push(
      <TouchableOpacity style={styles.timeView} onPress={() => { this.props.navigation.navigate('PlanEdit', array[j]); }}>
        <Text style={styles.timeText} key={key}>{i}:00</Text>
        <View style={[styles.plan, { backgroundColor: array[j].color }]}>
          <Text style={styles.matterText}>{array[j].title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  //ArrayのstartTimeとendTimeが一致しない場合endTimeと一致するまでループ(Planの内容は同じ)
  viewCreate(key, viewStack, array, i, j) {
    // eslint-disable-next-line no-param-reassign
    key += 1;
    this.viewPush(viewStack, key, array, i, j);
    if (array[j].startTime !== array[j].endTime) {
      // eslint-disable-next-line no-param-reassign
      i += 1;
      // eslint-disable-next-line no-param-reassign
      for (; i < array[j].endTime; i += 1) {
        this.viewPush(viewStack, key, array, i, j);
      }
      this.viewPush(viewStack, key, array, i, j);
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

    //id名により分岐
    //Plan側
    if (this.props.id === 'Plan') {
      //24時間分の予定をスタックする
      for (let i = 0; i <= 24; i += 1) {
        let j = 0;
        for (j = 0; j < planCounter; j += 1) {
          // eslint-disable-next-line eqeqeq
          if (i == array[j].startTime) {
            planFlag = true;
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
    }
    //Result側
    else if (this.props.id === 'Result') {
       //24時間分の予定をスタックする
       for (let i = 0; i <= 24; i += 1) {
        let j = 0;
        for (j = 0; j < planCounter; j += 1) {
          // eslint-disable-next-line eqeqeq
          if (i == array[j].startTime) {
            planFlag = true;
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
