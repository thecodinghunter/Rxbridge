import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';

type ThemeColors = typeof Colors.light | typeof Colors.dark;

interface LifestyleWellnessScreenProps {
  onBack?: () => void;
}

type ActivityLevel = 'Low' | 'Medium' | 'High';

interface LifestyleItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  status: string;
  statusColor: string;
  statusBg: string;
}

const LIFESTYLE_ITEMS: LifestyleItem[] = [
  {
    id: 'sleep',
    title: 'Sleep Pattern',
    subtitle: '7.5 hrs',
    icon: 'weather-night',
    iconColor: '#6366F1',
    iconBg: '#EEF2FF',
    status: 'Good',
    statusColor: '#2F76F6',
    statusBg: '#EAF0FE',
  },
  {
    id: 'activity',
    title: 'Physical Activity',
    subtitle: '8,500 steps',
    icon: 'lightning-bolt',
    iconColor: '#F59E0B',
    iconBg: '#FFFBEB',
    status: 'Active',
    statusColor: '#2F76F6',
    statusBg: '#EAF0FE',
  },
  {
    id: 'smoking',
    title: 'Smoking',
    subtitle: 'Non-smoker',
    icon: 'smoking-off',
    iconColor: '#EF4444',
    iconBg: '#FEF2F2',
    status: 'Excellent',
    statusColor: '#10B981',
    statusBg: '#ECFDF5',
  },
  {
    id: 'alcohol',
    title: 'Alcohol Consumption',
    subtitle: 'Occasional',
    icon: 'glass-wine',
    iconColor: '#8B5CF6',
    iconBg: '#F5F3FF',
    status: 'Moderate',
    statusColor: '#F59E0B',
    statusBg: '#FFFBEB',
  },
  {
    id: 'diet',
    title: 'Diet',
    subtitle: 'Vegetarian',
    icon: 'food-fork-drink',
    iconColor: '#10B981',
    iconBg: '#ECFDF5',
    status: 'Regular',
    statusColor: '#10B981',
    statusBg: '#ECFDF5',
  },
];

// ─── Detail / Edit Sub-screens ────────────────────────────────────────────────

