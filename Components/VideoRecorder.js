import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Text, Alert, Modal, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

const VideoRecorder = ({ navigation }) => {
    const cameraRef = useRef(null);

    const [isRecording, setIsRecording] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(false);
    const [microphonePermission, setMicrophonePermission] = useState(false);
    const [showModal, setShowModal] = useState(true); // <-- Modal control

    const device = useCameraDevice('back');

    useEffect(() => {
        const requestPermissions = async () => {
            const cameraStatus = await Camera.requestCameraPermission();
            const micStatus = await Camera.requestMicrophonePermission();
            setCameraPermission(cameraStatus === 'authorized');
            setMicrophonePermission(micStatus === 'authorized');
        };

        requestPermissions();
    }, []);

    const startRecording = async () => {
        if (cameraRef.current) {
            try {
                setIsRecording(true);
                await cameraRef.current.startRecording({
                    fileType: 'mp4',
                    onRecordingFinished: async (video) => {
                        console.log('Recording finished: ', video.path);
                        setIsRecording(false);
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

                            navigation.navigate('TextGenerated', { translatedText: json });
                        } catch (error) {
                            console.error('Error uploading video:', error);
                            Alert.alert('Error', 'Failed to send video to server.');
                        }
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

            {/* Instruction Modal */}
            <Modal visible={showModal} animationType="slide" transparent={true}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Instructions</Text>
                        <Text style={styles.instruction}>• Please capture the video in good lighting.</Text>
                        <Text style={styles.instruction}>• Perform gestures at a moderate speed — not too slow, not too fast.</Text>
                        <Text style={styles.instruction}>• Make sure your hands are clearly visible in the frame.</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
                            <Text style={styles.buttonText}>Got It</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
        backgroundColor: 'black',
    },
    controls: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: 'white',

        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.6)',
        marginBottom: 10,
    },
    instruction: {
        fontSize: 16,
        marginVertical: 4,
        color: 'rgba(0,0,0,0.6)',
    },
    modalButton: {
        marginTop: 20,
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default VideoRecorder;
