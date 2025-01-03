import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const Footer = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <View style={styles.iconContainer}>
        {/* Translation Icon */}
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="google-translate"
            size={40}
            color="#000"
          />
          <Text>Translation</Text>
        </TouchableOpacity>

        {/* History Icon */}
        <TouchableOpacity>
          <MaterialCommunityIcons name="history" size={40} color="#000" />
          <Text>History</Text>
        </TouchableOpacity>

        {/* Account Icon */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Accounts');
          }}
        >
          <MaterialCommunityIcons name="account" size={40} color="#000" />
          <Text>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Footer;