function SleepDetailScreen({
  onBack,
  theme,
}: {
  onBack: () => void;
  theme: ThemeColors;
}) {
  const [hours, setHours] = useState('7.5');
  const [quality, setQuality] = useState<'Poor' | 'Fair' | 'Good' | 'Excellent'>('Good');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Feather name="chevron-left" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Sleep Pattern</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.detailContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.formCard, { backgroundColor: theme.backgroundElement }]}>
          <Text style={[styles.fieldLabel, { color: theme.text }]}>Sleep Duration (hrs)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
            value={hours}
            onChangeText={setHours}
            keyboardType="decimal-pad"
            placeholderTextColor={theme.textSecondary}
          />

          <Text style={[styles.fieldLabel, { color: theme.text }]}>Bedtime</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
            placeholder="10:30 PM"
            placeholderTextColor={theme.textSecondary}
          />

          <Text style={[styles.fieldLabel, { color: theme.text }]}>Wake Time</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
            placeholder="6:00 AM"
            placeholderTextColor={theme.textSecondary}
          />

          <Text style={[styles.fieldLabel, { color: theme.text }]}>Sleep Quality</Text>
          <View style={styles.levelRow}>
            {(['Poor', 'Fair', 'Good', 'Excellent'] as const).map((q) => (
              <TouchableOpacity
                key={q}
                style={[
                  styles.levelBtn,
                  { backgroundColor: theme.background, borderColor: theme.border },
                  quality === q && styles.levelBtnActive,
                ]}
                onPress={() => setQuality(q)}
              >
                <Text style={[styles.levelBtnText, { color: theme.textSecondary }, quality === q && styles.levelBtnTextActive]}>
                  {q}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: theme.primary }]}>
          <Text style={styles.saveBtnText}>Save Sleep Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function ActivityDetailScreen({
  onBack,
  theme,
}: {
  onBack: () => void;
  theme: ThemeColors;
}) {
  const [steps, setSteps] = useState('8500');
  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('7.5');
  const [level, setLevel] = useState<ActivityLevel>('Medium');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Feather name="chevron-left" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Physical Activity</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.detailContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.formCard, { backgroundColor: theme.backgroundElement }]}>
          <Text style={[styles.fieldLabel, { color: theme.text }]}>Daily Steps</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
            value={steps}
            onChangeText={setSteps}
            keyboardType="number-pad"
            placeholderTextColor={theme.textSecondary}
          />

          <Text style={[styles.fieldLabel, { color: theme.text }]}>Exercise Type</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
            value={exerciseType}
            onChangeText={setExerciseType}
            placeholder="Walking, Yoga, etc."
            placeholderTextColor={theme.textSecondary}
          />

          <Text style={[styles.fieldLabel, { color: theme.text }]}>Duration</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
            value={duration}
            onChangeText={setDuration}
            keyboardType="decimal-pad"
            placeholderTextColor={theme.textSecondary}
          />

          <Text style={[styles.fieldLabel, { color: theme.text }]}>Activity Level</Text>
          <View style={styles.levelRow}>
            {(['Low', 'Medium', 'High'] as ActivityLevel[]).map((l) => (
              <TouchableOpacity
                key={l}
                style={[
                  styles.levelBtn,
                  { backgroundColor: theme.background, borderColor: theme.border },
                  level === l && styles.levelBtnActive,
                ]}
                onPress={() => setLevel(l)}
              >
                <Text style={[styles.levelBtnText, { color: theme.textSecondary }, level === l && styles.levelBtnTextActive]}>
                  {l}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: theme.primary }]}>
          <Text style={styles.saveBtnText}>Save Activity</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function SmokingDetailScreen({
  onBack,
  theme,
}: {
  onBack: () => void;
  theme: ThemeColors;
}) {
  const [status, setStatus] = useState<'Non-smoker' | 'Occasional' | 'Regular' | 'Heavy'>('Non-smoker');
  const [cigPerDay, setCigPerDay] = useState('0');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Feather name="chevron-left" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Smoking</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.detailContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.formCard, { backgroundColor: theme.backgroundElement }]}>
          <Text style={[styles.fieldLabel, { color: theme.text }]}>Smoking Status</Text>
          <View style={styles.levelRow}>
            {(['Non-smoker', 'Occasional', 'Regular', 'Heavy'] as const).map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.levelBtn,
                  { backgroundColor: theme.background, borderColor: theme.border },
                  status === s && styles.levelBtnActive,
                ]}
                onPress={() => setStatus(s)}
              >
                <Text style={[styles.levelBtnText, { color: theme.textSecondary }, status === s && styles.levelBtnTextActive]}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.fieldLabel, { color: theme.text }]}>Cigarettes per day</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
            value={cigPerDay}
            onChangeText={setCigPerDay}
            keyboardType="number-pad"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: theme.primary }]}>
          <Text style={styles.saveBtnText}>Save Smoking Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function AlcoholDetailScreen({
  onBack,
  theme,
}: {
  onBack: () => void;
  theme: ThemeColors;
}) {
  const [frequency, setFrequency] = useState<'Never' | 'Occasional' | 'Weekly' | 'Daily'>('Occasional');
  const [drinksPerWeek, setDrinksPerWeek] = useState('2');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Feather name="chevron-left" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Alcohol Consumption</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.detailContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.formCard, { backgroundColor: theme.backgroundElement }]}>
          <Text style={[styles.fieldLabel, { color: theme.text }]}>Frequency</Text>
          <View style={styles.levelRow}>
            {(['Never', 'Occasional', 'Weekly', 'Daily'] as const).map((f) => (
              <TouchableOpacity
                key={f}
                style={[
                  styles.levelBtn,
                  { backgroundColor: theme.background, borderColor: theme.border },
                  frequency === f && styles.levelBtnActive,
                ]}
                onPress={() => setFrequency(f)}
              >
                <Text style={[styles.levelBtnText, { color: theme.textSecondary }, frequency === f && styles.levelBtnTextActive]}>
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.fieldLabel, { color: theme.text }]}>Drinks per week</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
            value={drinksPerWeek}
            onChangeText={setDrinksPerWeek}
            keyboardType="number-pad"
            placeholderTextColor={theme.textSecondary}
          />

          <Text style={[styles.fieldLabel, { color: theme.text }]}>Type of drink</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
            placeholder="Beer, Wine, etc."
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: theme.primary }]}>
          <Text style={styles.saveBtnText}>Save Alcohol Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function DietDetailScreen({
  onBack,
  theme,
}: {
  onBack: () => void;
  theme: ThemeColors;
}) {
  const [dietType, setDietType] = useState<'Vegetarian' | 'Vegan' | 'Non-Veg' | 'Keto'>('Vegetarian');
  const [mealsPerDay, setMealsPerDay] = useState('3');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Feather name="chevron-left" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Diet</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.detailContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.formCard, { backgroundColor: theme.backgroundElement }]}>
          <Text style={[styles.fieldLabel, { color: theme.text }]}>Diet Type</Text>
          <View style={styles.levelRow}>
            {(['Vegetarian', 'Vegan', 'Non-Veg', 'Keto'] as const).map((d) => (
              <TouchableOpacity
                key={d}
                style={[
                  styles.levelBtn,
                  { backgroundColor: theme.background, borderColor: theme.border },
                  dietType === d && styles.levelBtnActive,
                ]}
                onPress={() => setDietType(d)}
              >
                <Text style={[styles.levelBtnText, { color: theme.textSecondary }, dietType === d && styles.levelBtnTextActive]}>
                  {d}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.fieldLabel, { color: theme.text }]}>Meals per day</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
            value={mealsPerDay}
            onChangeText={setMealsPerDay}
            keyboardType="number-pad"
            placeholderTextColor={theme.textSecondary}
          />

          <Text style={[styles.fieldLabel, { color: theme.text }]}>Food allergies / restrictions</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
            placeholder="e.g. Gluten-free, Nut allergy"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: theme.primary }]}>
          <Text style={styles.saveBtnText}>Save Diet Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Main List Screen ─────────────────────────────────────────────────────────

