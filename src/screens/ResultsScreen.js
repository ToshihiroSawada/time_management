import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


class RsultsScreen extends React.Component {
    render() {
        const { day } = this.props.navigation.state.params;
        return (
            <View style={StyleSheet.container}>
                {/*CalendarScreenから受け渡された日付データを表示 */}
                <Text>{String(day.dateString)}</Text>
            </View>
        );
    }
}

export default RsultsScreen;
