import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface StyledInputProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  containerStyle?: ViewStyle;
  error?: string;
}

export function StyledInput({
  label,
  icon,
  containerStyle,
  error,
  placeholder,
  secureTextEntry: initialSecureTextEntry = false,
  ...props
}: StyledInputProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [secureTextEntry, setSecureTextEntry] = useState(initialSecureTextEntry);

  return (
    <View style={containerStyle}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? theme.error : theme.border,
            backgroundColor: theme.backgroundElement,
            borderWidth: error ? 2 : 1,
          },
        ]}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={theme.textSecondary}
            style={styles.icon}
          />
        )}
        <TextInput
          {...props}
          placeholder={placeholder}
          placeholderTextColor={theme.textSecondary}
          secureTextEntry={secureTextEntry}
          style={[
            styles.input,
            {
              color: theme.text,
              flex: 1,
            },
          ]}
        />
        {initialSecureTextEntry && (
          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            style={styles.toggleButton}
          >
            <Feather
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={20}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[styles.errorText, { color: theme.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

interface OTPInputProps {
  value: string;
  onChangeText: (text: string) => void;
  length?: number;
}

export function OTPInput({ value, onChangeText, length = 6 }: OTPInputProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const otpDigits = value.split('').slice(0, length);

  return (
    <View style={styles.otpContainer}>
      {Array.from({ length }).map((_, index) => {
        const hasValue = otpDigits[index] !== undefined;
        return (
          <View
            key={index}
            style={[
              styles.otpBox,
              {
                borderColor: hasValue ? theme.primary : theme.border,
                backgroundColor: theme.backgroundElement,
                borderWidth: hasValue ? 2 : 1.5,
              },
            ]}
          >
            <Text
              style={[
                styles.otpText,
                {
                  color: hasValue ? theme.primary : theme.textSecondary,
                },
              ]}
            >
              {hasValue ? otpDigits[index] : '-'}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

import { Text } from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    marginVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    fontSize: 16,
    padding: 0,
  },
  toggleButton: {
    padding: 8,
    marginLeft: 8,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '100%',
  },
  otpBox: {
    width: 40,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpText: {
    fontSize: 20,
    fontWeight: '600',
  },
});
