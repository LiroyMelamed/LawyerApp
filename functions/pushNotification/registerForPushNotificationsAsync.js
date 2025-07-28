import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Linking, Platform } from "react-native";

export async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        console.log("📛 Final Notification Permission Status:", finalStatus);

        if (finalStatus !== "granted") {
            alert("אנא אפשר התראות בהגדרות כדי לקבל עדכונים.");
            return null;
        }

        const { data } = await Notifications.getExpoPushTokenAsync({
            projectId: "93515b73-1195-4a5d-a5e3-f60cb69cc1ae"
        });

        token = data;

    } else {
        console.log("❗ Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    return token;
}
