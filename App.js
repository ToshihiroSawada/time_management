import { createStackNavigator } from 'react-navigation-stack'; //react-navigation-stackのcreateStackNavigatorをインポート
import { createAppContainer } from 'react-navigation'; //react-navigationのcreateAppContainerをインポート

import LoginScreen from './src/screens/LoginScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ResultScreen from './src/screens/ResultsScreen';

const AppScreen = createStackNavigator({ //createStackNavigatorで画面を作成
  Login: {
    screen: LoginScreen,
  },
  Calendars: {
    screen: CalendarScreen,
  },
  Results: {
    screen: ResultScreen,
  },
}, { //画面を用意する部分の外(以下の部分)にdefaultNavigationOptionsを出すことによって、全画面共通のオプションを作成できる
  defaultNavigationOptions: {
    headerTitle: '時間管理', //ヘッダータイトルを'MEMOT'に変更
    headerTintColor: '#fff', //左上に表示される矢印の色を指定
    headerStyle: {
      backgroundColor: '#225566', //バックグラウンドカラーを設定
    },
    headerTitleStyle: {
      color: '#fff',
    },
  },
});

const App = createAppContainer(AppScreen); //AppScreenをcreateAppConteinerに入れて、コンテナ化


export default App;
