import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';
import Tts from 'react-native-tts';

const App = () => {
  const [text, setText] = useState('');
  const [processedText, setProcessedText] = useState('');

  const processTextWithDeepSeek = async (inputText) => {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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', // Replace with your OpenRouter API key
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost',
          'X-Title': 'silentConnect',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: [
            { role: 'user', content: `just return the answer not a single extra word and donot change the words at all Fix grammar, punctuation, and structure: ${inputText}` }
          ]
        })
      });

      if (!response.ok) {
        console.error('Error from DeepSeek:', response.status, response.statusText);
        return 'Failed to process the text with DeepSeek.';
      }

      const data = await response.json();
      console.log('DeepSeek Response:', data);

      if (data.choices && data.choices[0].message.content) {
        const completedSentence = data.choices[0].message.content.trim();
        return completedSentence;
      } else {
        return 'Failed to process the text with DeepSeek.';
      }
    } catch (error) {
      console.error('Error processing text with DeepSeek:', error);
      return 'Error occurred while processing text.';
    }
  };

  const speakText = async () => {
    if (text) {
      const processedSentence = await processTextWithDeepSeek(text);

      if (processedSentence) {
        setProcessedText(processedSentence);
      }
    }
  };
 const handleProcessText = async () => {
    if (text) {
      const processedSentence = await processTextWithDeepSeek(text);

      if (processedSentence) {
        setProcessedText(processedSentence);
      } else {
        setProcessedText('Failed to process the text.');
      }
    } else {
      setProcessedText('Please enter some text first.');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter text here"
        value={text}
        onChangeText={setText}
      />
      <Button title="Process Text" onPress={handleProcessText} />
      {processedText ? (
        <View style={styles.processedTextContainer}>
          <Text style={styles.processedText}>{processedText}</Text>
          <Button title="Speak" onPress={() => Tts.speak(processedText)} />
        </View>
      ) : null}
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
  processedTextContainer: {
    marginTop: 20,
  },
  processedText: {
    fontSize: 16,
    color: '#333',
  },
});

export default App;
