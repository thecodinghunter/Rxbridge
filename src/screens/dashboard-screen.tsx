import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, SafeAreaView, Image, Dimensions, Modal, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';
import { CircularGauge } from '@/components/circular-gauge';

export interface DashboardScreenProps {
  onStartAppointment: () => void;
  onDirectBooking: () => void;
  onDoctorSearch: () => void;
  onNurseSearch: () => void;
  onVideoCall: () => void;
  onChat: () => void;
  onMedications?: () => void;
  onLabReport?: () => void;
  onVitals?: () => void;
  onLifestyleWellness?: () => void;
  onFamilyAccounts?: () => void;
  onVaccinationRecords?: () => void;
  onSmartHealthSummary?: () => void;
  onAllergies?: () => void;
  onMyDoctors?: () => void;
}

// Local Assets
const clinicalIcon = require('@/assets/images/pharmacist_icon.png');
const doctorIcon = require('@/assets/images/doctor_icon.png');
const nurseIcon = require('@/assets/images/nurse_icon.png');
const medsIcon = require('@/assets/images/meds_icon.png');
const reportIcon = require('@/assets/images/report_icon.png');
const vitalIcon = require('@/assets/images/vital_icon.png');
const lifestyleIcon = require('@/assets/images/lifestyle_icon.png');
const summaryIcon = require('@/assets/images/summary_icon.png');

// Mock Data
const SPECIAL_DOCTORS = [
  {
    id: '1',
    name: 'Dr. Rafiqul Islam',
    specialty: 'Neurologist',
    rating: 4.4,
    reviews: 130,
    experience: '8+ Years',
    degree: 'MBBS, MD, Diju. Gynaecology',
    languages: 'Eng • Arab • Hin',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '2',
    name: 'Dr. Yasmin Chowdhury',
    specialty: 'Neurologist',
    rating: 4.4,
    reviews: 120,
    experience: '8+ Years',
    degree: 'MBBS, MD, Diju. Gynaecology',
    languages: 'Eng • Arab • Hin',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '3',
    name: 'Dr. Mujahid Yabaal',
    specialty: 'Neurologist',
    rating: 4.7,
    reviews: 98,
    experience: '10+ Years',
    degree: 'MBBS, MD, FRCS',
    languages: 'Eng • Arab • Hin',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
  },
];

const PREVENTIVE_TIPS = [
  {
    id: '1',
    title: 'Walk 20 minutes today',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '2',
    title: 'Drink more water',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Fiza Khan',
    role: 'Neuro Patient',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '2',
    name: 'Muhammad Ali',
    role: 'Neuro Patient',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '3',
    name: 'Mahmud Rahman',
    role: 'Neuro Patient',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  },
];

