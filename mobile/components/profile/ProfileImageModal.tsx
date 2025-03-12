import React from 'react';
import {
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {useThemeStyles} from '@/hooks/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '@/BaseUrl';

interface ProfileImageModalProps {
    visible: boolean;
    onClose: () => void;
    updateProfileImage: (newImage: string) => void;
}

const ProfileImageModal: React.FC<ProfileImageModalProps> = ({visible, onClose, updateProfileImage}) => {
    const {colors} = useThemeStyles();

    const uploadImageToBackend = async (imageUri: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'Token not found. Please log in again.');
                return;
            }

            const formData = new FormData();
            formData.append('profile_image', {
                uri: imageUri,
                name: 'profile_image.jpg',
                type: 'image/jpeg',
            } as any);

            const response = await axios.post(`${BASE_URL}/change-image-profile`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.profile_image_url) {
                updateProfileImage(response.data.profile_image_url);
                Alert.alert('Succes', 'Imaginea a fost actualizată cu succes!');
                onClose();
            }
        } catch (error) {
            Alert.alert('Eroare', String(error));
            console.error(error);
        }
    };

    const requestCameraPermissions = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permisiune necesară', 'Acordați permisiune pentru accesarea camerei.');
            return false;
        }
        return true;
    };

    const requestGalleryPermissions = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permisiune necesară', 'Acordați permisiune pentru accesarea galeriei.');
            return false;
        }
        return true;
    };

    const handleChangeImage = async () => {
        const hasPermission = await requestCameraPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });


        if (!result.canceled) {
            await uploadImageToBackend(result.assets[0].uri);
        }
    };

    const handlePickImageFromGallery = async () => {
        const hasPermission = await requestGalleryPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            await uploadImageToBackend(result.assets[0].uri);
        }
    };

    const handleDeleteImage = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'Token not found. Please log in again.');
                return;
            }

            await axios.delete(`${BASE_URL}/delete-image-profile`, {
                headers: {Authorization: `Bearer ${token}`},
            });

            updateProfileImage('');
            Alert.alert('Succes', 'Imaginea a fost ștearsă cu succes!');
            onClose();
        } catch (error) {
            Alert.alert('Eroare', String(error));
            console.error(error);
        }
    };

    return (
        <Modal transparent={true} visible={visible} onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.modalContent, {backgroundColor: colors.background}]}>
                            <TouchableOpacity style={styles.modalOption} onPress={handleChangeImage}>
                                <Text style={[styles.modalOptionText, {color: colors.text}]}>
                                    Fă o poză
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalOption} onPress={handlePickImageFromGallery}>
                                <Text style={[styles.modalOptionText, {color: colors.text}]}>
                                    Alege din galerie
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalOption} onPress={handleDeleteImage}>
                                <Text style={[styles.modalOptionText, {color: colors.text}]}>
                                    Șterge poza
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalOption} onPress={onClose}>
                                <Text style={[styles.modalOptionText, {color: colors.text}]}>
                                    Anulează
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        borderRadius: 10,
    },
    modalOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalOptionText: {
        fontSize: 18,
    },
});

export default ProfileImageModal;