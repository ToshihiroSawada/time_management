import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class PlanEditScreen extends React.Component {
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.state.params}</Text>
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
});

export default PlanEditScreen;
