import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

// Import all screen components
import { SplashScreen } from '@/screens/splash-screen';
import { OnboardingScreen } from '@/screens/onboarding-screen';
import { FaceVerificationScreen } from '@/screens/face-verification-screen';
import { LoginScreen } from '@/screens/login-screen';
import { SignupScreen } from '@/screens/signup-screen';
import { OTPVerificationScreen } from '@/screens/otp-verification-screen';
import { PricingScreen } from '@/screens/pricing-screen';
import { ProgramSelectionScreen } from '@/screens/program-selection-screen';
import { DiseaseSelectionScreen } from '@/screens/disease-selection-screen';
import { DoctorDetailsScreen } from '@/screens/doctor-details-screen';
import { DoctorSearchScreen } from '@/screens/doctor-search-screen';
import { VideoCallScreen } from '@/screens/video-call-screen';
import { ChatScreen } from '@/screens/chat-screen';
import { DashboardScreen } from '@/screens/dashboard-screen';
import { MedicationsScreen } from '@/screens/medications-screen';
import { LabReportScreen } from '@/screens/lab-report-screen';
import { VitalsScreen } from '@/screens/vitals-screen';
import { AppointmentBookingScreen } from '@/screens/appointment-booking-screen';
import { BookingSuccessScreen } from '@/screens/booking-success-screen';
import { LifestyleWellnessScreen } from '@/screens/lifestyle-wellness-screen';
import { FamilyAccountsScreen } from '@/screens/family-accounts-screen';
import { VaccinationRecordsScreen } from '@/screens/vaccination-records-screen';
import { SmartHealthSummaryScreen } from '@/screens/smart-health-summary-screen';
import { AllergiesScreen } from '@/screens/allergies-screen';
import { MyDoctorsScreen } from '@/screens/my-doctors-screen';

