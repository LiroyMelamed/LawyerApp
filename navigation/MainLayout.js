import React, { useRef, useState } from "react";
import { View, StyleSheet, SafeAreaView, Linking } from "react-native";
import { BottomNav } from "../components/BottomNav";
import { colors } from "../assets/colors";
import { ScreenNames } from "./screenNames";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen";

export default function MainLayout() {
    const [activeTab, setActiveTab] = useState(ScreenNames.Home);

    const webviewRef = useRef(null);
    const [canWebViewGoBack, setCanWebViewGoBack] = useState(false); // State for WebView's back capability

    const onWebViewNavigationStateChange = (navState) => {
        setCanWebViewGoBack(navState.canGoBack);
    };

    const goBackInWebView = () => {
        if (webviewRef.current && canWebViewGoBack) {
            webviewRef.current.goBack();
        }
    };

    const renderContentScreen = () => {
        switch (activeTab) {
            case ScreenNames.Home:
                return (
                    <HomeScreen
                        webviewRef={webviewRef}
                        onNavigationStateChange={onWebViewNavigationStateChange}
                    />
                );
            case ScreenNames.Profile:
                return <ProfileScreen />;
            case ScreenNames.Notifications:
                return <NotificationScreen />;
            default:
                return (
                    <HomeScreen
                        webviewRef={webviewRef}
                        onNavigationStateChange={onWebViewNavigationStateChange}
                    />
                );
        }
    };

    const handleBottomNavPress = (tabName) => {
        if (tabName === "צור קשר") {
            Linking.openURL("tel:0522595097");
            return;
        }

        if (tabName === "חזור") {
            if (activeTab === ScreenNames.Home && canWebViewGoBack) {
                goBackInWebView();
            } else if (activeTab !== ScreenNames.Home) {
                setActiveTab(ScreenNames.Home);
            }
            return;
        }

        if (Object.values(ScreenNames).includes(tabName)) {
            setActiveTab(tabName);
        } else if (tabName === "center") {
            setActiveTab(ScreenNames.Home);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.screenWrapper}>
                {renderContentScreen()}
            </View>

            <BottomNav
                activeTab={activeTab}
                canGoBack={canWebViewGoBack}
                goBack={goBackInWebView}
                navigation={handleBottomNavPress}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    screenWrapper: {
        flex: 1,
    },
});