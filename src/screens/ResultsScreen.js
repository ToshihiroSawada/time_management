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
        startTime: '9',
        endTime: '9',
        title: '始業',
        value: '仕事開始時間',
        color: 'red',
      },
      {
        startTime: '23',
        endTime: '23',
        title: '帰宅',
        color: 'blue',
      },
      {
        startTime: '10',
        endTime: '13',
        title: '会議',
        color: 'green',
      },
      {
        startTime: '14',
        endTime: '16',
        title: '中休み',
        color: 'pink',
      },
    ],
    resultData: [
      {
        startTime: '10',
        endTime: '10',
        title: '始業',
        color: 'red',
      },
      {
        startTime: '22',
        endTime: '22',
        title: '帰宅',
        color: 'blue',
      },
      {
        startTime: '10',
        endTime: '12',
        title: '会議',
        color: 'green',
      },
      {
        startTime: '12',
        endTime: '13',
        title: '中休み',
        color: 'black',
      },
    ],
  };

  render() {
    //CalendarScreenから渡されたday(日付情報)を格納
    const { day } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.dayText}>{day}</Text>
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
    fontSize: 40,
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
