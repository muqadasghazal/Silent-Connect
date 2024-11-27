import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import Tts from 'react-native-tts';

const App = () => {
  const [text, setText] = useState(''); // State to store the input text

  const speakText = () => {
    if (text) {
      Tts.speak(text); // Speak the entered text
    } else {
      Tts.speak('Please enter some text first.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter text here"
        value={text}
        onChangeText={setText} // Update state as the user types
      />
      <Button title="Speak" onPress={speakText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default App;
