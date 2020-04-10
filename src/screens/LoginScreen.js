import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import Loading from '../elements/Loading';

class LoginScreen extends React.Component {
  state = { //テスト時に入力が面倒な場合、シングルクォートの中に記述してくと入力が不要になる
    email: '',
    password: '',
  }

  handleSubmit() {
    this.props.navigation.navigate('Calendars');
  }

  render() {
    return (
      <View style={styles.container}>
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
        />
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
        <TouchableHighlight style={styles.button} underlayColor="#f7f" onPress={this.handleSubmit.bind(this)}>
          <Text style={styles.buttonTitle}>ログインする</Text>
        </TouchableHighlight>
        {/*TouchableHighlightとTouchableOpacityの違いは細かい動作だけ大きくは変わらず、ただのボタン*/}
        <TouchableOpacity style={styles.signup}>
          {/* <Text style={styles.signupText}>メンバー登録する</Text> */}
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
