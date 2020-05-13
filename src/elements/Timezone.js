/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Timezone extends React.Component {
  render() {
    // const array = [[this.props.timeItemList.time], [this.props.timeItemList.value]];
    // array.forEach((element) => {
    //   console.log(element);
    // });
    const time = [];
    for (let i = 0; i <= 24; i += 1) {
      time.push(i);
    }
    const viewStack = [];
    //２４時間分viewStackに保存する
    time.forEach((element) => viewStack.push(
        <TouchableOpacity style={styles.timeView}>
          <Text style={styles.timeText}>{element}:00</Text>
        </TouchableOpacity>
    ));
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
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: 'mediumaquamarine',
  },
});

export default Timezone;
