import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Spacing } from '@/constants/theme';

interface OnboardingScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

const ONBOARDING_DATA = [
  {
    id: 1,
    title1: 'Healthcare at',
    title2: 'Your Fingertips',
    description: 'Book doctors, nurses, and health services anytime from your phone.',
    image: require('@/assets/images/onboarding_1.png'),
  },
  {
    id: 2,
    title1: 'Stay on Top of',
    title2: 'Your Health',
    description: 'Track medicines, vitals, sleep, stress, and daily wellness in one place.',
    image: require('@/assets/images/onboarding_2.png'),
  },
  {
    id: 3,
    title1: 'Manage Everything',
    title2: 'Securely',
    description: 'Store reports, vaccination records, allergies, and family health details securely.',
    image: require('@/assets/images/onboarding_3.png'),
  },
];

export function OnboardingScreen({ onNext, onSkip }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  const currentData = ONBOARDING_DATA[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        source={currentData.image}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Dark vertical gradient overlay to make text highly legible */}
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.45)', 'rgba(0, 0, 0, 0.95)']}
          style={StyleSheet.absoluteFill}
        />

        <SafeAreaView style={styles.safeArea}>
          {/* Header Action Bar */}
          <View style={styles.header}>
            {currentIndex > 0 ? (
              <TouchableOpacity onPress={handleBack} style={styles.iconNavButton} activeOpacity={0.7}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#ffffff" />
              </TouchableOpacity>
            ) : (
              <View style={styles.placeholder} />
            )}

            <TouchableOpacity onPress={handleSkip} style={styles.skipButton} activeOpacity={0.7}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Content Area */}
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title1}>{currentData.title1}</Text>
              <Text style={styles.title2}>{currentData.title2}</Text>
              <Text style={styles.description}>{currentData.description}</Text>
            </View>

            {/* Pagination Indicators */}
            <View style={styles.dotsContainer}>
              {ONBOARDING_DATA.map((_, index) => {
                const isActive = index === currentIndex;
                return (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      {
                        backgroundColor: isActive ? '#2F76F6' : 'rgba(255, 255, 255, 0.35)',
                        width: isActive ? 20 : 6,
                      },
                    ]}
                  />
                );
              })}
            </View>

            {/* Main Action Button */}
            <TouchableOpacity
              onPress={handleNext}
              style={styles.nextButton}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>
                {currentIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Next'}
              </Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#ffffff" style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    height: 56,
  },
  placeholder: {
    width: 44,
  },
  iconNavButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  skipText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    alignItems: 'stretch',
  },
  textContainer: {
    width: '100%',
    marginBottom: Spacing.three,
  },
  title1: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: 'serif',
    color: '#ffffff',
    lineHeight: 38,
  },
  title2: {
    fontSize: 40,
    fontWeight: '900',
    color: '#2F76F6',
    lineHeight: 46,
    marginTop: 4,
  },
  description: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 22,
    marginTop: Spacing.three,
    fontWeight: '500',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.one,
    marginBottom: Spacing.four,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  nextButton: {
    backgroundColor: '#2F76F6',
    height: 54,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#2F76F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  arrowIcon: {
    marginLeft: 8,
  },
});
