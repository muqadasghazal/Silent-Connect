import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Footer from './Footer';
const Dashboard = ({navigation}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={require('../assets/images/Dashboard.jpg')}
          resizeMode="contain"
        />
      </View>

      {/* Input and Buttons */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type to translate"
          placeholderTextColor="#888"
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          value={text}
          onChangeText={t => setText(t)}
        />
        {isTyping ? (
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send-sharp" size={25} color="#000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.microphone}>
            <FontAwesome name="microphone" size={28} color="#000" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.camera}
          onPress={() => navigation.navigate('VideoRecorder')}>
          <AntDesign name="camera" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Footer navigation={navigation} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  avatarContainer: {
    marginTop: 80,
    height: '70%',
    alignItems: 'center',
  },
  avatar: {
    width: 300,
    height: 300,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  
});
