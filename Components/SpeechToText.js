import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Voice from 'react-native-voice';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState('');

  const startListening = async () => {
    try {
      await Voice.start('en-US'); // Set the language code
      setIsListening(true);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  // Add event listeners
  React.useEffect(() => {
    Voice.onSpeechResults = (event) => {
      setResult(event.value[0]); // First result
    };

    Voice.onSpeechError = (error) => {
      console.error('Speech recognition error:', error);
    };

    // Cleanup on unmount
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>{result || 'Speak something...'}</Text>
      <Button
        title={isListening ? 'Stop Listening' : 'Start Listening'}
        onPress={isListening ? stopListening : startListening}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginVertical: 20,
  },
});

export default SpeechToText;
