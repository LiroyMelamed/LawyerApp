import apiUtils from "./apiUtils";

const REQUEST_API_DATA_ENDPOINT = 'Auth/RequestOtp';
const VERIFY_OTP_DATA_ENDPOINT = 'Auth/VerifyOtp';
const ADMIN_LOGIN_OTP_DATA_ENDPOINT = 'Auth/Login';

const loginApi = {
    sendOtp: async (phoneNumber) => {
        console.log('sendOtp', phoneNumber);
        return await apiUtils.post(REQUEST_API_DATA_ENDPOINT, { phoneNumber });
    },

    verifyOtp: async (phoneNumber, otp) => {
        const data = {
            phoneNumber,
            otp
        }
        return await apiUtils.post(VERIFY_OTP_DATA_ENDPOINT, data);;
    },

    login: async (username, password) => {
        const data = {
            username,
            passwordHash: password,
        }
        return await apiUtils.post(ADMIN_LOGIN_OTP_DATA_ENDPOINT, data);;
    },
};

export default loginApi;
