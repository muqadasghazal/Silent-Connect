import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Text, Alert } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

const VideoRecorder = () => {
    const cameraRef = useRef(null);

    const [isRecording, setIsRecording] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(false);
    const [microphonePermission, setMicrophonePermission] = useState(false);


    const device = useCameraDevice('back') // Use front or back camera

    useEffect(() => {
        const requestPermissions = async () => {
            const cameraStatus = await Camera.requestCameraPermission();
            const microphoneStatus = await Camera.requestMicrophonePermission();

            if (cameraStatus === 'authorized') {
                setCameraPermission(true);
            } else {
                setCameraPermission(false);
            }

            if (microphoneStatus === 'authorized') {
                setMicrophonePermission(true);
            } else {
                setMicrophonePermission(false);
            }
        };

        requestPermissions();
    }, []);

    // const handleGrantPermissions = async () => {
    //     const cameraStatus = await Camera.requestCameraPermission();
    //     const microphoneStatus = await Camera.requestMicrophonePermission();

    //     setCameraPermission(cameraStatus === 'authorized');
    //     setMicrophonePermission(microphoneStatus === 'authorized');

    //     if (cameraStatus !== 'authorized' || microphoneStatus !== 'authorized') {
    //         Alert.alert('Permissions Required', 'Please grant camera and microphone permissions.');
    //     }
    // };

    const startRecording = async () => {
        if (cameraRef.current) {
            try {
                setIsRecording(true);
                const video = await cameraRef.current.startRecording({
                    fileType: 'mp4',
                    onRecordingFinished: (video) => {
                        console.log('Recording finished: ', video.path);
                        setIsRecording(false);
                        // You can send `video.path` to the backend
                    },
                    onRecordingError: (error) => {
                        console.error('Recording error: ', error);
                        setIsRecording(false);
                    },
                });
            } catch (error) {
                console.error('Error starting recording: ', error);
                setIsRecording(false);
            }
        }
    };

    const stopRecording = () => {
        if (cameraRef.current) {
            cameraRef.current.stopRecording();
        }
    };

    // if (!cameraPermission || !microphonePermission) {
    //     return (
    //         <View style={styles.container}>
    //             <Button title="Grant Permissions" onPress={handleGrantPermissions} />
    //         </View>
    //     );
    // }

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
            />
            <View style={styles.controls}>
                {!isRecording ? (
                    <Button title="Start Recording" onPress={startRecording} />
                ) : (
                    <Button title="Stop Recording" onPress={stopRecording} />
                )}
            </View>
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
});

export default VideoRecorder;
