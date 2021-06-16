/* eslint-disable class-methods-use-this */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';

import timeTextCreate from '../function/timeTextCreate';

class StartStop extends React.Component {
  state = {
    timeText: '',
    timeState: false,
    startTime: '',
    endTime: '',
    buttonText: '',
    id: 'newResult',
  }

  componentDidMount() {
    this.getData();
  }

  //TouchableOpacity(スタートボタン)をタップした際のメソッド
  async handleSubmit() {
    const date = new Date();
    const timeText = await timeTextCreate(date, 1);
    const timeText2Line = timeText;
    if (this.state.timeState === false) {
      //stateとAsyncStorageに格納する
      this.setData(String(date));
      this.setState({
        timeText: timeText2Line,
        startTime: date,
        buttonText: 'ストップ',
        timeState: true,
      });
    }
    else {
      try {
        //AsyncStorageからデータを削除
        await AsyncStorage.removeItem('@dateString');
        this.setState({
          endTime: date,
          timeState: false,
          timeText: 'スタートボタンを\n押してください',
          buttonText: 'スタート',
        });
        this.props.navigation.navigate('Edit', { state: this.state }); //受け渡しはできたのでEdit画面の修正に入る
      }
      catch (e) {
        console.log(e);
      }
    }
  }

  //AsyncStorageにデータを格納する
  async setData(value) {
    try {
      await AsyncStorage.setItem('@dateString', value);
    } catch (e) {
      console.log('ERROR:', e);
    }
  }

  //AsyncStorageからデータを取り出す
  async getData() {
    let value = '';
    try {
      value = await AsyncStorage.getItem('@dateString');
      if (value !== null) {
        value = await timeTextCreate(value, 1);
        this.setState({
          timeText: value,
          startTime: value,
          timeState: true,
          buttonText: 'ストップ',
        });
      }
      else {
        this.setState({
          timeText: 'スタートボタンを\n押してください',
          buttonText: 'スタート',
        });
      }
    } catch (e) {
      console.log('ERROR:aaa', e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.timeText}>{this.state.timeText}</Text>
        <TouchableHighlight style={styles.Button} onPress={this.handleSubmit.bind(this)}>
          <Text style={styles.ButtonTitle}>{this.state.buttonText}</Text>
        </TouchableHighlight>
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
  timeText: {
    marginTop: 50,
    fontSize: 30,
  },
  //ボタンのスタイリング
  Button: {
    margin: '50%',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#3cb371',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0.1, height: 2 }, //影の幅、高さ設定
    shadowRadius: 99, //影の丸さ設定
    shadowOpacity: 0.01, //影の濃さ（１がMAX）
    elevation: 10, //表示する優先度(高度)を設定する
  },
  //ボタンのフォントのスタイリング
  ButtonTitle: {
    fontSize: 40,
  },
});

export default StartStop;
