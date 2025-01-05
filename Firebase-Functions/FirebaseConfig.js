import firestore from '@react-native-firebase/firestore';

export const addTextToFirestore = async (text) => {
  try {
    await firestore().collection('userInputs').add({
      text: text,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
    console.log('Text added successfully!');
  } catch (error) {
    console.error('Error adding text: ', error);
  }
};
