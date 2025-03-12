import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import HomeComponent from "@/components/HomeComponent";
import MyProfile from "@/components/MyProfile";
import Search from "@/components/Search";
import {useThemeStyles} from "@/hooks/theme";
import {View, Text, StyleSheet} from "react-native";

const Tab = createBottomTabNavigator();
const ChatScreen = () => <View style={styles.screen}><Text>Chat</Text></View>;
const NotificationsScreen = () => <View style={styles.screen}><Text>Notifications</Text></View>;

export default function AppNavigator() {
    const {colors} = useThemeStyles();

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName: keyof typeof Ionicons.glyphMap = "help";
                    switch (route.name) {
                        case "Home":
                            iconName = focused ? "home" : "home-outline";
                            break;
                        case "Search":
                            iconName = focused ? "search" : "search-outline";
                            break;
                        case "Chat":
                            iconName = focused ? "chatbubble" : "chatbubble-outline";
                            break;
                        case "Notifications":
                            iconName = focused ? "notifications" : "notifications-outline";
                            break;
                        case "Profile":
                            iconName = focused ? "person" : "person-outline";
                            break;
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: colors.tabBarActive,
                tabBarInactiveTintColor: colors.tabBarInactive,
                tabBarStyle: {backgroundColor: colors.tabBarBackground},
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeComponent}/>
            <Tab.Screen name="Search" component={Search}/>
            <Tab.Screen name="Chat" component={ChatScreen}/>
            <Tab.Screen name="Notifications" component={NotificationsScreen}/>
            <Tab.Screen name="Profile" component={MyProfile}/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
