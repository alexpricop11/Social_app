import React, {useState} from "react";
import {View, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Text} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation, NavigationProp} from "@react-navigation/native";
import BASE_URL from "@/BaseUrl";
import {useThemeStyles} from "@/hooks/theme";


export default function LoginComponent() {
    const navigation = useNavigation<NavigationProp<{ HomePage: undefined }>>();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const {colors} = useThemeStyles();

    const Login = async () => {
        if (!username || !password) {
            Alert.alert("Eroare", "Completează toate câmpurile!");
            return;
        }
        const userData = {
            username: username.trim(),
            password: password.trim(),

        };
        try {
            const response = await axios.post(`${BASE_URL}/login`, userData);
            if (response.status === 200) {
                const {token, user_id, username} = response.data;
                await AsyncStorage.setItem("token", token);
                await AsyncStorage.setItem("user_id", user_id);
                await AsyncStorage.setItem("username", username);
                navigation.navigate("HomePage");
            } else {
                Alert.alert("Eroare", "Încercarea de logare a eșuat. Te rugăm să încerci din nou!");
            }
        } catch (error) {
            Alert.alert(String(error))
        }
    };
    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <TextInput
                style={[styles.input, {borderColor: colors.borderColor, color: colors.text}]}
                placeholder="Numele"
                placeholderTextColor={colors.placeholderTextColor}
                onChangeText={setUsername}
                value={username}
                autoCapitalize="none"
            />
            <View style={{position: 'relative'}}>
                <TextInput
                    style={[styles.input, {borderColor: colors.borderColor, color: colors.text}]}
                    placeholder="Parola"
                    onChangeText={setPassword}
                    value={password}
                    placeholderTextColor={colors.placeholderTextColor}
                    secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                    style={{position: 'absolute', right: 10, top: 10}}
                    onPress={() => setPasswordVisible(!isPasswordVisible)}
                >
                    <Ionicons
                        name={isPasswordVisible ? "eye-off" : "eye"}
                        size={24}
                        color={colors.text}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity>
                <Text style={[styles.text, {color: colors.text}]}>
                    Ai uitat parola?
                </Text>
            </TouchableOpacity>
            <Button title="Login" onPress={Login} color={"green"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        marginBottom: 15,
    },
    text: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        textAlign: "right",
    },
});