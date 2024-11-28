import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; // Import Firebase Authentication

const Accounts = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // State for the specific user's data

  useEffect(() => {
    // Get the current logged-in user
    const currentUser = auth().currentUser;

    if (currentUser) {
      // Fetch the user's data from Firestore
      firestore()
        .collection('users')
        .doc(currentUser.uid) // Query by UID
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            setUserData(documentSnapshot.data());
          } else {
            console.error('User document does not exist!');
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setLoading(false);
        });
    } else {
      console.error('No user is logged in');
      setLoading(false);
    }
  }, []);
  const deleteAccount = () => {
    const currentUser = auth().currentUser;

    if (currentUser) {
      Alert.alert(
        'Delete Account',
        'Are you sure you want to delete your account? This action cannot be undone.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              // Delete user document from Firestore
              firestore()
                .collection('users')
                .doc(currentUser.uid)
                .delete()
                .then(() => {
                  console.log('User data deleted from Firestore');

                  // Delete user from Firebase Authentication
                  currentUser
                    .delete()
                    .then(() => {
                      console.log('User account deleted');
                      Alert.alert(
                        'Account Deleted',
                        'Your account has been deleted successfully.',
                        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
                      );
                    })
                    .catch(error => {
                      console.error('Error deleting user account:', error);
                      Alert.alert('Error', 'Failed to delete account. Please try again later.');
                    });
                })
                .catch(error => {
                  console.error('Error deleting user data:', error);
                  Alert.alert('Error', 'Failed to delete user data. Please try again later.');
                });
            },
          },
        ]
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.section}>
        <View style={styles.item}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData?.email || 'N/A'}</Text>
        </View>
        <View style={styles.item2}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}> {`${userData?.firstName || 'N/A'} ${userData?.lastName || ''}`.trim()}</Text>
        </View>
      </View>

      {/* Help Section */}
      <Text style={styles.sectionTitle}>Help</Text>
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Faqs')}
        >
          <Text style={styles.label}>Frequently Asked Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item2}
          onPress={() => navigation.navigate('Feedback')}
        >
          <Text style={styles.label}>Feedback</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <Text style={styles.sectionTitle}>About App</Text>
      <View style={styles.section}>
        <View style={styles.item2}>
          <Text style={styles.label}>Version: </Text>
          <Text style={styles.value}>1.0</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => auth().signOut()}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity style={styles.deleteButton} onPress={deleteAccount}>
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
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
    display: 'flex',
  },
  item2: {
    padding: 15,

    display: 'flex',
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
