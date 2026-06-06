import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { MaterialCommunityIcons, AntDesign, Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string; // e.g. "09:30 AM" or "04:30 PM"
  status: 'taken' | 'skipped' | 'none';
  imageIndex: number; // to select one of several pill placeholder images
}

const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: '1',
    name: 'Microgynon',
    dosage: 'Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nu...',
    time: '09:30 AM',
    status: 'none',
    imageIndex: 0,
  },
  {
    id: '2',
    name: 'Marvelon',
    dosage: 'Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nu...',
    time: '09:30 AM',
    status: 'taken',
    imageIndex: 1,
  },
  {
    id: '3',
    name: 'Femodene',
    dosage: 'Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nu...',
    time: '09:30 AM',
    status: 'taken',
    imageIndex: 2,
  },
  {
    id: '4',
    name: 'Yasmin',
    dosage: 'Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nu...',
    time: '09:30 AM',
    status: 'taken',
    imageIndex: 3,
  },
  {
    id: '5',
    name: 'Mercilon',
    dosage: 'Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nu...',
    time: '04:30 PM',
    status: 'taken',
    imageIndex: 4,
  },
  {
    id: '6',
    name: 'Cerelle',
    dosage: 'Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nu...',
    time: '04:30 PM',
    status: 'none',
    imageIndex: 5,
  },
];

// High quality pill placeholder images (abstract illustrations/colored circles with medication icons inside)
const PILL_COLORS = [
  '#EAF2FF', // Blue
  '#F1F5F9', // Grey
  '#FEF2F2', // Red
  '#FEF3C7', // Amber
  '#ECFDF5', // Emerald
  '#F5F3FF', // Purple
];

const REAL_MED_IMAGES = [
  'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80&w=150',
];

interface MedicationsScreenProps {
  onBack?: () => void;
}

