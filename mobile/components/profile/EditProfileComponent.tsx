import React, {useState, useEffect} from 'react';
import {useThemeStyles} from "@/hooks/theme";
import {Alert, View, TextInput, Button, StyleSheet} from "react-native";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import BASE_URL from "@/BaseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfileComponent() {
    const {colors} = useThemeStyles();
    const [profileData, setProfileData] = useState<{
        username: string;
        birthday: string;
        email: string;
        phone_number: string;
    }>({username: '', birthday: '', email: '', phone_number: ''});
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp<{ HomePage: { screen: string }; SettingsComponent: undefined }>>();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const response = await axios.get(`${BASE_URL}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setProfileData(response.data);
                } else {
                    Alert.alert("Error", "Nu s-au putut prelua datele din profil!");
                }
            } catch (error) {
                Alert.alert("Error", "O eroare s-a produs la preluarea datelor profilului!");
            } finally {
                setLoading(false);
            }
        };
        fetchProfileData();
    }, []);

    const handleChange = (field: string, value: string) => {
        setProfileData({...profileData, [field]: value});
    };

    const EditProfile = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.put(`${BASE_URL}/edit-profile`, profileData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                navigation.navigate('HomePage', {screen: 'Profile'})
            } else {
                Alert.alert("Eroare", "Profilul nu a putut fi actualizat!");
            }
        } catch (error) {
            console.error(error)
            Alert.alert(String(error));
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, {backgroundColor: colors.background}]}>
                <Button title="Loading..." disabled={true} color={colors.placeholderTextColor}/>
            </View>
        );
    }

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <TextInput
                style={[styles.input, {borderColor: colors.borderColor, color: colors.text,}]}
                placeholder="Username"
                placeholderTextColor={colors.placeholderTextColor}
                value={profileData.username}
                onChangeText={(value) => handleChange('username', value)}
            />
            <TextInput
                style={[styles.input, {borderColor: colors.borderColor, color: colors.text,}]}
                placeholder="Birthday"
                placeholderTextColor={colors.placeholderTextColor}
                value={profileData.birthday}
                onChangeText={(value) => handleChange('birthday', value)}
            />
            <TextInput
                style={[styles.input, {borderColor: colors.borderColor, color: colors.text,}]}
                placeholder="Email"
                placeholderTextColor={colors.placeholderTextColor}
                value={profileData.email}
                keyboardType="email-address"
                onChangeText={(value) => handleChange('email', value)}
            />
            <TextInput
                style={[styles.input, {borderColor: colors.borderColor, color: colors.text,}]}
                placeholder="Phone Number"
                placeholderTextColor={colors.placeholderTextColor}
                value={profileData.phone_number}
                keyboardType="phone-pad"
                onChangeText={(value) => handleChange('phone_number', value)}
            />
            <Button title="Editează profilul" onPress={EditProfile} color="green"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
        borderRadius: 10,
    }
});