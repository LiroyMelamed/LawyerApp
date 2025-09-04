import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const isProduction = false;

function selectMode(forProduction, forStage) {
    return isProduction ? forProduction : forStage;
}

const prodURL = "https://api.calls.melamedlaw.co.il/api";
const stageURL = "http://10.0.0.12:5000/api";

const apiUtils = axios.create({
    baseURL: selectMode(prodURL, stageURL),
});

apiUtils.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiUtils.interceptors.response.use(
    (response) => ({
        status: response.status,
        data: response.data || null,
        requestLink: response.config.url,
        success: true,
    }),
    (error) => ({
        status: error.response?.status || 500,
        data: error.response?.data || null,
        requestLink: error.config?.url,
        success: false,
        message: error.message,
    })
);

export default apiUtils;
