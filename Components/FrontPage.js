import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

export default function FrontPage({ navigation }) {
    const { width, height } = useWindowDimensions(); // Get screen dimensions

    const dynamicLogoSize = width * 0.6; // 50% of screen width
    const dynamicFontSize = width * 0.08; // 8% of screen width for text

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('SignUp'); // Redirect to the Signup page after 5 seconds
        }, 5000);

        // Clean up the timer if the component unmounts
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                style={[styles.logoStyle, { width: dynamicLogoSize, height: dynamicLogoSize }]}
                source={require('../assets/images/logo.png')}
            />
            <View style={[styles.textContainer, { marginTop: height * 0.01 }]}>
                <Text style={[styles.baseText, styles.textPrimary, { fontSize: dynamicFontSize }]}>Silent </Text>
                <Text style={[styles.baseText, styles.textSecondary, { fontSize: dynamicFontSize }]}>Connect</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: "#FFFFFF",
    },
    logoStyle: {
        resizeMode: 'contain',
    },
    textContainer: {
        flexDirection: 'row',
    },
    baseText: {
        fontFamily: 'Poppins-SemiBold',
    },
    textPrimary: {
        color: '#22577A',
    },
    textSecondary: {
        color: '#38A3A5',
    },
});
