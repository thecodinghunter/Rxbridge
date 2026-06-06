import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { TextButton } from '@/components/buttons';
import { OTPInput } from '@/components/inputs';
import { NumericKeypad } from '@/components/numeric-keypad';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

interface OTPVerificationScreenProps {
  onVerify: () => void;
  onBack?: () => void;
  phoneNumber?: string;
}

export function OTPVerificationScreen({
  onVerify,
  onBack,
  phoneNumber = '****45',
}: OTPVerificationScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [otp, setOtp] = useState('');

  const handleKeypadPress = (key: string) => {
    if (key === 'backspace') {
      setOtp(otp.slice(0, -1));
    } else if (key !== '' && otp.length < 6) {
      setOtp(otp + key);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      {/* Decorative Blue Header with Medical Watermarks */}
      <View style={styles.blueHeader}>
        <MaterialCommunityIcons name="pill" size={28} color="rgba(255, 255, 255, 0.08)" style={[styles.watermark, { top: 15, left: 30 }]} />
        <MaterialCommunityIcons name="heart-pulse" size={38} color="rgba(255, 255, 255, 0.08)" style={[styles.watermark, { top: 20, right: 30 }]} />
        <MaterialCommunityIcons name="stethoscope" size={32} color="rgba(255, 255, 255, 0.08)" style={[styles.watermark, { bottom: 10, left: 80 }]} />
        <MaterialCommunityIcons name="flask-outline" size={24} color="rgba(255, 255, 255, 0.08)" style={[styles.watermark, { top: 10, right: 120 }]} />
        <MaterialCommunityIcons name="medical-bag" size={30} color="rgba(255, 255, 255, 0.08)" style={[styles.watermark, { bottom: 15, right: 80 }]} />
      </View>

      {/* Main Content White Card Sheet */}
      <View style={[styles.sheet, { backgroundColor: theme.backgroundElement }]}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.sheetHeader}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.6}>
                <Feather name="chevron-left" size={24} color={theme.text} />
              </TouchableOpacity>
            )}
            <Text style={[styles.sheetTitle, { color: theme.text }]}>Verification Code</Text>
          </View>

          <Text style={[styles.description, { color: theme.textSecondary }]}>
            We have sent a verification code to your mobile number ending in{' '}
            <Text style={{ fontWeight: 'bold', color: theme.text }}>{phoneNumber}</Text>.
          </Text>

          <View style={styles.otpInputWrapper}>
            <OTPInput value={otp} onChangeText={setOtp} length={6} />
          </View>

          <TouchableOpacity
            style={[
              styles.signInButton,
              {
                backgroundColor: theme.primary,
                opacity: otp.length === 6 ? 1 : 0.6,
              },
            ]}
            onPress={onVerify}
            disabled={otp.length !== 6}
            activeOpacity={0.8}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Text style={[styles.resendText, { color: theme.textSecondary }]}>
              Don't get OTP?{' '}
            </Text>
            <TextButton
              title="Resend OTP!"
              style={styles.resendButton}
              onPress={() => {
                setOtp('');
              }}
            />
          </View>
        </ScrollView>

        {/* Nest Keypad inside sheet container to ensure background behind curved top corners is white */}
        <NumericKeypad onKeyPress={handleKeypadPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blueHeader: {
    height: 100,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  watermark: {
    position: 'absolute',
  },
  sheet: {
    flex: 1,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -20,
    overflow: 'hidden',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    flexGrow: 1,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 40,
    marginBottom: 12,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 8,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 12,
  },
  otpInputWrapper: {
    marginVertical: 4,
  },
  signInButton: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  resendText: {
    fontSize: 14,
  },
  resendButton: {
    textDecorationLine: 'none',
    fontWeight: '700',
  },
});
