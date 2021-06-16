import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//カレンダーを使用するためにインポート
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';

class CalendarScreen extends React.Component {
  render() {
    //カレンダーの表示形式を日本の表示形式に変更
    LocaleConfig.locales.ja = {
      monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
      dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
    };
    LocaleConfig.defaultLocale = 'ja';

    return (
      <View style={styles.container}>
        {/*カレンダーを出力・this.props.navigation.navigate('PlansAndResults', { day })で日付データ(day)をPlansAndResults画面に渡す*/}
        <Calendar
          monthFormat="yyyy年 M月"
          onDayPress={(day) => {
            this.props.navigation.navigate('PlansAndResults', { day });
          }}
        />
        <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate('StartStop'); }}>
          <Text>スタート・ストップ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 24,
    backgroundColor: '#fff',
  },
  button: {
    paddingTop: 100,
  },
});

export default CalendarScreen;
