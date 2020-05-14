/* eslint-disable no-var */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Timezone extends React.Component {
  render() {
    // console.log(this.props.timeItemList);
    const jsonToArray = [];
    const array = this.props.timeItemList;
    console.log(array);
    let counter = 0;
    //jsonをarrayに変換する
    array.forEach((element) => {
      jsonToArray.push(element.startTime);
      jsonToArray.push(element.endTime);
      jsonToArray.push(element.value);
      counter += 2;
    });
    console.log(jsonToArray);
    // eslint-disable-next-line vars-on-top
    var viewStack = [];
    //24時間分の予定をスタックする
    // eslint-disable-next-line vars-on-top
    var arrayFlag = false;
    for (let i = 0; i <= 24; i += 1) {
      let j = 0;
      for (j = 0; j <= counter; j += 1) {
        // eslint-disable-next-line eqeqeq
        if (i == jsonToArray[j]) {
          arrayFlag = true;
          break;
        }
      }
      if (arrayFlag === true) {
        viewStack.push(
          <TouchableOpacity style={styles.timeView}>
            <Text style={styles.timeText} key={i}>{i}:00</Text>
            <Text>{jsonToArray[j + 2]}</Text>
          </TouchableOpacity>
        );
        if (jsonToArray[j] !== jsonToArray[j + 1]) {
          console.log('aaaa');
          for (; i < jsonToArray[j + 1]; i += 1) {
            viewStack.push(
              <TouchableOpacity style={styles.timeView}>
                <Text style={styles.timeText} key={i + 1}>{i + 1}:00</Text>
                <Text>|||</Text>
              </TouchableOpacity>
            );
          }
        }
      }
      else {
        viewStack.push(
          <TouchableOpacity style={styles.timeView}>
            <Text style={styles.timeText} key={i}>{i}:00</Text>
          </TouchableOpacity>
        );
      }
      arrayFlag = false;
    }
    return (
      <View style={styles.container}>
        {viewStack}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '200%',
    width: '100%',
  },
  timeText: {
    fontSize: 20,
  },
  timeView: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'mediumaquamarine',
  },
});

export default Timezone;
