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

interface VitalsScreenProps {
  onBack?: () => void;
}

type TimeRange = '1D' | '1W' | '1M' | '3M';
type ChartType = 'area' | 'dualline' | 'dot' | 'bar';

// ─── Data ─────────────────────────────────────────────────────────────────────
const HEART_RATE_DATA: Record<TimeRange, number[]> = {
  '1D': [68, 72, 75, 70, 74, 72, 76, 71, 73, 72],
  '1W': [70, 74, 69, 77, 72, 75, 72],
  '1M': [71, 73, 70, 75, 72, 68, 74, 76, 72, 70, 73, 71, 72, 74, 72, 70, 73, 75, 72, 71, 74, 72, 70, 73, 72, 74, 71, 72, 73, 72],
  '3M': [72, 74, 70, 73, 71, 75, 72, 74, 70, 73, 71, 72],
};

const BP_SYSTOLIC_DATA: Record<TimeRange, number[]> = {
  '1D': [118, 122, 125, 119, 121, 120, 123, 118, 121, 120],
  '1W': [120, 122, 118, 125, 119, 121, 120],
  '1M': [120, 122, 119, 124, 121, 118, 123, 125, 121, 119, 122, 120, 121, 123, 120, 119, 122, 124, 121, 120, 123, 121, 119, 122, 121, 123, 120, 121, 122, 121],
  '3M': [121, 123, 119, 122, 120, 124, 121, 123, 119, 122, 120, 121],
};

const BP_DIASTOLIC_DATA: Record<TimeRange, number[]> = {
  '1D': [78, 80, 82, 79, 81, 80, 82, 78, 80, 80],
  '1W': [79, 81, 78, 83, 79, 80, 80],
  '1M': [79, 81, 78, 82, 80, 77, 81, 83, 80, 78, 81, 79, 80, 82, 79, 78, 81, 82, 80, 79, 82, 80, 78, 81, 80, 82, 79, 80, 81, 80],
  '3M': [80, 82, 78, 81, 79, 83, 80, 82, 78, 81, 79, 80],
};

const SPO2_DATA: Record<TimeRange, number[]> = {
  '1D': [97, 98, 99, 97, 98, 98, 99, 97, 98, 98],
  '1W': [98, 99, 97, 98, 98, 99, 98],
  '1M': [98, 99, 97, 98, 99, 97, 98, 99, 98, 97, 98, 99, 98, 97, 98, 99, 98, 97, 98, 99, 97, 98, 99, 98, 97, 98, 99, 98, 97, 98],
  '3M': [98, 99, 97, 98, 98, 99, 98, 97, 98, 99, 98, 98],
};

const TEMP_DATA: Record<TimeRange, number[]> = {
  '1D': [36.8, 37.0, 37.2, 36.9, 37.1, 37.2, 37.0, 36.9, 37.1, 37.2],
  '1W': [36.9, 37.1, 37.2, 36.8, 37.0, 37.2, 37.1],
  '1M': [37.1, 37.0, 36.9, 37.2, 37.0, 36.8, 37.1, 37.3, 37.0, 36.9, 37.1, 37.0, 37.1, 37.2, 37.0, 36.9, 37.1, 37.3, 37.0, 37.1, 37.2, 37.0, 36.9, 37.1, 37.0, 37.2, 37.1, 37.0, 37.1, 37.2],
  '3M': [37.1, 37.0, 36.9, 37.2, 37.0, 37.1, 37.2, 37.0, 36.9, 37.1, 37.0, 37.2],
};

