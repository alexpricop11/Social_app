import React from 'react';
import {TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {useThemeStyles} from "@/hooks/theme";
import BASE_URL from "@/BaseUrl";
import axios from "axios";

export default function LogoutButton() {
    const {colors} = useThemeStyles();
    const navigation = useNavigation<NavigationProp<{ AuthPage: undefined }>>();

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user_id");
            await AsyncStorage.removeItem("username");
            navigation.navigate("AuthPage");
        } catch (error) {
            console.log("Eroare la delogare:", error);
            Alert.alert("Eroare", "Nu s-a putut efectua delogarea.");
        }
    };


    const confirmLogout = () => {
        Alert.alert(
            "Deconectare",
            "Sigur vrei să ieși din cont?",
            [
                {text: "Anulează", style: "cancel"},
                {text: "Da", onPress: logout}
            ]
        );
    };

    return (
        <TouchableOpacity
            style={[styles.button, {borderColor: colors.borderColor}]}
            onPress={confirmLogout}
        >
            <Text style={[styles.buttonText, {color: colors.text}]}>Ieșire</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
