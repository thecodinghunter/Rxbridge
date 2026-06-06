import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';
import { PrimaryButton } from '@/components/buttons';

interface PricingScreenProps {
  onSelectPlan: (plan: string) => void;
}

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    monthlyPrice: 2,
    yearlyPrice: 18,
    yearlyDiscount: '20% OFF',
    recommended: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 5,
    yearlyPrice: 45,
    yearlyDiscount: '25% OFF',
    recommended: true,
  },
  {
    id: 'super_premium',
    name: 'Super Premium',
    monthlyPrice: 10,
    yearlyPrice: 90,
    yearlyDiscount: '25% OFF',
    recommended: false,
  },
];

const FEATURES = [
  'Smart medicine reminders',
  'Detailed health insights & trends',
  'Track sleep, diet & lifestyle',
  'Add up to 3 family members',
  'Priority doctor & nurse booking',
  '24/7 customer support',
  'Advanced health analytics',
  'Prescription management',
];

export function PricingScreen({ onSelectPlan }: PricingScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Unlock Your Productivity
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Smart Electronic Health Records
          </Text>
        </View>

        {/* Plan Tabs */}
        <View style={styles.tabsContainer}>
          {PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              onPress={() => setSelectedPlan(plan.id)}
              style={[
                styles.tab,
                {
                  backgroundColor:
                    selectedPlan === plan.id ? theme.primary : theme.backgroundElement,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: selectedPlan === plan.id ? '#fff' : theme.text,
                  },
                ]}
              >
                {plan.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          {FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <MaterialCommunityIcons
                name="check-circle"
                size={20}
                color={theme.success}
                style={styles.featureIcon}
              />
              <Text style={[styles.featureText, { color: theme.text }]}>
                {feature}
              </Text>
            </View>
          ))}
        </View>

        {/* Pricing Section */}
        <View
          style={[
            styles.pricingCard,
            { backgroundColor: theme.primary, opacity: 0.95 },
          ]}
        >
          <View style={styles.billingToggle}>
            <TouchableOpacity
              onPress={() => setBillingCycle('monthly')}
              style={[
                styles.toggleButton,
                {
                  backgroundColor: billingCycle === 'monthly' ? 'rgba(255,255,255,0.2)' : 'transparent',
                },
              ]}
            >
              <Text style={styles.toggleText}>Monthly</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setBillingCycle('yearly')}
              style={[
                styles.toggleButton,
                {
                  backgroundColor: billingCycle === 'yearly' ? 'rgba(255,255,255,0.2)' : 'transparent',
                },
              ]}
            >
              <Text style={styles.toggleText}>Yearly</Text>
            </TouchableOpacity>
          </View>

          {PLANS.map((plan) => (
            selectedPlan === plan.id && (
              <View key={plan.id} style={styles.priceDisplay}>
                <Text style={styles.priceAmount}>
                  ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  <Text style={styles.pricePeriod}>
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </Text>
                </Text>
                {billingCycle === 'yearly' && (
                  <Text style={styles.discount}>{plan.yearlyDiscount}</Text>
                )}
              </View>
            )
          ))}

          {selectedPlan === PLANS[1].id && billingCycle === 'yearly' && (
            <View style={styles.recommendedBadge}>
              <MaterialCommunityIcons
                name="star"
                size={16}
                color="#FFD700"
              />
              <Text style={styles.recommendedText}>Recommended</Text>
            </View>
          )}
        </View>

        <PrimaryButton
          title="Start 7-day Trial"
          onPress={() => onSelectPlan(selectedPlan)}
          style={styles.ctaButton}
        />

        <TouchableOpacity
          onPress={() => {}}
          style={styles.restoreButton}
        >
          <Text style={[styles.restoreText, { color: theme.primary }]}>
            Restore subscription
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Spacing.one,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.two + 4,
    paddingHorizontal: Spacing.two,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  featuresContainer: {
    marginBottom: Spacing.three,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.two + 2,
  },
  featureIcon: {
    marginRight: Spacing.two,
  },
  featureText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  pricingCard: {
    borderRadius: 16,
    padding: Spacing.three + 4,
    marginBottom: Spacing.three,
  },
  billingToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 4,
    marginBottom: Spacing.three,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: Spacing.two,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  priceDisplay: {
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  priceAmount: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  pricePeriod: {
    fontSize: 14,
    fontWeight: '400',
  },
  discount: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '600',
    marginTop: Spacing.one,
  },
  recommendedBadge: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: Spacing.one + 2,
    paddingHorizontal: Spacing.three,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
  },
  recommendedText: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: '600',
  },
  ctaButton: {
    marginBottom: Spacing.two,
  },
  restoreButton: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
  restoreText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
