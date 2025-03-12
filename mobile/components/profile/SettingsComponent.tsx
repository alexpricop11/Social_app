import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useThemeStyles} from "@/hooks/theme";
import {useTheme} from "@/hooks/UseColorScheme";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import LogoutButton from "@/components/profile/LogoutButton";

export default function SettingsComponent() {
    const {colors} = useThemeStyles();
    const {isDarkMode, toggleTheme} = useTheme();
    const navigation = useNavigation<NavigationProp<{ EditProfileComponent: undefined }>>();

    const renderButton = (title: string, onPress: () => void) => (
        <TouchableOpacity
            style={[styles.button, {borderColor: colors.borderColor}]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, {color: colors.text}]}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            {renderButton("Editează profilul", () => navigation.navigate('EditProfileComponent'))}
            {renderButton("Schimbă parola", () => {
            })}
            {renderButton(`Schimbă tema (${isDarkMode ? "Luminoasă" : "Întunecată"})`, toggleTheme)}
            <LogoutButton/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
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