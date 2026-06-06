import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';

interface DiseaseSelectionScreenProps {
  onSelectDiseases: (diseases: string[]) => void;
  onBack: () => void;
  programName?: string;
}

const CHRONIC_DISEASES_DATA = [
  {
    category: '1.Cardiovascular & Metabolic Diseases',
    items: [
      'Diabetes Mellitus (Type 1 & Type 2)',
      'Hypertension',
      'Dyslipidemia',
      'Coronary Artery Disease',
      'Heart Failure',
      'Stroke Prevention & Post-Stroke Care',
    ],
  },
  {
    category: '2.Respiratory Diseases',
    items: [
      'Asthma',
      'Chronic Obstructive Pulmonary Disease',
      'Allergic Rhinitis',
    ],
  },
  {
    category: '3.Mental Health Disorders',
    items: [
      'Depression',
      'Generalized Anxiety Disorder',
    ],
  },
];

export function DiseaseSelectionScreen({
  onSelectDiseases,
  onBack,
  programName = 'Chronic Diseases Program',
}: DiseaseSelectionScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [searchText, setSearchText] = useState('');
  
  // Set default checked items as seen in wireframe p1 (1).png
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'Diabetes Mellitus (Type 1 & Type 2)': true,
    'Asthma': true,
    'Depression': true,
  });

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleBookNow = () => {
    const selected = Object.keys(checkedItems).filter((key) => checkedItems[key]);
    onSelectDiseases(selected);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header matching p1 (1).png */}
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <AntDesign name="left" size={16} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {programName}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar matching p1 (1).png */}
        <View style={[styles.searchBarWrapper, { borderColor: theme.border, backgroundColor: theme.backgroundElement }]}>
          <Feather name="search" size={16} color="#8E9AA6" />
          <TextInput
            placeholder="Search ..."
            placeholderTextColor="#8E9AA6"
            style={[styles.searchBarInput, { color: theme.text }]}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Hierarchical Checklist groups */}
        {CHRONIC_DISEASES_DATA.map((group, groupIdx) => {
          const filteredItems = group.items.filter((item) =>
            item.toLowerCase().includes(searchText.toLowerCase())
          );

          if (filteredItems.length === 0) return null;

          return (
            <View key={groupIdx} style={styles.checklistGroup}>
              <Text style={[styles.checklistGroupTitle, { color: theme.text }]}>
                {group.category}
              </Text>

              {filteredItems.map((item, itemIdx) => {
                const isChecked = !!checkedItems[item];
                return (
                  <TouchableOpacity
                    key={itemIdx}
                    onPress={() => toggleCheck(item)}
                    style={styles.checkListItem}
                    activeOpacity={0.7}
                  >
                    <View style={styles.checkItemLeft}>
                      <View style={[styles.customCheck, isChecked && styles.customCheckActive]}>
                        {isChecked && (
                          <FontAwesome name="check" size={10} color="#FFFFFF" />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.checkListItemTxt,
                          { color: theme.text },
                          isChecked && styles.checkListItemTxtActive,
                        ]}
                      >
                        {item}
                      </Text>
                    </View>
                    
                    {/* Exclamation info icon on the right as seen in p1 (1).png */}
                    <TouchableOpacity activeOpacity={0.6} style={styles.infoButton}>
                      <AntDesign name={"exclamationcircle" as any} size={16} color="#CBD5E1" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>

      {/* Book Now Button at bottom */}
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
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 18,
    marginBottom: 14,
    gap: 8,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 13,
    paddingVertical: 2,
    fontFamily: 'System',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  } as any,
  checklistGroup: {
    marginTop: 14,
  },
  checklistGroupTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'System',
    marginBottom: 8,
  },
  checkListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  checkItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  customCheck: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  customCheckActive: {
    backgroundColor: '#2F76F6',
    borderColor: 'transparent',
  },
  checkListItemTxt: {
    fontSize: 12,
    fontFamily: 'System',
    flex: 1,
  },
  checkListItemTxtActive: {
    fontWeight: '600',
  },
  infoButton: {
    padding: 4,
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
