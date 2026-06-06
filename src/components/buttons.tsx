import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
}

export function PrimaryButton({
  title,
  onPress,
  style,
  disabled = false,
  loading = false,
}: PrimaryButtonProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? theme.textSecondary : theme.primary,
        },
        style,
      ]}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, { color: '#fff' }]}>
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
}

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

export function SecondaryButton({ title, onPress, style }: SecondaryButtonProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.secondaryButton,
        {
          borderColor: theme.primary,
          borderWidth: 1,
        },
        style,
      ]}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, { color: theme.primary }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

interface TextButtonProps {
  title: string;
  onPress: () => void;
  style?: TextStyle;
}

export function TextButton({ title, onPress, style }: TextButtonProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <Text style={[styles.textButton, { color: theme.primary }, style]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
