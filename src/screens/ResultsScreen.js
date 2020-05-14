/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Timezone from '../elements/Timezone';

export default class ResultsScreen extends React.Component {
  state = {
    day: this.props.navigation.state.params.day.dateString,
    data: [
      {
        startTime: '9',
        endTime: '9',
        value: '始業',
      },
      {
        startTime: '23',
        endTime: '23',
        value: '帰宅',
      },
      {
        startTime: '10',
        endTime: '13',
        value: '会議',
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
            <Timezone timeItemList={this.state.data} id={console.log('aaaa')} />
          </View>
          <View style={styles.graphView}>
            <Text>結果</Text>
            <Timezone timeItemList={this.state.data} id={console.log('bbbbb')} />
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
    //alignItems: 'center',
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
