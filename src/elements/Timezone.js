import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Timezone extends React.Component {
  renderView() {
    // console.log('aaaaaaaaaaaaaaaa');
  }

  render() {
    const array = [[this.props.timeItemList.time], [this.props.timeItemList.value]];
    // console.log(array);
    array.forEach((element) => {
      console.log(element);
      if (element == '9:00') {
        console.log('Yes!!!!');
      }
    });
    // console.log(this.props.timeItemList);
      return (
        <View style={styles.container}>
          {/* <Text style={styles.text}>{this.props.timeItemList.time}</Text> */}
          <View style={styles.timeView}>
            <Text style={styles.timeText}>0:00</Text>
              <Text>aaaaaaaaa</Text>
          </View>
          {/* <View style={styles.timeView}>
            <Text style={styles.timeText}>1:00</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.timeText}>2:00</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.timeText}>3:00</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.timeText}>4:00</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.timeText}>5:00</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.timeText}>6:00</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.timeText}>7:00</Text>
          </View> */}
          {this.renderView()}
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
