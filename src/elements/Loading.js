import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

const Loading = (props) => {
    const { text, isLoading } = props;
    if (!isLoading) { //ローディング中ではない場合、何も返さず終了
        return null;
    }

    //ローディング中の場合は、ローディング画面を返す
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
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
