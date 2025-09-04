import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLoginVerifyOtpCodeFieldsProvider } from "../../providers/LoginVerifyOtpCodeFieldsProvider";
import useHttpRequest from "../../hooks/useHttpRequest";
import loginApi from "../../api/loginApi";
import LoginSimpleScreen from "./components/LoginSimpleScreen";
import NextLoginButton from "./components/NextLoginButton";
import SimpleContainer from "../../components/simpleComponents/SimpleContainer";
import SimpleInput from "../../components/simpleComponents/SimpleInput";
import TopCenteredLogo from "./components/TopCenteredLogo";
import { images } from "../../assets/images/images";
import { View } from "react-native";

export const LoginScreenName = "/LoginScreen";

export default function LoginScreen() {
    const { phoneNumber, setPhoneNumber, phoneNumberError } = useLoginVerifyOtpCodeFieldsProvider();
    const navigation = useNavigation();

    const { isPerforming, performRequest } = useHttpRequest(
        loginApi.sendOtp,
        () => navigation.navigate('LoginOtpScreen')
    );

    // Handle phone number input change
    const handleInputChange = (value) => {
        setPhoneNumber(value);
    };

    const handlePress = useCallback(() => {
        if (phoneNumber && !phoneNumberError) {
            performRequest(phoneNumber);
        }
    }, [phoneNumber, phoneNumberError, performRequest]);

    return (
        <LoginSimpleScreen
            imageBackgroundSource={images.AppBackground}
            style={{ width: "100%" }}
            unScrollableTopComponent={<TopCenteredLogo />}
            unScrollableBottomComponent={
                <NextLoginButton
                    isPerforming={isPerforming}
                    buttonText="התחברות"
                    onPress={handlePress} // Perform request only on button press
                    disabled={phoneNumberError != null || phoneNumber == null} // Disable if there’s an error with phone number
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
                    title={"נא הזן מספר פלאפון"}
                    style={{ height: 56, width: "60%" }}
                    value={phoneNumber}
                    onChange={handleInputChange}
                    error={phoneNumberError}
                    maxLength={10}
                />
            </SimpleContainer>
        </LoginSimpleScreen>
    );
}
