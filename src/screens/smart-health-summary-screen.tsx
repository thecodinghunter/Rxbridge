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

interface SmartHealthSummaryScreenProps {
  onBack?: () => void;
}

type TabKey = 'overview' | 'reports' | 'trends';

const HEALTH_SCORES = [
  { label: 'Vitals', score: 92, color: '#10B981', icon: 'heart-pulse' },
  { label: 'Activity', score: 78, color: '#2F76F6', icon: 'run' },
  { label: 'Sleep', score: 85, color: '#8B5CF6', icon: 'weather-night' },
  { label: 'Diet', score: 70, color: '#F59E0B', icon: 'food-apple' },
];

const RECENT_REPORTS = [
  {
    id: '1',
    title: 'Blood Panel Results',
    date: 'Sept 15, 2024',
    status: 'Normal',
    statusColor: '#10B981',
    statusBg: '#ECFDF5',
    icon: 'test-tube',
    iconColor: '#10B981',
    iconBg: '#ECFDF5',
    summary: 'All values within normal range. Cholesterol slightly elevated.',
  },
  {
    id: '2',
    title: 'Cardiac Checkup',
    date: 'Sept 8, 2024',
    status: 'Review',
    statusColor: '#F59E0B',
    statusBg: '#FFFBEB',
    icon: 'heart-flash',
    iconColor: '#EF4444',
    iconBg: '#FEF2F2',
    summary: 'ECG normal. Blood pressure borderline. Follow-up in 3 months.',
  },
  {
    id: '3',
    title: 'Annual Wellness',
    date: 'Aug 20, 2024',
    status: 'Excellent',
    statusColor: '#2F76F6',
    statusBg: '#EAF0FE',
    icon: 'clipboard-check',
    iconColor: '#2F76F6',
    iconBg: '#EAF0FE',
    summary: 'Comprehensive check — all systems healthy. Maintain current lifestyle.',
  },
];

const INSIGHTS = [
  {
    id: '1',
    text: 'Your resting heart rate has improved by 4 bpm over the last month.',
    icon: 'trending-down',
    color: '#10B981',
    bg: '#ECFDF5',
  },
  {
    id: '2',
    text: 'You\'ve been consistently meeting your daily step goal for 3 weeks.',
    icon: 'check-circle',
    color: '#2F76F6',
    bg: '#EAF0FE',
  },
  {
    id: '3',
    text: 'LDL Cholesterol is slightly high. Consider reducing saturated fat intake.',
    icon: 'alert-circle',
    color: '#F59E0B',
    bg: '#FFFBEB',
  },
];

// Mini bar chart for score visualization
function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <View style={scoreStyles.barWrap}>
      <View style={[scoreStyles.barTrack, { backgroundColor: `${color}20` }]}>
        <View style={[scoreStyles.barFill, { width: `${score}%` as any, backgroundColor: color }]} />
      </View>
      <Text style={[scoreStyles.barLabel, { color }]}>{score}</Text>
    </View>
  );
}

const scoreStyles = StyleSheet.create({
  barWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  barTrack: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  barFill: { height: 6, borderRadius: 3 },
  barLabel: { fontSize: 12, fontWeight: '700', width: 28, textAlign: 'right' },
});