const VITALS = [
  {
    id: '1',
    name: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    icon: 'heart-pulse',
    color: '#EF4444',
    status: 'normal',
    range: '60–100 bpm',
    trend: '+2',
    trendUp: true,
    data: HEART_RATE_DATA,
    chartMin: 58,
    chartMax: 92,
    chartType: 'area' as ChartType,
    label2: undefined as string | undefined,
    data2: undefined as Record<TimeRange, number[]> | undefined,
    color2: undefined as string | undefined,
  },
  {
    id: '2',
    name: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    icon: 'water-check',
    color: '#2F76F6',
    status: 'normal',
    range: '< 120/80',
    trend: '-1',
    trendUp: false,
    data: BP_SYSTOLIC_DATA,
    chartMin: 60,
    chartMax: 140,
    chartType: 'dualline' as ChartType,
    label2: 'Diastolic',
    data2: BP_DIASTOLIC_DATA,
    color2: '#EC4899',
  },
  {
    id: '3',
    name: 'Oxygen Level',
    value: '98',
    unit: '%',
    icon: 'lungs',
    color: '#10B981',
    status: 'normal',
    range: '95–100 %',
    trend: '+1',
    trendUp: true,
    data: SPO2_DATA,
    chartMin: 93,
    chartMax: 101,
    chartType: 'dot' as ChartType,
    label2: undefined as string | undefined,
    data2: undefined as Record<TimeRange, number[]> | undefined,
    color2: undefined as string | undefined,
  },
  {
    id: '4',
    name: 'Body Temperature',
    value: '37.2',
    unit: '°C',
    icon: 'thermometer',
    color: '#F59E0B',
    status: 'normal',
    range: '36.1–37.2 °C',
    trend: '0',
    trendUp: null as boolean | null,
    data: TEMP_DATA,
    chartMin: 36.0,
    chartMax: 38.2,
    chartType: 'bar' as ChartType,
    label2: undefined as string | undefined,
    data2: undefined as Record<TimeRange, number[]> | undefined,
    color2: undefined as string | undefined,
  },
];

// ─── Chart Components ──────────────────────────────────────────────────────────

const CHART_H = 90;
const CHART_W = 300; // reference width, overridden via flex

// Helper: map value to y position (inverted, 0 = top)
function toY(val: number, min: number, max: number, h: number) {
  return h - ((val - min) / (max - min || 1)) * h;
}

