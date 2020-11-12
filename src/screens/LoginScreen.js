/* eslint-disable comma-dangle */
import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import { NavigationActions, StackActions } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

import Loading from '../elements/Loading';

class LoginScreen extends React.Component {
  state = { //テスト時に入力が面倒な場合、シングルクォートの中に記述してくと入力が不要になる
    email: '',
    password: '',
    isLoading: false,
    visible: false,
  }

  async componentDidMount() {
    //awaitはthen・catchの記述を簡略化したもの
    const email = await SecureStore.getItemAsync('email');
    const password = await SecureStore.getItemAsync('password');
    this.setState({ email });
    this.setState({ password });
  }

  //ログイン後MemoListScreenに遷移する機能を共通化したメソッド
  navigateToHome() {
    const resetAction = StackActions.reset({ //ログイン完了後に画面遷移をリセットして、戻るボタンでログイン画面に戻らないようにする
      index: 0, //actionの配列(下記)の0番目(今回は0番目のみ)に遷移する
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }), //0番目にHome画面を設定
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  //ログイン機能の実装
  handleSubmit() {
    // eslint-disable-next-line no-empty
    if (this.state.email === null || this.state.password === null) {}
    else {
      this.setState({ isLoading: true });
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        SecureStore.setItemAsync('email', this.state.email);
        SecureStore.setItemAsync('password', this.state.password);
        this.setState({ isLoading: false });
        this.navigateToHome();
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
    }
  }

  handlePress() {
    this.props.navigation.navigate('Signup');
  }

  changeVisible() {
    if (this.state.visible === false) {
      this.setState({ visible: true });
    }
    else {
      this.setState({ visible: false });
    }
  }

  viewStack() {
    const view = [];
    if (this.state.visible === false) {
      view.push(
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => { this.setState({ password: text }); }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry
          underlineColorAndroid="transparent" //AndroidのTextInputでに下線が出ないようにする設定(表示されなかったが一応入れておく)
        />
      );
    }
    else {
      view.push(
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => { this.setState({ password: text }); }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          underlineColorAndroid="transparent" //AndroidのTextInputでに下線が出ないようにする設定(表示されなかったが一応入れておく)
        />
      );
    }
    return view;
  }

  render() {
    let stack = [];
    stack = this.viewStack();
    return (
      <View style={styles.container}>
        <Loading
          text="ログイン中"
          isLoading={this.state.isLoading}
        />
        <Text style={styles.title}>
          ログイン
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text) => { this.setState({ email: text }); }}/*この行がないと文字を入力しても反映されない */
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
          underlineColorAndroid="transparent" //AndroidのTextInputでに下線が出ないようにする設定(表示されなかったが一応入れておく)
          keyboardType="email-address"
        />
        {stack}
        <TouchableHighlight onPress={this.changeVisible.bind(this)}>
          <Text>パスワードを表示</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)} underlayColor="#f7f">
          <Text style={styles.buttonTitle}>ログインする</Text>
        </TouchableHighlight>
        {/* TouchableHighlightとTouchableOpacityの違いは細かい動作だけ大きくは変わらず、ただのボタン */}
        <TouchableOpacity style={styles.signup} onPress={this.handlePress.bind(this)}>
          <Text style={styles.signupText}>メンバー登録する</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#eee',
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
  },
  button: {
    backgroundColor: '#f0f',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center', //文字(送信)を中央に配置
    width: '70%',
    alignSelf: 'center', //ボタンの位置を中央に配置
    marginTop: 100,
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
  signup: {
    marginTop: 16,
    alignSelf: 'center',
  },
  signupText: {
    fontSize: 16,
  },
});

export default LoginScreen;
