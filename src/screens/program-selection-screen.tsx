import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';

interface ProgramSelectionScreenProps {
  onSelectProgram: (program: string) => void;
  onSkip: () => void;
  onBack: () => void;
}

const PROGRAMS = [
  { id: 'chronic', name: 'Chronic Diseases Program' },
  { id: 'minor_ailments', name: 'Minor Ailments Programs' },
  { id: 'travel_health', name: 'Travel Health Educator Programs' },
  { id: 'preventive', name: 'Preventive Health & Wellness' },
  { id: 'device', name: 'Device-Based Educator Programs' },
  { id: 'addiction', name: 'Addiction & Substance Use Educator Programs' },
];

export function ProgramSelectionScreen({
  onSelectProgram,
  onSkip,
  onBack,
}: ProgramSelectionScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const handleSelect = (programId: string) => {
    setSelectedProgram(programId);
  };

  const handleNext = () => {
    if (selectedProgram) {
      // Find the selected program name
      const prog = PROGRAMS.find(p => p.id === selectedProgram);
      if (prog) {
        onSelectProgram(prog.name);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header matching p2.png */}
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <AntDesign name="left" size={16} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Select Schedule</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.programsListWrapper}>
          {PROGRAMS.map((program) => {
            const isSelected = selectedProgram === program.id;
            return (
              <TouchableOpacity
                key={program.id}
                onPress={() => handleSelect(program.id)}
                style={[
                  styles.programItem,
                  {
                    backgroundColor: theme.backgroundElement,
                    borderColor: isSelected ? theme.primary : theme.border,
                    borderWidth: isSelected ? 1.5 : 1,
                  },
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.programName,
                    { color: isSelected ? theme.primary : theme.text },
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {program.name}
                </Text>
                <Feather
                  name="chevron-right"
                  size={16}
                  color={isSelected ? theme.primary : '#8E9AA6'}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer matching p2.png side-by-side buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={onSkip}
          style={[styles.skipButton, { borderColor: theme.primary }]}
          activeOpacity={0.7}
        >
          <Text style={[styles.skipButtonText, { color: theme.primary }]}>
            Skip
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={!selectedProgram}
          style={[
            styles.nextButton,
            {
              backgroundColor: selectedProgram ? theme.primary : '#E2E8F0',
            },
          ]}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.nextButtonText,
              { color: selectedProgram ? '#FFFFFF' : '#94A3B8' },
            ]}
          >
            Next
          </Text>
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
  listContainer: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.four,
  },
  programsListWrapper: {
    gap: 12,
  },
  programItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  programName: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'System',
    flex: 1,
    paddingRight: 10,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    paddingBottom: Platform.OS === 'ios' ? Spacing.five + 10 : Spacing.four,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  skipButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  nextButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
});
