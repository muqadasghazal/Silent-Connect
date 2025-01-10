import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import Tts from 'react-native-tts';

const History = () => {
    const [loading, setLoading] = useState(true);
    const [historyList, setHistoryList] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('userInput')
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                snapshot => {
                    const data = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setHistoryList(data);
                    setLoading(false);
                },
                error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                }
            );

        // Initialize TTS settings
        Tts.setDefaultLanguage('en-US'); // Set the language to English (adjust if needed)
        Tts.setDefaultRate(0.5); // Adjust the speech rate
        Tts.setDefaultPitch(0.7); // Adjust pitch

        return () => unsubscribe();
    }, []);

    const handlePlayPress = (inputText) => {
        // No console log here, you can add play button logic if needed
    };

    const handleSpeakerPress = (inputText) => {
        if (inputText) {
            Tts.speak(inputText); // Speak the input text
        } else {
            Tts.speak('No text available to speak.');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#22577A" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>History</Text>
            {historyList.length === 0 ? (
                <Text style={styles.noDataText}>No history found</Text>
            ) : (
                <FlatList
                    data={historyList}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.itemText}>{item.inputText || 'No Input Text Available'}</Text>
                                <Text style={styles.dateText}>{new Date(item.createdAt.seconds * 1000).toLocaleString()}</Text>
                            </View>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity onPress={() => handlePlayPress(item.inputText)}>
                                    <Icon name="play-circle" size={24} color="#22577A" style={styles.icon} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleSpeakerPress(item.inputText)}>
                                    <Icon name="volume-up" size={24} color="#22577A" style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#22577A',
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    dateText: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default History;