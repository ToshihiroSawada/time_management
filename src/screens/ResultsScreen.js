/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Timezone from '../elements/Timezone';

export default class ResultsScreen extends React.Component {
  state = {
    day: this.props.navigation.state.params.day.dateString,
    data: {
      time: '9:00',
      value: '始業',
    },
  };

  render() {
    //CalendarScreenから渡されたday(日付情報)を格納
    const { day } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.dayText}>{day}</Text>
        {/* <View style={styles.graph}> */}
        <Timezone timeItemList={this.state.data} />
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 40,
  },
  graph: {
    flex: 1,
    flexDirection: 'row',
  },
  // leftGraph: {
  //   backgroundColor: '#AAA',
  //   width: '50%',
  //   height: 1000,
  // },
  // rightGraph: {
  //   backgroundColor: '#DDD',
  //   width: '50%',
  //   height: 1000,
  // },
});
