import React, {useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import LoginComponent from "@/components/auth/LoginComponent";
import RegisterComponent from "@/components/auth/RegisterComponent";
import {useThemeStyles} from "@/hooks/theme";


export default function AuthPage() {
    const [activeTab, setActiveTab] = useState("register");
    const {colors} = useThemeStyles();

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <Text style={styles.text}>Bun venit pe APSocial!</Text>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === "register" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("register")}
                >
                    <Text style={[styles.tabText, {color: colors.tabText}]}>Înregistrare</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === "login" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("login")}
                >
                    <Text style={[styles.tabText, {color: colors.tabText}]}>Login</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.formContainer}>
                {activeTab === "register" ? <RegisterComponent/> : <LoginComponent/>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
        color: "green",
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        borderBottomWidth: 2,
        borderColor: "lightgray",
    },
    activeTab: {
        borderColor: "green",
    },
    tabText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    formContainer: {
        flex: 1,
    },
});