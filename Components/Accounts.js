import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FAQScreen from './FaqsPage';


const Accounts = ({ navigation }) => {
  // Replace this with actual data from your database
  const userData = {
    email: "user@example.com",
    name: "sidra",
  };

  return (
    <View style={styles.container}>
      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.section}>
        <View style={styles.item}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.email}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{userData.name}</Text>
        </View>
      </View>

      {/* Help Section */}
      <Text style={styles.sectionTitle}>Help</Text>
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("Faqs")}
        >
          <Text style={styles.label}>Frequently Asked Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Feedback')}
        >
          <Text style={styles.label}>Feedback</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <Text style={styles.sectionTitle}>About App</Text>
      <View style={styles.section}>
        <View style={styles.item}>
          <Text style={styles.label}>Version: </Text>
          <Text style={styles.value}>1.0</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#22577A',
  },
  section: {
 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    display:"flex"

    
    
  },
  label: {
    
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
    
  },
  logoutButton: {
    backgroundColor: '#22577A',
    width: '100%',
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
        fontFamily: 'Poppins-SemiBold',
  },
  deleteButton: {
   
    width: '100%',
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },
  deleteText: {
    color: 'red',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Accounts;
