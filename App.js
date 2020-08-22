import { createStackNavigator } from 'react-navigation-stack'; //react-navigation-stackのcreateStackNavigatorをインポート
import { createAppContainer } from 'react-navigation'; //react-navigationのcreateAppContainerをインポート

//それぞれの画面をインポート
import LoginScreen from './src/screens/LoginScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ResultScreen from './src/screens/ResultsScreen';
import PlanEditScreen from './src/screens/PlanEditScreen';
import ResultEditScreen from './src/screens/ResultEditScreen';

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
  PlanEdit: {
    //タイトルヘッダーを変更
    navigationOptions: {
      headerTitle: '予定編集画面',
    },
    screen: PlanEditScreen,
  },
  ResultEdit: {
    navigationOptions: {
      headerTitle: '結果編集画面',
    },
    screen: ResultEditScreen,
  },
}, { //画面を用意する部分の外(以下の部分)にdefaultNavigationOptionsを出すことによって、全画面共通のオプションを作成できる
  defaultNavigationOptions: {
    headerTitle: '時間管理', //ヘッダータイトルを'時間管理'に変更
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
