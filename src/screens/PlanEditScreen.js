/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class PlanEditScreen extends React.Component {
  render() {
    const plan = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.startTimeText}>開始時刻： 【{plan.startTime}:00】</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.endTimeText}>終了時刻： 【{plan.endTime}:00】</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.matterText}>予定： {plan.value}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
  },
  startTimeText: {
    fontSize: 30,
  },
  endTimeText: {
    fontSize: 30,
  },
  matterText: {
    fontSize: 50,
  },
});

export default PlanEditScreen;
