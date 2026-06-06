import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';

interface BookingSuccessScreenProps {
  onGoHome: () => void;
  bookingId?: string;
}

export function BookingSuccessScreen({
  onGoHome,
  bookingId = 'BM000251',
}: BookingSuccessScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        
        {/* Calendar Plus Badge Icon matching after book.png */}
        <View style={styles.iconContainer}>
          <View style={[styles.successIconCircle, { backgroundColor: theme.primaryLight }]}>
            <Feather name="calendar" size={42} color={theme.primary} />
            <View style={styles.successPlusBadge}>
              <AntDesign name={"pluscircle" as any} size={24} color={theme.success} />
            </View>
          </View>
        </View>

        {/* Text information */}
        <Text style={[styles.successHeading, { color: theme.text }]}>
          Thank you for your booking.
        </Text>
        
        <Text style={[styles.bookingIdTxt, { color: theme.text }]}>
          Booking ID : {bookingId}
        </Text>
        
        <Text style={[styles.successSub, { color: theme.textSecondary }]}>
          Your session has been successfully scheduled.{"\n"}Please join at your selected date and time.
        </Text>

        {/* Go to Home Page button */}
        <TouchableOpacity
          style={[styles.homeButton, { backgroundColor: theme.primary }]}
          onPress={onGoHome}
          activeOpacity={0.8}
        >
          <Text style={styles.homeButtonText}>Go to Home Page</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  iconContainer: {
    marginBottom: 32,
  },
  successIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#2F76F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  successPlusBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  successHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'System',
    textAlign: 'center',
    marginBottom: 10,
  },
  bookingIdTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'System',
    textAlign: 'center',
    marginBottom: 16,
  },
  successSub: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: 'System',
    marginBottom: 40,
  },
  homeButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2F76F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
});
