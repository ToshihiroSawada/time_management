/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Timezone from '../elements/Timezone';

export default class ResultsScreen extends React.Component {
  state = {
    day: this.props.navigation.state.params.day.dateString,
    planData: [
      {
        startTime: '1599177830000',
        endTime: '1599177830000',
        title: '始業',
        value: '仕事開始時間',
        color: 'red',
      },
      {
        startTime: '1599228230000',
        endTime: '1599228230000',
        title: '帰宅',
        color: 'blue',
      },
      {
        startTime: '1599195830000',
        endTime: '1599203030000',
        title: '中休み',
        color: 'pink',
      },
      {
        startTime: '1599181430000',
        endTime: '1599192230000',
        title: '会議',
        color: 'green',
      },
    ],
    resultData: [
      {
        startTime: '1599181430000',
        endTime: '1599181430000',
        title: '始業',
        color: 'red',
      },
      {
        startTime: '1599224630000',
        endTime: '1599224630000',
        title: '帰宅',
        color: 'blue',
      },
      {
        startTime: '1599185030000',
        endTime: '1599185030000',
        title: '会議',
        color: 'green',
      },
      {
        startTime: '1599188630000',
        endTime: '1599192230000',
        title: '中休み',
        color: 'pink',
      },
    ],
  };

  render() {
    //CalendarScreenから渡されたday(日付情報)を格納
    const { day } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.dayText}>{(`${day}-`).replace('-', '年').replace('-', '月').replace('-', '日')}</Text>
        {/* <Text style={styles.dayText}>{day}</Text> */}
        <View style={styles.graph}>
          <View style={styles.graphView}>
            <Text>予定</Text>
            <Timezone timeItemList={this.state.planData} id="Plan" navigation={this.props.navigation} />
          </View>
          <View style={styles.graphView}>
            <Text>結果</Text>
            <Timezone timeItemList={this.state.resultData} id="Result" navigation={this.props.navigation} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dayText: {
    fontSize: 35,
    alignSelf: 'center',
  },
  graph: {
    flex: 1,
    flexDirection: 'row',
  },
  graphView: {
    flex: 1,
  },
});
