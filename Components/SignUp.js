import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Platform, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

export default function SignUp({ navigation }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const renderInputField = (placeholder, value, handleChange, handleBlur, error, touched, isPassword = false, toggleVisibility = null, isConfirmPassword = false) => (
        <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={placeholder}
                    style={styles.input}
                    value={value}
                    onChangeText={handleChange}
                    onBlur={handleBlur}
                    secureTextEntry={(isPassword && !passwordVisible) || (isConfirmPassword && !confirmPasswordVisible)}
                    keyboardType={placeholder === "Email" ? "email-address" : "default"}
                    placeholderTextColor="#999"
                />
                {(isPassword || isConfirmPassword) && (
                    <TouchableOpacity onPress={toggleVisibility} style={{ paddingRight: 6 }}>
                        <Icon
                            name={(isPassword ? passwordVisible : confirmPasswordVisible) ? 'eye' : 'eye-with-line'}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && touched ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );

    return (
        <Formik
            initialValues={{
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: '',
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values) => {
                console.log(values);
                navigation.navigate('SignIn');
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <SafeAreaView style={styles.innerContainer}>
                        <Image style={styles.imageStyle} source={require('../assets/images/SignUpDesign.png')} />
                        <Text style={styles.text}>Sign Up</Text>

                        <View style={styles.formContainer}>
                            {renderInputField(
                                "Email",
                                values.email,
                                handleChange('email'),
                                handleBlur('email'),
                                errors.email,
                                touched.email
                            )}

                            <View style={styles.rowContainer}>
                                <View style={{ flex: 1, marginRight: 5 }}>
                                    {renderInputField(
                                        "First Name",
                                        values.firstName,
                                        handleChange('firstName'),
                                        handleBlur('firstName'),
                                        errors.firstName,
                                        touched.firstName
                                    )}
                                </View>
                                <View style={{ flex: 1 }}>
                                    {renderInputField(
                                        "Last Name",
                                        values.lastName,
                                        handleChange('lastName'),
                                        handleBlur('lastName'),
                                        errors.lastName,
                                        touched.lastName
                                    )}
                                </View>
                            </View>

                            {renderInputField(
                                "Password",
                                values.password,
                                handleChange('password'),
                                handleBlur('password'),
                                errors.password,
                                touched.password,
                                true,
                                () => setPasswordVisible(!passwordVisible)
                            )}

                            {renderInputField(
                                "Confirm Password",
                                values.confirmPassword,
                                handleChange('confirmPassword'),
                                handleBlur('confirmPassword'),
                                errors.confirmPassword,
                                touched.confirmPassword,
                                false,
                                () => setConfirmPasswordVisible(!confirmPasswordVisible),
                                true
                            )}

                            <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
                                <Text style={styles.nextText}>Next</Text>
                            </TouchableOpacity>

                            <View style={styles.signInContainer}>
                                <Text style={styles.signInText}>Already have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                    <Text style={styles.signInLink}>Sign In</Text>
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
    inputWrapper: {
        width: '100%',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F2F6',
        borderRadius: 10,
        paddingRight: 2,
        paddingVertical: 2,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        padding: 12,
    },
    nextButton: {
        backgroundColor: '#22577A',
        width: "100%",
        borderRadius: 30,
        paddingVertical: 10,
        marginTop: 10,
    },
    nextText: {
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        color: '#FFFFFF',
    },
    signInContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    signInText: {
        color: '#333',
    },
    signInLink: {
        color: '#22577A',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 15,
        marginTop: 2,
    },
});
