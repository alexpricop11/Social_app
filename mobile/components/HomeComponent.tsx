import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class HomeComponent extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.appBar, {position: 'absolute', top: 0}]}>
                    <Text style={styles.appBarText}>APSocial</Text>
                </View>
                <Text style={styles.text}>Bun venit pe pagina principala</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    appBar: {
        width: '100%',
        backgroundColor: 'rgb(60,58,58)',
        padding: 15,
        alignItems: 'center',
    },
    appBarText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
    },
});