export function DashboardScreen({
  onStartAppointment,
  onDirectBooking,
  onDoctorSearch,
  onNurseSearch,
  onVideoCall,
  onChat,
  onMedications,
  onLabReport,
  onVitals,
  onLifestyleWellness,
  onFamilyAccounts,
  onVaccinationRecords,
  onSmartHealthSummary,
  onAllergies,
  onMyDoctors,
}: DashboardScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8FAFC' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Blue Header Section */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={['#1E75EC', '#0B57C2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.headerGradient}
          >
            {/* Top Bar inside Header */}
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.greetingHello}>Hello,</Text>
                <Text style={styles.greetingName}>Ramesh Patel!</Text>
              </View>
              <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
                  <Feather name="bell" size={22} color="#1E75EC" />
                </TouchableOpacity>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' }}
                  style={styles.headerAvatar}
                />
              </View>
            </View>

            {/* Appointment Section */}
            <View style={styles.appointmentSection}>
              <Text style={styles.sectionHeaderTitleWhite}>Appointment</Text>
              <View style={styles.appointmentCardsRow}>
                {/* Clinical Pharmacist Card */}
                <TouchableOpacity 
                  style={styles.appointmentItemCard} 
                  onPress={() => setIsSheetVisible(true)}
                  activeOpacity={0.9}
                >
                  <Image source={clinicalIcon} style={styles.appointmentCardIcon} />
                  <Text style={styles.appointmentCardLabel}>Clinical Pharmacist</Text>
                </TouchableOpacity>

                {/* Doctor Card - goes directly to booking */}
                <TouchableOpacity 
                  style={styles.appointmentItemCard} 
                  onPress={onDoctorSearch}
                  activeOpacity={0.9}
                >
                  <Image source={doctorIcon} style={styles.appointmentCardIcon} />
                  <Text style={styles.appointmentCardLabel}>Doctor</Text>
                </TouchableOpacity>

                {/* Nurse Card - goes directly to booking */}
                <TouchableOpacity 
                  style={styles.appointmentItemCard} 
                  onPress={onNurseSearch}
                  activeOpacity={0.9}
                >
                  <Image source={nurseIcon} style={styles.appointmentCardIcon} />
                  <Text style={styles.appointmentCardLabel}>Nurse</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>

      {/* Bottom Sheet Modal for Appointment Types */}
      <Modal
        visible={isSheetVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsSheetVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.sheetOverlayContainer}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Choose Clinical Pharmacist Appointment Type</Text>
            <Text style={styles.sheetDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</Text>
            <View style={styles.sheetButtonsRow}>
              <TouchableOpacity
                style={[styles.sheetButton, styles.sheetButtonPrimary]}
                onPress={() => {
                  setIsSheetVisible(false);
                  onStartAppointment();
                }}
              >
                <Text style={[styles.sheetButtonTxt, styles.sheetButtonTxtPrimary]}>Appointment</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sheetButton, styles.sheetButtonPrimary]}
                onPress={() => {
                  setIsSheetVisible(false);
                  onStartAppointment();
                }}
              >
                <Text style={[styles.sheetButtonTxt, styles.sheetButtonTxtPrimary]}>Premium Appointment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

        {/* Upcoming Appointment */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Upcoming Appointment</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.upcomingCard}>
            <View style={styles.upcomingHeader}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200' }}
                style={styles.doctorAvatar}
              />
              <View style={styles.upcomingDoctorInfo}>
                <Text style={styles.upcomingDoctorName}>Mujahid Yabaal el-Ghattas</Text>
                <Text style={styles.upcomingDoctorSpecialty}>Neurologist</Text>
              </View>
              <TouchableOpacity onPress={onVideoCall} activeOpacity={0.7}>
                <Text style={styles.viewDetailsLink}>View Details</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.upcomingBadgesRow}>
              <View style={styles.upcomingBadge}>
                <Feather name="calendar" size={13} color="#6E7682" />
                <Text style={styles.upcomingBadgeText}>Thurs, 8th Sept 24'</Text>
              </View>
              <View style={styles.upcomingBadge}>
                <Feather name="clock" size={13} color="#6E7682" />
                <Text style={styles.upcomingBadgeText}>09:30AM - 10:30AM</Text>
              </View>
            </View>
          </View>
        </View>

        {/* My Health Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Health Information</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.healthInfoScrollContainer}
          >
            <TouchableOpacity 
              style={[styles.healthInfoCard, { backgroundColor: theme.backgroundElement }]} 
              onPress={onMedications}
              activeOpacity={0.8}
            >
              <Image source={medsIcon} style={styles.healthInfoCardIcon} />
              <Text style={[styles.healthInfoCardLabel, { color: theme.textSecondary }]}>Medication</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.healthInfoCard, { backgroundColor: theme.backgroundElement }]} 
              onPress={onLabReport}
              activeOpacity={0.8}
            >
              <Image source={reportIcon} style={styles.healthInfoCardIcon} />
              <Text style={[styles.healthInfoCardLabel, { color: theme.textSecondary }]}>Lab report</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.healthInfoCard, { backgroundColor: theme.backgroundElement }]} 
              onPress={onVitals}
              activeOpacity={0.8}
            >
              <Image source={vitalIcon} style={styles.healthInfoCardIcon} />
              <Text style={[styles.healthInfoCardLabel, { color: theme.textSecondary }]}>Vital</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.healthInfoCard, { backgroundColor: theme.backgroundElement }]} 
              onPress={onLifestyleWellness}
              activeOpacity={0.8}
            >
              <Image source={lifestyleIcon} style={styles.healthInfoCardIcon} />
              <Text style={[styles.healthInfoCardLabel, { color: theme.textSecondary }]}>Lifestyle &{'\n'}Wellness</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.healthInfoCard, { backgroundColor: theme.backgroundElement }]} 
              onPress={onVaccinationRecords}
              activeOpacity={0.8}
            >
              <Text style={[styles.healthInfoCardLabel, { color: theme.textSecondary }]}>Vaccination{'\n'}Records</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.healthInfoCard, { backgroundColor: theme.backgroundElement }]} 
              onPress={onSmartHealthSummary}
              activeOpacity={0.8}
            >
              <Image source={summaryIcon} style={styles.healthInfoCardIcon} />
              <Text style={[styles.healthInfoCardLabel, { color: theme.textSecondary }]}>Smart Health{'\n'}Summary</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.healthInfoCard, { backgroundColor: theme.backgroundElement }]} 
              onPress={onFamilyAccounts}
              activeOpacity={0.8}
            >
              <Text style={[styles.healthInfoCardLabel, { color: theme.textSecondary }]}>Family Accounts</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.healthInfoCard, { backgroundColor: theme.backgroundElement }]} 
              onPress={onAllergies}
              activeOpacity={0.8}
            >
              <Text style={[styles.healthInfoCardLabel, { color: theme.textSecondary }]}>Allergies</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>


        {/* Health Summary & Side Stacked Buttons */}
        <View style={styles.healthSummarySectionRow}>
          {/* Left Health Summary Card */}
          <View style={styles.healthSummaryCard}>
            <Text style={styles.healthSummaryCardTitle}>Health Summary</Text>
            <CircularGauge
              value={87}
              statusText="Moderate"
              timeText="6 hrs ago"
              description="87% you only need to be relax"
            />
          </View>

          {/* Right Action Buttons */}
          <View style={styles.stackedButtonsContainer}>
            <TouchableOpacity 
              style={styles.stackedButton} 
              onPress={onMyDoctors || onStartAppointment}
              activeOpacity={0.8}
            >
              <Text style={styles.stackedButtonText}>My Doctor</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.stackedButton} 
              onPress={onLabReport}
              activeOpacity={0.8}
            >
              <Text style={styles.stackedButtonText}>My Lab</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.stackedButton} 
              onPress={onMedications}
              activeOpacity={0.8}
            >
              <Text style={styles.stackedButtonText}>My Pharmacist</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Special Doctor Near You */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Doctor Near You</Text>
          <FlatList
            data={SPECIAL_DOCTORS}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.doctorListContent}
            renderItem={({ item }) => (
              <View style={styles.doctorItemCard}>
                <View style={styles.doctorCardHeader}>
                  <Image source={{ uri: item.image }} style={styles.doctorCardImage} />
                  <View style={styles.doctorCardRating}>
                    <FontAwesome name="star" size={12} color="#FFD700" />
                    <Text style={styles.doctorCardRatingText}>{item.rating}</Text>
                    <Text style={styles.doctorCardReviewCount}>({item.reviews} Reviews)</Text>
                  </View>
                </View>
                <Text style={styles.doctorCardName}>{item.name}</Text>
                <Text style={styles.doctorCardSubText}>{item.specialty} • {item.experience}</Text>
                <Text style={styles.doctorCardDegree}>{item.degree}</Text>
                <Text style={styles.doctorCardLanguages}>{item.languages}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Alerts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alerts</Text>
          <View style={styles.alertsContainer}>
            {/* Alert 1 */}
            <View style={styles.alertItemCard}>
              <View style={[styles.alertIconWrapper, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                <MaterialCommunityIcons name="pill" size={20} color="#EF4444" />
              </View>
              <View style={styles.alertContentText}>
                <Text style={styles.alertMainTitle}>Missed Dose Alert of Yesterday</Text>
                <Text style={styles.alertSubTitle}>4 days left for the Lipitor</Text>
              </View>
              <TouchableOpacity style={[styles.alertButton, { backgroundColor: '#EF4444' }]} activeOpacity={0.8}>
                <Text style={styles.alertButtonText}>Mark as Taken</Text>
              </TouchableOpacity>
            </View>

            {/* Alert 2 */}
            <View style={styles.alertItemCard}>
              <View style={[styles.alertIconWrapper, { backgroundColor: 'rgba(244, 63, 94, 0.1)' }]}>
                <MaterialCommunityIcons name="account-clock" size={20} color="#F43F5E" />
              </View>
              <View style={styles.alertContentText}>
                <Text style={styles.alertMainTitle}>Revisit to Dr. Jakob</Text>
                <Text style={styles.alertSubTitle}>4 days left to Revisit</Text>
              </View>
              <TouchableOpacity style={[styles.alertButton, { backgroundColor: '#F43F5E' }]} activeOpacity={0.8}>
                <Text style={styles.alertButtonText}>Mark as visited</Text>
              </TouchableOpacity>
            </View>

            {/* Alert 3 */}
            <View style={styles.alertItemCard}>
              <View style={[styles.alertIconWrapper, { backgroundColor: 'rgba(234, 179, 8, 0.1)' }]}>
                <MaterialCommunityIcons name="alert" size={20} color="#EAB308" />
              </View>
              <View style={styles.alertContentText}>
                <Text style={styles.alertMainTitle}>Non-Compliance Alert</Text>
                <Text style={styles.alertSubTitle}>Potential Conflict Detected</Text>
              </View>
              <TouchableOpacity style={[styles.alertButton, { backgroundColor: '#EAB308' }]} activeOpacity={0.8}>
                <Text style={styles.alertButtonText}>Contact Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Take Action Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Take Action</Text>
          <View style={styles.takeActionCard}>
            <View style={[styles.takeActionIconWrapper, { backgroundColor: 'rgba(30, 117, 236, 0.1)' }]}>
              <MaterialCommunityIcons name="cached" size={22} color="#1E75EC" />
            </View>
            <View style={styles.takeActionContent}>
              <Text style={styles.takeActionTitle}>Refill Reminder</Text>
              <Text style={styles.takeActionDesc} numberOfLines={1}>Lorem ipsum dolor sit amet, consect...</Text>
            </View>
            <TouchableOpacity style={styles.takeActionButton} activeOpacity={0.8}>
              <Text style={styles.takeActionButtonText}>Refill Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Preventative Tip Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preventative Tip</Text>
          {PREVENTIVE_TIPS.map((tip) => (
            <View key={tip.id} style={styles.tipCardItem}>
              <Text style={styles.tipCardTitle}>{tip.title}</Text>
              <Text style={styles.tipCardDesc}>{tip.description}</Text>
            </View>
          ))}
        </View>

        {/* Testimonial Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Testimonial</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={TESTIMONIALS}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.testimonialListContent}
            renderItem={({ item }) => (
              <View style={styles.testimonialCard}>
                <Image source={{ uri: item.image }} style={styles.testimonialAvatar} />
                <View style={styles.testimonialBody}>
                  <Text style={styles.testimonialName}>{item.name}</Text>
                  <Text style={styles.testimonialRole}>{item.role}</Text>
                  <View style={styles.starRow}>
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <FontAwesome key={i} name="star" size={12} color="#FFD700" style={styles.starIcon} />
                    ))}
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>

      {/* Premium Custom Bottom Navigation Bar */}
      <View style={styles.bottomNavContainer}>
        {/* Active Home Tab */}
        <TouchableOpacity style={styles.activeTabItem} activeOpacity={0.9}>
          <Ionicons name="home" size={20} color="#FFFFFF" />
          <Text style={styles.activeTabLabel}>Home</Text>
        </TouchableOpacity>

        {/* Pill/Medications Tab */}
        <TouchableOpacity style={styles.tabItem} onPress={onMedications} activeOpacity={0.7}>
          <MaterialCommunityIcons name="pill" size={24} color="#6E7682" />
        </TouchableOpacity>

        {/* Analytics/Vitals Tab */}
        <TouchableOpacity style={styles.tabItem} onPress={onVitals} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chart-box-outline" size={24} color="#6E7682" />
        </TouchableOpacity>

        {/* Clipboard/Lab Tab */}
        <TouchableOpacity style={styles.tabItem} onPress={onLabReport} activeOpacity={0.7}>
          <MaterialCommunityIcons name="clipboard-text-outline" size={24} color="#6E7682" />
        </TouchableOpacity>

        {/* Profile Tab */}
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Feather name="user" size={24} color="#6E7682" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.six + 20,
  },
  headerContainer: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
    marginBottom: Spacing.three,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'web' ? 12 : (Platform.OS === 'ios' ? 50 : 36),
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.one,
    marginBottom: Spacing.three,
  },
  greetingHello: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 15,
    fontWeight: '500',
  },
  greetingName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  bellButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  appointmentSection: {
    marginTop: Spacing.two,
  },
  sectionHeaderTitleWhite: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Spacing.three,
  },
  appointmentCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  appointmentItemCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentCardIcon: {
    width: 46,
    height: 46,
    marginBottom: Spacing.two,
    resizeMode: 'contain',
  },
  appointmentCardLabel: {
    color: '#1E293B',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
  section: {
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.three,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: Spacing.one + 2,
  },
  seeAllText: {
    fontSize: 12,
    color: '#2F76F6',
    fontWeight: '600',
  },
  upcomingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  upcomingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: Spacing.three,
  },
  upcomingDoctorInfo: {
    flex: 1,
  },
  upcomingDoctorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  upcomingDoctorSpecialty: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  viewDetailsLink: {
    fontSize: 12,
    color: '#2F76F6',
    fontWeight: '600',
  },
  upcomingBadgesRow: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginTop: Spacing.three,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: Spacing.three,
  },
  upcomingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + 2,
    borderRadius: 8,
  },
  upcomingBadgeText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
  },
  healthInfoScrollContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  healthInfoCard: {
    width: 102,
    height: 110,
    borderRadius: 16,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.one,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 10,
  },
  healthInfoCardIcon: {
    width: 44,
    height: 44,
    marginBottom: Spacing.two,
    resizeMode: 'contain',
  },
  healthInfoCardLabel: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 14,
  },
  healthInfoRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  healthInfoRowCard: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: Spacing.two + 4,
    paddingHorizontal: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 110,
  },
  healthSummarySectionRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    marginBottom: Spacing.three,
  },
  healthSummaryCard: {
    flex: 1.1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  healthSummaryCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  stackedButtonsContainer: {
    flex: 0.9,
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  stackedButton: {
    backgroundColor: '#2F76F6',
    borderRadius: 16,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2F76F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  stackedButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  doctorListContent: {
    paddingRight: Spacing.four,
    gap: Spacing.three,
  },
  doctorItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three + 2,
    width: 210,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  doctorCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.two,
  },
  doctorCardImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  doctorCardRating: {
    alignItems: 'flex-end',
  },
  doctorCardRatingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  doctorCardReviewCount: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 1,
  },
  doctorCardName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: Spacing.one,
  },
  doctorCardSubText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    marginTop: 2,
  },
  doctorCardDegree: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },
  doctorCardLanguages: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 3,
  },
  alertsContainer: {
    gap: Spacing.two + 2,
  },
  alertItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  alertIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.three,
  },
  alertContentText: {
    flex: 1,
    paddingRight: Spacing.two,
  },
  alertMainTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  alertSubTitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  alertButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  takeActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  takeActionIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.three,
  },
  takeActionContent: {
    flex: 1,
    paddingRight: Spacing.two,
  },
  takeActionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  takeActionDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  takeActionButton: {
    backgroundColor: '#2F76F6',
    paddingHorizontal: Spacing.three + 2,
    paddingVertical: Spacing.two,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  takeActionButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  tipCardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.four,
    marginBottom: Spacing.two + 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  tipCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  tipCardDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  testimonialListContent: {
    paddingRight: Spacing.four,
    gap: Spacing.three,
  },
  testimonialCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    width: 170,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  testimonialAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: Spacing.three,
  },
  testimonialBody: {
    flex: 1,
  },
  testimonialName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  testimonialRole: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 1,
  },
  starRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  starIcon: {
    marginRight: 1,
  },
  bottomNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.four,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
  },
  activeTabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F76F6',
    borderRadius: 20,
    paddingVertical: Spacing.one + 3,
    paddingHorizontal: Spacing.four,
    gap: 6,
  },
  activeTabLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  tabItem: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContentContainer: {
    width: '100%',
  },
  sheetOverlayContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'System',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 24,
  },
  sheetDesc: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'System',
    marginBottom: 24,
    textAlign: 'center',
  },
  sheetButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sheetButton: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetButtonPrimary: {
    // Styling handled in code (theme)
  },
  sheetButtonTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  sheetButtonTxtPrimary: {
    // Styling handled in code
  },
});
