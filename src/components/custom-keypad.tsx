import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomKeypadProps {
  onKeyPress: (value: string) => void;
  onDelete: () => void;
}

export function CustomKeypad({ onKeyPress, onDelete }: CustomKeypadProps) {
  const keys = [
    { num: '1', letters: '' },
    { num: '2', letters: 'A B C' },
    { num: '3', letters: 'D E F' },
    { num: '4', letters: 'G H I' },
    { num: '5', letters: 'J K L' },
    { num: '6', letters: 'M N O' },
    { num: '7', letters: 'P Q R S' },
    { num: '8', letters: 'T U V' },
    { num: '9', letters: 'W X Y Z' },
    { num: '', letters: '' }, // empty space
    { num: '0', letters: '' },
    { num: 'delete', letters: '' }, // backspace
  ];

  return (
    <View style={styles.grid}>
      {keys.map((key, index) => {
        if (key.num === '') {
          return <View key={`empty-${index}`} style={styles.keyContainer} />;
        }

        if (key.num === 'delete') {
          return (
            <TouchableOpacity
              key="delete"
              style={styles.keyContainer}
              onPress={onDelete}
              activeOpacity={0.6}>
              <View style={styles.keyCircle}>
                <Ionicons
                  name="backspace-outline"
                  size={22}
                  color="#1E2229"
                />
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={key.num}
            style={styles.keyContainer}
            onPress={() => onKeyPress(key.num)}
            activeOpacity={0.6}>
            <View style={styles.keyCircle}>
              <Text style={styles.numText}>{key.num}</Text>
              {key.letters ? (
                <Text style={styles.lettersText}>{key.letters}</Text>
              ) : null}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#F0F0F3',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  keyContainer: {
    width: '33.33%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  keyCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '100%',
  },
  numText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E2229',
    fontFamily: 'System',
  },
  lettersText: {
    fontSize: 9,
    fontWeight: '500',
    color: '#8E9AA6',
    marginTop: -2,
    letterSpacing: 1,
    fontFamily: 'System',
  },
});