export function MedicationsScreen({ onBack }: MedicationsScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  // State
  const [selectedDay, setSelectedDay] = useState(17); // Default selected Sunday 17th
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Modal State
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMed, setEditingMed] = useState<Medication | null>(null);
  const [medName, setMedName] = useState('');
  const [medDosage, setMedDosage] = useState('');
  const [medTime, setMedTime] = useState('09:30 AM'); // Default time option

  // Adherence Calculation
  const totalTracked = medications.filter(m => m.status !== 'none').length;
  const takenCount = medications.filter(m => m.status === 'taken').length;
  const adherenceScore = medications.length > 0 
    ? Math.round((takenCount / medications.length) * 100) 
    : 100;

  // Render Gauge needle rotation angle (0 to 180 deg)
  // For 85% score, needle angle = 0.85 * 180 - 90 = 63 degrees
  const needleRotation = `${(adherenceScore / 100) * 180 - 90}deg`;

  const handleOpenAddModal = () => {
    setEditingMed(null);
    setMedName('');
    setMedDosage('');
    setMedTime('09:30 AM');
    setIsModalVisible(true);
  };

  const handleOpenEditModal = (med: Medication) => {
    setEditingMed(med);
    setMedName(med.name);
    setMedDosage(med.dosage);
    setMedTime(med.time);
    setIsModalVisible(true);
    setExpandedCardId(null); // Close slider
  };

  const handleSaveMedication = () => {
    if (!medName.trim()) return;

    if (editingMed) {
      // Edit mode
      setMedications(prev =>
        prev.map(m =>
          m.id === editingMed.id
            ? { ...m, name: medName, dosage: medDosage || 'No details provided.', time: medTime }
            : m
        )
      );
    } else {
      // Add mode
      const newMed: Medication = {
        id: Math.random().toString(),
        name: medName,
        dosage: medDosage || 'Take as directed by your physician.',
        time: medTime,
        status: 'none',
        imageIndex: Math.floor(Math.random() * PILL_COLORS.length),
      };
      setMedications(prev => [...prev, newMed]);
    }
    setIsModalVisible(false);
  };

  const handleDeleteMedication = (id: string) => {
    setMedications(prev => prev.filter(m => m.id !== id));
    setIsModalVisible(false);
    setExpandedCardId(null);
  };

  const updateStatus = (id: string, status: 'taken' | 'skipped' | 'none') => {
    setMedications(prev =>
      prev.map(m => (m.id === id ? { ...m, status: m.status === status ? 'none' : status } : m))
    );
    setExpandedCardId(null); // Close option panel after action
  };

  // Group medications by time
  const times = Array.from(new Set(medications.map(m => m.time))).sort();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <AntDesign name="left" size={18} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Medication</Text>
        <TouchableOpacity style={styles.historyButton} activeOpacity={0.7}>
          <Ionicons name="time-outline" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Your Schedule */}
        <View style={styles.scheduleContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Schedule</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.calendarScroll}>
            {[
              { day: 'Sun', date: 17 },
              { day: 'Mon', date: 18 },
              { day: 'Tue', date: 19 },
              { day: 'Wed', date: 20 },
              { day: 'Thus', date: 21 },
              { day: 'Fri', date: 22 },
              { day: 'Sat', date: 23 },
            ].map((item) => {
              const isSelected = selectedDay === item.date;
              return (
                <TouchableOpacity
                  key={item.date}
                  style={[
                    styles.calendarCard,
                    isSelected ? styles.calendarCardActive : { backgroundColor: theme.backgroundElement, borderColor: theme.border }
                  ]}
                  onPress={() => setSelectedDay(item.date)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.calendarDateCircle, isSelected && styles.calendarDateCircleActive]}>
                    <Text style={[styles.calendarDateText, { color: isSelected ? '#2F76F6' : theme.text }]}>
                      {item.date}
                    </Text>
                  </View>
                  <Text style={[styles.calendarDayText, { color: isSelected ? '#FFFFFF' : theme.textSecondary }]}>
                    {item.day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Adherence Score Card */}
        <View style={[styles.adherenceCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          {/* Custom Speedometer Arc Gauge */}
          <View style={styles.speedometerContainer}>
            <View style={styles.speedometerArcOuter}>
              {/* Speedometer Arc Inner styling using styled borders */}
              <View style={[styles.speedometerArcTrack, { borderColor: theme.border }]} />
              <View style={[styles.speedometerArcFill, { borderTopColor: theme.primary, borderLeftColor: theme.primary }]} />
              
              {/* Speedometer Needle */}
              <View style={[styles.needleCenter, { backgroundColor: theme.text }]} />
              <View style={[styles.needleContainer, { transform: [{ rotate: needleRotation }] }]}>
                <View style={[styles.needlePin, { backgroundColor: theme.text }]} />
              </View>
            </View>
          </View>

          {/* Adherence Score Text and Badges */}
          <View style={styles.adherenceInfo}>
            <View style={styles.adherenceScoreRow}>
              <Text style={[styles.adherenceTitle, { color: theme.text }]}>
                Adherence Score is {adherenceScore}%
              </Text>
              <View style={styles.moderateBadge}>
                <Text style={styles.moderateBadgeText}>Moderate</Text>
              </View>
            </View>
            <View style={styles.adherenceHelpRow}>
              <Feather name="info" size={14} color="#3B82F6" />
              <Text style={styles.adherenceHelpText}>You only need to be relax</Text>
              <View style={styles.timeAgoBadge}>
                <Ionicons name="time" size={12} color="#6E7682" />
                <Text style={styles.timeAgoText}>8hrs ago</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Medications Grouped by Time */}
        {times.map(timeGroup => {
          const medsInGroup = medications.filter(m => m.time === timeGroup);
          if (medsInGroup.length === 0) return null;

          return (
            <View key={timeGroup} style={styles.timeGroupSection}>
              <Text style={[styles.timeGroupHeader, { color: theme.text }]}>{timeGroup}</Text>
              <View style={styles.medicationsList}>
                {medsInGroup.map(med => (
                  <SwipeableMedicationCard
                    key={med.id}
                    med={med}
                    theme={theme}
                    isExpanded={expandedCardId === med.id}
                    onToggleExpand={() => setExpandedCardId(expandedCardId === med.id ? null : med.id)}
                    onTaken={() => updateStatus(med.id, 'taken')}
                    onSkip={() => updateStatus(med.id, 'skipped')}
                    onEdit={() => handleOpenEditModal(med)}
                    onHistory={() => {
                      alert(`${med.name} History: Taken 92% of the time, last tracked today.`);
                      setExpandedCardId(null);
                    }}
                  />
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fabButton, { backgroundColor: '#2F76F6' }]}
        onPress={handleOpenAddModal}
        activeOpacity={0.8}
      >
        <AntDesign name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Add / Edit Modal Sheet */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { backgroundColor: theme.backgroundElement }]}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeaderRow}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                {editingMed ? 'Edit Medication' : 'Add Medication'}
              </Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <AntDesign name="close" size={20} color={theme.text} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalScrollContent} keyboardShouldPersistTaps="handled">
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Medication Name</Text>
                <TextInput
                  placeholder="e.g. Microgynon"
                  placeholderTextColor="#8E9AA6"
                  style={[styles.textInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.background }]}
                  value={medName}
                  onChangeText={setMedName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Dosage Description / Details</Text>
                <TextInput
                  placeholder="e.g. Jorem ipsum dolor sit amet..."
                  placeholderTextColor="#8E9AA6"
                  multiline
                  style={[styles.textInput, styles.textArea, { color: theme.text, borderColor: theme.border, backgroundColor: theme.background }]}
                  value={medDosage}
                  onChangeText={setMedDosage}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Schedule Time</Text>
                <View style={styles.timeSelectorRow}>
                  {[
                    { label: '09:30 AM', value: '09:30 AM' },
                    { label: '04:30 PM', value: '04:30 PM' },
                  ].map(opt => (
                    <TouchableOpacity
                      key={opt.value}
                      style={[
                        styles.timeOptionButton,
                        { borderColor: theme.border, backgroundColor: theme.background },
                        medTime === opt.value && { borderColor: '#2F76F6', backgroundColor: '#EAF0FE' }
                      ]}
                      onPress={() => setMedTime(opt.value)}
                    >
                      <Text style={[styles.timeOptionText, { color: medTime === opt.value ? '#2F76F6' : theme.text }]}>
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.modalActionsRow}>
                {editingMed && (
                  <TouchableOpacity
                    style={[styles.modalButton, styles.deleteButton]}
                    onPress={() => handleDeleteMedication(editingMed.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton, { backgroundColor: '#2F76F6' }]}
                  onPress={handleSaveMedication}
                >
                  <Text style={styles.saveButtonText}>Save Medication</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Swipeable/Slideable Card Component
interface SwipeableCardProps {
  med: Medication;
  theme: any;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onTaken: () => void;
  onSkip: () => void;
  onEdit: () => void;
  onHistory: () => void;
}

function SwipeableMedicationCard({
  med,
  theme,
  isExpanded,
  onToggleExpand,
  onTaken,
  onSkip,
  onEdit,
  onHistory,
}: SwipeableCardProps) {
  const [cardWidth, setCardWidth] = useState(SCREEN_WIDTH - 32);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: isExpanded ? -230 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 50,
    }).start();
  }, [isExpanded]);

  return (
    <View
      style={styles.cardWrapperContainer}
      onLayout={(e) => {
        const { width } = e.nativeEvent.layout;
        if (width > 0) {
          setCardWidth(width);
        }
      }}
    >
      <Animated.View
        style={[
          styles.animatedCardInner,
          {
            width: cardWidth + 230,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {/* Main Medication Card */}
        <TouchableOpacity
          style={[
            styles.medicationCardMain,
            {
              width: cardWidth,
              backgroundColor: theme.backgroundElement,
              borderColor: theme.border,
            },
          ]}
          onPress={onToggleExpand}
          activeOpacity={0.9}
        >
          <View style={styles.cardHeaderRow}>
            {/* Pill Image */}
            <Image
              source={{ uri: REAL_MED_IMAGES[med.imageIndex] }}
              style={styles.pillImage}
              resizeMode="cover"
            />
            <View style={styles.medicationMainInfo}>
              <View style={styles.medNameRow}>
                <Text style={[styles.medNameText, { color: theme.text }]} numberOfLines={1}>
                  {med.name}
                </Text>
                {med.status === 'taken' && (
                  <View style={styles.statusBadgeTaken}>
                    <AntDesign name={"checkcircle" as any} size={12} color="#10B981" />
                    <Text style={styles.statusBadgeText}>Taken</Text>
                  </View>
                )}
                {med.status === 'skipped' && (
                  <View style={styles.statusBadgeSkipped}>
                    <AntDesign name={"closecircle" as any} size={12} color="#EF4444" />
                    <Text style={styles.statusBadgeText}>Skipped</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.medDosageText, { color: theme.textSecondary }]} numberOfLines={2}>
                {med.dosage}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Swipe Options Panel */}
        <View style={styles.optionsPanelContainer}>
          {/* Taken Button */}
          <TouchableOpacity style={[styles.optionButton, { backgroundColor: '#2F76F6' }]} onPress={onTaken}>
            <AntDesign name={"checkcircleo" as any} size={18} color="#FFFFFF" />
            <Text style={styles.optionButtonText}>Taken</Text>
          </TouchableOpacity>

          {/* Skip Button */}
          <TouchableOpacity style={[styles.optionButton, { backgroundColor: '#EF4444' }]} onPress={onSkip}>
            <AntDesign name={"closecircleo" as any} size={18} color="#FFFFFF" />
            <Text style={styles.optionButtonText}>Skip</Text>
          </TouchableOpacity>

          {/* Edit Button */}
          <TouchableOpacity style={[styles.optionButton, { backgroundColor: '#FBBF24' }]} onPress={onEdit}>
            <Feather name="edit-2" size={18} color="#FFFFFF" />
            <Text style={styles.optionButtonText}>Edit</Text>
          </TouchableOpacity>

          {/* History Button */}
          <TouchableOpacity style={[styles.optionButton, { backgroundColor: '#F87171' }]} onPress={onHistory}>
            <MaterialCommunityIcons name="chart-bell-curve-cumulative" size={18} color="#FFFFFF" />
            <Text style={styles.optionButtonText}>History</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
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
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingTop: Platform.OS === 'web' ? 12 : (Platform.OS === 'ios' ? 50 : 36),
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
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  historyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  scheduleContainer: {
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'System',
    paddingHorizontal: Spacing.four,
    marginBottom: 8,
  },
  calendarScroll: {
    paddingHorizontal: Spacing.four,
    gap: 10,
  },
  calendarCard: {
    width: 56,
    height: 74,
    borderWidth: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingTop: 4,
    paddingBottom: 6,
  },
  calendarCardActive: {
    backgroundColor: '#2F76F6',
    borderColor: '#2F76F6',
    shadowColor: '#2F76F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  calendarDateCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDateCircleActive: {
    backgroundColor: '#FFFFFF',
  },
  calendarDateText: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  calendarDayText: {
    fontSize: 9,
    fontWeight: '600',
    fontFamily: 'System',
  },
  adherenceCard: {
    marginHorizontal: Spacing.four,
    marginTop: 18,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  speedometerContainer: {
    width: 90,
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  },
  speedometerArcOuter: {
    width: 80,
    height: 80,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedometerArcTrack: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
  },
  speedometerArcFill: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  needleCenter: {
    position: 'absolute',
    bottom: 36,
    left: 36,
    width: 8,
    height: 8,
    borderRadius: 4,
    zIndex: 10,
  },
  needleContainer: {
    position: 'absolute',
    top: 0,
    left: 39,
    width: 2,
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 5,
  },
  needlePin: {
    width: 2,
    height: 28,
    borderRadius: 1,
  },
  adherenceInfo: {
    flex: 1,
    gap: 4,
  },
  adherenceScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  adherenceTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  moderateBadge: {
    backgroundColor: '#DBEAFE',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  moderateBadgeText: {
    fontSize: 8,
    color: '#2563EB',
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  adherenceHelpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  adherenceHelpText: {
    fontSize: 10,
    color: '#3B82F6',
    fontWeight: '500',
    fontFamily: 'System',
    flex: 1,
  },
  timeAgoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  timeAgoText: {
    fontSize: 8,
    color: '#6E7682',
    fontWeight: '500',
    fontFamily: 'System',
  },
  timeGroupSection: {
    marginTop: 18,
  },
  timeGroupHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'System',
    paddingHorizontal: Spacing.four,
    marginBottom: 8,
  },
  medicationsList: {
    paddingHorizontal: Spacing.four,
    gap: 8,
  },
  cardWrapperContainer: {
    height: 68,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  animatedCardInner: {
    flexDirection: 'row',
    width: SCREEN_WIDTH - 32 + 230,
    height: '100%',
  },
  medicationCardMain: {
    width: SCREEN_WIDTH - 32,
    height: '100%',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pillIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
  },
  medicationMainInfo: {
    flex: 1,
    gap: 2,
  },
  medNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  medNameText: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  statusBadgeTaken: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusBadgeSkipped: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 8,
    color: '#1E293B',
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  medDosageText: {
    fontSize: 9,
    fontFamily: 'System',
    lineHeight: 12,
  },
  optionsPanelContainer: {
    flexDirection: 'row',
    width: 230,
    height: '100%',
    paddingLeft: 8,
    gap: 6,
  },
  optionButton: {
    flex: 1,
    height: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  optionButtonText: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'System',
  },
  fabButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2F76F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: Spacing.four,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '80%',
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  modalScrollContent: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'System',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    fontFamily: 'System',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  timeSelectorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timeOptionButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeOptionText: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  modalActionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  modalButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {},
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  deleteButtonText: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
});
