import { useEffect } from "react";
import pushNotificationApi from "../../api/pushNotificationApi";
import useHttpRequest from "../../hooks/useHttpRequest";
import { useLoginVerifyOtpCodeFieldsProvider } from "../../providers/LoginVerifyOtpCodeFieldsProvider";
import { registerForPushNotificationsAsync } from "./registerForPushNotificationsAsync";
import { Platform } from "react-native";

export function PushTokenRegistrar() {
    const { loginInfo } = useLoginVerifyOtpCodeFieldsProvider();
    const { performRequest } = useHttpRequest(pushNotificationApi.saveDeviceToken);

    useEffect(() => {
        if (!loginInfo?.token) return;

        registerForPushNotificationsAsync().then((token) => {
            if (token) {
                performRequest({
                    fcmToken: token,
                    deviceType: Platform.OS,
                });
            }
        });
    }, [loginInfo?.token]);

    return null;
}
