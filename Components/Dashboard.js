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
import auth from '@react-native-firebase/auth';
import Video from 'react-native-video';

const Dashboard = ({ navigation }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [text, setText] = useState('');
  const { width, height } = Dimensions.get('window');

  const [videoList, setVideoList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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

    if (text.trim() === '') {
      console.warn('Text field is empty!');
      return;
    }

    try {
      // Save user input
      await firestore().collection('userInput').add({
        userId: user.uid,
        inputText: text,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log('Text saved to Firestore!');
      // Call API to get video gestures
      await callApiForVideos(text);
    } catch (error) {
      console.error('Error saving text:', error);
    }
  };

  const callApiForVideos = async (inputText) => {
    try {
      console.log('Calling API with text:', inputText); // ✅ Confirmation log

      const response = await fetch('http://10.0.2.2:3000/api/text-to-sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence: inputText }),
      });

      const data = await response.json();

      console.log('API response received:', data); // ✅ Confirmation log
      if (data.videos.length > 0) {
        const updatedUrls = data.videos.map(url =>
          url.replace('http://localhost:3000', 'http://10.0.2.2:3000')
        );
        setVideoList(updatedUrls);
        setCurrentIndex(0);
        setIsPlaying(true);
      }
      else {
        console.log('No videos found for the input text.');
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };


  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {/* Avatar or Video */}
        <View style={styles.avatarContainer}>
          {isPlaying && videoList.length > 0 ? (
            <Video
              source={{ uri: videoList[currentIndex] }}
              style={styles.avatar}
              resizeMode="contain"
              onBuffer={() => console.log('⏳ Buffering...')}
              onLoad={() => console.log('✅ Video loaded')}
              onError={(e) => console.log('❌ Video error:', e)}
              onEnd={() => {
                if (currentIndex + 1 < videoList.length) {
                  setCurrentIndex(currentIndex + 1);
                } else {
                  setIsPlaying(false);
                }
              }}
              controls={false}
              repeat={false}
            />
          ) : (
            <Image
              style={styles.avatar}
              source={require('../assets/images/Dashboard.jpg')}
              resizeMode="contain"
            />
          )}
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
              value={text}
              onChangeText={(t) => setText(t)}
            />
            {isTyping ? (
              <TouchableOpacity
                style={styles.sendButton}
                onPress={saveTextToFirestore}
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
