import React, { createContext, useContext, useMemo, useState } from "react";
import { Alert } from "react-native";
import useFieldState from "../hooks/useFieldState";
import IsraeliPhoneNumberValidation from "../functions/validation/IsraeliPhoneNumberValidation";
import { OtpValidation } from "../functions/validation/OtpValidation";

const LoginVerifyOtpCodeFieldsProviderContext = createContext();

export function useLoginVerifyOtpCodeFieldsProvider() {
    return useContext(LoginVerifyOtpCodeFieldsProviderContext);
}

const loginInfoInitial = {
    token: '',
    role: ''
}

export default function LoginVerifyOtpCodeFieldsProvider({ children }) {
    const [phoneNumber, setPhoneNumber, phoneNumberError] = useFieldState(IsraeliPhoneNumberValidation);
    const [otpNumber, setOtpNumber, otpError] = useFieldState(OtpValidation);
    const [loginInfo, setLoginInfo] = useState(loginInfoInitial)

    const value = useMemo(() => {
        return {
            phoneNumber,
            setPhoneNumber,
            otpNumber,
            setOtpNumber,
            phoneNumberError,
            otpError,
            loginInfo,
            setLoginInfo,
        };
    }, [phoneNumber, setPhoneNumber, otpNumber, setOtpNumber, phoneNumberError, otpError, loginInfo, setLoginInfo]);


    return (
        <LoginVerifyOtpCodeFieldsProviderContext.Provider value={value}>
            {children}
        </LoginVerifyOtpCodeFieldsProviderContext.Provider>
    );
}
