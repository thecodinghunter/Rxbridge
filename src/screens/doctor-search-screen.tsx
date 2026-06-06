import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';

interface Doctor {
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
  languages: string;
  image: string;
}

const DOCTORS_LIST: Doctor[] = [
  {
    id: 'doc_mehnaz',
    name: 'Dr. Mehnaz Akhtar',
    specialty: 'Otolaryngology (ENT)',
    credentials: 'MBBS, MD, Dip. Gynecology',
    patientsTreated: 2400,
    yearsExperience: 8,
    rating: 4.4,
    reviewCount: 73000,
    location: '8502 Preston Rd, Inglewood, Maine 98380',
    distance: '800M Away',
    hours: '09AM - 09PM • Mon to Tue',
    about: 'Dr. Mehnaz Akhtar is an expert in Otolaryngology with extensive training and over 8 years of clinical experience. She provides comprehensive care for conditions affecting the ear, nose, throat, and head & neck structures.',
    languages: 'Eng - Arab - Hin',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=350',
  },
  {
    id: 'doc_zohra',
    name: 'Dr. Zohra Chowdhury',
    specialty: 'Orthopedics',
    credentials: 'MBBS, MD, Dip. Gynecology',
    patientsTreated: 1900,
    yearsExperience: 8,
    rating: 4.4,
    reviewCount: 73000,
    location: '8502 Preston Rd, Inglewood, Maine 98380',
    distance: '1.2KM Away',
    hours: '09AM - 05PM • Wed to Fri',
    about: 'Dr. Zohra Chowdhury is a dedicated orthopedic specialist focusing on joint reconstruction, sports injuries, and musculoskeletal disorders, helping patients regain full mobility and strength.',
    languages: 'Eng - Arab - Hin',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=350',
  },
  {
    id: 'doc_rafiqul',
    name: 'Dr. Rafiqul Islam',
    specialty: 'Neurology',
    credentials: 'MBBS, MD, Dip. Gynecology',
    patientsTreated: 3100,
    yearsExperience: 8,
    rating: 4.5,
    reviewCount: 64000,
    location: '8502 Preston Rd, Inglewood, Maine 98380',
    distance: '900M Away',
    hours: '10AM - 07PM • Mon to Wed',
    about: 'Dr. Rafiqul Islam is a highly recommended neurologist specializing in diagnosis and medical management of conditions affecting the central and peripheral nervous systems.',
    languages: 'Eng - Arab - Hin',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=350',
  },
  {
    id: 'doc_yasmin',
    name: 'Dr. Yasmin Chowdhury',
    specialty: 'Neurology',
    credentials: 'MBBS, MD, Dip. Gynecology',
    patientsTreated: 2200,
    yearsExperience: 8,
    rating: 4.4,
    reviewCount: 45000,
    location: '8502 Preston Rd, Inglewood, Maine 98380',
    distance: '1.5KM Away',
    hours: '09AM - 06PM • Mon to Fri',
    about: 'Dr. Yasmin Chowdhury is a skilled neurologist specializing in headaches, stroke treatment, and cognitive impairments, committed to delivering personalized patient care.',
    languages: 'Eng - Arab - Hin',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=350',
  },
];

const SPECIALTIES = [
  { id: 'all', label: 'All', iconName: 'apps' as any, iconType: 'Ionicons' },
  { id: 'neurology', label: 'Neurology', iconName: 'brain', iconType: 'MaterialCommunityIcons' },
  { id: 'ent', label: 'ENT', iconName: 'eye-outline', iconType: 'Ionicons' },
  { id: 'orthopedics', label: 'Orthopedics', iconName: 'bone', iconType: 'MaterialCommunityIcons' },
  { id: 'pulmonary', label: 'Pulmonary', iconName: 'lungs', iconType: 'MaterialCommunityIcons' },
];

const NURSES_LIST: Doctor[] = [
  {
    id: 'nurse_sarah',
    name: 'Nurse Sarah Jenkins',
    specialty: 'Pediatric Care',
    credentials: 'B.Sc Nursing, RN',
    patientsTreated: 1800,
    yearsExperience: 6,
    rating: 4.6,
    reviewCount: 32000,
    location: '8502 Preston Rd, Inglewood, Maine 98380',
    distance: '900M Away',
    hours: '08AM - 06PM • Mon to Thu',
    about: 'Nurse Sarah Jenkins is a registered nurse with 6 years of experience in pediatric clinical settings. She is passionate about providing child-friendly, compassionate care to young patients and their families.',
    languages: 'Eng - Hin',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=350',
  },
  {
    id: 'nurse_david',
    name: 'Nurse David Miller',
    specialty: 'ICU & Critical Care',
    credentials: 'B.Sc Nursing, Critical Care Cert.',
    patientsTreated: 2500,
    yearsExperience: 8,
    rating: 4.7,
    reviewCount: 41000,
    location: '8502 Preston Rd, Inglewood, Maine 98380',
    distance: '1.5KM Away',
    hours: '07AM - 07PM • Tue to Fri',
    about: 'Nurse David Miller has over 8 years of specialized experience in ICU environments. He is trained in advanced life support and is dedicated to providing high-quality care to patients in critical conditions.',
    languages: 'Eng - Arab',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=350',
  },
  {
    id: 'nurse_emily',
    name: 'Nurse Emily Davis',
    specialty: 'General Nursing',
    credentials: 'Diploma in General Nursing, RN',
    patientsTreated: 1500,
    yearsExperience: 5,
    rating: 4.5,
    reviewCount: 22000,
    location: '8502 Preston Rd, Inglewood, Maine 98380',
    distance: '1.0KM Away',
    hours: '09AM - 06PM • Mon to Fri',
    about: 'Nurse Emily Davis provides comprehensive general nursing services with a patient-first attitude. She has 5 years of experience in clinical check-ups, wound care, and health management.',
    languages: 'Eng - Hin',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=350',
  },
];

