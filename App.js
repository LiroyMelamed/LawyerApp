import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginVerifyOtpCodeFieldsProvider from "./providers/LoginVerifyOtpCodeFieldsProvider";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import LoginOtpScreen from "./screens/otpScreen/LoginOtpScreen";
import MainLayout from "./navigation/MainLayout";
import { PushTokenRegistrar } from "./functions/pushNotification/PushTokenRegistrar";

const Stack = createStackNavigator();

export default function App() {
  return (
    <LoginVerifyOtpCodeFieldsProvider>
      <PushTokenRegistrar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LoginOtpScreen" component={LoginOtpScreen} />
          <Stack.Screen name="MainLayout" component={MainLayout} />
        </Stack.Navigator>
      </NavigationContainer>
    </LoginVerifyOtpCodeFieldsProvider>
  );
}