export function SmartHealthSummaryScreen({ onBack }: SmartHealthSummaryScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const TABS: { key: TabKey; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'reports', label: 'Reports' },
    { key: 'trends', label: 'Insights' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
          <Feather name="chevron-left" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Smart Health Summary</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Feather name="share-2" size={18} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Tab Bar */}
      <View style={[styles.tabBar, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, activeTab === t.key && { borderBottomColor: theme.primary, borderBottomWidth: 2 }]}
            onPress={() => setActiveTab(t.key)}
          >
            <Text style={[styles.tabText, { color: activeTab === t.key ? theme.primary : theme.textSecondary }]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <>
            {/* Overall Score Banner */}
            <View style={[styles.scoreBanner, { backgroundColor: theme.primary }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bannerLabel}>Overall Health Score</Text>
                <Text style={styles.bannerScore}>84</Text>
                <Text style={styles.bannerSub}>Good — Keep maintaining your routine</Text>
              </View>
              <View style={styles.scoreCircle}>
                <MaterialCommunityIcons name="shield-check" size={36} color="rgba(255,255,255,0.9)" />
              </View>
              <View style={styles.decor1} />
              <View style={styles.decor2} />
            </View>

            {/* Category Scores */}
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Health Categories</Text>
            <View style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
              {HEALTH_SCORES.map((s, i) => (
                <View key={s.label}>
                  <View style={styles.scoreRow}>
                    <View style={[styles.scoreIcon, { backgroundColor: `${s.color}18` }]}>
                      <MaterialCommunityIcons name={s.icon as any} size={16} color={s.color} />
                    </View>
                    <Text style={[styles.scoreLabel, { color: theme.text }]}>{s.label}</Text>
                    <ScoreBar score={s.score} color={s.color} />
                  </View>
                  {i < HEALTH_SCORES.length - 1 && <View style={[styles.rowDivider, { backgroundColor: theme.border }]} />}
                </View>
              ))}
            </View>

            {/* Last Updated */}
            <View style={[styles.updatedCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
              <MaterialCommunityIcons name="clock-outline" size={16} color={theme.textSecondary} />
              <Text style={[styles.updatedText, { color: theme.textSecondary }]}>
                Last updated: Today at 10:30 AM  •  Auto-sync enabled
              </Text>
            </View>

            {/* Quick Actions */}
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Actions</Text>
            <View style={styles.actionsRow}>
              {[
                { icon: 'download', label: 'Export PDF', color: '#2F76F6' },
                { icon: 'share-2', label: 'Share', color: '#10B981' },
                { icon: 'printer', label: 'Print', color: '#8B5CF6' },
              ].map((a) => (
                <TouchableOpacity
                  key={a.label}
                  style={[styles.actionBtn, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}
                  activeOpacity={0.8}
                >
                  <View style={[styles.actionIcon, { backgroundColor: `${a.color}15` }]}>
                    <Feather name={a.icon as any} size={18} color={a.color} />
                  </View>
                  <Text style={[styles.actionLabel, { color: theme.text }]}>{a.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* ── REPORTS ── */}
        {activeTab === 'reports' && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Reports</Text>
            {RECENT_REPORTS.map((r) => (
              <TouchableOpacity
                key={r.id}
                style={[styles.reportCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}
                activeOpacity={0.85}
              >
                <View style={styles.reportTop}>
                  <View style={[styles.reportIcon, { backgroundColor: r.iconBg }]}>
                    <MaterialCommunityIcons name={r.icon as any} size={20} color={r.iconColor} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.reportTitle, { color: theme.text }]}>{r.title}</Text>
                    <Text style={[styles.reportDate, { color: theme.textSecondary }]}>{r.date}</Text>
                  </View>
                  <View style={[styles.reportBadge, { backgroundColor: r.statusBg }]}>
                    <Text style={[styles.reportBadgeText, { color: r.statusColor }]}>{r.status}</Text>
                  </View>
                </View>
                <Text style={[styles.reportSummary, { color: theme.textSecondary }]}>{r.summary}</Text>
                <View style={styles.reportFooter}>
                  <Feather name="file-text" size={12} color={theme.primary} />
                  <Text style={[styles.reportViewText, { color: theme.primary }]}>View Full Report</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* ── INSIGHTS ── */}
        {activeTab === 'trends' && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>AI Health Insights</Text>

            {/* Score trend card */}
            <View style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border, gap: Spacing.three }]}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>30-Day Trend</Text>
              {/* Visual trend bars */}
              <View style={styles.trendBars}>
                {[65, 72, 70, 78, 75, 80, 84].map((v, i) => (
                  <View key={i} style={styles.trendBarCol}>
                    <View style={[styles.trendBar, { height: (v / 100) * 60, backgroundColor: i === 6 ? theme.primary : `${theme.primary}40` }]} />
                    <Text style={[styles.trendWeek, { color: theme.textSecondary }]}>
                      {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'Now'][i]}
                    </Text>
                  </View>
                ))}
              </View>
              <Text style={[styles.trendCaption, { color: theme.textSecondary }]}>
                Your overall health score improved by <Text style={{ color: '#10B981', fontWeight: '700' }}>+19 pts</Text> over 30 days
              </Text>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.text }]}>Personalized Insights</Text>
            {INSIGHTS.map((ins) => (
              <View
                key={ins.id}
                style={[styles.insightCard, { backgroundColor: ins.bg, borderLeftColor: ins.color }]}
              >
                <MaterialCommunityIcons name={ins.icon as any} size={20} color={ins.color} />
                <Text style={[styles.insightText, { color: theme.text }]}>{ins.text}</Text>
              </View>
            ))}

            {/* Recommendation card */}
            <View style={[styles.recommendCard, { backgroundColor: theme.primary }]}>
              <MaterialCommunityIcons name="robot" size={24} color="rgba(255,255,255,0.9)" />
              <View style={{ flex: 1 }}>
                <Text style={styles.recommendTitle}>AI Recommendation</Text>
                <Text style={styles.recommendText}>
                  Based on your data, focusing on sleep quality and reducing sodium intake could further improve your score.
                </Text>
              </View>
            </View>
          </>
        )}

        <View style={{ height: 40 }} />
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

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },

  content: {
    padding: Spacing.three,
    gap: Spacing.three,
  },

  // Score banner
  scoreBanner: {
    borderRadius: 20,
    padding: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  bannerLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 12, marginBottom: 4 },
  bannerScore: { color: '#fff', fontSize: 52, fontWeight: '800', lineHeight: 58 },
  bannerSub: { color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 4 },
  scoreCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  decor1: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -30,
    right: 70,
  },
  decor2: {
    position: 'absolute',
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.06)',
    bottom: -15,
    right: 130,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },

  card: {
    borderRadius: 16,
    padding: Spacing.three,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.two + 2,
    gap: Spacing.two,
  },
  scoreIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 13,
    fontWeight: '600',
    width: 58,
  },
  rowDivider: { height: 1 },

  updatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    padding: Spacing.two + 4,
    borderWidth: 1,
  },
  updatedText: { fontSize: 11 },

  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 14,
    padding: Spacing.two + 4,
    alignItems: 'center',
    borderWidth: 1,
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: { fontSize: 11, fontWeight: '600' },

  // Reports tab
  reportCard: {
    borderRadius: 16,
    padding: Spacing.three,
    borderWidth: 1,
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  reportTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 4,
  },
  reportIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportTitle: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  reportDate: { fontSize: 11 },
  reportBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  reportBadgeText: { fontSize: 11, fontWeight: '600' },
  reportSummary: { fontSize: 12, lineHeight: 18 },
  reportFooter: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  reportViewText: { fontSize: 12, fontWeight: '600' },

  // Insights tab
  trendBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    height: 80,
  },
  trendBarCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  trendBar: {
    width: '100%',
    borderRadius: 4,
  },
  trendWeek: { fontSize: 9 },
  trendCaption: { fontSize: 12, lineHeight: 18 },

  insightCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two + 4,
    borderRadius: 14,
    padding: Spacing.three,
    borderLeftWidth: 4,
  },
  insightText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },

  recommendCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two + 4,
    borderRadius: 16,
    padding: Spacing.three,
  },
  recommendTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  recommendText: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 12,
    lineHeight: 18,
  },
});
