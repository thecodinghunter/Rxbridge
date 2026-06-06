import React from 'react';
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

interface LabReportScreenProps {
  onBack?: () => void;
}

interface LabReport {
  id: string;
  name: string;
  date: string;
  status: 'normal' | 'warning' | 'critical';
  value: string;
  unit: string;
}

const LAB_REPORTS: LabReport[] = [
  {
    id: '1',
    name: 'Blood Glucose',
    date: 'Sept 15, 2024',
    status: 'normal',
    value: '95',
    unit: 'mg/dL',
  },
  {
    id: '2',
    name: 'HDL Cholesterol',
    date: 'Sept 15, 2024',
    status: 'normal',
    value: '52',
    unit: 'mg/dL',
  },
  {
    id: '3',
    name: 'LDL Cholesterol',
    date: 'Sept 15, 2024',
    status: 'warning',
    value: '145',
    unit: 'mg/dL',
  },
  {
    id: '4',
    name: 'Triglycerides',
    date: 'Sept 8, 2024',
    status: 'normal',
    value: '110',
    unit: 'mg/dL',
  },
];

export function LabReportScreen({ onBack }: LabReportScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return '#10B981';
      case 'warning':
        return '#F59E0B';
      case 'critical':
        return '#EF4444';
      default:
        return theme.textSecondary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'normal':
        return 'Normal';
      case 'warning':
        return 'Warning';
      case 'critical':
        return 'Critical';
      default:
        return 'Unknown';
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border },
        ]}
      >
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Lab Reports
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Latest Report */}
        <View
          style={[
            styles.latestCard,
            { backgroundColor: theme.primary },
          ]}
        >
          <MaterialCommunityIcons
            name="flask"
            size={40}
            color="rgba(255, 255, 255, 0.3)"
          />
          <Text style={styles.latestTitle}>Latest Lab Report</Text>
          <Text style={styles.latestDate}>September 15, 2024</Text>
          <Text style={styles.latestStatus}>Results Available</Text>
        </View>

        {/* Lab Results */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Recent Results
          </Text>

          {LAB_REPORTS.map((report) => (
            <TouchableOpacity
              key={report.id}
              style={[
                styles.reportCard,
                { backgroundColor: theme.backgroundElement },
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.reportContent}>
                <View style={styles.reportHeader}>
                  <Text
                    style={[styles.reportName, { color: theme.text }]}
                    numberOfLines={1}
                  >
                    {report.name}
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: `${getStatusColor(report.status)}20` },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(report.status) },
                      ]}
                    >
                      {getStatusLabel(report.status)}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[styles.reportDate, { color: theme.textSecondary }]}
                >
                  {report.date}
                </Text>
                <View style={styles.reportValue}>
                  <Text style={[styles.value, { color: theme.text }]}>
                    {report.value}
                  </Text>
                  <Text
                    style={[styles.unit, { color: theme.textSecondary }]}
                  >
                    {report.unit}
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Box */}
        <View
          style={[
            styles.infoBox,
            { backgroundColor: '#E0F2FE', borderLeftColor: theme.primary },
          ]}
        >
          <MaterialCommunityIcons
            name="information"
            size={20}
            color={theme.primary}
          />
          <View style={{ marginLeft: Spacing.three, flex: 1 }}>
            <Text style={[styles.infoTitle, { color: theme.primary }]}>
              Consult with your doctor
            </Text>
            <Text
              style={[styles.infoText, { color: theme.primary, opacity: 0.8 }]}
            >
              Discuss your lab results with your healthcare provider for personalized advice
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    padding: Spacing.two,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  content: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  latestCard: {
    borderRadius: 12,
    padding: Spacing.three + 4,
    marginBottom: Spacing.three,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  latestTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginTop: Spacing.two,
  },
  latestDate: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    marginTop: Spacing.one,
  },
  latestStatus: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
    marginTop: Spacing.two,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 20,
  },
  section: {
    marginBottom: Spacing.three,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'System',
    marginBottom: Spacing.two,
  },
  reportCard: {
    borderRadius: 12,
    padding: Spacing.two + 4,
    marginBottom: Spacing.two,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  reportContent: {
    flex: 1,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.two,
  },
  reportName: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 12,
    marginLeft: Spacing.two,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '600',
  },
  reportDate: {
    fontSize: 11,
    marginBottom: Spacing.two,
  },
  reportValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.one,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  unit: {
    fontSize: 11,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    padding: Spacing.two + 4,
    borderLeftWidth: 4,
    marginBottom: Spacing.three,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: Spacing.one,
  },
  infoText: {
    fontSize: 11,
    lineHeight: 15,
  },
});
