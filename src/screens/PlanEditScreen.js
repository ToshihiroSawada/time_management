/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

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
        <Text style={styles.matterText}>予定タイトル</Text>
        <TextInput style={styles.title} placeholder="タイトル入力">{plan.title}</TextInput>
        <TextInput style={styles.textBox} multiline placeholder="予定詳細">{plan.value}</TextInput>
        <TouchableOpacity style={styles.okButton}>
          <Text style={styles.okButtonText}>OK</Text>
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
    marginTop: 50,
    fontSize: 30,
  },
  title: {
    width: 300,
    height: 40,
    fontSize: 30,
    backgroundColor: '#aaa',
  },
  textBox: {
    fontSize: 20,
    width: 300,
    height: 200,
    borderBottomColor: '#000',
    backgroundColor: '#eee',
  },
  okButton: {
    backgroundColor: '#f0f',
    width: 75,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  okButtonText: {
    fontSize: 25,
    color: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default PlanEditScreen;
