import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Footer from './Footer'; // Make sure to import the Footer component
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TextGenerated({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Generated Text</Text>
        <View style={styles.manualTextContainer}>
          <Text style={styles.manualText}>Hi, how are you?</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="volume-high" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  manualTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2, // Shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  manualText: {
    fontSize: 18,
    marginRight: 10,
    color: '#333',
  },
});
