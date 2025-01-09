import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Footer = ({ navigation }) => {
  const { width } = Dimensions.get('window'); // Get screen width

  return (
    <View style={[styles.footer, { paddingHorizontal: width * 0.05 }]}>
      <View style={[styles.iconContainer, { width: width * 0.9 }]}>
        {/* Translation Icon */}
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        >
          <MaterialCommunityIcons name="google-translate" size={width * 0.08} color="#000" />
          <Text style={styles.iconText}>Translation</Text>
        </TouchableOpacity>

        {/* History Icon */}
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => {
            navigation.navigate('History');
          }}
        >
          <MaterialCommunityIcons name="history" size={width * 0.08} color="#000" />
          <Text style={styles.iconText}>History</Text>
        </TouchableOpacity>

        {/* Account Icon */}
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => {
            navigation.navigate('Accounts');
          }}
        >
          <MaterialCommunityIcons name="account" size={width * 0.08} color="#000" />
          <Text style={styles.iconText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center', // Center items in the footer
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Wrap icons on smaller screens
    alignItems: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    marginHorizontal: 10, // Add spacing between icons
  },
  iconText: {
    fontSize: 12, // Base font size for footer text
    color: '#000',
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold'
  },
});

export default Footer;
