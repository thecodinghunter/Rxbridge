import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';

interface VideoCallScreenProps {
  onEndCall: () => void;
  doctorName?: string;
  callType?: 'incoming' | 'active';
}

export function VideoCallScreen({
  onEndCall,
  doctorName = 'Dr. Emily Davis',
  callType = 'active',
}: VideoCallScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Doctor Video Section */}
        <View style={styles.videoContainer}>
          <View style={[styles.videoBox, { backgroundColor: theme.primary }]}>
            <MaterialCommunityIcons
              name="video-off"
              size={40}
              color="rgba(255,255,255,0.5)"
            />
          </View>

          {/* Patient Video (Small, Bottom Right) */}
          <View style={styles.patientVideoSmall}>
            <View style={[styles.patientVideoBox, { backgroundColor: theme.primary }]}>
              <Text style={styles.patientInitial}>EM</Text>
            </View>
          </View>
        </View>

        {/* Call Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.doctorName}>{doctorName}</Text>
          <View style={styles.patientInfo}>
            <Text style={styles.patientDetails}>32Y • Female</Text>
            <Text style={styles.callDuration}>{formatTime(callDuration)}</Text>
          </View>
        </View>

        {/* Control Buttons */}
        <View style={styles.controlsContainer}>
          {/* Mute Button */}
          <TouchableOpacity
            style={[
              styles.controlButton,
              {
                backgroundColor: isMuted
                  ? 'rgba(239, 68, 68, 0.2)'
                  : 'rgba(255,255,255,0.1)',
              },
            ]}
            onPress={() => setIsMuted(!isMuted)}
          >
            <MaterialCommunityIcons
              name={isMuted ? 'microphone-off' : 'microphone'}
              size={24}
              color={isMuted ? '#EF4444' : '#fff'}
            />
          </TouchableOpacity>

          {/* Video Toggle Button */}
          <TouchableOpacity
            style={[
              styles.controlButton,
              {
                backgroundColor: isVideoOn
                  ? 'rgba(47, 118, 246, 0.2)'
                  : 'rgba(239, 68, 68, 0.2)',
              },
            ]}
            onPress={() => setIsVideoOn(!isVideoOn)}
          >
            <MaterialCommunityIcons
              name={isVideoOn ? 'video' : 'video-off'}
              size={24}
              color={isVideoOn ? '#2F76F6' : '#EF4444'}
            />
          </TouchableOpacity>

          {/* End Call Button */}
          <TouchableOpacity
            style={[styles.controlButton, styles.endCallButton]}
            onPress={onEndCall}
          >
            <MaterialCommunityIcons
              name="phone-hangup"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          {/* Speaker Button */}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => {}}
          >
            <MaterialCommunityIcons
              name="volume-high"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Add Notes Button */}
        <TouchableOpacity
          style={[styles.notesButton, { backgroundColor: theme.backgroundElement }]}
          onPress={() => {}}
        >
          <MaterialCommunityIcons
            name="clipboard-list"
            size={20}
            color={theme.primary}
          />
          <Text style={[styles.notesButtonText, { color: theme.primary }]}>
            Add Notes
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  videoBox: {
    width: '90%',
    aspectRatio: 9 / 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  patientVideoSmall: {
    position: 'absolute',
    bottom: Spacing.four,
    right: Spacing.four,
    width: 100,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
  },
  patientVideoBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  patientInitial: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  infoContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.four,
  },
  doctorName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Spacing.two,
  },
  patientInfo: {
    alignItems: 'center',
  },
  patientDetails: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: Spacing.one,
  },
  callDuration: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.four,
    paddingVertical: Spacing.five,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  endCallButton: {
    backgroundColor: '#EF4444',
  },
  notesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    marginHorizontal: Spacing.four,
    marginBottom: Spacing.five,
    paddingVertical: Spacing.three,
    borderRadius: 12,
  },
  notesButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
