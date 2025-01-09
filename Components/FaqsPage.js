import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const faqData = [
  {
    question: 'What is this app about?',
    answer: 'This app helps convert sign language into voice and text, and vice versa, making communication easier between sign language users and non-sign language users, specifically designed for the Urdu language.',
  },
  {
    question: 'How does the app work?',
    answer: 'The app uses advanced machine learning models to recognize sign language gestures via the camera. It then converts these gestures into voice or text. For text-to-sign translation, the app shows an avatar performing the relevant signs.',
  },
  {
    question: 'Who can use this app?',
    answer: 'The app is designed for anyone who communicates using sign language, people learning sign language, or anyone wanting to facilitate conversations with the Deaf or Hard of Hearing.',
  },

  { question: 'How does the sign language translation work?', answer: 'The app uses machine learning models to detect hand gestures and convert them into text and audio.' },
  { question: 'Is the app free to use?', answer: 'Yes, the app is free for basic features, with some advanced options available in the premium version.' },
  { question: 'What languages are supported?', answer: 'Currently, Silent Connect supports Urdu, with more languages planned in future updates.' },
];

const FAQScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={{ marginRight: 9 }} onPress={() => navigation.navigate('Accounts')}>
          <Icon name='arrow-back' size={24} color="#22577A" />
        </TouchableOpacity>
        <Text style={styles.text}>FAQS</Text>
      </View>

      {faqData.map((item, index) => (
        <View key={index} style={styles.faqItem}>
          <TouchableOpacity onPress={() => toggleAnswer(index)}>
            <Text style={styles.question}>{item.question}</Text>
          </TouchableOpacity>
          {activeIndex === index && (
            <Text style={styles.answer}>{item.answer}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    height: "100%",
    backgroundColor: '#FFFFFF'
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 20,
    color: "#22577A"
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#22577A',
  },
  faqItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  question: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: "black",
    margin: 10,

  },
  answer: {
    fontSize: 16,
    margin: 10,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
});

export default FAQScreen;