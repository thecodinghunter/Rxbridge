import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';
import { PrimaryButton, TextButton } from '@/components/buttons';
import { StyledInput } from '@/components/inputs';
import { NumericKeypad } from '@/components/numeric-keypad';

interface SignupScreenProps {
  onSignUp: () => void;
  onBackToLogin: () => void;
}

export function SignupScreen({ onSignUp, onBackToLogin }: SignupScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);

  const handleDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setDate(selectedDate);
      setShowDatePicker(false);
    }
  };

  const handleKeypadPress = (key: string) => {
    if (key === 'backspace') {
      setPassword(password.slice(0, -1));
    } else if (key !== '') {
      setPassword(password + key);
    }
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
        <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Fill in your details to get started
        </Text>

        <StyledInput
          label="Full Name"
          icon="account"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
          containerStyle={styles.inputGroup}
          onFocus={() => setShowKeypad(false)}
        />

        <StyledInput
          label="Email"
          icon="email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          containerStyle={styles.inputGroup}
          keyboardType="email-address"
          onFocus={() => setShowKeypad(false)}
        />

        <StyledInput
          label="Mobile Number"
          icon="phone"
          placeholder="Enter your mobile number"
          value={phone}
          onChangeText={setPhone}
          containerStyle={styles.inputGroup}
          keyboardType="phone-pad"
          onFocus={() => setShowKeypad(false)}
        />

        <StyledInput
          label="Password"
          icon="lock"
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          containerStyle={styles.inputGroup}
          onFocus={() => setShowKeypad(true)}
          showSoftInputOnFocus={false}
        />

        <View style={styles.inputGroup}>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={[
              styles.dateButton,
              { borderColor: theme.border, backgroundColor: theme.backgroundElement },
            ]}
          >
            <MaterialCommunityIcons
              name="calendar"
              size={20}
              color={theme.textSecondary}
              style={styles.dateIcon}
            />
            <Text
              style={[
                styles.dateText,
                { color: date ? theme.text : theme.textSecondary },
              ]}
            >
              {date ? formatDate(date) : 'Select Date of Birth'}
            </Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}

        <Text style={[styles.otpNote, { color: theme.textSecondary }]}>
          Don't get OTP?{' '}
          <TextButton title="Resend OTP!" onPress={() => {}} />
        </Text>

        <PrimaryButton title="Sign Up" onPress={onSignUp} />

        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: theme.textSecondary }]}>
            Already have an account?{' '}
          </Text>
          <TextButton title="Sign In" onPress={onBackToLogin} />
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
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    borderWidth: 1,
    marginVertical: 8,
  },
  dateIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 16,
    flex: 1,
  },
  otpNote: {
    fontSize: 12,
    marginBottom: Spacing.four,
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.five,
  },
  loginText: {
    fontSize: 14,
  },
});
