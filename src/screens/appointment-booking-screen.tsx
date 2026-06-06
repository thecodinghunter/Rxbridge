import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';

interface AppointmentBookingScreenProps {
  onBook: (details: { language: string; callType: string; date: string; slot: string }) => void;
  onBack: () => void;
}

export function AppointmentBookingScreen({
  onBook,
  onBack,
}: AppointmentBookingScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  // Form states
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [callType, setCallType] = useState<'audio' | 'video' | 'chat'>('audio');
  const [selectedDate, setSelectedDate] = useState<number>(17); // Default to Aug 17 as in wireframe
  const [selectedSlot, setSelectedSlot] = useState<string>('10AM - 10:30AM'); // Default active slot
  const [isCalendarOk, setIsCalendarOk] = useState(true);

  const callTypes = [
    { id: 'audio', label: 'Audio Call', icon: 'call-outline' as any },
    { id: 'video', label: 'Video call', icon: 'videocam-outline' as any },
    { id: 'chat', label: 'Chat', icon: 'chatbubble-ellipses-outline' as any },
  ];

  const slots = [
    '10AM - 10:30AM',
    '10:30AM - 11AM',
    '11AM - 11:30AM',
    '12PM - 12:30PM',
    '1:00PM - 1:30PM',
    '2:00PM - 2:30PM',
  ];

  const calendarDays = [
    26, 27, 28, 29, 30, 31, 1,
    2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29,
    30, 1, 2, 3, 4, 5, 6,
  ];

  const handleBookNow = () => {
    onBook({
      language: selectedLanguage,
      callType: callType === 'audio' ? 'Audio Call' : callType === 'video' ? 'Video Call' : 'Chat',
      date: `08/${selectedDate.toString().padStart(2, '0')}/2025`,
      slot: selectedSlot,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header matching wireframe */}
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <AntDesign name="left" size={16} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Select Schedule</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Preferred Language dropdown */}
        <Text style={[styles.sectionLabel, { color: theme.text }]}>Select Preferred Language</Text>
        <TouchableOpacity style={[styles.dropdownSelector, { borderColor: theme.border, backgroundColor: theme.backgroundElement }]} activeOpacity={0.8}>
          <Text style={[styles.dropdownVal, { color: theme.text }]}>{selectedLanguage}</Text>
          <Feather name="chevron-down" size={18} color="#6E7682" />
        </TouchableOpacity>

        {/* Call Type selector */}
        <Text style={[styles.sectionLabel, { color: theme.text }]}>Select Call Type</Text>
        <View style={styles.callTypeRow}>
          {callTypes.map((type) => {
            const isActive = callType === type.id;
            return (
              <TouchableOpacity
                key={type.id}
                onPress={() => setCallType(type.id as any)}
                style={[
                  styles.callTypeBtn,
                  { borderColor: theme.border, backgroundColor: theme.backgroundElement },
                  isActive && { backgroundColor: theme.primary, borderColor: 'transparent' },
                ]}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={type.icon}
                  size={16}
                  color={isActive ? '#FFFFFF' : '#6E7682'}
                />
                <Text
                  style={[
                    styles.callTypeBtnTxt,
                    { color: isActive ? '#FFFFFF' : '#6E7682' },
                    isActive && { fontWeight: 'bold' },
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected Date indicator */}
        <Text style={[styles.sectionLabel, { color: theme.text }]}>Select Date</Text>
        <View style={[styles.datePickerInput, { borderColor: theme.primary, backgroundColor: theme.backgroundElement }]}>
          <Text style={[styles.datePickerVal, { color: theme.text }]}>
            08/{selectedDate.toString().padStart(2, '0')}/2025
          </Text>
          <Feather name="calendar" size={18} color={theme.primary} />
        </View>
        <Text style={styles.dateFormatHelp}>MM/DD/YYYY</Text>

        {/* Inline Calendar Widget */}
        <View style={[styles.calendarContainer, { borderColor: theme.border, backgroundColor: theme.backgroundElement }]}>
          <View style={styles.calendarHeaderRow}>
            {/* Month selector */}
            <TouchableOpacity style={styles.calNavArrow}>
              <Feather name="chevron-left" size={14} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.calendarMonthTitle, { color: theme.text }]}>Aug</Text>
            <TouchableOpacity style={styles.calNavArrow}>
              <Feather name="chevron-right" size={14} color={theme.text} />
            </TouchableOpacity>

            <View style={{ width: 20 }} />

            {/* Year selector */}
            <TouchableOpacity style={styles.calNavArrow}>
              <Feather name="chevron-left" size={14} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.calendarMonthTitle, { color: theme.text }]}>2025</Text>
            <TouchableOpacity style={styles.calNavArrow}>
              <Feather name="chevron-right" size={14} color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Weekdays labels */}
          <View style={styles.calendarWeekdays}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
              <Text key={idx} style={styles.weekdayTxt}>
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar days grid */}
          <View style={styles.calendarGrid}>
            {calendarDays.map((day, idx) => {
              // Days from index 6 to 35 represent Aug 1 to Aug 30
              const isAugDate = idx >= 6 && idx <= 35;
              const isSelected = isAugDate && selectedDate === day;

              return (
                <TouchableOpacity
                  key={idx}
                  disabled={!isAugDate}
                  onPress={() => isAugDate && setSelectedDate(day)}
                  style={[
                    styles.calendarDayCell,
                    isSelected && { backgroundColor: theme.primary, borderRadius: 18 },
                  ]}
                  activeOpacity={0.6}
                >
                  <Text
                    style={[
                      styles.calendarDayTxt,
                      { color: theme.text },
                      !isAugDate && styles.calendarDayGrey,
                      isSelected && styles.calendarDayTxtSelected,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Calendar Actions */}
          <View style={styles.calendarActionRow}>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.calCancelTxt}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={[styles.calOkTxt, { color: theme.primary }]}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Time Slots selector */}
        <Text style={[styles.sectionLabel, { color: theme.text }]}>Select Slot</Text>
        <View style={styles.slotsGrid}>
          {slots.map((slot) => {
            const isSelected = selectedSlot === slot;
            return (
              <TouchableOpacity
                key={slot}
                onPress={() => setSelectedSlot(slot)}
                style={[
                  styles.slotBtn,
                  { borderColor: theme.border, backgroundColor: theme.backgroundElement },
                  isSelected && { backgroundColor: theme.primary, borderColor: 'transparent' },
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.slotBtnTxt,
                    { color: theme.text },
                    isSelected && styles.slotBtnTxtActive,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Duration Notes */}
        <Text style={[styles.sectionLabel, { color: theme.text }]}>Notes</Text>
        <Text style={styles.sessionNotes}>
          Each session is limited to 30 minutes. To extend the session duration, please upgrade your plan.
        </Text>

      </ScrollView>

      {/* Book Now Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleBookNow}
          style={[styles.bookButton, { backgroundColor: theme.primary }]}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Platform.OS === 'web' ? 12 : (Platform.OS === 'ios' ? 60 : 40),
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.three,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.six,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 8,
    fontFamily: 'System',
  },
  dropdownSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownVal: {
    fontSize: 13,
    fontFamily: 'System',
  },
  callTypeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  callTypeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    gap: 6,
  },
  callTypeBtnTxt: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'System',
  },
  datePickerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  datePickerVal: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'System',
  },
  dateFormatHelp: {
    fontSize: 9,
    color: '#8E9AA6',
    marginTop: 4,
    fontFamily: 'System',
  },
  calendarContainer: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },
  calendarHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 16,
  },
  calNavArrow: {
    padding: 4,
  },
  calendarMonthTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginHorizontal: 4,
    fontFamily: 'System',
  },
  calendarWeekdays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekdayTxt: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#8E9AA6',
    fontFamily: 'System',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDayCell: {
    width: '14.28%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1,
  },
  calendarDayTxt: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'System',
  },
  calendarDayGrey: {
    color: '#CBD5E1',
  },
  calendarDayTxtSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  calendarActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 14,
  },
  calCancelTxt: {
    fontSize: 12,
    color: '#6E7682',
    fontWeight: '600',
    fontFamily: 'System',
  },
  calOkTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  slotBtn: {
    width: '48.5%',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  slotBtnTxt: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'System',
  },
  slotBtnTxtActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sessionNotes: {
    fontSize: 10,
    color: '#6E7682',
    lineHeight: 14,
    fontFamily: 'System',
    marginBottom: 10,
  },
  footer: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    paddingBottom: Platform.OS === 'ios' ? Spacing.five + 10 : Spacing.four,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  bookButton: {
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
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
});
