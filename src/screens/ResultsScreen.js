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
        startTimeHour: '9',
        startTimeMinutes: '9',
        endTimeHour: '9',
        endTimeMinutes: '9',
        title: '始業',
        value: '仕事開始時間',
        color: 'red',
      },
      {
        startTimeHour: '23',
        startTimeMinutes: '9',
        endTimeHour: '23',
        endTimeMinutes: '9',
        title: '帰宅',
        color: 'blue',
      },
      {
        startTimeHour: '14',
        startTimeMinutes: '9',
        endTimeHour: '16',
        endTimeMinutes: '9',
        title: '中休み',
        color: 'pink',
      },
      {
        startTimeHour: '10',
        startTimeMinutes: '9',
        endTimeHour: '13',
        endTimeMinutes: '9',
        title: '会議',
        color: 'green',
      },
    ],
    resultData: [
      {
        startTimeHour: '10',
        startTimeMinutes: '9',
        endTimeHour: '10',
        endTimeMinutes: '9',
        title: '始業',
        color: 'red',
      },
      {
        startTimeHour: '22',
        startTimeMinutes: '9',
        endTimeHour: '22',
        endTimeMinutes: '9',
        title: '帰宅',
        color: 'blue',
      },
      {
        startTimeHour: '11',
        startTimeMinutes: '9',
        endTimeHour: '11',
        endTimeMinutes: '9',
        title: '会議',
        color: 'green',
      },
      {
        startTimeHour: '12',
        startTimeMinutes: '9',
        endTimeHour: '13',
        endTimeMinutes: '9',
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
