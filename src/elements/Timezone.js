import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


class Timezone extends React.Component {
  render() {
    if (this.props.timeItemList.time === '9:00') {
      console.log('Yes!!!!');
    }
    console.log(this.props.timeItemList);
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.text}>{this.props.timeItemList.time}</Text>
          <Text style={styles.text}>1:00</Text>
          <Text style={styles.text}>2:00</Text>
          <Text style={styles.text}>3:00</Text>
          <Text style={styles.text}>4:00</Text>
          <Text style={styles.text}>5:00</Text>
          <Text style={styles.text}>6:00</Text>
          <Text style={styles.text}>7:00</Text>
          <Text style={styles.text}>8:00</Text>
          <Text style={styles.text}>9:00</Text>
          <Text style={styles.text}>10:00</Text>
          <Text style={styles.text}>11:00</Text>
          <Text style={styles.text}>12:00</Text>
          <Text style={styles.text}>13:00</Text>
          <Text style={styles.text}>14:00</Text>
          <Text style={styles.text}>15:00</Text>
          <Text style={styles.text}>16:00</Text>
          <Text style={styles.text}>17:00</Text>
          <Text style={styles.text}>18:00</Text>
          <Text style={styles.text}>19:00</Text>
          <Text style={styles.text}>20:00</Text>
          <Text style={styles.text}>21:00</Text>
          <Text style={styles.text}>22:00</Text>
          <Text style={styles.text}>23:00</Text>
          <Text style={styles.text}>24:00</Text>
        </ScrollView>
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
  text: {
    width: '100%',
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: 'mediumaquamarine',
  },
});

export default Timezone;
