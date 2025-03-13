package com.karaokeapp

import android.media.AudioFormat
import android.media.AudioTrack
import android.media.MediaPlayer
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.io.FileInputStream
import java.io.IOException

class AudioTrackModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private lateinit var audioTrack: AudioTrack

    override fun getName(): String {
        return "AudioTrackModule"
    }

    @ReactMethod
    fun adjustPitchWithAudioTrack(audioFilePath: String, pitchFactor: Float, promise: Promise) {
        try {
            // Calculate the new playback rate based on pitchFactor
            val pitchAdjustedRate = 44100 * pitchFactor

            // Create an AudioTrack instance
            val bufferSize = AudioTrack.getMinBufferSize(
                44100,
                AudioFormat.CHANNEL_OUT_MONO,
                AudioFormat.ENCODING_PCM_16BIT
            )

            audioTrack = AudioTrack(
                AudioFormat.CHANNEL_OUT_MONO,
                44100,
                AudioFormat.ENCODING_PCM_16BIT,
                AudioTrack.MODE_STREAM,
                bufferSize,
                AudioTrack.MODE_STREAM
            )

            // Set playback rate for pitch adjustment
            audioTrack.playbackParams = audioTrack.playbackParams.setSpeed(pitchFactor)

            // Open the audio file as a stream
            val inputStream = FileInputStream(audioFilePath)
            val audioData = ByteArray(bufferSize)

            // Start playback
            audioTrack.play()

            // Read and play the audio data
            Thread {
                var bytesRead: Int
                try {
                    while (inputStream.read(audioData).also { bytesRead = it } != -1) {
                        audioTrack.write(audioData, 0, bytesRead)
                    }
                    // Finish playback
                    audioTrack.stop()
                    audioTrack.release()
                    inputStream.close()

                    promise.resolve("Pitch adjusted and audio played successfully.")
                } catch (e: IOException) {
                    promise.reject("ERROR", "Error playing the audio.", e)
                }
            }.start()

        } catch (e: Exception) {
            promise.reject("ERROR", "Failed to adjust pitch with AudioTrack.", e)
        }
    }
}
