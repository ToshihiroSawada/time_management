import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

const Loading = (props) => {
    const { text, isLoading, style, color } = props;
    let colorProps = color;
    if (!isLoading) { //ローディング中ではない場合、何も返さず終了
        return null;
    }

    //ActivityIndicatorのカラーの指定がstyleでできなかったので、if文で作成する
    if (colorProps === undefined) {
        colorProps = '#000000';
    }

    //ローディング中の場合は、ローディング画面を返す
    return (
        <View style={[styles.container, style]}>
            <ActivityIndicator size={100} color={colorProps} />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.8)',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    text: {
        fontSize: 16,
        margin: 20,
    },
});

export default Loading;
