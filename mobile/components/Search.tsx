import React, {useState, useCallback} from 'react';
import {
    ScrollView,
    TextInput,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {useThemeStyles} from '@/hooks/theme';
import axios from 'axios';
import {debounce} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import BASE_URL from '@/BaseUrl';

type User = {
    id: number;
    username: string;
};

export default function Search() {
    const {colors} = useThemeStyles();
    const navigation = useNavigation<any>();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<User[]>([]);

    const search = useCallback(
        debounce(async (username: string) => {
            if (!username.trim()) {
                setResults([]);
                return;
            }
            try {
                const response = await axios.get<User[]>(`${BASE_URL}/search-user/${username}`);
                if (response.status === 200) {
                    setResults(response.data);
                }
            } catch (error) {
                console.error('Eroare la căutare:', error);
                setResults([]); // Resetăm rezultatele în caz de eroare
            }
        }, 500),
        []
    );

    const handleUserPress = (user: User) => {
        navigation.navigate('OtherProfile', {userId: user.id});
    };

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <View style={[styles.searchBar, {borderColor: colors.borderColor}]}>
                <TextInput
                    value={query}
                    onChangeText={(text) => {
                        setQuery(text);
                        search(text);
                    }}
                    placeholder="Caută..."
                    placeholderTextColor={colors.text}
                    style={[styles.input, {color: colors.text}]}
                />
            </View>

            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {results.length === 0 && query ? (
                    <Text style={[styles.emptyText, {color: colors.text}]}>
                        Niciun rezultat găsit.
                    </Text>
                ) : (
                    results.map((user) => (
                        <TouchableOpacity
                            key={user.id}
                            style={[styles.resultItem, {borderBottomColor: colors.borderColor}]}
                            onPress={() => handleUserPress(user)}
                        >
                            <Text style={{color: colors.text}}>{user.username}</Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchBar: {
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: '#042177',
        padding: 8,
    },
    input: {
        fontSize: 16,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 10,
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
});