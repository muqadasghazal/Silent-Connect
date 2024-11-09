import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={require('../assets/images/SignUpDesign.png')} />
            <Text style={styles.text}>Sign In</Text>

            {/* Email Container */}

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


            {/* Password Container */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true} // Enable secure text for password
                    placeholderTextColor="#999"
                />
            </View>
            <TouchableOpacity style={styles.signInButton} onPress={() => console.log('should be caling Api here')}>
                <Text style={styles.SignInText}>Sign In</Text>
            </TouchableOpacity>

            {/* Sign Up Text Row */}
            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    imageStyle: {
        width: '100%',
        resizeMode: 'contain',
    },
    text: {
        fontSize: 24,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        color: '#000000',
        marginVertical: 20, // Add margin for spacing
    },
    inputContainer: {
        width: '80%',
        maxWidth: 400,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F2F6',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 12,
        marginBottom: 15,
    },
    input: {
        fontSize: 16,
        color: '#333',

    },
    signInButton: {
        backgroundColor: '#22577A',
        width: "80%",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 30,

    },
    SignInText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16
    },
    signUpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpText: {
        color: '#333',
        marginVertical: 20
    },
    signUpLink: {
        color: '#22577A',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
});
