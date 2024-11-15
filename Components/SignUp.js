import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Platform, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const renderInputField = (placeholder, value, setValue, isPassword = false, toggleVisibility = null, isConfirmPassword = false) => (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                value={value}
                onChangeText={setValue}
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
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <SafeAreaView style={styles.innerContainer}>
                <Image style={styles.imageStyle} source={require('../assets/images/SignUpDesign.png')} />
                <Text style={styles.text}>Sign Up</Text>

                <View style={styles.formContainer}>
                    {/* Email Input */}
                    {renderInputField("Email", email, setEmail)}

                    {/* First and Last Name Input */}
                    <View style={styles.rowContainer}>
                        <TextInput
                            placeholder="First Name"
                            style={[styles.input, styles.halfWidthInput, { marginRight: 5 }]}
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholderTextColor="#999"
                        />
                        <TextInput
                            placeholder="Last Name"
                            style={[styles.input, styles.halfWidthInput]}
                            value={lastName}
                            onChangeText={setLastName}
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Password Input */}
                    {renderInputField("Password", password, setPassword, true, () => setPasswordVisible(!passwordVisible))}

                    {/* Confirm Password Input */}
                    {renderInputField("Confirm Password", confirmPassword, setConfirmPassword, false, () => setConfirmPasswordVisible(!confirmPasswordVisible), true)}

                    {/* Next button */}
                    <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.nextText}>Next</Text>
                    </TouchableOpacity>

                    {/* Already have an account? */}
                    <View style={styles.signInContainer}>
                        <Text style={styles.signInText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                            <Text style={styles.signInLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
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
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
        paddingVertical: 2,
    },
    halfWidthInput: {
        width: '48%',
        backgroundColor: '#F1F2F6',
        borderRadius: 10,
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
        paddingVertical: 3
    },
    nextText: {

        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        color: '#FFFFFF',
        marginVertical: 5,
    },
    signInContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInText: {
        color: '#333',
        marginVertical: 20
    },
    signInLink: {
        color: '#22577A',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
});
