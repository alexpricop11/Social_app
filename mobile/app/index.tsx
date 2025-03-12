import React from 'react';
import {View, StyleSheet} from 'react-native';
import MainRouter from '@/app/main_router';
import {ThemeProvider, useTheme} from "@/hooks/UseColorScheme";

function Index() {
    const {isDarkMode} = useTheme();

    return (
        <View
            style={[
                styles.container,
                isDarkMode ? styles.darkBackground : styles.lightBackground,
            ]}
        >
            <MainRouter/>
        </View>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <Index/>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    darkBackground: {
        backgroundColor: 'black',
    },
    lightBackground: {
        backgroundColor: 'white',
    },
});