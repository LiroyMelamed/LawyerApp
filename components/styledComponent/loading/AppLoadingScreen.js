import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const AppLoadingScreen = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(async () => {
            await SplashScreen.hideAsync();
            onFinish();
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/iconBounce.gif')} style={styles.gif} />
        </View>
    );
};

export default AppLoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gif: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});
