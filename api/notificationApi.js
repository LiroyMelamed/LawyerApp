import apiUtils from "./apiUtils";

const GET_NOTIFICATIONS = "Notifications";
const MARK_NOTIFICATION_AS_READ = "Notifications/";

export const notificationApi = {

    getNotifications: async () => {
        return await apiUtils.get(GET_NOTIFICATIONS);
    },

    markNotificationAsRead: async (notificationId) => {
        return await apiUtils.put(`${MARK_NOTIFICATION_AS_READ}${notificationId}/read`);
    },
};
