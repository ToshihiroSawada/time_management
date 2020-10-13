/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Timezone from '../elements/Timezone';

export default class ResultsScreen extends React.Component {
  state = {
    day: this.props.navigation.state.params.day.dateString,
    planData: [],
    resultData: [],
  };

  render() {
    const { day } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.dayText}>{(`${day}-`).replace('-', '年').replace('-', '月').replace('-', '日')}</Text>
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
