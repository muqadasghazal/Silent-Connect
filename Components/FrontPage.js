import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FrontPage() {
    return (
        <View style={styles.container}>
            <Image style={styles.logoStyle} source={require('../assets/images/logo.png')} />
            <View style={styles.textContainer}>
                <Text style={[styles.baseText, styles.textPrimary]}>Silent </Text>
                <Text style={[styles.baseText, styles.textSecondary]}>Connect</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logoStyle: {
        width: 190,
        height: 190
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: "#FFFFFF",
    },
    textContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    baseText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 32,
    },
    textPrimary: {
        color: '#22577A',
    },
    textSecondary: {
        color: '#38A3A5',
    },
})