import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';
import { PrimaryButton, TextButton } from '@/components/buttons';

interface FaceVerificationScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function FaceVerificationScreen({
  onComplete,
  onSkip,
}: FaceVerificationScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [progress, setProgress] = useState(0);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleAnim]);

  return (
    <LinearGradient
      colors={[theme.primary, '#1e5dda']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Face Verification</Text>
          <Text style={styles.subtitle}>
            Please look at the camera and align your face
          </Text>
        </View>

        <View style={styles.cameraContainer}>
          <Animated.View
            style={[
              styles.faceFrame,
              {
                borderColor: '#fff',
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <MaterialCommunityIcons
              name="face-recognition"
              size={80}
              color="rgba(255,255,255,0.7)"
            />
          </Animated.View>

          {/* Corner brackets */}
          <View style={[styles.bracket, styles.topLeft]}>
            <View style={styles.cornerLine1} />
            <View style={styles.cornerLine2} />
          </View>
          <View style={[styles.bracket, styles.topRight]}>
            <View style={styles.cornerLine1} />
            <View style={styles.cornerLine2} />
          </View>
          <View style={[styles.bracket, styles.bottomLeft]}>
            <View style={styles.cornerLine1} />
            <View style={styles.cornerLine2} />
          </View>
          <View style={[styles.bracket, styles.bottomRight]}>
            <View style={styles.cornerLine1} />
            <View style={styles.cornerLine2} />
          </View>
        </View>

        <View style={styles.progressSection}>
          <View
            style={[
              styles.progressBar,
              { backgroundColor: 'rgba(255,255,255,0.2)' },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>

        <View style={styles.footer}>
          <PrimaryButton
            title="Skip for Now"
            onPress={onSkip}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: Spacing.six,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.six,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: Spacing.two,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    paddingHorizontal: Spacing.four,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  faceFrame: {
    width: 180,
    height: 240,
    borderRadius: 20,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bracket: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
  topLeft: {
    top: 60,
    left: 40,
  },
  topRight: {
    top: 60,
    right: 40,
  },
  bottomLeft: {
    bottom: 60,
    left: 40,
  },
  bottomRight: {
    bottom: 60,
    right: 40,
  },
  cornerLine1: {
    width: '100%',
    height: 3,
    backgroundColor: '#fff',
  },
  cornerLine2: {
    width: 3,
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -3,
  },
  progressSection: {
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.five,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: Spacing.two,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
  },
});