export type AppScreen =
  | 'splash'
  | 'onboarding'
  | 'face-verification'
  | 'login'
  | 'signup'
  | 'otp'
  | 'pricing'
  | 'dashboard'
  | 'program-selection'
  | 'disease-selection'
  | 'doctor-search'
  | 'nurse-search'
  | 'doctor-details'
  | 'video-call'
  | 'chat'
  | 'medications'
  | 'lab-report'
  | 'vitals'
  | 'appointment-booking'
  | 'booking-success'
  | 'lifestyle-wellness'
  | 'family-accounts'
  | 'vaccination-records'
  | 'smart-health-summary'
  | 'allergies'
  | 'my-doctors';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [previousScreen, setPreviousScreen] = useState<AppScreen>('splash');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [bookedDoctors, setBookedDoctors] = useState<Record<string, boolean>>({});

  // Navigation handlers
  const navigateTo = (screen: AppScreen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const goHome = () => {
    setCurrentScreen('dashboard');
  };

  const goBack = () => {
    // Navigate to previous screen based on current screen
    const backNavigation: Record<AppScreen, AppScreen> = {
      'splash': 'splash',
      'onboarding': 'splash',
      'face-verification': 'login',
      'login': 'onboarding',
      'signup': 'login',
      'otp': 'signup',
      'pricing': 'otp',
      'dashboard': 'dashboard',
      'program-selection': 'dashboard',
      'disease-selection': 'program-selection',
      'doctor-search': 'dashboard',
      'nurse-search': 'dashboard',
      'doctor-details': selectedDoctor?.type === 'nurse' ? 'nurse-search' : (previousScreen === 'disease-selection' ? 'disease-selection' : 'doctor-search'),
      'video-call': 'doctor-details',
      'chat': 'video-call',
      'medications': 'dashboard',
      'lab-report': 'dashboard',
      'vitals': 'dashboard',
      'appointment-booking': previousScreen === 'doctor-details' ? 'doctor-details' : (previousScreen === 'disease-selection' ? 'disease-selection' : 'dashboard'),
      'booking-success': 'dashboard',
      'lifestyle-wellness': 'dashboard',
      'family-accounts': 'dashboard',
      'vaccination-records': 'dashboard',
      'smart-health-summary': 'dashboard',
      'allergies': 'dashboard',
      'my-doctors': 'dashboard',
    };
    setCurrentScreen(backNavigation[currentScreen]);
  };

  // Render screens based on current state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <SplashScreen
            onComplete={() => navigateTo('onboarding')}
          />
        );

      case 'onboarding':
        return (
          <OnboardingScreen
            onNext={() => navigateTo('login')}
            onSkip={() => navigateTo('login')}
          />
        );

      case 'face-verification':
        return (
          <FaceVerificationScreen
            onComplete={() => navigateTo('login')}
            onSkip={() => navigateTo('login')}
          />
        );

      case 'login':
        return (
          <LoginScreen
            onLogin={() => navigateTo('pricing')}
            onSignUp={() => navigateTo('signup')}
            onFaceVerification={() => navigateTo('face-verification')}
          />
        );

      case 'signup':
        return (
          <SignupScreen
            onSignUp={() => navigateTo('otp')}
            onBackToLogin={() => navigateTo('login')}
          />
        );

      case 'otp':
        return (
          <OTPVerificationScreen
            onVerify={() => navigateTo('pricing')}
            onBack={goBack}
            phoneNumber="****45"
          />
        );

      case 'pricing':
        return (
          <PricingScreen
            onSelectPlan={(plan) => navigateTo('dashboard')}
          />
        );

      case 'dashboard':
        return (
          <DashboardScreen
            onStartAppointment={() => navigateTo('program-selection')}
            onDirectBooking={() => navigateTo('appointment-booking')}
            onDoctorSearch={() => navigateTo('doctor-search')}
            onNurseSearch={() => navigateTo('nurse-search')}
            onVideoCall={() => navigateTo('video-call')}
            onChat={() => navigateTo('chat')}
            onMedications={() => navigateTo('medications')}
            onLabReport={() => navigateTo('lab-report')}
            onVitals={() => navigateTo('vitals')}
            onLifestyleWellness={() => navigateTo('lifestyle-wellness')}
            onFamilyAccounts={() => navigateTo('family-accounts')}
            onVaccinationRecords={() => navigateTo('vaccination-records')}
            onSmartHealthSummary={() => navigateTo('smart-health-summary')}
            onAllergies={() => navigateTo('allergies')}
            onMyDoctors={() => navigateTo('my-doctors')}
          />
        );

      case 'program-selection':
        return (
          <ProgramSelectionScreen
            onSelectProgram={(program) => navigateTo('disease-selection')}
            onSkip={() => navigateTo('dashboard')}
            onBack={goBack}
          />
        );

      case 'disease-selection':
        return (
          <DiseaseSelectionScreen
            onSelectDiseases={(diseases) => {
              setSelectedDoctor(null);
              navigateTo('appointment-booking');
            }}
            onBack={goBack}
            programName="Chronic Diseases Program"
          />
        );

      case 'doctor-search':
        return (
          <DoctorSearchScreen
            type="doctor"
            onSelectDoctor={(doctor) => {
              setSelectedDoctor({ ...doctor, type: 'doctor' });
              navigateTo('doctor-details');
            }}
            onBack={goBack}
          />
        );

      case 'nurse-search':
        return (
          <DoctorSearchScreen
            type="nurse"
            onSelectDoctor={(nurse) => {
              setSelectedDoctor({ ...nurse, type: 'nurse' });
              navigateTo('doctor-details');
            }}
            onBack={goBack}
          />
        );

      case 'doctor-details':
        return (
          <DoctorDetailsScreen
            type={selectedDoctor?.type || 'doctor'}
            doctor={selectedDoctor || undefined}
            isBooked={selectedDoctor ? !!bookedDoctors[selectedDoctor.id] : false}
            onBookNow={() => {
              const isAlreadyBooked = selectedDoctor ? !!bookedDoctors[selectedDoctor.id] : false;
              if (isAlreadyBooked) {
                navigateTo('video-call');
              } else {
                navigateTo('appointment-booking');
              }
            }}
            onBack={goBack}
          />
        );

      case 'appointment-booking':
        return (
          <AppointmentBookingScreen
            onBook={(details) => {
              if (selectedDoctor && selectedDoctor.id) {
                setBookedDoctors((prev) => ({
                  ...prev,
                  [selectedDoctor.id]: true,
                }));
              }
              navigateTo('booking-success');
            }}
            onBack={goBack}
          />
        );

      case 'booking-success':
        return (
          <BookingSuccessScreen
            onGoHome={goHome}
          />
        );

      case 'video-call':
        return (
          <VideoCallScreen
            onEndCall={() => navigateTo('chat')}
            doctorName="Dr. Emily Davis"
          />
        );

      case 'chat':
        return (
          <ChatScreen
            onEndChat={() => navigateTo('dashboard')}
            onBack={goBack}
            doctorName="Dr. Sarah Martinez"
          />
        );

      case 'medications':
        return (
          <MedicationsScreen
            onBack={goBack}
          />
        );

      case 'lab-report':
        return (
          <LabReportScreen
            onBack={goBack}
          />
        );

      case 'vitals':
        return (
          <VitalsScreen
            onBack={goBack}
          />
        );

      case 'lifestyle-wellness':
        return (
          <LifestyleWellnessScreen
            onBack={goBack}
          />
        );

      case 'family-accounts':
        return (
          <FamilyAccountsScreen
            onBack={goBack}
          />
        );

      case 'vaccination-records':
        return (
          <VaccinationRecordsScreen
            onBack={goBack}
          />
        );

      case 'smart-health-summary':
        return (
          <SmartHealthSummaryScreen
            onBack={goBack}
          />
        );

      case 'allergies':
        return (
          <AllergiesScreen
            onBack={goBack}
          />
        );

      case 'my-doctors':
        return (
          <MyDoctorsScreen
            onBack={goBack}
            onAddDoctor={() => navigateTo('doctor-search')}
            onSelectDoctor={(doctor) => {
              setSelectedDoctor({ ...doctor, type: 'doctor' });
              navigateTo('doctor-details');
            }}
          />
        );

      default:
        return (
          <SplashScreen
            onComplete={() => navigateTo('onboarding')}
          />
        );
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
  },
});
