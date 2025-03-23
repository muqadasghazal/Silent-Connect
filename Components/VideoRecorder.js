import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

const VideoRecorder = ({ navigation }) => {
    const cameraRef = useRef(null);

    const [isRecording, setIsRecording] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(false);
    const [microphonePermission, setMicrophonePermission] = useState(false);
    const [loading, setLoading] = useState(false);  // New state for loader

    const device = useCameraDevice('back'); // Use front or back camera

    useEffect(() => {
        const requestPermissions = async () => {
            const cameraStatus = await Camera.requestCameraPermission();
            const microphoneStatus = await Camera.requestMicrophonePermission();

            setCameraPermission(cameraStatus === 'authorized');
            setMicrophonePermission(microphoneStatus === 'authorized');
        };

        requestPermissions();
    }, []);

   const startRecording = async () => {
    if (cameraRef.current) {
        try {
            setIsRecording(true);
            const video = await cameraRef.current.startRecording({
                fileType: 'mp4',
                onRecordingFinished: (video) => {
                    console.log('Recording finished: ', video.path);
                    setIsRecording(false);
                    setLoading(true); // Show loader while waiting for response
                    
                    // Allow the loader to render properly before making the fetch request
                    setTimeout(async () => {
                        try {
                            const data = new FormData();
                            data.append('video', {
                                uri: `file://${video.path}`,
                                type: 'video/mp4',
                                name: 'sign.mp4',
                            });

                            const response = await fetch('http://192.168.100.7:3000/api/sign-to-text/predict', {
                                method: 'POST',
                                body: data,
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            });

                            const json = await response.json();
                            console.log('Server response:', json);

                            setLoading(false); // Hide loader when response is received

                            navigation.navigate('TextGenerated', { translatedText: json.processedText || 'No response from server.' });

                        } catch (error) {
                            console.error('Error uploading video:', error);
                            setLoading(false); // Hide loader if there's an error
                            Alert.alert('Error', 'Failed to send video to server.');
                        }
                    }, 0);  // `0` delay is enough to trigger a re-render for the loader
                },
                onRecordingError: (error) => {
                    console.error('Recording error: ', error);
                    setIsRecording(false);
                    setLoading(false); // Make sure to hide the loader if there's an error
                },
            });
        } catch (error) {
            console.error('Error starting recording: ', error);
            setIsRecording(false);
            setLoading(false); // Hide loader if recording fails to start
        }
    }
};


    const stopRecording = () => {
        if (cameraRef.current) {
            cameraRef.current.stopRecording();
        }
        navigation.navigate('Dashboard');
    };

    if (!device) {
        return (
            <View style={styles.container}>
                <Text>Loading camera...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                video={true}
                photo={true}
                videoStabilizationMode="standard"
            />
            <View style={styles.controls}>
                {!isRecording ? (
                    <Button title="Start Recording" onPress={startRecording} />
                ) : (
                    <Button title="Stop Recording" onPress={stopRecording} />
                )}
            </View>

            {loading && ( // Display the loader when waiting for response
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    controls: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    spinnerContainer: {  // New Style for Loader
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -20 }, { translateY: -20 }],
    },
});

export default VideoRecorder;
