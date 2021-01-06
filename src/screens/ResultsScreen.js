/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Loading from '../components/Loading';
import Timezone from '../components/Timezone';

export default class ResultsScreen extends React.Component {
  state = {
    day: this.props.navigation.state.params.day.dateString,
    planData: [],
    resultData: [],
    isLoading: true,
  };

  loaded() {
    this.setState({ isLoading: false });
  }

  loading() {
    this.setState({ isLoading: true });
  }

  render() {
    const { day } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Loading text="" isLoading={this.state.isLoading} style={styles.reload} color="#225566" />
        <Text style={styles.dayText}>{(`${day}-`).replace('-', '年').replace('-', '月').replace('-', '日')}</Text>
        <View style={styles.graph}>
          <View style={styles.graphView}>
            <Text>予定</Text>
            <Timezone timeItemList={this.state.planData} id="Plan" navigation={this.props.navigation} loadState={[this.loaded.bind(this), this.loading.bind(this)]} />
          </View>
          <View style={styles.graphView}>
            <Text>結果</Text>
            <Timezone timeItemList={this.state.resultData} id="Result" navigation={this.props.navigation} loadState={[this.loaded.bind(this), this.loading.bind(this)]} />
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
  reload: {
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    margin: 50,
  },
});
