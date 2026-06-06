import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <LinearGradient
      colors={[theme.primary, '#1e5dda']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Rx</Text>
        <Text style={styles.logoSubtext}>bridge</Text>
      </View>

      {/* Medical grid pattern background */}
      <View style={styles.gridContainer}>
        {Array.from({ length: 16 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.gridItem,
              {
                opacity: 0.2,
                backgroundColor: '#fff',
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.spinner} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  logoContainer: {
    alignItems: 'center',
    zIndex: 10,
  },
  logo: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoSubtext: {
    fontSize: 28,
    fontWeight: '300',
    color: '#fff',
    marginTop: -8,
  },
  gridContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    opacity: 0.15,
  },
  gridItem: {
    width: '25%',
    height: '25%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    borderTopColor: '#fff',
  },
});
