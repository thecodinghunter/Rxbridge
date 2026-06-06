import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';
import { PrimaryButton } from '@/components/buttons';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  credentials: string;
  patientsTreated: number;
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  location: string;
  distance: string;
  hours: string;
  about: string;
  languages?: string;
  image?: string;
}

export interface DoctorDetailsScreenProps {
  type?: 'doctor' | 'nurse';
  isBooked?: boolean;
  onBookNow: () => void;
  onBack: () => void;
  doctor?: Doctor;
}

const DOCTOR: Doctor = {
  id: '1',
  name: 'Dr. Mariam Mahamood',
  specialty: 'Neurologist',
  credentials: 'MBBS, MD, Dip. Gynecology',
  patientsTreated: 2500,
  yearsExperience: 8,
  rating: 4.4,
  reviewCount: 73000,
  location: '8502 Preston Rd, Inglewood, Maine 98380',
  distance: '800M Away',
  hours: '09AM - 09PM • Mon to Tue',
  about:
    'Dr. Mariam is a renowned neurologist with over 8 years of experience in treating complex neurological conditions. She specializes in migraine management, epilepsy, and neurodegenerative diseases. Her patient-centric approach and advanced diagnostic techniques make her one of the most sought-after neurologists in the region.',
};

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent doctor, very professional',
  },
  {
    id: '2',
    name: 'Mike Brown',
    rating: 4.5,
    comment: 'Great consultation experience',
  },
  {
    id: '3',
    name: 'Emma Davis',
    rating: 5,
    comment: 'Highly recommended!',
  },
];

export function DoctorDetailsScreen({
  type = 'doctor',
  isBooked = false,
  onBookNow,
  onBack,
  doctor = DOCTOR,
}: DoctorDetailsScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTime, setSelectedTime] = useState('09:30AM');

  const timeSlots = [
    '09:00AM',
    '09:30AM',
    '10:00AM',
    '10:30AM',
    '02:00PM',
    '02:30PM',
    '03:00PM',
    '03:30PM',
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Doctor Image Section */}
        <View
          style={[
            styles.imageContainer,
            { backgroundColor: theme.backgroundElement },
          ]}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <AntDesign name="left" size={18} color={theme.text} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <AntDesign
              name={(isFavorite ? 'heart' : 'hearto') as any}
              size={24}
              color={isFavorite ? theme.error : theme.textSecondary}
            />
          </TouchableOpacity>
          {doctor.image ? (
            <Image source={{ uri: doctor.image }} style={StyleSheet.absoluteFill} resizeMode="cover" />
          ) : (
            <MaterialCommunityIcons
              name="hospital-box"
              size={100}
              color={theme.primary}
            />
          )}
        </View>

        {/* Doctor Info */}
        <View style={styles.infoSection}>
          <Text style={[styles.doctorName, { color: theme.text }]}>
            {doctor.name}
          </Text>
          {type !== 'nurse' && (
            <Text style={[styles.specialty, { color: theme.primary }]}>
              {doctor.specialty}
            </Text>
          )}
          <Text style={[styles.credentials, { color: theme.textSecondary }]}>
            {doctor.credentials}
          </Text>
        </View>

        {/* Stats */}
        <View
          style={[
            styles.statsContainer,
            { borderTopColor: theme.border, borderBottomColor: theme.border },
          ]}
        >
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.text }]}>
              {doctor.patientsTreated.toLocaleString()}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Patients
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.text }]}>
              {doctor.yearsExperience}+
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Years
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
          <View style={styles.statItem}>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="#FFD700" />
              <Text style={[styles.statNumber, { color: theme.text }]}>
                {doctor.rating}
              </Text>
            </View>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              ({doctor.reviewCount.toLocaleString()})
            </Text>
          </View>
        </View>

        {/* Date and Time Selection */}
        {type !== 'nurse' && (
          <View style={styles.timeSection}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Thurs, 8th Sept 24
            </Text>
            <FlatList
              data={timeSlots}
              horizontal
              scrollEnabled
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelectedTime(item)}
                  style={[
                    styles.timeSlot,
                    {
                      backgroundColor:
                        selectedTime === item ? theme.primary : theme.backgroundElement,
                      borderColor: selectedTime === item ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.timeText,
                      {
                        color: selectedTime === item ? '#fff' : theme.text,
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.timeListContent}
            />
          </View>
        )}

        {/* About */}
        <View style={styles.aboutSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            About
          </Text>
          <Text style={[styles.aboutText, { color: theme.textSecondary }]}>
            {doctor.about}
          </Text>
        </View>

        {/* Location */}
        <View style={styles.locationSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Clinic Location
          </Text>
          <View style={styles.locationItem}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={theme.primary}
            />
            <View style={styles.locationDetails}>
              <Text style={[styles.locationAddress, { color: theme.text }]}>
                {doctor.location}
              </Text>
              <Text
                style={[
                  styles.locationSubtext,
                  { color: theme.textSecondary },
                ]}
              >
                {doctor.hours}
              </Text>
              <Text style={[styles.distance, { color: theme.success }]}>
                {doctor.distance}
              </Text>
            </View>
          </View>
        </View>

        {/* Testimonials */}
        <View style={styles.testimonialSection}>
          <View style={styles.testimonialHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Testimonials
            </Text>
            <TouchableOpacity>
              <Text style={[styles.writeLink, { color: theme.primary }]}>
                Write
              </Text>
            </TouchableOpacity>
          </View>
          {TESTIMONIALS.map((testimonial) => (
            <View key={testimonial.id} style={styles.testimonialItem}>
              <View style={styles.testimonialHeader2}>
                <Text style={[styles.testimonialName, { color: theme.text }]}>
                  {testimonial.name}
                </Text>
                <View style={styles.ratingStars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FontAwesome
                      key={i}
                      name="star"
                      size={12}
                      color={i < Math.floor(testimonial.rating) ? '#FFD700' : theme.border}
                    />
                  ))}
                </View>
              </View>
              <Text
                style={[
                  styles.testimonialComment,
                  { color: theme.textSecondary },
                ]}
              >
                {testimonial.comment}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* CTA Button */}
      {type === 'doctor' && (
        <View style={styles.footer}>
          <PrimaryButton
            title={isBooked ? "Join Now" : "Book Appointment"}
            onPress={onBookNow}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.six,
  },
  imageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 12 : Spacing.four,
    right: Spacing.four,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 12 : Spacing.four,
    left: Spacing.four,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  infoSection: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Spacing.one,
  },
  specialty: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Spacing.one,
  },
  credentials: {
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.four,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: Spacing.one,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: 40,
    marginHorizontal: Spacing.two,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  timeSection: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: Spacing.three,
  },
  timeListContent: {
    gap: Spacing.two,
  },
  timeSlot: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 90,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  aboutSection: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  aboutText: {
    fontSize: 13,
    lineHeight: 20,
  },
  locationSection: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  locationItem: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  locationDetails: {
    flex: 1,
  },
  locationAddress: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: Spacing.one,
  },
  locationSubtext: {
    fontSize: 12,
    marginBottom: Spacing.one,
  },
  distance: {
    fontSize: 12,
    fontWeight: '600',
  },
  testimonialSection: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  testimonialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  testimonialHeader2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.one,
  },
  testimonialItem: {
    marginBottom: Spacing.three,
  },
  testimonialName: {
    fontSize: 13,
    fontWeight: '600',
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 2,
  },
  testimonialComment: {
    fontSize: 12,
    lineHeight: 16,
  },
  writeLink: {
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    paddingBottom: Spacing.five,
  },
});
