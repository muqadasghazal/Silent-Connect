import { Button, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput } from 'react-native-gesture-handler';


const FeedbackSchema = Yup.object().shape({
    feedback: Yup.string().required('Feedback is required').min(5, 'Feedback should be at least 5 characters long'),
});

export default function Feedback() {
    const handleSubmitFeedback = (values, { resetForm }) => {
        console.log('calling API Here')
        resetForm();
        Keyboard.dismiss();
    };
    return (
        <SafeAreaView style={styles.container}>
            {/* feedbakc heading */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginRight: 9 }} onPress={() => (console.log('should be navigated to back page'))}>
                    <Icon name='arrow-back' size={24} color="#22577A" />
                </TouchableOpacity>
                <Text style={styles.text}>Feedback</Text>
            </View>

            {/*Text*/}
            <Text style={styles.textContainer}>Thank you for using our app! Your experience matters to us, and we’re always looking to improve. </Text>

            <Formik
                initialValues={{ feedback: '' }}
                validationSchema={FeedbackSchema}
                onSubmit={handleSubmitFeedback}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <View style={styles.inputContainer}>

                            <TextInput
                                style={styles.input}
                                placeholder="Enter your feedback here..."
                                onChangeText={handleChange('feedback')}
                                onBlur={handleBlur('feedback')}
                                value={values.feedback}
                                multiline
                            />
                        </View>
                        {errors.feedback && touched.feedback ? (
                            <Text style={styles.errorText}>{errors.feedback}</Text>
                        ) : null}
                        <TouchableOpacity style={styles.feedbackButton} onPress={handleSubmit}>
                            <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins-SemiBold' }}>Submit</Text>
                        </TouchableOpacity>

                    </>
                )}


            </Formik>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 10,
        backgroundColor:"#FFFFFF"
    },
    text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24,
        color: '#22577A',
    },
    textContainer: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#000000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: '100%',
        backgroundColor: '#ebebeb',
        borderRadius: 10,
        marginVertical: 15,
        paddingVertical: 8,
        paddingHorizontal: 10,  // Adding horizontal padding for a consistent look
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        padding: 12,
    },
    feedbackButton: {
        backgroundColor: '#22577A',
        width: '100%',
        borderRadius: 30,
        paddingVertical: 10,
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
        marginLeft: 4,
    },
});