import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Platform, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';
import { Formik } from 'formik';
import * as Yup from 'yup';



//backend say aik aur error bhi show krwana ho ga idhr , pasword or email incorrect wala.
const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function SignIn({ navigation }) {
    const [backendError, setBackendError] = useState(''); // To store backend error
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSignIn = async (values) => {
        // Here you can call your backend API for login
        // For example:
        try {
            // await signInApi(values.email, values.password);
            // If success, navigate to home or other page
            console.log("Successfully signed in");
        } catch (error) {
            // Set backend error if login fails (example error message)
            setBackendError('Incorrect email or password');
        }
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={SignInSchema}
            onSubmit={handleSignIn}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <SafeAreaView style={styles.innerContainer}>
                        <Image style={styles.imageStyle} source={require('../assets/images/SignUpDesign.png')} />
                        <Text style={styles.text}>Sign In</Text>

                        <View style={styles.formContainer}>
                            {/* Email Input */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="Email"
                                    style={styles.input}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    keyboardType="email-address"
                                    placeholderTextColor="#999"
                                />
                            </View>
                            {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}

                            {/* Password Input with Visibility Toggle */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="Password"
                                    style={styles.input}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    secureTextEntry={!passwordVisible}
                                    placeholderTextColor="#999"
                                />
                                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={{ paddingRight: 6 }}>
                                    <Icon name={passwordVisible ? 'eye' : 'eye-with-line'} size={24} color="gray" />
                                </TouchableOpacity>
                            </View>
                            {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}

                            {/* Backend Error Display */}
                            {backendError ? <Text style={styles.errorText}>{backendError}</Text> : null}

                            {/* Forgot Password Link */}
                            <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => console.log('Forgot Password')}>
                                <Text style={styles.forgotPasswordText}>Forgot Your Password?</Text>
                            </TouchableOpacity>

                            {/* Sign In Button */}
                            <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
                                <Text style={styles.signInText}>Sign In</Text>
                            </TouchableOpacity>

                            {/* Sign Up Text Row */}
                            <View style={styles.signUpContainer}>
                                <Text style={styles.signUpText}>Don’t have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                    <Text style={styles.signUpLink}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            {/* temporary, just to show feedback */}
                            <View style={styles.signUpContainer}>
                                <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
                                    <Text style={styles.signUpLink}>Feedback</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    imageStyle: {
        width: '100%',
    },
    text: {
        fontSize: 24,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        color: '#000000',
        marginVertical: 5,
    },
    formContainer: {
        width: '80%',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: '100%',
        paddingVertical: 2,
        backgroundColor: '#F1F2F6',
        borderRadius: 10,
        paddingRight: 2,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        padding: 12,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',

        marginBottom: 20
    },
    forgotPasswordText: {
        color: '#999',
    },
    signInButton: {
        backgroundColor: '#22577A',
        width: '100%',
        borderRadius: 30,
        paddingVertical: 10,
        alignItems: 'center',
    },
    signInText: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-SemiBold',
    },
    signUpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    signUpText: {
        color: '#333',
    },
    signUpLink: {
        color: '#22577A',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginTop: -10,
        marginBottom: 10,
    },
});
