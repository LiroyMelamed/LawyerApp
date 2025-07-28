import { useLoginVerifyOtpCodeFieldsProvider } from "../../providers/LoginVerifyOtpCodeFieldsProvider";
import useHttpRequest from "../../hooks/useHttpRequest";
import loginApi from "../../api/loginApi";
import LoginSimpleScreen from "../loginScreen/components/LoginSimpleScreen";
import { images } from "../../assets/images/images";
import NextLoginButton from "../loginScreen/components/NextLoginButton";
import TopCenteredLogoOtp from "./components/TopCenteredLogoOtp";
import SimpleContainer from "../../components/simpleComponents/SimpleContainer";
import SimpleInput from "../../components/simpleComponents/SimpleInput";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppRoles = {
    Admin: 'Admin',
    Customer: 'Customer'
};

export const LoginOtpScreenName = "/LoginOtpScreen";

export default function LoginOtpScreen() {
    const { otpNumber, setOtpNumber, otpError, phoneNumber, loginInfo, setLoginInfo } = useLoginVerifyOtpCodeFieldsProvider();
    const navigate = useNavigation();

    const { isPerforming, performRequest } = useHttpRequest(loginApi.verifyOtp, navigateTo);

    const handleInputChange = (value) => {
        setOtpNumber(value);
    };

    async function navigateTo(data) {
        await AsyncStorage.setItem("token", data.token);

        setOtpNumber('');
        setLoginInfo({
            token: data.token,
            role: data.role
        });

        navigate.navigate('MainLayout');
    }

    return (
        <LoginSimpleScreen
            imageBackgroundSource={images.AppBackground}
            style={{ width: "100%" }}
            unScrollableTopComponent={<TopCenteredLogoOtp />}
            unScrollableBottomComponent={
                <NextLoginButton
                    isPerforming={isPerforming}
                    buttonText="שליחה"
                    onPress={() => {
                        performRequest(phoneNumber, otpNumber);
                    }}
                    disabled={otpError != null || otpNumber?.length !== 6} // Disable button if OTP is invalid or not 6 digits
                />
            }
        >
            <SimpleContainer
                style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <SimpleInput
                    keyboardType="numeric"
                    title={"הקלד את הקוד"}
                    style={{ height: 56, width: "60%", padding: 0 }}
                    value={otpNumber}
                    onChange={handleInputChange}
                    maxLength={6}
                    textStyle={{ textAlign: 'center', letterSpacing: 4 }} // Center the text
                    error={otpError}
                />
            </SimpleContainer>
        </LoginSimpleScreen>
    );
}
