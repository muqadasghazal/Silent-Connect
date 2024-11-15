import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Platform, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <SafeAreaView style={styles.innerContainer}>
                <Image style={styles.imageStyle} source={require('../assets/images/SignUpDesign.png')} />
                <Text style={styles.text}>Sign In</Text>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholderTextColor="#999"
                    />
                </View>

                {/* Password Input with Visibility Toggle */}
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!passwordVisible}
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={{ paddingRight: 6 }}>
                        <Icon name={passwordVisible ? 'eye' : 'eye-with-line'} size={24} color="gray" />
                    </TouchableOpacity>
                </View>

                {/* Forgot Password Link */}
                <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => console.log('should be calling API here')}>
                    <Text style={styles.forgotPasswordText}>Forgot Your Password?</Text>
                </TouchableOpacity>

                {/* Sign In Button */}
                <TouchableOpacity style={styles.signInButton} onPress={() => console.log('should be calling API here')}>
                    <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>

                {/* Sign Up Text Row */}
                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signUpLink}>Sign Up</Text>
                    </TouchableOpacity>
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: '80%',
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
        marginRight: '10%', // adjust based on alignment preference
        marginTop: -10, // slight adjustment to bring it closer to the input field
        marginBottom: 20
    },
    forgotPasswordText: {
        color: '#999',

    },
    signInButton: {
        backgroundColor: '#22577A',
        width: '80%',
        borderRadius: 30,
        paddingVertical: 10,
        alignItems: 'center',
    },
    signInText: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
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
});
