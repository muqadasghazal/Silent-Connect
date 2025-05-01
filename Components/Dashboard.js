import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import Footer from './Footer';
import auth from '@react-native-firebase/auth';
import Voice from '@react-native-voice/voice';

const Dashboard = ({ navigation }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [text, setText] = useState('');
  const { width, height } = Dimensions.get('window');
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsTyping(false);
  };

  const saveTextToFirestore = async () => {
    const user = auth().currentUser;

    if (!user) {
      console.warn('User not authenticated');
      return;
    }

    const textToSave = text.trim() !== '' ? text : recognizedText.trim(); // Check if manually typed or recognized text is available

    if (textToSave !== '') {
      try {
        await firestore().collection('userInput').add({
          userId: user.uid,
          inputText: textToSave,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        console.log('Text saved to Firestore!');
        setText(''); // Clear the text after sending
        setRecognizedText(''); // Clear the recognized text after saving
      } catch (error) {
        console.error('Error saving text to Firestore:', error);
      }
    } else {
      console.warn('Text field is empty!');
    }
  };

  useEffect(() => {
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechEndHandler = () => {
    setIsRecording(false);
  };

  const onSpeechResultsHandler = (e) => {
    console.log('Speech Results Event: ', e);
    if (e && e.value && e.value.length > 0) {
      const newVoiceText = e.value[0];
      setText(prevText => (prevText ? prevText + ' ' + newVoiceText : newVoiceText)); // add voice text to already typed text
    }
  
  
  };

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting Voice Recognition: ', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (error) {
      console.error('Error stopping Voice Recognition: ', error);
    }
  };

  const handleMicPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleTextChange = (text) => {
    setText(text);
    setIsTyping(true);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('../assets/images/Dashboard.jpg')}
            resizeMode="contain"
          />
        </View>

        {/* Input and Footer */}
        <View style={styles.bottomContainer}>
          <View
            style={[
              styles.inputContainer,
              { marginHorizontal: width * 0.05 },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Type to translate"
              placeholderTextColor="#888"
              onFocus={() => setIsTyping(true)}
              value={text || recognizedText} // Allow both manual text and voice-recognized text
              onChangeText={handleTextChange} // Allow manual text entry
            />
            {(text || recognizedText) && isTyping ? ( // Show send button if there is text
              <TouchableOpacity
                style={styles.sendButton}
                onPress={saveTextToFirestore} // Save text when send button is pressed
              >
                <Ionicons name="send-sharp" size={25} color="#000" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.microphone} onPress={handleMicPress}>
                <FontAwesome
                  name="microphone"
                  size={28}
                  color={isRecording ? 'red' : 'black'}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.camera}
              onPress={() => navigation.navigate('VideoRecorder')}
            >
              <AntDesign name="camera" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          <Footer navigation={navigation} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 300,
    height: 300,
  },
  bottomContainer: {
    justifyContent: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  sendButton: {
    marginLeft: 10,
  },
  microphone: {
    marginLeft: 10,
  },
  camera: {
    marginLeft: 10,
  },
});
