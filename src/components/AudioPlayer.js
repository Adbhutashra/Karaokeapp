import React, { useCallback, useEffect, useState } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import AudioRecorderPlayer, {
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
    AVModeIOSOption,
    AVEncoderAudioQualityIOSType,
    AVEncodingOption
} from 'react-native-audio-recorder-player';
import Sound from 'react-native-sound';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs';

const AudioPlayer = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [backgroundMusic, setBackgroundMusic] = useState(null);
    const [audioPlayer, setAudioPlayer] = useState(null);
    const [recordedAudioPath, setRecordedAudioPath] = useState('');
    const audioRecorderPlayer = new AudioRecorderPlayer();

    useEffect(() => {
        // Initialize background music
        requestPermissions();
        const music = new Sound('background.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Error loading sound:', error);
                return;
            }
            music.setNumberOfLoops(-1);
            setBackgroundMusic(music);
        });

        // Cleanup on component unmount
        return () => {
            if (backgroundMusic) {
                backgroundMusic.release();
            }
        };
    }, []);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
            if (result === RESULTS.GRANTED) {
                console.log('Permission granted');
            } else {
                console.log('Permission denied');
            }
        } else if (Platform.OS === 'ios') {
            const result = await request(PERMISSIONS.IOS.MICROPHONE);
            if (result === RESULTS.GRANTED) {
                console.log('Permission granted');
            } else {
                console.log('Permission denied');
            }
        }
    };
    // Start recording
    const startRecording = async () => {
        const path = Platform.OS === 'android' ? `${RNFetchBlob.fs.dirs.CacheDir}/response.aac` : 'response.aac';
        const audioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVModeIOS: AVModeIOSOption.measurement,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
        setRecordedAudioPath(path);
        try {
            await audioRecorderPlayer.startRecorder(path, audioSet);
            setIsRecording(true);
            if (backgroundMusic) {
                backgroundMusic.play();
            }
        } catch (err) {
            console.log('Error starting recorder: ', err);
        }
    };

    // Stop recording and playback
    const stopRecording = async () => {
        try {
            await audioRecorderPlayer.stopRecorder();
            if (backgroundMusic) {
                backgroundMusic.stop();
            }
            setIsRecording(false);
            playRecordedAudio();
        } catch (err) {
            console.log('Error stopping recorder: ', err);
        }
    };

    // Play the recorded audio
    const playRecordedAudio = () => {
        // RNFS.exists(recordedAudioPath).then(exists => {
        //     console.log(`File exists: ${exists}`);
        //     if (!exists) {
        //         console.log('File does not exist at path:', recordedAudioPath);
        //         return;
        //     }
        //     // Continue with playback...
        // });
        // const player = new Sound(recordedAudioPath, '', (error) => {
        //     if (error) {
        //         console.log('Error loading sound:', error);
        //         return;
        //     }
        //     player.play();
        // });
        // setAudioPlayer(player);
    };

    return (
        <View style={{ alignItems: 'center' }}>
            <Text>Real-Time Karaoke Audio Player</Text>
            <Button
                title={isRecording ? "Stop Recording" : "Start Recording"}
                onPress={isRecording ? stopRecording : startRecording}
            />
            <Button
                title="Play Recorded Audio"
                onPress={playRecordedAudio}
                disabled={isRecording || !recordedAudioPath}
            />
        </View>
    );
};

export default AudioPlayer;
