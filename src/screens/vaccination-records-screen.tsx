import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';

type ThemeColors = typeof Colors.light | typeof Colors.dark;

interface VaccinationRecordsScreenProps {
  onBack?: () => void;
}

interface VaccineRecord {
  id: string;
  name: string;
  type: string;
  dose: string;
  lastDose: string;
  nextDue?: string;
  status: 'Completed' | 'Pending' | 'Overdue';
  manufacturer: string;
  batchNumber: string;
  category: string;
  notes: string;
  iconColor: string;
  iconBg: string;
}

const VACCINES: VaccineRecord[] = [
  {
    id: '1',
    name: 'COVID-19 Booster',
    type: 'mRNA',
    dose: 'Dose 3',
    lastDose: '2026-01-15',
    status: 'Completed',
    manufacturer: 'Pfizer',
    batchNumber: 'BN-12345',
    category: 'COVID-19',
    notes: 'Administered at City Health Center. No adverse reactions reported.',
    iconColor: '#10B981',
    iconBg: '#ECFDF5',
  },
  {
    id: '2',
    name: 'Influenza',
    type: 'Seasonal',
    dose: 'Dose 1',
    lastDose: '2025-10-10',
    nextDue: '2026-10-10',
    status: 'Completed',
    manufacturer: 'Sanofi',
    batchNumber: 'FLU-9921',
    category: 'Influenza',
    notes: 'Annual flu vaccine administered at pharmacy. No side effects.',
    iconColor: '#10B981',
    iconBg: '#ECFDF5',
  },
  {
    id: '3',
    name: 'Pneumococcal',
    type: 'Polysaccharide',
    dose: 'Dose 1',
    lastDose: '2024-03-20',
    status: 'Completed',
    manufacturer: 'Merck',
    batchNumber: 'PNE-4401',
    category: 'Pneumococcal',
    notes: 'Single dose administered. Booster not required unless immune-compromised.',
    iconColor: '#10B981',
    iconBg: '#ECFDF5',
  },
  {
    id: '4',
    name: 'Tetanus',
    type: 'Toxoid',
    dose: 'Dose 1',
    lastDose: '2021-05-15',
    nextDue: '2026-05-15',
    status: 'Pending',
    manufacturer: 'GSK',
    batchNumber: 'TET-7781',
    category: 'Tetanus',
    notes: 'Booster due in 2026. Please schedule with your healthcare provider.',
    iconColor: '#F59E0B',
    iconBg: '#FFFBEB',
  },
];

const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  Completed: { color: '#10B981', bg: '#ECFDF5' },
  Pending: { color: '#F59E0B', bg: '#FFFBEB' },
  Overdue: { color: '#EF4444', bg: '#FEF2F2' },
};

// ─── Detail Screen ────────────────────────────────────────────────────────────
function VaccineDetailScreen({
  vaccine,
  onBack,
  theme,
}: {
  vaccine: VaccineRecord;
  onBack: () => void;
  theme: ThemeColors;
}) {
  const st = STATUS_STYLES[vaccine.status];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
          <Feather name="chevron-left" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Vaccine Details</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.detailScroll} showsVerticalScrollIndicator={false}>
        {/* Detail Card */}
        <View style={[styles.detailCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          {/* Top: icon + name */}
          <View style={styles.detailTop}>
            <View style={[styles.detailIconWrap, { backgroundColor: vaccine.iconBg }]}>
              <MaterialCommunityIcons name="needle" size={28} color={vaccine.iconColor} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.detailName, { color: theme.text }]}>{vaccine.name}</Text>
              <Text style={[styles.detailType, { color: theme.textSecondary }]}>{vaccine.type}</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          {/* Grid info */}
          <View style={styles.infoGrid}>
            <View style={styles.infoCell}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Manufacturer</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>{vaccine.manufacturer}</Text>
            </View>
            <View style={styles.infoCell}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Dose Number</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>{vaccine.dose}</Text>
            </View>
            <View style={styles.infoCell}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Batch Number</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>{vaccine.batchNumber}</Text>
            </View>
            <View style={styles.infoCell}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Category</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>{vaccine.category}</Text>
            </View>
          </View>

          <View style={styles.infoFull}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Last Dose Date</Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>{vaccine.lastDose}</Text>
          </View>

          <View style={styles.infoFull}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Status</Text>
            <View style={[styles.statusBadgeLg, { backgroundColor: st.bg }]}>
              <Text style={[styles.statusTextLg, { color: st.color }]}>{vaccine.status}</Text>
            </View>
          </View>

          <View style={styles.infoFull}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Notes</Text>
            <Text style={[styles.notesText, { color: theme.text }]}>{vaccine.notes}</Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.editBtn, { backgroundColor: theme.primary }]}>
          <Text style={styles.editBtnText}>Edit Record</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Main List Screen ─────────────────────────────────────────────────────────
