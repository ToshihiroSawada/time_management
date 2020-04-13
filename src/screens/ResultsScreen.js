/* eslint-disable react/jsx-no-undef */
import React from 'react';
// import { StyleSheet } from 'react-native';

//カレンダーを使用するためにインポート
import { Agenda } from 'react-native-calendars';


export default class ResultsScreen extends React.Component {
  state = {
    items: {
      '2020-04-13': [{ name: 'item1 - aaaaaa' }],
    },
    day: this.props.navigation.state.params.day,
  };

  // componentDidMount() {
  //   this.setState.day = this.props.day;
  // }

  render() {
    console.log(this.state);
    return (
      <Agenda
        items={this.state.items}
        selected={this.state.day}
        // renderEmptyDate={() => (<View />)}
        // renderKnob={() => (<View />)}
      />
    );
  }
}

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: 'white',
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17,
//   },
//   emptyDate: {
//     height: 15,
//     flex: 1,
//     paddingTop: 30,
//   },
// });
