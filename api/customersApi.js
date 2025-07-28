import apiUtils from "./apiUtils";

const UPDATE_CURRENT_CUSTOMER = "Customers/UpdateCurrentCustomer/";
const GET_CUSTOMERS_BY_NAME = "Customers/GetCustomerByName";
const GET_CURRENT_CUSTOMER = "Customers/GetCurrentCustomer";
const UPDATE_CUSTOMER = "Customers/UpdateCustomer/";
const DELETE_CUSTOMER = "Customers/DeleteCustomer/";
const GET_ALL_CUSTOMERS = "Customers/GetCustomers";
const ADD_CUSTOMER = "Customers/AddCustomer";

export const customersApi = {
    getAllCustomers: async () => {
        return await apiUtils.get(GET_ALL_CUSTOMERS);
    },

    getCurrentCustomer: async () => {
        return await apiUtils.get(GET_CURRENT_CUSTOMER);
    },

    getCustomersByName: async (userName) => {
        return await apiUtils.get(`${GET_CUSTOMERS_BY_NAME}?userName=${encodeURIComponent(userName)}`);
    },

    addCustomer: async (customerData) => {
        return await apiUtils.post(ADD_CUSTOMER, customerData);
    },

    updateCustomerById: async (customerId, customerData) => {
        return await apiUtils.put(`${UPDATE_CUSTOMER}${customerId}`, customerData);
    },

    updateCurrentCustomer: async (customerData) => {
        return await apiUtils.put(`${UPDATE_CURRENT_CUSTOMER}`, customerData);
    },

    deleteCustomerById: async (customerId) => {
        return await apiUtils.delete(`${DELETE_CUSTOMER}${customerId}`);
    }
};
