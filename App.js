import React, { useRef, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const webviewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const onNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
  };

  const goBack = () => {
    if (canGoBack) webviewRef.current.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Native Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>LayerWebsites App</Text>
      </View>

      {/* WebView */}
      <WebView
        ref={webviewRef}
        source={{ uri: "https://liroymelamed.github.io/LayerWebsites" }}
        onNavigationStateChange={onNavigationStateChange}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
      />

      {/* Bottom Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={goBack} disabled={!canGoBack}>
          <Text style={[styles.footerText, { opacity: canGoBack ? 1 : 0.4 }]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    height: 50,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#333",
  },
});
