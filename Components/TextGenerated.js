import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TextGenerated = ({ route }) => {
    const translatedText = route.params.translatedText; // Retrieve the response text

    return (
        <View style={styles.container}>
            <Text style={styles.resultText}>Generated Text:</Text>
            <Text style={styles.translatedText}>{translatedText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    resultText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    translatedText: {
        fontSize: 18,
        padding: 10,
        color: 'black'
    },
});

export default TextGenerated;
