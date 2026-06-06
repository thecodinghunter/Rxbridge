import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface NumericKeypadProps {
  onKeyPress: (key: string) => void;
}

export function NumericKeypad({ onKeyPress }: NumericKeypadProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'backspace'],
  ];

  const subtexts: Record<string, string> = {
    '2': 'ABC',
    '3': 'DEF',
    '4': 'GHI',
    '5': 'JKL',
    '6': 'MNO',
    '7': 'PQRS',
    '8': 'TUV',
    '9': 'WXYZ',
  };

  // Use specialized colors matching mockup design
  const keypadBg = isDark ? '#181A20' : '#EEF2F6';
  const keyBg = isDark ? '#272A34' : '#FFFFFF';
  const numberColor = isDark ? '#F8F9FC' : '#1D2939';
  const letterColor = isDark ? '#94A3B8' : '#667085';

  return (
    <View style={[styles.container, { backgroundColor: keypadBg }]}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key, keyIndex) => {
            const isSpecial = key === 'backspace' || key === '';

            return (
              <TouchableOpacity
                key={`${rowIndex}-${keyIndex}`}
                style={[
                  styles.key,
                  isSpecial
                    ? styles.specialKey
                    : [
                        styles.numberKey,
                        {
                          backgroundColor: keyBg,
                          shadowColor: '#101828',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: isDark ? 0.2 : 0.05,
                          shadowRadius: 2,
                          elevation: 1,
                        },
                      ],
                ]}
                onPress={() => onKeyPress(key)}
                disabled={key === ''}
                activeOpacity={0.7}
              >
                {key === 'backspace' ? (
                  <MaterialCommunityIcons
                    name="backspace-outline"
                    size={26}
                    color={numberColor}
                  />
                ) : key === '' ? (
                  <View />
                ) : (
                  <View style={styles.keyContent}>
                    <Text style={[styles.keyText, { color: numberColor }]}>{key}</Text>
                    {subtexts[key] ? (
                      <Text style={[styles.letterText, { color: letterColor }]}>
                        {subtexts[key]}
                      </Text>
                    ) : (
                      // Add spacer so that number alignment remains stable
                      <View style={styles.letterSpacer} />
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  key: {
    width: '31%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  numberKey: {},
  specialKey: {
    backgroundColor: 'transparent',
  },
  keyContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 22,
    fontWeight: '500',
    lineHeight: 26,
  },
  letterText: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 1,
    letterSpacing: 0.5,
  },
  letterSpacer: {
    height: 11,
  },
});

