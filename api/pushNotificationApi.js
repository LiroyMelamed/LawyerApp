import apiUtils from "./apiUtils";

const SAVE_DEVICE_TOKEN_ENDPOINT = 'Notifications/SaveDeviceToken';

const pushNotificationApi = {
    saveDeviceToken: async (data) => {
        return await apiUtils.post(SAVE_DEVICE_TOKEN_ENDPOINT, data);
    },
};

export default pushNotificationApi;