export function VaccinationRecordsScreen({ onBack }: VaccinationRecordsScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [selectedVaccine, setSelectedVaccine] = useState<VaccineRecord | null>(null);

  if (selectedVaccine) {
    return (
      <VaccineDetailScreen
        vaccine={selectedVaccine}
        onBack={() => setSelectedVaccine(null)}
        theme={theme}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
          <Feather name="chevron-left" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Vaccination Records</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Feather name="clock" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.listScroll} showsVerticalScrollIndicator={false}>
        {VACCINES.map((v) => {
          const st = STATUS_STYLES[v.status];
          return (
            <TouchableOpacity
              key={v.id}
              style={[styles.vaccineCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}
              onPress={() => setSelectedVaccine(v)}
              activeOpacity={0.85}
            >
              {/* Top row */}
              <View style={styles.cardTopRow}>
                <View style={[styles.vaccineIconWrap, { backgroundColor: v.iconBg }]}>
                  <MaterialCommunityIcons name="needle" size={22} color={v.iconColor} />
                </View>
                <View style={styles.vaccineInfo}>
                  <Text style={[styles.vaccineName, { color: theme.text }]}>{v.name}</Text>
                  <Text style={[styles.vaccineType, { color: theme.textSecondary }]}>{v.type}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: st.bg }]}>
                  <Text style={[styles.statusText, { color: st.color }]}>{v.status}</Text>
                </View>
              </View>

              {/* Dose row */}
              <View style={[styles.doseRow, { borderTopColor: theme.border }]}>
                <View style={styles.dosePair}>
                  <Text style={[styles.doseLabel, { color: theme.textSecondary }]}>Dose</Text>
                  <Text style={[styles.doseValue, { color: theme.text }]}>{v.dose}</Text>
                </View>
                <View style={styles.dosePair}>
                  <Text style={[styles.doseLabel, { color: theme.textSecondary }]}>Last Dose</Text>
                  <Text style={[styles.doseValue, { color: theme.text }]}>{v.lastDose}</Text>
                </View>
              </View>

              {/* Next due badge */}
              {v.nextDue && (
                <View style={[styles.nextDueBadge, { backgroundColor: '#EAF0FE' }]}>
                  <Feather name="clock" size={11} color="#2F76F6" />
                  <Text style={styles.nextDueText}>Next due: {v.nextDue}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={[styles.fab, { backgroundColor: theme.primary }]}>
        <Feather name="plus" size={22} color="#fff" />
      </TouchableOpacity>
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
  iconBtn: {
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

  // ── List ──
  listScroll: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  vaccineCard: {
    borderRadius: 16,
    padding: Spacing.three,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    gap: Spacing.two,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 4,
  },
  vaccineIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vaccineInfo: { flex: 1 },
  vaccineName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  vaccineType: {
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
  doseRow: {
    flexDirection: 'row',
    gap: Spacing.five,
    paddingTop: Spacing.two,
    borderTopWidth: 1,
    marginTop: 2,
  },
  dosePair: { gap: 2 },
  doseLabel: { fontSize: 11 },
  doseValue: { fontSize: 13, fontWeight: '600' },
  nextDueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  nextDueText: {
    fontSize: 11,
    color: '#2F76F6',
    fontWeight: '600',
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2F76F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },

  // ── Detail ──
  detailScroll: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  detailCard: {
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
  detailTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  detailIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailName: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 2,
  },
  detailType: {
    fontSize: 13,
  },
  divider: {
    height: 1,
    marginVertical: 2,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  infoCell: {
    width: '46%',
    gap: 3,
  },
  infoFull: {
    gap: 5,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadgeLg: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusTextLg: {
    fontSize: 13,
    fontWeight: '600',
  },
  notesText: {
    fontSize: 13,
    lineHeight: 20,
  },

  editBtn: {
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#2F76F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  editBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
