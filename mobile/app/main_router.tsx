import React, {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthPage from '@/app/AuthPage';
import {View, ActivityIndicator} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OtherProfile from '@/components/OtherProfile';
import AppNavigator from '@/components/AppNavigator';

type RootStackParamList = {
    AuthPage: undefined;
    AppNavigator: undefined;
    OtherProfile: { userId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainRouter() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkToken = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            setIsAuthenticated(!!token);
        } catch (error) {
            console.error('Eroare la verificarea token-ului:', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkToken();
    }, [checkToken]);

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="green"/>
            </View>
        );
    }

    return (
        <Stack.Navigator
            initialRouteName={isAuthenticated ? 'AppNavigator' : 'AuthPage'}
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="AuthPage" component={AuthPage}/>
            <Stack.Screen name="AppNavigator" component={AppNavigator}/>
            <Stack.Screen
                name="OtherProfile"
                component={OtherProfile}
                options={{headerShown: true, headerTitle: ''}}
            />
        </Stack.Navigator>
    );
}