// ─── 1. AREA / LINE CHART ──────────────────────────────────────────────────────
function AreaLineChart({
  data,
  color,
  chartMin,
  chartMax,
  height = CHART_H,
  width = CHART_W,
}: {
  data: number[];
  color: string;
  chartMin: number;
  chartMax: number;
  height?: number;
  width?: number;
}) {
  const n = data.length;
  const xStep = width / Math.max(n - 1, 1);

  const points = data.map((v, i) => ({
    x: i * xStep,
    y: toY(v, chartMin, chartMax, height),
  }));

  // Build line segments between consecutive points
  const segments = points.slice(0, -1).map((p, i) => {
    const next = points[i + 1];
    const dx = next.x - p.x;
    const dy = next.y - p.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const midX = p.x + dx / 2;
    const midY = p.y + dy / 2;
    return { midX, midY, length, angle };
  });

  // Area fill: vertical columns from point.y to bottom
  return (
    <View style={{ width, height, position: 'relative' }}>
      {/* Area fill columns */}
      {points.map((p, i) => (
        <View
          key={`area-${i}`}
          style={{
            position: 'absolute',
            left: i === 0 ? 0 : p.x - xStep / 2,
            top: p.y,
            width: i === 0 || i === n - 1 ? xStep / 2 : xStep,
            bottom: 0,
            backgroundColor: `${color}22`,
          }}
        />
      ))}

      {/* Line segments */}
      {segments.map((s, i) => (
        <View
          key={`seg-${i}`}
          style={{
            position: 'absolute',
            left: s.midX - s.length / 2,
            top: s.midY - 1.5,
            width: s.length,
            height: 3,
            borderRadius: 2,
            backgroundColor: color,
            transform: [{ rotate: `${s.angle}deg` }],
          }}
        />
      ))}

      {/* Dots */}
      {points.map((p, i) => (
        <View
          key={`dot-${i}`}
          style={{
            position: 'absolute',
            left: p.x - 4,
            top: p.y - 4,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#fff',
            borderWidth: 2,
            borderColor: color,
          }}
        />
      ))}

      {/* Value label on last point */}
      <View
        style={{
          position: 'absolute',
          left: points[points.length - 1].x - 20,
          top: points[points.length - 1].y - 22,
          backgroundColor: color,
          borderRadius: 6,
          paddingHorizontal: 5,
          paddingVertical: 2,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>
          {data[data.length - 1]}
        </Text>
      </View>
    </View>
  );
}

// ─── 2. DUAL LINE CHART ────────────────────────────────────────────────────────
function DualLineChart({
  data1,
  data2,
  color1,
  color2,
  chartMin,
  chartMax,
  label1,
  label2,
  height = CHART_H,
  width = CHART_W,
}: {
  data1: number[];
  data2: number[];
  color1: string;
  color2: string;
  chartMin: number;
  chartMax: number;
  label1: string;
  label2: string;
  height?: number;
  width?: number;
}) {
  const renderLine = (data: number[], color: string, lineWidth = 2.5) => {
    const n = data.length;
    const xStep = width / Math.max(n - 1, 1);
    const points = data.map((v, i) => ({
      x: i * xStep,
      y: toY(v, chartMin, chartMax, height),
    }));
    const segments = points.slice(0, -1).map((p, i) => {
      const next = points[i + 1];
      const dx = next.x - p.x;
      const dy = next.y - p.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      return { midX: p.x + dx / 2, midY: p.y + dy / 2, length, angle };
    });

    return (
      <>
        {segments.map((s, i) => (
          <View
            key={`seg-${color}-${i}`}
            style={{
              position: 'absolute',
              left: s.midX - s.length / 2,
              top: s.midY - lineWidth / 2,
              width: s.length,
              height: lineWidth,
              borderRadius: lineWidth,
              backgroundColor: color,
              transform: [{ rotate: `${s.angle}deg` }],
            }}
          />
        ))}
        {/* End dot */}
        <View
          style={{
            position: 'absolute',
            left: points[points.length - 1].x - 4,
            top: points[points.length - 1].y - 4,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: color,
          }}
        />
      </>
    );
  };

  // Grid lines
  const gridValues = [chartMin, Math.round((chartMin + chartMax) / 2), chartMax];

  return (
    <View>
      {/* Legend */}
      <View style={{ flexDirection: 'row', gap: 16, marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <View style={{ width: 12, height: 3, borderRadius: 2, backgroundColor: color1 }} />
          <Text style={{ fontSize: 10, color: color1, fontWeight: '600' }}>{label1}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <View style={{ width: 12, height: 3, borderRadius: 2, backgroundColor: color2 }} />
          <Text style={{ fontSize: 10, color: color2, fontWeight: '600' }}>{label2}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {/* Y-axis */}
        <View style={{ width: 28, height, justifyContent: 'space-between', alignItems: 'flex-end', paddingRight: 4, marginTop: -6 }}>
          {gridValues.reverse().map((v) => (
            <Text key={v} style={{ fontSize: 8, color: '#94A3B8' }}>{v}</Text>
          ))}
        </View>

        {/* Chart area */}
        <View style={{ flex: 1, height, position: 'relative' }}>
          {/* Dashed grid lines */}
          {[0, 0.5, 1].map((pct, i) => (
            <View
              key={i}
              style={{
                position: 'absolute',
                top: pct * height,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: '#E2E8F040',
              }}
            />
          ))}
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            {renderLine(data1, color1, 2.5)}
          </View>
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            {renderLine(data2, color2, 2.5)}
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── 3. DOT / SCATTER CHART ───────────────────────────────────────────────────
function DotScatterChart({
  data,
  color,
  chartMin,
  chartMax,
  height = CHART_H,
  width = CHART_W,
}: {
  data: number[];
  color: string;
  chartMin: number;
  chartMax: number;
  height?: number;
  width?: number;
}) {
  const n = data.length;
  const xStep = width / Math.max(n - 1, 1);

  const points = data.map((v, i) => ({
    x: i * xStep,
    y: toY(v, chartMin, chartMax, height),
    v,
  }));

  // Determine normal range (95-100 for SpO2)
  const normalMin = chartMin + (chartMax - chartMin) * 0.2;

  return (
    <View style={{ width, height, position: 'relative' }}>
      {/* Grid horizontal dashed lines */}
      {[0, 0.33, 0.66, 1].map((pct, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            top: pct * height,
            left: 0,
            right: 0,
            height: 1,
            borderTopWidth: 1,
            borderColor: '#E2E8F050',
            borderStyle: 'dashed',
          }}
        />
      ))}

      {/* Vertical grid lines */}
      {points.map((p, i) => (
        <View
          key={`vline-${i}`}
          style={{
            position: 'absolute',
            left: p.x,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: '#E2E8F030',
          }}
        />
      ))}

      {/* Dots */}
      {points.map((p, i) => {
        const isNormal = p.v >= normalMin;
        return (
          <View
            key={`dot-${i}`}
            style={{
              position: 'absolute',
              left: p.x - 5,
              top: p.y - 5,
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: isNormal ? color : '#EF4444',
              shadowColor: isNormal ? color : '#EF4444',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.4,
              shadowRadius: 3,
              elevation: 3,
            }}
          />
        );
      })}

      {/* Value label on last dot */}
      <View
        style={{
          position: 'absolute',
          left: points[points.length - 1].x + 4,
          top: points[points.length - 1].y - 10,
          backgroundColor: color,
          borderRadius: 6,
          paddingHorizontal: 5,
          paddingVertical: 2,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>
          {points[points.length - 1].v}%
        </Text>
      </View>
    </View>
  );
}

// ─── 4. BAR CHART ─────────────────────────────────────────────────────────────
function BarChart({
  data,
  color,
  chartMin,
  chartMax,
  height = CHART_H,
}: {
  data: number[];
  color: string;
  chartMin: number;
  chartMax: number;
  height?: number;
}) {
  const range = chartMax - chartMin || 1;
  return (
    <View style={{ flex: 1, height, flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
      {data.map((val, i) => {
        const heightPct = (val - chartMin) / range;
        const barH = Math.max(4, heightPct * height);
        const isLast = i === data.length - 1;
        return (
          <View
            key={i}
            style={{
              flex: 1,
              height: barH,
              borderRadius: 4,
              backgroundColor: isLast ? color : `${color}60`,
            }}
          />
        );
      })}
    </View>
  );
}

// ─── Mini Sparkline (for collapsed card) ──────────────────────────────────────
function MiniSparkline({
  data,
  color,
  chartMin,
  chartMax,
  chartType,
  data2,
  color2,
}: {
  data: number[];
  color: string;
  chartMin: number;
  chartMax: number;
  chartType: ChartType;
  data2?: number[];
  color2?: string;
}) {
  const displayData = data.slice(-8);
  const range = chartMax - chartMin || 1;
  const height = 24; // sparkline height
  const width = 56; // sparkline width

  if (chartType === 'area') {
    const n = displayData.length;
    const xStep = width / Math.max(n - 1, 1);
    const points = displayData.map((v, i) => ({
      x: i * xStep,
      y: toY(v, chartMin, chartMax, height),
    }));

    const segments = points.slice(0, -1).map((p, i) => {
      const next = points[i + 1];
      const dx = next.x - p.x;
      const dy = next.y - p.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      return { midX: p.x + dx / 2, midY: p.y + dy / 2, length, angle };
    });

    return (
      <View style={{ width, height, position: 'relative' }}>
        {/* Shading fill */}
        {points.map((p, i) => (
          <View
            key={`area-${i}`}
            style={{
              position: 'absolute',
              left: i === 0 ? 0 : p.x - xStep / 2,
              top: p.y,
              width: i === 0 || i === n - 1 ? xStep / 2 : xStep,
              bottom: 0,
              backgroundColor: `${color}18`,
            }}
          />
        ))}
        {/* Line segments */}
        {segments.map((s, i) => (
          <View
            key={`seg-${i}`}
            style={{
              position: 'absolute',
              left: s.midX - s.length / 2,
              top: s.midY - 0.75,
              width: s.length,
              height: 1.5,
              backgroundColor: color,
              transform: [{ rotate: `${s.angle}deg` }],
            }}
          />
        ))}
        {/* End dot */}
        <View
          style={{
            position: 'absolute',
            left: points[n - 1].x - 2.5,
            top: points[n - 1].y - 2.5,
            width: 5,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: color,
            borderWidth: 1,
            borderColor: '#FFFFFF',
          }}
        />
      </View>
    );
  }

  if (chartType === 'dualline' && data2) {
    const displayData2 = data2.slice(-8);
    const n = displayData.length;
    const xStep = width / Math.max(n - 1, 1);

    const getLineElements = (vals: number[], col: string) => {
      const points = vals.map((v, i) => ({
        x: i * xStep,
        y: toY(v, chartMin, chartMax, height),
      }));

      const segments = points.slice(0, -1).map((p, i) => {
        const next = points[i + 1];
        const dx = next.x - p.x;
        const dy = next.y - p.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        return { midX: p.x + dx / 2, midY: p.y + dy / 2, length, angle };
      });

      return (
        <>
          {segments.map((s, i) => (
            <View
              key={`seg-${col}-${i}`}
              style={{
                position: 'absolute',
                left: s.midX - s.length / 2,
                top: s.midY - 0.75,
                width: s.length,
                height: 1.5,
                backgroundColor: col,
                transform: [{ rotate: `${s.angle}deg` }],
              }}
            />
          ))}
          <View
            style={{
              position: 'absolute',
              left: points[points.length - 1].x - 2,
              top: points[points.length - 1].y - 2,
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: col,
            }}
          />
        </>
      );
    };

    return (
      <View style={{ width, height, position: 'relative' }}>
        {getLineElements(displayData, color)}
        {getLineElements(displayData2, color2 ?? '#EC4899')}
      </View>
    );
  }

  if (chartType === 'dot') {
    const n = displayData.length;
    const xStep = width / Math.max(n - 1, 1);
    const points = displayData.map((v, i) => ({
      x: i * xStep,
      y: toY(v, chartMin, chartMax, height),
    }));

    return (
      <View style={{ width, height, position: 'relative' }}>
        {points.map((p, i) => (
          <View
            key={`dot-${i}`}
            style={{
              position: 'absolute',
              left: p.x - 2,
              top: p.y - 2,
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: color,
            }}
          />
        ))}
      </View>
    );
  }

  // Fallback to bar sparkline
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: height + 4, width }}>
      {displayData.map((val, i) => {
        const heightPct = (val - chartMin) / range;
        const barH = Math.max(3, heightPct * height);
        const isLast = i === displayData.length - 1;
        return (
          <View
            key={i}
            style={{
              flex: 1,
              height: barH,
              borderRadius: 2,
              backgroundColor: isLast ? color : `${color}55`,
            }}
          />
        );
      })}
    </View>
  );
}

// ─── Chart Renderer ───────────────────────────────────────────────────────────
function VitalChart({
  vital,
  selectedRange,
  isDark,
  theme,
}: {
  vital: typeof VITALS[0];
  selectedRange: TimeRange;
  isDark: boolean;
  theme: typeof Colors.light | typeof Colors.dark;
}) {
  const chartData = vital.data[selectedRange];
  const chartData2 = vital.data2?.[selectedRange];

  return (
    <View style={[chartStyles.chartBg, { backgroundColor: isDark ? theme.background : `${vital.color}08` }]}>
      {vital.chartType === 'area' && (
        <View style={{ flex: 1, paddingLeft: 32 }}>
          <AreaLineChart
            data={chartData}
            color={vital.color}
            chartMin={vital.chartMin}
            chartMax={vital.chartMax}
            height={CHART_H}
          />
        </View>
      )}

      {vital.chartType === 'dualline' && chartData2 && (
        <View style={{ flex: 1 }}>
          <DualLineChart
            data1={chartData}
            data2={chartData2}
            color1={vital.color}
            color2={vital.color2 ?? '#EC4899'}
            chartMin={vital.chartMin}
            chartMax={vital.chartMax}
            label1="Systolic"
            label2={vital.label2 ?? 'Diastolic'}
            height={CHART_H}
          />
        </View>
      )}

      {vital.chartType === 'dot' && (
        <View style={{ flex: 1, paddingLeft: 32 }}>
          <DotScatterChart
            data={chartData}
            color={vital.color}
            chartMin={vital.chartMin}
            chartMax={vital.chartMax}
            height={CHART_H}
          />
        </View>
      )}

      {vital.chartType === 'bar' && (
        <View style={{ flex: 1, paddingLeft: 32 }}>
          <BarChart
            data={chartData}
            color={vital.color}
            chartMin={vital.chartMin}
            chartMax={vital.chartMax}
            height={CHART_H}
          />
        </View>
      )}
    </View>
  );
}

const chartStyles = StyleSheet.create({
  chartBg: {
    borderRadius: 12,
    padding: Spacing.two,
    height: CHART_H + 32,
    flexDirection: 'row',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
});

// ─── MAIN SCREEN ──────────────────────────────────────────────────────────────
export function VitalsScreen({ onBack }: VitalsScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = Colors[colorScheme ?? 'light'];
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1W');
  const [expandedVital, setExpandedVital] = useState<string | null>('1');

  const TIME_RANGES: TimeRange[] = ['1D', '1W', '1M', '3M'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return theme.textSecondary;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>My Vitals</Text>
        <TouchableOpacity style={[styles.headerAction, { backgroundColor: theme.primaryLight }]}>
          <MaterialCommunityIcons name="plus" size={18} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Health Score Banner */}
        <View style={[styles.scoreBanner, { backgroundColor: theme.primary }]}>
          <View style={styles.scoreLeft}>
            <Text style={styles.scoreLabel}>Health Score</Text>
            <Text style={styles.scoreValue}>92</Text>
            <Text style={styles.scoreSubtitle}>Excellent — Keep it up!</Text>
          </View>
          <View style={styles.scoreRight}>
            <View style={styles.meterRing}>
              <View style={styles.meterInner}>
                <MaterialCommunityIcons name="heart-pulse" size={28} color="#fff" />
              </View>
            </View>
          </View>
          <View style={styles.decorCircle1} />
          <View style={styles.decorCircle2} />
        </View>

        {/* Quick Stats Row */}
        <View style={styles.quickStats}>
          {[
            { icon: 'calendar-check', value: '4', label: 'Readings today', color: theme.primary },
            { icon: 'trending-up', value: '4/4', label: 'Normal', color: '#10B981' },
            { icon: 'clock-outline', value: '10:30', label: 'Last check', color: theme.warning },
          ].map((s) => (
            <View key={s.label} style={[styles.quickStatCard, { backgroundColor: theme.backgroundElement }]}>
              <MaterialCommunityIcons name={s.icon as any} size={16} color={s.color} />
              <Text style={[styles.quickStatValue, { color: theme.text }]}>{s.value}</Text>
              <Text style={[styles.quickStatLabel, { color: theme.textSecondary }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Time Range Selector */}
        <View style={[styles.rangeSelector, { backgroundColor: theme.backgroundElement }]}>
          {TIME_RANGES.map((r) => (
            <TouchableOpacity
              key={r}
              onPress={() => setSelectedRange(r)}
              style={[styles.rangeBtn, selectedRange === r && { backgroundColor: theme.primary }]}
            >
              <Text style={[styles.rangeBtnText, { color: selectedRange === r ? '#fff' : theme.textSecondary }]}>
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Vitals Cards with Charts */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Current Vitals</Text>

        {VITALS.map((vital) => {
          const isExpanded = expandedVital === vital.id;
          const chartData = vital.data[selectedRange];

          return (
            <TouchableOpacity
              key={vital.id}
              style={[
                styles.vitalCard,
                { backgroundColor: theme.backgroundElement },
                isExpanded && styles.vitalCardExpanded,
              ]}
              onPress={() => setExpandedVital(isExpanded ? null : vital.id)}
              activeOpacity={0.85}
            >
              {/* Card Header */}
              <View style={styles.vitalCardHeader}>
                <View style={[styles.vitalIconWrap, { backgroundColor: `${vital.color}18` }]}>
                  <MaterialCommunityIcons name={vital.icon as any} size={22} color={vital.color} />
                </View>
                <View style={styles.vitalInfo}>
                  <Text style={[styles.vitalName, { color: theme.textSecondary }]}>{vital.name}</Text>
                  <View style={styles.vitalValueRow}>
                    <Text style={[styles.vitalValueText, { color: theme.text }]}>{vital.value}</Text>
                    <Text style={[styles.vitalUnit, { color: theme.textSecondary }]}> {vital.unit}</Text>
                  </View>
                </View>
                <View style={styles.vitalRight}>
                  <MiniSparkline
                    data={chartData}
                    color={vital.color}
                    chartMin={vital.chartMin}
                    chartMax={vital.chartMax}
                    chartType={vital.chartType}
                    data2={vital.data2 ? vital.data2[selectedRange] : undefined}
                    color2={vital.color2}
                  />
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(vital.status) }]} />
                </View>
                <Feather
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={theme.textSecondary}
                  style={{ marginLeft: 6 }}
                />
              </View>

              {/* Trend Badge */}
              {vital.trendUp !== null && (
                <View style={styles.trendRow}>
                  <View style={[styles.trendBadge, { backgroundColor: vital.trendUp ? '#ECFDF5' : '#FEF2F2' }]}>
                    <MaterialCommunityIcons
                      name={vital.trendUp ? 'trending-up' : 'trending-down'}
                      size={12}
                      color={vital.trendUp ? '#10B981' : '#EF4444'}
                    />
                    <Text style={[styles.trendText, { color: vital.trendUp ? '#10B981' : '#EF4444' }]}>
                      {vital.trend} from last {selectedRange}
                    </Text>
                  </View>
                  <Text style={[styles.rangeText, { color: theme.textSecondary }]}>
                    Normal: {vital.range}
                  </Text>
                </View>
              )}

              {/* Chart type indicator pill */}
              {isExpanded && (
                <View style={styles.chartTypePill}>
                  <MaterialCommunityIcons
                    name={
                      vital.chartType === 'area' ? 'chart-areaspline' :
                      vital.chartType === 'dualline' ? 'chart-line' :
                      vital.chartType === 'dot' ? 'dots-horizontal' :
                      'chart-bar'
                    }
                    size={12}
                    color={vital.color}
                  />
                  <Text style={[styles.chartTypePillText, { color: vital.color }]}>
                    {vital.chartType === 'area' ? 'Area Chart' :
                     vital.chartType === 'dualline' ? 'Dual Line Chart' :
                     vital.chartType === 'dot' ? 'Scatter Plot' :
                     'Bar Chart'}
                  </Text>
                </View>
              )}

              {/* Expanded Chart */}
              {isExpanded && (
                <View style={styles.chartSection}>
                  <VitalChart
                    vital={vital}
                    selectedRange={selectedRange}
                    isDark={isDark}
                    theme={theme}
                  />

                  {/* Stats Row */}
                  <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                      <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Min</Text>
                      <Text style={[styles.statVal, { color: theme.text }]}>
                        {Math.min(...chartData).toFixed(1).replace('.0', '')}
                      </Text>
                    </View>
                    <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
                    <View style={styles.statItem}>
                      <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Avg</Text>
                      <Text style={[styles.statVal, { color: vital.color }]}>
                        {(chartData.reduce((a, b) => a + b, 0) / chartData.length).toFixed(1).replace('.0', '')}
                      </Text>
                    </View>
                    <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
                    <View style={styles.statItem}>
                      <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Max</Text>
                      <Text style={[styles.statVal, { color: theme.text }]}>
                        {Math.max(...chartData).toFixed(1).replace('.0', '')}
                      </Text>
                    </View>
                    <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
                    <View style={styles.statItem}>
                      <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Status</Text>
                      <Text style={[styles.statVal, { color: getStatusColor(vital.status) }]}>
                        {vital.status.charAt(0).toUpperCase() + vital.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Today's Readings */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: Spacing.two }]}>
          Today's Readings
        </Text>

        {[
          { time: '10:30 AM', hr: '72 bpm', bp: '120/80', spo2: '98%', temp: '37.2°C' },
          { time: '07:15 AM', hr: '68 bpm', bp: '118/78', spo2: '99%', temp: '37.0°C' },
          { time: 'Yesterday 09:00 PM', hr: '74 bpm', bp: '122/82', spo2: '97%', temp: '37.1°C' },
        ].map((log, i) => (
          <View key={i} style={[styles.logCard, { backgroundColor: theme.backgroundElement }]}>
            <View style={[styles.logDot, { backgroundColor: '#10B981' }]} />
            <View style={{ flex: 1 }}>
              <View style={styles.logHeader}>
                <Text style={[styles.logTime, { color: theme.text }]}>{log.time}</Text>
                <View style={styles.logBadge}>
                  <Text style={styles.logBadgeText}>All Normal</Text>
                </View>
              </View>
              <View style={styles.logStats}>
                {[
                  { icon: 'heart-pulse', color: '#EF4444', val: log.hr },
                  { icon: 'water-check', color: '#2F76F6', val: log.bp },
                  { icon: 'lungs', color: '#10B981', val: log.spo2 },
                  { icon: 'thermometer', color: '#F59E0B', val: log.temp },
                ].map((s) => (
                  <View key={s.val} style={styles.logStat}>
                    <MaterialCommunityIcons name={s.icon as any} size={11} color={s.color} />
                    <Text style={[styles.logStatText, { color: theme.textSecondary }]}>{s.val}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}

        {/* Tips */}
        <View style={[styles.tipsCard, { backgroundColor: '#FEF9C3', borderLeftColor: '#EAB308' }]}>
          <MaterialCommunityIcons name="lightbulb-on" size={20} color="#CA8A04" />
          <View style={{ marginLeft: Spacing.two, flex: 1 }}>
            <Text style={[styles.tipsTitle, { color: '#92400E' }]}>Keep Your Vitals Healthy</Text>
            <Text style={[styles.tipsText, { color: '#A16207' }]}>
              Regular monitoring helps detect early changes. Stay hydrated and maintain a healthy lifestyle.
            </Text>
          </View>
        </View>

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
    paddingHorizontal: Spacing.four,
    paddingTop: Platform.OS === 'web' ? 12 : Platform.OS === 'ios' ? 50 : 36,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backButton: { padding: Spacing.two },
  headerTitle: { fontSize: 16, fontWeight: 'bold' },
  headerAction: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { paddingHorizontal: Spacing.three, paddingTop: Spacing.three },

  scoreBanner: {
    borderRadius: 20,
    padding: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.three,
    overflow: 'hidden',
    position: 'relative',
  },
  scoreLeft: { flex: 1 },
  scoreLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '500', marginBottom: 4 },
  scoreValue: { color: '#fff', fontSize: 52, fontWeight: '800', lineHeight: 60 },
  scoreSubtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '500', marginTop: 4 },
  scoreRight: { alignItems: 'center', justifyContent: 'center' },
  meterRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  meterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  decorCircle1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -30,
    right: 80,
  },
  decorCircle2: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.06)',
    bottom: -20,
    right: 120,
  },

  quickStats: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  quickStatCard: {
    flex: 1,
    borderRadius: 14,
    padding: Spacing.two + 4,
    alignItems: 'center',
    gap: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickStatValue: { fontSize: 15, fontWeight: '700', marginTop: 4 },
  quickStatLabel: { fontSize: 10, textAlign: 'center' },

  rangeSelector: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 3,
    marginBottom: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  rangeBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 9,
    alignItems: 'center',
  },
  rangeBtnText: { fontSize: 12, fontWeight: '600' },

  sectionTitle: { fontSize: 15, fontWeight: '700', marginBottom: Spacing.two },

  vitalCard: {
    borderRadius: 16,
    padding: Spacing.three,
    marginBottom: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  vitalCardExpanded: { shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
  vitalCardHeader: { flexDirection: 'row', alignItems: 'center' },
  vitalIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.two + 4,
  },
  vitalInfo: { flex: 1 },
  vitalName: { fontSize: 12, fontWeight: '500', marginBottom: 2 },
  vitalValueRow: { flexDirection: 'row', alignItems: 'baseline' },
  vitalValueText: { fontSize: 22, fontWeight: '700' },
  vitalUnit: { fontSize: 12, fontWeight: '500' },
  vitalRight: { alignItems: 'flex-end', gap: 6, marginRight: 4 },
  statusDot: { width: 7, height: 7, borderRadius: 4, alignSelf: 'flex-end' },

  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.two,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  trendText: { fontSize: 10, fontWeight: '600' },
  rangeText: { fontSize: 10 },

  chartTypePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.two,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  chartTypePillText: { fontSize: 10, fontWeight: '600' },

  chartSection: { marginTop: Spacing.two + 4 },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.two,
    borderRadius: 10,
  },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: Spacing.two },
  statLabel: { fontSize: 10, marginBottom: 2 },
  statVal: { fontSize: 14, fontWeight: '700' },
  statDivider: { width: 1, height: 28 },

  logCard: {
    borderRadius: 14,
    padding: Spacing.two + 4,
    marginBottom: Spacing.two,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    gap: Spacing.two,
  },
  logDot: { width: 8, height: 8, borderRadius: 4, marginTop: 5 },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  logTime: { fontSize: 12, fontWeight: '600' },
  logBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, backgroundColor: '#ECFDF5' },
  logBadgeText: { fontSize: 10, fontWeight: '600', color: '#10B981' },
  logStats: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  logStat: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  logStatText: { fontSize: 11 },

  tipsCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 14,
    padding: Spacing.three,
    borderLeftWidth: 4,
    marginTop: Spacing.two,
  },
  tipsTitle: { fontSize: 13, fontWeight: '700', marginBottom: 3 },
  tipsText: { fontSize: 11, lineHeight: 16 },
});
