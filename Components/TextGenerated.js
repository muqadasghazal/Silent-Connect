import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const TextGenerated = ({ route, navigation }) => {
    const translatedText = route.params.translatedText; // Retrieve the response text
    const unrecognizedCount = route.params.unrecognizedGestures;
    const processingTime = route.params.processingTime

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginRight: 9 }} onPress={() => navigation.navigate('Dashboard')}>
                    <Icon name='arrow-back' size={24} color="#22577A" />
                </TouchableOpacity>
                <Text style={styles.text}>Generated Text</Text>
            </View>
            <Text style={styles.translatedText}>{translatedText}</Text>
            <Text style={styles.remainingText}>Unrecognized Gestures: {unrecognizedCount}</Text>
            <Text style={styles.remainingText}>Processing Time : {processingTime}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF"

    },
    text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24,
        color: '#22577A'
    },

    translatedText: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        padding: 10,
        color: 'black'
    },
    remainingText: {
        color: 'green',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
    }
});

export default TextGenerated;