export function LifestyleWellnessScreen({ onBack }: LifestyleWellnessScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [activeDetail, setActiveDetail] = useState<string | null>(null);

  // Show detail sub-screens
  if (activeDetail === 'sleep') {
    return <SleepDetailScreen onBack={() => setActiveDetail(null)} theme={theme} />;
  }
  if (activeDetail === 'activity') {
    return <ActivityDetailScreen onBack={() => setActiveDetail(null)} theme={theme} />;
  }
  if (activeDetail === 'smoking') {
    return <SmokingDetailScreen onBack={() => setActiveDetail(null)} theme={theme} />;
  }
  if (activeDetail === 'alcohol') {
    return <AlcoholDetailScreen onBack={() => setActiveDetail(null)} theme={theme} />;
  }
  if (activeDetail === 'diet') {
    return <DietDetailScreen onBack={() => setActiveDetail(null)} theme={theme} />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Feather name="chevron-left" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Lifestyle & Wellness</Text>
        <TouchableOpacity style={styles.backBtn}>
          <Feather name="clock" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {LIFESTYLE_ITEMS.map((item) => (
          <View
            key={item.id}
            style={[styles.itemCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}
          >
            {/* Top row: icon + info + status badge */}
            <View style={styles.itemRow}>
              <View style={[styles.iconWrap, { backgroundColor: item.iconBg }]}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={22}
                  color={item.iconColor}
                />
              </View>
              <View style={styles.itemInfo}>
                <Text style={[styles.itemTitle, { color: theme.text }]}>{item.title}</Text>
                <Text style={[styles.itemSubtitle, { color: theme.textSecondary }]}>{item.subtitle}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: item.statusBg }]}>
                <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
              </View>
            </View>

            {/* Update Button */}
            <TouchableOpacity
              style={[styles.updateBtn, { backgroundColor: theme.primary }]}
              onPress={() => setActiveDetail(item.id)}
              activeOpacity={0.85}
            >
              <Text style={styles.updateBtnText}>Update</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingTop: Platform.OS === 'web' ? 12 : Platform.OS === 'ios' ? 50 : 36,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
  },

  // List screen
  listContent: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  itemCard: {
    borderRadius: 16,
    padding: Spacing.three,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    gap: Spacing.three,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 4,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: { flex: 1 },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  updateBtn: {
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  updateBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Detail sub-screens
  detailContent: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  formCard: {
    borderRadius: 16,
    padding: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    gap: Spacing.two + 4,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    fontSize: 14,
  },
  levelRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  levelBtn: {
    flex: 1,
    minWidth: 70,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  levelBtnActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  levelBtnText: {
    fontSize: 13,
    fontWeight: '500',
  },
  levelBtnTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  saveBtn: {
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#2F76F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
