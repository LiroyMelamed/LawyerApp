import { WebView } from "react-native-webview";
import { useLoginVerifyOtpCodeFieldsProvider } from "../providers/LoginVerifyOtpCodeFieldsProvider";

const HomeScreen = ({ webviewRef, onNavigationStateChange }) => {
    const { loginInfo } = useLoginVerifyOtpCodeFieldsProvider();

    const webSiteUrl = `https://client.melamedlaw.co.il?fromApp=true&token=${loginInfo?.token}&role=${loginInfo?.role}`;

    return (
        <WebView
            ref={webviewRef}
            source={{
                uri: webSiteUrl
            }}
            onNavigationStateChange={onNavigationStateChange}
            originWhitelist={["*"]}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            mixedContentMode="always"
            style={{ flex: 1 }}
        />
    );
};

export default HomeScreen;