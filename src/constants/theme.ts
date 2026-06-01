/**
 * Below are the colors and mockup datasets that are used in the Rxbridge app.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1E2229',
    background: '#F8F9FC',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#EBF2FF',
    textSecondary: '#6E7682',
    primary: '#2F76F6',
    primaryDark: '#1A5ECF',
    primaryLight: '#EAF0FE',
    border: '#E2E8F0',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    cardBg: '#FFFFFF',
  },
  dark: {
    text: '#F8F9FC',
    background: '#0D0E12',
    backgroundElement: '#181A20',
    backgroundSelected: '#1E293B',
    textSecondary: '#94A3B8',
    primary: '#3B82F6',
    primaryDark: '#2563EB',
    primaryLight: '#1E293B',
    border: '#334155',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    cardBg: '#181A20',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    serif: 'Georgia',
    rounded: 'System',
    mono: 'CourierNewPSMT',
  },
  default: {
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
  web: {
    sans: 'Inter, system-ui, sans-serif',
    serif: 'Georgia, serif',
    rounded: 'Inter, system-ui, sans-serif',
    mono: 'monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 500; // Designed for mobile aspect ratio

// Mock data matching the Rxbridge PDF wireframes
export const DOCTORS_DATA = [
  {
    id: 'doc1',
    name: 'Dr. Rafiqul Islam',
    specialty: 'Neurologist',
    rating: 4.4,
    reviews: '73K',
    experience: '8+ Years',
    credentials: 'MBBS, MD, Dip, Gynecology',
    languages: ['Eng', 'Arab', 'Hin'],
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    id: 'doc2',
    name: 'Dr. Yasmin Chowdhury',
    specialty: 'Neurologist',
    rating: 4.4,
    reviews: '73K',
    experience: '8+ Years',
    credentials: 'MBBS, MD, Dip, Gynecology',
    languages: ['Eng', 'Arab', 'Hin'],
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 'doc3',
    name: 'Dr. Faisal Ahmed',
    specialty: 'Neurologist',
    rating: 4.5,
    reviews: '48K',
    experience: '6+ Years',
    credentials: 'MBBS, MD, Cardiology',
    languages: ['Eng', 'Beng', 'Hin'],
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
];
 
export const UPCOMING_APPOINTMENT = {
  doctorName: 'Mujahid Yabaal el-Ghattas',
  specialty: 'Neurologist',
  date: "Thus, 8th Sept 24'",
  time: '09:30AM - 10:30AM',
  image: 'https://randomuser.me/api/portraits/men/33.jpg',
};

export const ALERTS_DATA = [
  {
    id: 'alert1',
    type: 'missed',
    title: 'Missed Dose Alert',
    subtitle: '4 days left for the Lipitor',
    actionText: 'Mark as Taken',
    color: '#EF4444',
  },
  {
    id: 'alert2',
    type: 'non-compliance',
    title: 'Non-Compliance Alert',
    subtitle: 'Potential Conflict Detected',
    actionText: 'Contact Now',
    color: '#F59E0B',
  },
];

export const TIPS_DATA = [
  {
    id: 'tip1',
    title: 'Walk 20 minutes today',
    description: 'Porem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 'tip2',
    title: 'Drink more water',
    description: 'Yorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export const TESTIMONIALS_DATA = [
  {
    id: 'test1',
    name: 'Fiza Khan',
    role: 'Neuro Patient',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/49.jpg',
  },
  {
    id: 'test2',
    name: 'Muhammad Ali',
    role: 'Neuro Patient',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/62.jpg',
  },
];

export const PROGRAMS_DATA = [
  'Chronic Diseases Program',
  'Minor Ailments Programs',
  'Travel Health Educator Programs',
  'Preventive Health & Wellness',
  'Device-Based Educator Programs',
  'Addiction & Substance Use Educator Programs',
];

export const CHRONIC_DISEASES_DATA = [
  {
    category: '1.Cardiovascular & Metabolic Diseases',
    items: [
      'Diabetes Mellitus (Type 1 & Type 2)',
      'Hypertension',
      'Dyslipidemia',
      'Coronary Artery Disease',
      'Heart Failure',
      'Stroke Prevention & Post-Stroke Care',
    ],
  },
  {
    category: '2.Respiratory Diseases',
    items: ['Asthma', 'Chronic Obstructive Pulmonary Disease', 'Allergic Rhinitis'],
  },
  {
    category: '3.Mental Health Disorders',
    items: ['Depression', 'Generalized Anxiety Disorder'],
  },
];
