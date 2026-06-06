import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  SafeAreaView,
} from 'react-native';
import { AntDesign, Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';

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
  languages: string;
  image: string;
  clinicName?: string;
  lastVisitDate?: string;
  upcomingVisitInDays?: number;
}

const INITIAL_MY_DOCTORS: Doctor[] = [
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
    clinicName: 'Brain Health Clinic',
    lastVisitDate: 'May 28, 2026',
    upcomingVisitInDays: 2,
  },
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
    clinicName: 'ENT Care Center',
    lastVisitDate: 'May 12, 2026',
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
    clinicName: 'Ortho Rehab Clinic',
    lastVisitDate: 'Apr 15, 2026',
  },
];

interface MyDoctorsScreenProps {
  onBack: () => void;
  onAddDoctor: () => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export function MyDoctorsScreen({ onBack, onAddDoctor, onSelectDoctor }: MyDoctorsScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    doc_rafiqul: true,
    doc_mehnaz: true,
    doc_zohra: false,
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <AntDesign name="left" size={16} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>My Doctors</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listContainer}>
          {INITIAL_MY_DOCTORS.map((doctor) => {
            const isFav = !!favorites[doctor.id];
            return (
              <TouchableOpacity
                key={doctor.id}
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.backgroundElement,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() => onSelectDoctor(doctor)}
                activeOpacity={0.9}
              >
                {/* Cover Image Container */}
                <View style={styles.imageContainer}>
                  <Image source={{ uri: doctor.image }} style={styles.image} resizeMode="cover" />
                  
                  {/* Floating Favorite Button (Top-Left) */}
                  <TouchableOpacity
                    style={styles.favoriteBadge}
                    onPress={() => toggleFavorite(doctor.id)}
                    activeOpacity={0.7}
                  >
                    <AntDesign
                      name={isFav ? 'heart' : 'hearto'}
                      size={16}
                      color={isFav ? '#EF4444' : '#6E7682'}
                    />
                  </TouchableOpacity>

                  {/* Floating Upcoming Visit Badge (Top-Right) */}
                  {doctor.upcomingVisitInDays !== undefined && (
                    <View style={styles.upcomingBadge}>
                      <Text style={styles.upcomingBadgeText}>
                        In {doctor.upcomingVisitInDays} Days - Upcoming Visit
                      </Text>
                    </View>
                  )}

                  {/* Floating Rating Badge (Bottom-Right) */}
                  <View style={styles.ratingBadge}>
                    <FontAwesome name="star" size={10} color="#FFD700" />
                    <Text style={styles.ratingText}>{doctor.rating}</Text>
                    <Text style={styles.reviewsText}>({doctor.reviewCount / 1000}k)</Text>
                  </View>
                </View>

                {/* Content Info Container */}
                <View style={styles.contentInfo}>
                  <Text style={[styles.docName, { color: theme.text }]} numberOfLines={1}>
                    {doctor.name}
                  </Text>
                  <Text style={[styles.docSpecialty, { color: theme.primary }]} numberOfLines={1}>
                    {doctor.specialty}
                  </Text>
                  <Text style={[styles.docCredentials, { color: theme.textSecondary }]} numberOfLines={1}>
                    {doctor.credentials}
                  </Text>
                </View>

                {/* Bottom Bar Metadatas */}
                <View style={[styles.bottomBar, { borderTopColor: theme.border }]}>
                  <View style={styles.metaItem}>
                    <MaterialCommunityIcons name="hospital-building" size={14} color="#8E9AA6" />
                    <Text style={[styles.metaText, { color: theme.textSecondary }]} numberOfLines={1}>
                      {doctor.clinicName || 'General Clinic'}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Feather name="calendar" size={12} color="#8E9AA6" />
                    <Text style={[styles.metaText, { color: theme.textSecondary }]} numberOfLines={1}>
                      {doctor.lastVisitDate ? `Last: ${doctor.lastVisitDate}` : 'No past visits'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating Action Button (FAB) (Bottom-Right) */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: '#2F76F6' }]}
        onPress={onAddDoctor}
        activeOpacity={0.8}
      >
        <Feather name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
    paddingBottom: 100, // leave space for FAB
  },
  listContainer: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  imageContainer: {
    height: 180,
    position: 'relative',
    width: '100%',
  },
  image: {
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
  upcomingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#2F76F6',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  upcomingBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 12,
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
  contentInfo: {
    padding: 14,
    gap: 2,
  },
  docName: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  docSpecialty: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'System',
  },
  docCredentials: {
    fontSize: 11,
    fontFamily: 'System',
    marginTop: 2,
  },
  bottomBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(241, 245, 249, 0.3)',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  metaText: {
    fontSize: 11,
    fontFamily: 'System',
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2F76F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
});
