import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import BASE_URL from '@/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, ParamListBase, useNavigation} from '@react-navigation/native';
import {useThemeStyles} from '@/hooks/theme';
import ProfileSettingsButton from '@/components/profile/ProfileSettingsButton';
import ProfileImageModal from '@/components/profile/ProfileImageModal';
import ProfileHeader from '@/components/profile/ProfileHeader';

interface ProfileData {
    username: string;
    profile_image: string;
    birthday?: string;
    email?: string;
    phone_number?: string;
}

const MyProfile: React.FC = () => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const {colors} = useThemeStyles();

    const fetchProfileData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'Token not found. Please log in again.');
                setLoading(false);
                return;
            }

            const response = await axios.get(`${BASE_URL}/profile`, {
                headers: {Authorization: `Bearer ${token}`},
            });

            setProfileData(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while fetching profile data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const updateProfileImage = (newImageUri: string) => {
        setProfileData((prevData) =>
            prevData ? {...prevData, profile_image: newImageUri} : null
        );
    };

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            {loading ? (
                <ActivityIndicator size="large" color={colors.text}/>
            ) : (
                <>
                    <ProfileHeader
                        profileData={{
                            username: profileData?.username || '',
                            profile_image: profileData?.profile_image || '',
                            birthday: profileData?.birthday || '',
                            email: profileData?.email || '',
                            phone_number: profileData?.phone_number || '',
                        }}
                        onImagePress={() => setModalVisible(true)}
                    />
                    <ProfileSettingsButton onPress={() => navigation.navigate('SettingsComponent')}/>
                </>
            )}
            <ProfileImageModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                updateProfileImage={updateProfileImage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
});

export default MyProfile;