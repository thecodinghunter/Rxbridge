import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';
import { PrimaryButton, TextButton } from '@/components/buttons';
import { StyledInput } from '@/components/inputs';
import { NumericKeypad } from '@/components/numeric-keypad';

interface LoginScreenProps {
  onLogin: () => void;
  onSignUp: () => void;
  onFaceVerification: () => void;
}

export function LoginScreen({
  onLogin,
  onSignUp,
  onFaceVerification,
}: LoginScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);

  const handleKeypadPress = (key: string) => {
    if (key === 'backspace') {
      setPassword(password.slice(0, -1));
    } else if (key !== '') {
      setPassword(password + key);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: theme.text }]}>Sign In</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Welcome back to Rxbridge
        </Text>

        <StyledInput
          label="Email or Phone"
          icon="email"
          placeholder="Enter your email or phone"
          value={email}
          onChangeText={setEmail}
          containerStyle={styles.inputGroup}
          onFocus={() => setShowKeypad(false)}
        />

        <StyledInput
          label="Password"
          icon="lock"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          containerStyle={styles.inputGroup}
          onFocus={() => setShowKeypad(true)}
          showSoftInputOnFocus={false}
        />

        <TextButton
          title="Forgot Password?"
          onPress={() => {}}
          style={styles.forgotButton}
        />

        <PrimaryButton title="Sign In" onPress={onLogin} />

        <View style={[styles.divider, { backgroundColor: theme.border }]}>
          <Text style={[styles.dividerText, { color: theme.textSecondary }]}>
            Or continue with
          </Text>
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={[
              styles.socialButton,
              { borderColor: theme.border, borderWidth: 1 },
            ]}
          >
            <FontAwesome name="facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.socialButton,
              { borderColor: theme.border, borderWidth: 1 },
            ]}
          >
            <MaterialCommunityIcons
              name="google"
              size={24}
              color="#EA4335"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.faceButton, { backgroundColor: theme.primary }]}
          onPress={onFaceVerification}
        >
          <MaterialCommunityIcons
            name="face-recognition"
            size={24}
            color="#fff"
          />
          <Text style={styles.faceButtonText}>Face Scan to Sign In</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, { color: theme.textSecondary }]}>
            Don't have an account?{' '}
          </Text>
          <TextButton title="Sign Up" onPress={onSignUp} />
        </View>
      </ScrollView>

      {showKeypad && (
        <NumericKeypad onKeyPress={handleKeypadPress} />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.five,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: Spacing.two,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: Spacing.five,
  },
  inputGroup: {
    marginBottom: Spacing.three,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.four,
  },
  divider: {
    height: 1,
    marginVertical: Spacing.four,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerText: {
    fontSize: 12,
    paddingHorizontal: Spacing.three,
    backgroundColor: 'inherit',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.three,
    marginVertical: Spacing.four,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceButton: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.four,
    gap: Spacing.two,
  },
  faceButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.five,
  },
  signupText: {
    fontSize: 14,
  },
});
