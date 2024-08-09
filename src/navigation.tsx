import First from "./views/Onboarding/First";
import CriarAlarme from "./views/Onboarding/CriarAlarme/CriarAlarme";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
}

export type OnboardingStackParamList = {
    First: undefined;
    CriarAlarme: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = () => {
    return (
        <OnboardingStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <OnboardingStack.Screen name="First" component={First} />
            <OnboardingStack.Screen name="CriarAlarme" component={CriarAlarme} />
        </OnboardingStack.Navigator>
    )
}

export const RootNavigator = () => {
    return (
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
           <RootStack.Screen name="Onboarding" component={OnboardingNavigator}/> 
        </RootStack.Navigator>
    );
};