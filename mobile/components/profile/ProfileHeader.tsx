import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useThemeStyles} from '@/hooks/theme';
import BASE_URL from "@/BaseUrl";

interface ProfileHeaderProps {
    profileData: {
        username: string;
        profile_image: string;
        birthday: string;
        email: string;
        phone_number: string;
    };
    onImagePress: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({profileData, onImagePress}) => {
    const {colors} = useThemeStyles();

    return (
        <View style={styles.header}>
            <View style={styles.profileImageWrapper}>
                <TouchableOpacity onPress={onImagePress}>
                    {profileData.profile_image ? (
                        <Image
                            source={{uri: `${BASE_URL}${profileData.profile_image}`}}
                            style={styles.profileImage}
                            onError={(e) => console.log("Failed to load image:", e.nativeEvent.error)}
                        />
                    ) : (
                        <MaterialIcons name="person" size={70} color={colors.text}/>
                    )}
                </TouchableOpacity>
                <Text style={[styles.birthday, {color: colors.text}]}>{profileData.birthday}</Text>
                <Text style={[styles.email, {color: colors.text}]}>{profileData.email}</Text>
                <Text style={[styles.phone, {color: colors.text}]}>{profileData.phone_number}</Text>
            </View>
            <Text style={[styles.text, {color: colors.text}]}>{profileData.username}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
    },
    profileImageWrapper: {
        alignItems: "flex-start",
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "white",
    },
    text: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
    birthday: {
        fontSize: 16,
        marginTop: 5,
    },
    email: {
        fontSize: 16,
        marginTop: 5,
    },
    phone: {
        fontSize: 16,
        marginTop: 5,
    },
});

export default ProfileHeader;