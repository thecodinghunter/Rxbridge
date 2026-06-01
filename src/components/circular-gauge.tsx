import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CircularGaugeProps {
  value: number; // 0 to 100
  statusText?: string;
  timeText?: string;
  description?: string;
}

export function CircularGauge({
  value = 65,
  statusText = 'Moderate',
  timeText = '8hrs ago',
  description = '87% You only need to be relax',
}: CircularGaugeProps) {
  // Convert 0-100 value to rotation angle (-90deg to 90deg)
  const angle = (value / 100) * 180 - 90;

  return (
    <View style={styles.container}>
      <View style={styles.gaugeWrapper}>
        {/* Semi-circular track */}
        <View style={styles.trackOuter}>
          <View style={styles.trackInner} />
        </View>

        {/* Decorative progress arc overlay */}
        <View style={[styles.progressArc, { transform: [{ rotate: '45deg' }] }]} />

        {/* Center hub and needle */}
        <View style={styles.hub}>
          <View style={[styles.needle, { transform: [{ rotate: `${angle}deg` }] }]} />
          <View style={styles.hubDot} />
        </View>
      </View>

      {/* Info texts below the gauge */}
      <View style={styles.statusRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{statusText}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Feather name="clock" size={11} color="#6E7682" />
          <Text style={styles.timeText}>{timeText}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, justifyContent: 'center' }}>
        <Feather name="info" size={11} color="#2F76F6" />
        <Text style={[styles.descriptionText, { marginTop: 0 }]}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  gaugeWrapper: {
    width: 140,
    height: 75,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
  },
  trackOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 10,
    borderColor: '#E2E8F0',
    position: 'absolute',
    top: 0,
  },
  trackInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  progressArc: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 10,
    borderColor: 'transparent',
    borderTopColor: '#2F76F6',
    borderRightColor: '#2F76F6',
    position: 'absolute',
    top: 0,
  },
  hub: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hubDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#1E2229',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  needle: {
    width: 4,
    height: 55,
    backgroundColor: '#2F76F6',
    position: 'absolute',
    bottom: 8,
    borderRadius: 2,
    transformOrigin: 'bottom center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  badge: {
    backgroundColor: '#EBF2FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#2F76F6',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2F76F6',
    fontFamily: 'System',
  },
  timeText: {
    fontSize: 10,
    color: '#6E7682',
    fontFamily: 'System',
  },
  descriptionText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#2F76F6',
    marginTop: 6,
    textAlign: 'center',
    fontFamily: 'System',
    paddingHorizontal: 6,
  },
});