const NURSE_SPECIALTIES = [
  { id: 'all', label: 'All', iconName: 'apps' as any, iconType: 'Ionicons' },
  { id: 'pediatric', label: 'Pediatrics', iconName: 'baby-carriage', iconType: 'MaterialCommunityIcons' },
  { id: 'icu', label: 'ICU', iconName: 'heart-pulse', iconType: 'MaterialCommunityIcons' },
  { id: 'general', label: 'General', iconName: 'medical-bag', iconType: 'MaterialCommunityIcons' },
];

interface DoctorSearchScreenProps {
  type?: 'doctor' | 'nurse';
  onSelectDoctor: (doctor: Doctor) => void;
  onBack: () => void;
}

export function DoctorSearchScreen({ type = 'doctor', onSelectDoctor, onBack }: DoctorSearchScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [searchText, setSearchText] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const isNurse = type === 'nurse';
  const listToUse = isNurse ? NURSES_LIST : DOCTORS_LIST;
  const specialtiesToUse = isNurse ? NURSE_SPECIALTIES : SPECIALTIES;

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredDoctors = listToUse.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchText.toLowerCase()) ||
                          doc.specialty.toLowerCase().includes(searchText.toLowerCase());
    
    if (selectedSpecialty === 'all') {
      return matchesSearch;
    }
    
    const categoryKey = selectedSpecialty.toLowerCase();
    const docSpecialty = doc.specialty.toLowerCase();
    
    let isCategoryMatch = false;
    if (isNurse) {
      if (categoryKey === 'pediatric') isCategoryMatch = docSpecialty.includes('pediat');
      else if (categoryKey === 'icu') isCategoryMatch = docSpecialty.includes('icu') || docSpecialty.includes('critical');
      else if (categoryKey === 'general') isCategoryMatch = docSpecialty.includes('general');
    } else {
      if (categoryKey === 'neurology') isCategoryMatch = docSpecialty.includes('neurolog');
      else if (categoryKey === 'ent') isCategoryMatch = docSpecialty.includes('ent') || docSpecialty.includes('otolaryngology');
      else if (categoryKey === 'orthopedics') isCategoryMatch = docSpecialty.includes('orthoped');
      else if (categoryKey === 'pulmonary') isCategoryMatch = docSpecialty.includes('pulmon');
    }

    return matchesSearch && isCategoryMatch;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <AntDesign name="left" size={16} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>{isNurse ? 'Nurses' : 'Doctors'}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={[styles.searchBarWrapper, { borderColor: theme.border, backgroundColor: theme.backgroundElement }]}>
            <Feather name="search" size={18} color="#8E9AA6" />
            <TextInput
              placeholder="Search ..."
              placeholderTextColor="#8E9AA6"
              style={[styles.searchBarInput, { color: theme.text }]}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity activeOpacity={0.6}>
              <Feather name="filter" size={18} color="#2F76F6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Promo Banner Card */}
        <View style={styles.promoBanner}>
          <Image
            source={{ uri: isNurse ? 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=500' : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=500' }}
            style={StyleSheet.absoluteFill}
          />
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(47, 118, 246, 0.85)' }]} />
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>{isNurse ? 'Compassionate Care\nAt Your Home' : 'Healthcare at\nYour Fingertips'}</Text>
            <Text style={styles.promoSubtitle}>{isNurse ? 'Book certified nurses instantly' : 'Book premium consultations instantly'}</Text>
          </View>
        </View>

        {/* Discover by Specialties */}
        {!isNurse && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Discover Doctor by Specialties</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.specialtiesScroll}
            >
              {specialtiesToUse.map((spec) => {
                const isSelected = selectedSpecialty === spec.id;
                return (
                  <TouchableOpacity
                    key={spec.id}
                    onPress={() => setSelectedSpecialty(spec.id)}
                    style={[
                      styles.specialtyCard,
                      { borderColor: theme.border, backgroundColor: theme.backgroundElement },
                      isSelected && { borderColor: '#2F76F6', borderWidth: 1.5 },
                    ]}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.specialtyIconWrapper, { backgroundColor: isSelected ? '#EAF0FE' : '#F1F5F9' }]}>
                      {spec.iconType === 'Ionicons' ? (
                        <Ionicons name={spec.iconName} size={24} color={isSelected ? '#2F76F6' : '#6E7682'} />
                      ) : (
                        <MaterialCommunityIcons name={spec.iconName} size={24} color={isSelected ? '#2F76F6' : '#6E7682'} />
                      )}
                    </View>
                    <Text style={[styles.specialtyLabel, { color: theme.text }, isSelected && { fontWeight: 'bold' }]} numberOfLines={1}>
                      {spec.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Special Doctor Near You Header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Special {isNurse ? 'Nurse' : 'Doctor'} Near You</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Doctor List */}
        <View style={styles.doctorListContainer}>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => {
              const isFav = !!favorites[doctor.id];
              return (
                <TouchableOpacity
                  key={doctor.id}
                  style={[styles.doctorListItemCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}
                  onPress={() => onSelectDoctor(doctor)}
                  activeOpacity={0.9}
                >
                  {/* Image Container with Ratings and Favorites overlay */}
                  <View style={styles.doctorCardImageWrapper}>
                    <Image source={{ uri: doctor.image }} style={styles.doctorImage} resizeMode="cover" />
                    
                    <TouchableOpacity
                      style={styles.favoriteBadge}
                      onPress={() => toggleFavorite(doctor.id)}
                      activeOpacity={0.7}
                    >
                      <AntDesign
                        name={(isFav ? 'heart' : 'hearto') as any}
                        size={16}
                        color={isFav ? '#EF4444' : '#6E7682'}
                      />
                    </TouchableOpacity>

                    <View style={styles.ratingBadge}>
                      <FontAwesome name="star" size={10} color="#FFD700" />
                      <Text style={styles.ratingText}>{doctor.rating}</Text>
                      <Text style={styles.reviewsText}>({doctor.reviewCount / 1000}k Reviews)</Text>
                    </View>
                  </View>

                  {/* Doctor Info Details Row */}
                  <View style={styles.doctorCardInfo}>
                    <View style={styles.doctorMainInfo}>
                      <Text style={[styles.doctorName, { color: theme.text }]} numberOfLines={1}>
                        {doctor.name}
                      </Text>
                      {!isNurse && (
                        <Text style={[styles.doctorSpecialty, { color: theme.textSecondary }]} numberOfLines={1}>
                          {doctor.specialty}
                        </Text>
                      )}
                      <Text style={[styles.doctorCredentials, { color: '#8E9AA6' }]} numberOfLines={1}>
                        {doctor.credentials}
                      </Text>
                    </View>
                    <View style={styles.doctorSubInfo}>
                      <Text style={styles.doctorExperienceText}>{doctor.yearsExperience}+ Years</Text>
                      <Text style={styles.doctorLanguagesText}>{doctor.languages}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.noResultsWrapper}>
              <Text style={[styles.noResultsText, { color: theme.textSecondary }]}>No doctors found matching the filter</Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  scrollContent: {
    paddingBottom: Spacing.six,
  },
  searchRow: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'System',
    padding: 0,
  },
  promoBanner: {
    height: 120,
    marginHorizontal: Spacing.four,
    marginTop: Spacing.three,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  promoContent: {
    zIndex: 2,
  },
  promoTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
    lineHeight: 20,
  },
  promoSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 10,
    fontFamily: 'System',
    marginTop: 4,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'System',
    paddingHorizontal: Spacing.four,
    marginBottom: 10,
  },
  specialtiesScroll: {
    paddingHorizontal: Spacing.four,
    gap: 12,
  },
  specialtyCard: {
    width: 82,
    borderWidth: 1,
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    gap: 6,
  },
  specialtyIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialtyLabel: {
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'System',
    textAlign: 'center',
    width: '100%',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    marginTop: 24,
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 11,
    color: '#2F76F6',
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  doctorListContainer: {
    paddingHorizontal: Spacing.four,
    gap: 16,
  },
  doctorListItemCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  doctorCardImageWrapper: {
    height: 180,
    position: 'relative',
    width: '100%',
  },
  doctorImage: {
    width: '100%',
    height: '100%',
  },
  favoriteBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ratingText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1E2229',
    fontFamily: 'System',
  },
  reviewsText: {
    fontSize: 8,
    color: '#6E7682',
    fontFamily: 'System',
  },
  doctorCardInfo: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  doctorMainInfo: {
    flex: 1,
    gap: 2,
  },
  doctorName: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  doctorSpecialty: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'System',
  },
  doctorCredentials: {
    fontSize: 9,
    fontFamily: 'System',
  },
  doctorSubInfo: {
    alignItems: 'flex-end',
    gap: 2,
  },
  doctorExperienceText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2F76F6',
    fontFamily: 'System',
  },
  doctorLanguagesText: {
    fontSize: 9,
    color: '#6E7682',
    fontFamily: 'System',
  },
  noResultsWrapper: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 13,
    fontFamily: 'System',
  },
});
