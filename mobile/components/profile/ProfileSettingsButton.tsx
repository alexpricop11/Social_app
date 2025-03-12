import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useThemeStyles} from '@/hooks/theme';

interface ProfileSettingsButtonProps {
    onPress: () => void;
}

const ProfileSettingsButton: React.FC<ProfileSettingsButtonProps> = ({onPress}) => {
    const {colors} = useThemeStyles();

    return (
        <TouchableOpacity onPress={onPress} style={styles.settings}>
            <Feather name="settings" size={28} color={colors.text}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    settings: {
        position: "absolute",
        top: 30,
        right: 10,
        padding: 10,
    },
});

export default ProfileSettingsButton;