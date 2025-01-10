import React, { useState } from 'react';
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

//this is code for dashboard
const Dashboard = ({ navigation }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [text, setText] = useState('');
  const { width, height } = Dimensions.get('window'); // Get screen width and height

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsTyping(false);
  };

  const saveTextToFirestore = async () => {
    if (text.trim() !== '') {
      try {
        await firestore().collection('userInput').add({
          inputText: text,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        console.log('Text saved to Firestore!');
        setText(''); // Clear the text field after saving
      } catch (error) {
        console.error('Error saving text to Firestore:', error);
      }
    } else {
      console.warn('Text field is empty!');
    }
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
              { marginHorizontal: width * 0.05 }, // Dynamic margin
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Type to translate"
              placeholderTextColor="#888"
              onFocus={() => setIsTyping(true)}
              value={text}
              onChangeText={(t) => setText(t)}
            />
            {isTyping ? (
              <TouchableOpacity
                style={styles.sendButton}
                onPress={saveTextToFirestore} // Save text when send button is pressed
              >
                <Ionicons name="send-sharp" size={25} color="#000" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.microphone}>
                <FontAwesome name="microphone" size={28} color="#000" />
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
    color: '#000000'
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
