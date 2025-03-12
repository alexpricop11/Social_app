import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import axios from 'axios';
import BASE_URL from '@/BaseUrl';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useThemeStyles} from '@/hooks/theme';
import {Ionicons} from '@expo/vector-icons';

// Define the navigation stack parameter list
type RootStackParamList = {
    OtherProfile: { userId: number };
};

type OtherProfileNavigationProp = StackNavigationProp<RootStackParamList, 'OtherProfile'>;
type OtherProfileRouteProp = RouteProp<RootStackParamList, 'OtherProfile'>;

// Update User type with Instagram-like fields (optional)
type User = {
    id: number;
    username: string;
    profileImage?: string; // URL for profile picture
    bio?: string; // Optional bio text
    posts?: number; // Number of posts
    followers?: number; // Number of followers
    following?: number; // Number of following
};

type OtherProfileProps = {
    route: OtherProfileRouteProp;
    navigation: OtherProfileNavigationProp;
};

export default function OtherProfile({route, navigation}: OtherProfileProps) {
    const {userId} = route.params;
    const [user, setUser] = useState<User | null>(null);
    const {colors} = useThemeStyles();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/profile`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setUser(response.data);
                if (response.data.username) {
                    navigation.setOptions({
                        headerTitle: response.data.username,
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId, navigation]);

    if (!user) {
        return (
            <View style={[styles.loadingContainer, {backgroundColor: colors.background}]}>
                <ActivityIndicator size="large" color={colors.text}/>
            </View>
        );
    }

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            {/* Profile Header */}
            <View style={styles.header}>
                {/* Profile Image or Icon */}
                {user.profileImage ? (
                    <Image
                        source={{uri: user.profileImage}}
                        style={styles.profileImage}
                        onError={() => console.log('Error loading profile image')}
                    />
                ) : (
                    <Ionicons name="person-circle-outline" size={120} color={colors.text}/>
                )}

                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={[styles.statNumber, {color: colors.text}]}>
                            {user.posts ?? 0}
                        </Text>
                        <Text style={[styles.statLabel, {color: colors.text}]}>Postări</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={[styles.statNumber, {color: colors.text}]}>
                            {user.followers ?? 0}
                        </Text>
                        <Text style={[styles.statLabel, {color: colors.text}]}>Urmăritori</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={[styles.statNumber, {color: colors.text}]}>
                            {user.following ?? 0}
                        </Text>
                        <Text style={[styles.statLabel, {color: colors.text}]}>Urmărește</Text>
                    </View>
                </View>
            </View>

            {/* Username and Bio */}
            <View style={styles.infoContainer}>
                <Text style={[styles.username, {color: colors.text}]}>
                    {user.username}
                </Text>
                {user.bio && (
                    <Text style={[styles.bio, {color: colors.text}]}>
                        {user.bio}
                    </Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60, // Circular image
        marginRight: 20,
        borderWidth: 2,
        borderColor: '#ddd', // Subtle border like Instagram
    },
    statsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
    },
    infoContainer: {
        paddingHorizontal: 16,
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    bio: {
        fontSize: 16,
        lineHeight: 20,
    },
});
