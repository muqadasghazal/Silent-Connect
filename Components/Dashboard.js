import React, {useState} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
        <TouchableOpacity style={styles.camera}>
          <AntDesign name="camera" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="google-translate"
              size={40}
              color="#000"
            />
            <Text>Translation</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons name="history" size={40} color="#000" />
            <Text>History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Accounts');
            }}>
            <MaterialCommunityIcons name="account" size={40} color="#000" />
            <Text>Account</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  sendButton: {
    marginLeft: 10,
  },
  microphone: {
    marginLeft: 10,
  },

  camera: {
    marginLeft: 10,
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
