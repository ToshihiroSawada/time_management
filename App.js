import { createStackNavigator } from 'react-navigation-stack'; //react-navigation-stackのcreateStackNavigatorをインポート
import { createAppContainer } from 'react-navigation'; //react-navigationのcreateAppContainerをインポート

import firebase from 'firebase';
//firebaseのバージョン7.9.0以降下記のインポートを行わないと、firebaseと通信が行えなくなった
import { decode, encode } from 'base-64';

//それぞれの画面をインポート
import LoginScreen from './src/screens/LoginScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ResultScreen from './src/screens/ResultsScreen';
import PlanEditScreen from './src/screens/PlanEditScreen';
import ResultEditScreen from './src/screens/ResultEditScreen';
import Signup from './src/screens/SignupScreen';

import ENV from './env.json';

//firebaseのバージョン7.9.0以降のatob、btoaのwarningの対策
if (!global.btoa) { global.btoa = encode; }
if (!global.atob) { global.atob = decode; }

// eslint-disable-next-line
require("firebase/firestore");

//Login(firebaseの準備)
const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DB_URL,
  projectId: ENV.FIREBASE_PRJ_ID,
  storageBucket: ENV.FIREBASE_STORAGE,
  messagingSenderId: ENV.FIREBASE_MS_SENDER_ID,
  appId: ENV.FIREBASE_APP_ID,
  measurementId: ENV.FIREBASE_MSM_ID,
};
firebase.initializeApp(firebaseConfig); //firebaseを初期化して準備する

const AppScreen = createStackNavigator({ //createStackNavigatorで画面を作成
  Login: {
    screen: LoginScreen,
  },
  Signup: {
    screen: Signup,
  },
  Home: {
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
