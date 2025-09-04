import { WebView } from "react-native-webview";
import { useLoginVerifyOtpCodeFieldsProvider } from "../providers/LoginVerifyOtpCodeFieldsProvider";
import { Linking, View, StyleSheet } from "react-native";

const HomeScreen = ({ webviewRef, onNavigationStateChange }) => {
    const { loginInfo } = useLoginVerifyOtpCodeFieldsProvider();

    const webSiteUrl = `https://client.melamedlaw.co.il?fromApp=true&token=${loginInfo?.token}&role=${loginInfo?.role}`;

    return (
        <View style={styles.webViewContainer}>
            <WebView
                ref={webviewRef}
                source={{ uri: webSiteUrl }}
                onNavigationStateChange={onNavigationStateChange}
                onShouldStartLoadWithRequest={(request) => {
                    if (request.url.startsWith('tel:')) {
                        Linking.openURL(request.url); // opens phone dialer
                        return false; // don't load in WebView
                    }
                    return true;
                }}
                originWhitelist={["*"]}
                javaScriptEnabled
                domStorageEnabled
                startInLoadingState
                mixedContentMode="always"
                style={styles.webView}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    webViewContainer: {
        flex: 1,
        paddingBottom: 60, // Adjust based on your BottomNav height
        backgroundColor: "#fff"
    },
    webView: {
        flex: 1,
    }
});

export default HomeScreen;
