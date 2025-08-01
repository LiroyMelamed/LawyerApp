import apiUtils from "./apiUtils";

const GET_ADMINS_ENDPOINT = "Admins/GetAdmins";
const ADD_ADMIN_ENDPOINT = "Admins/AddAdmin";
const GET_ADMIN_BY_NAME_ENDPOINT = "Admins/GetAdminByName?name=";
const UPDATE_ADMIN_BY_ID_ENDPOINT = "Admins/UpdateAdmin/";
const DELETE_ADMIN_BY_ID_ENDPOINT = "Admins/DeleteAdmin/";

export const adminApi = {
    getAllAdmins: async () => {
        return await apiUtils.get(GET_ADMINS_ENDPOINT);
    },

    addAdmin: async (adminData) => {
        return await apiUtils.post(ADD_ADMIN_ENDPOINT, adminData);
    },

    getAdminByName: async (name) => {
        return await apiUtils.get(`${GET_ADMIN_BY_NAME_ENDPOINT}${encodeURIComponent(name)}`);
    },

    updateAdmin: async (adminId, adminData) => {
        return await apiUtils.put(`${UPDATE_ADMIN_BY_ID_ENDPOINT}${adminId}`, adminData);
    },

    deleteAdmin: async (adminId) => {
        return await apiUtils.delete(`${DELETE_ADMIN_BY_ID_ENDPOINT}${adminId}`);
    }
}
