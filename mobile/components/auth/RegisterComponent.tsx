import React, {useState} from "react";
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation, NavigationProp} from "@react-navigation/native";
import BASE_URL from "@/BaseUrl";
import {useThemeStyles} from "@/hooks/theme";


export default function RegisterComponent() {
    const navigation = useNavigation<NavigationProp<{ HomePage: undefined }>>();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const {colors} = useThemeStyles();


    const Register = async () => {
        if (!username || !password) {
            Alert.alert("Eroare", "Completează toate câmpurile!");
            return;
        }

        const userData = {
            username: username.trim(),
            password: password.trim(),
            email: email.trim(),
            phone: phone.trim(),
            birthday: birthday.trim(),
        };

        try {
            const response = await axios.post(`${BASE_URL}/register`, userData);
            if (response.status === 200 || response.status === 201) {
                const {token, user_id} = response.data;
                await AsyncStorage.setItem("token", token);
                await AsyncStorage.setItem("user_id", user_id);
                navigation.navigate("HomePage");
            } else {
                Alert.alert("Eroare", "Încercarea de înregistrare a eșuat. Te rugăm să încerci din nou!");
            }
        } catch (error: any) {
            console.error("Eroare la server:", error);

            if (error.response && error.response.data) {
                const serverMessage =
                    error.response.data.non_field_errors?.[0] ||
                    error.response.data.username?.[0] ||
                    error.response.data.email?.[0] ||
                    "Încercarea de înregistrare a eșuat.";
                Alert.alert("Eroare", serverMessage);
            } else {
                Alert.alert("Eroare", "Nu s-a putut conecta la server. Verifică conexiunea!");
            }
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
            <View style={{position: "relative"}}>
                <TextInput
                    style={[styles.input, {borderColor: colors.borderColor, color: colors.text}]}
                    placeholder="Parola"
                    onChangeText={setPassword}
                    value={password}
                    placeholderTextColor={colors.placeholderTextColor}
                    secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                    style={{position: "absolute", right: 10, top: 10}}
                    onPress={() => setPasswordVisible(!isPasswordVisible)}
                >
                    <Ionicons
                        name={isPasswordVisible ? "eye-off" : "eye"}
                        size={24}
                        color={colors.text}
                    />
                </TouchableOpacity>
            </View>
            <TextInput
                style={[styles.input, {borderColor: colors.borderColor, color: colors.text}]}
                placeholder="Email"
                placeholderTextColor={colors.placeholderTextColor}
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={[styles.input, {borderColor: colors.borderColor, color: colors.text}]}
                placeholder="Numărul de telefon"
                placeholderTextColor={colors.placeholderTextColor}
                onChangeText={setPhone}
                value={phone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={[styles.input, {borderColor: colors.borderColor, color: colors.text}]}
                placeholder="Data de naștere"
                placeholderTextColor={colors.placeholderTextColor}
                onChangeText={setBirthday}
                value={birthday}
            />
            <Button title="Înregistrare" onPress={Register} color={"green"}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        marginBottom: 15,
    },
});