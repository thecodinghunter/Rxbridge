import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Spacing,
  MaxContentWidth,
  DOCTORS_DATA,
  UPCOMING_APPOINTMENT,
  ALERTS_DATA,
  TIPS_DATA,
  TESTIMONIALS_DATA,
  PROGRAMS_DATA,
  CHRONIC_DISEASES_DATA,
} from '@/constants/theme';
import { CustomKeypad } from '@/components/custom-keypad';
import { CircularGauge } from '@/components/circular-gauge';
 
// 100% Universal cross-platform Icon renderer for iOS, Android, and Web using premium vector icons
function Icon({ name, size, color }: { name: string; size: number; color?: string }) {
  const iconColor = color || '#1E2229';
  
  const getVectorIcon = () => {
    switch (name) {
      case 'chevron.left':
        return <Feather name="chevron-left" size={size} color={iconColor} />;
      case 'chevron.right':
        return <Feather name="chevron-right" size={size} color={iconColor} />;
      case 'chevron.up':
        return <Feather name="chevron-up" size={size} color={iconColor} />;
      case 'chevron.down':
        return <Feather name="chevron-down" size={size} color={iconColor} />;
      case 'envelope':
        return <Feather name="mail" size={size} color={iconColor} />;
      case 'lock':
        return <Feather name="lock" size={size} color={iconColor} />;
      case 'eye':
        return <Feather name="eye" size={size} color={iconColor} />;
      case 'calendar':
        return <Feather name="calendar" size={size} color={iconColor} />;
      case 'calendar.badge.plus':
        return <Ionicons name="calendar-outline" size={size} color={iconColor} />;
      case 'bell.fill':
        return <Ionicons name="notifications" size={size} color={iconColor} />;
      case 'pills':
      case 'pills.fill':
        return <MaterialCommunityIcons name="pill" size={size} color={iconColor} />;
      case 'person':
      case 'person.fill':
        return <Ionicons name="person" size={size} color={iconColor} />;
      case 'heart':
      case 'heart.fill':
      case 'heart.text.square.fill':
        return <Ionicons name="heart" size={size} color={iconColor} />;
      case 'star':
      case 'star.fill':
        return <Ionicons name="star" size={size} color={iconColor} />;
      case 'exclamationmark.triangle':
      case 'exclamationmark.triangle.fill':
        return <Feather name="alert-triangle" size={size} color={iconColor} />;
      case 'shield':
      case 'shield.fill':
        return <Feather name="shield" size={size} color={iconColor} />;
      case 'arrow.clockwise':
      case 'arrow.clockwise.circle.fill':
        return <Ionicons name="refresh-circle" size={size} color={iconColor} />;
      case 'checkmark':
        return <Feather name="check" size={size} color={iconColor} />;
      case 'plus':
      case 'plus.circle.fill':
        return <Feather name="plus" size={size} color={iconColor} />;
      case 'magnifyingglass':
        return <Feather name="search" size={size} color={iconColor} />;
      case 'house':
      case 'house.fill':
        return <Feather name="home" size={size} color={iconColor} />;
      case 'doc.plaintext':
      case 'doc.plaintext.fill':
        return <Feather name="file-text" size={size} color={iconColor} />;
      case 'clock':
        return <Feather name="clock" size={size} color={iconColor} />;
      case 'info.circle':
        return <Feather name="info" size={size} color={iconColor} />;
      case 'phone.fill':
        return <Feather name="phone" size={size} color={iconColor} />;
      case 'video.fill':
        return <Feather name="video" size={size} color={iconColor} />;
      case 'faceid':
        return <MaterialCommunityIcons name="face-recognition" size={size} color={iconColor} />;
      case 'delete.left':
        return <Ionicons name="backspace-outline" size={size} color={iconColor} />;
      case 'arrow.right':
        return <Feather name="arrow-right" size={size} color={iconColor} />;
      default:
        return <Feather name="help-circle" size={size} color={iconColor} />;
    }
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', width: size, height: size }}>
      {getVectorIcon()}
    </View>
  );
}

type ScreenId =
  | 'splash'
  | 'onboard1'
  | 'onboard2'
  | 'onboard3'
  | 'login'
  | 'otp'
  | 'signup'
  | 'pricing'
  | 'face_scan'
  | 'dashboard'
  | 'pharmacist_sheet'
  | 'schedule'
  | 'success'
  | 'programs'
  | 'checklist';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [devMenuOpen, setDevMenuOpen] = useState(false);
 
  // Splash Screen auto-transition after 1 second
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboard1');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<'loginEmail' | 'loginPassword' | 'otp' | 'fullName' | 'email' | 'mobile' | 'password' | 'dob' | null>(null);

  // OTP State
  const [otpValue, setOtpValue] = useState(['7', '5', '', '', '', '']);

  // Sign Up / Profile details state
  const [fullName, setFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [dob, setDob] = useState('08/17/1998');

  // Pricing State
  const [pricingTab, setPricingTab] = useState<'basic' | 'premium' | 'super'>('basic');
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  // Scheduler State
  const selectedLanguage = 'English';
  const [callType, setCallType] = useState<'audio' | 'video'>('audio');
  const [selectedDate, setSelectedDate] = useState<number | null>(17);
  const [selectedSlot, setSelectedSlot] = useState<string>('10AM - 10:30AM');
  const [activeTab, setActiveTab] = useState<'home' | 'meds' | 'reports' | 'profile'>('home');

  // Checklist State
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'Diabetes Mellitus (Type 1 & Type 2)': true,
    'Asthma': true,
    'Depression': true,
  });

  // Alerts Active State
  const [activeAlerts, setActiveAlerts] = useState(ALERTS_DATA);

  // Numeric Keypad Handlers
  const handleKeypadPress = (val: string) => {
    if (currentScreen === 'login') {
      if (focusedInput === 'loginEmail') {
        setLoginEmail(prev => prev + val);
      } else if (focusedInput === 'loginPassword') {
        setLoginPassword(prev => prev + val);
      }
    } else if (currentScreen === 'otp') {
      const nextEmptyIndex = otpValue.findIndex(item => item === '');
      if (nextEmptyIndex !== -1) {
        const newOtp = [...otpValue];
        newOtp[nextEmptyIndex] = val;
        setOtpValue(newOtp);
      }
    } else if (currentScreen === 'signup') {
      if (focusedInput === 'mobile') {
        setMobileNumber(prev => prev + val);
      } else if (focusedInput === 'password') {
        setSignUpPassword(prev => prev + val);
      } else if (focusedInput === 'dob') {
        setDob(prev => prev + val);
      }
    }
  };

  const handleKeypadDelete = () => {
    if (currentScreen === 'login') {
      if (focusedInput === 'loginEmail') {
        setLoginEmail(prev => prev.slice(0, -1));
      } else if (focusedInput === 'loginPassword') {
        setLoginPassword(prev => prev.slice(0, -1));
      }
    } else if (currentScreen === 'otp') {
      const lastFilledIndex = [...otpValue].reverse().findIndex(item => item !== '');
      if (lastFilledIndex !== -1) {
        const actualIndex = 5 - lastFilledIndex;
        const newOtp = [...otpValue];
        newOtp[actualIndex] = '';
        setOtpValue(newOtp);
      }
    } else if (currentScreen === 'signup') {
      if (focusedInput === 'mobile') {
        setMobileNumber(prev => prev.slice(0, -1));
      } else if (focusedInput === 'password') {
        setSignUpPassword(prev => prev.slice(0, -1));
      } else if (focusedInput === 'dob') {
        setDob(prev => prev.slice(0, -1));
      }
    }
  };

  // Checkbox toggle
  const toggleCheck = (item: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  // Helper render for header bar of subpages
  const renderSubHeader = (title: string, backTo: ScreenId) => (
    <View style={styles.subHeader}>
      <TouchableOpacity onPress={() => setCurrentScreen(backTo)} style={styles.backButton}>
        <Icon name="chevron.left" size={20} color="#1E2229" />
      </TouchableOpacity>
      <Text style={styles.subHeaderTitle}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );

  // Screens list for Dev selector
  const SCREENS_LIST: { id: ScreenId; label: string }[] = [
    { id: 'splash', label: '1. Splash Screen' },
    { id: 'onboard1', label: '2. Onboarding 1' },
    { id: 'onboard2', label: '3. Onboarding 2' },
    { id: 'onboard3', label: '4. Onboarding 3' },
    { id: 'login', label: '5. Login Screen' },
    { id: 'otp', label: '6. OTP Verification' },
    { id: 'signup', label: '7. Profile Details' },
    { id: 'pricing', label: '8. Unlock Premium' },
    { id: 'face_scan', label: '9. Face Verification' },
    { id: 'dashboard', label: '10. Home Dashboard' },
    { id: 'pharmacist_sheet', label: '11. Pharmacist Sheet' },
    { id: 'schedule', label: '12. Select Schedule' },
    { id: 'success', label: '13. Booking Success' },
    { id: 'programs', label: '14. Programs List' },
    { id: 'checklist', label: '15. Disease Checklist' },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Dev Menu Quick Selector */}
      <View style={styles.devMenuWrapper}>
        <TouchableOpacity
          onPress={() => setDevMenuOpen(!devMenuOpen)}
          style={styles.devMenuPill}>
          <Text style={styles.devMenuText}>
            🔧 Screen: {SCREENS_LIST.find(s => s.id === currentScreen)?.label} (Tap to change)
          </Text>
          <Icon
            name={devMenuOpen ? 'chevron.up' : 'chevron.down'}
            size={12}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        {devMenuOpen && (
          <ScrollView style={styles.devDropdown} nestedScrollEnabled={true}>
            {SCREENS_LIST.map(screen => (
              <TouchableOpacity
                key={screen.id}
                style={[
                  styles.devDropdownItem,
                  currentScreen === screen.id && styles.devDropdownItemActive,
                ]}
                onPress={() => {
                  setCurrentScreen(screen.id);
                  setDevMenuOpen(false);
                }}>
                <Text
                  style={[
                    styles.devDropdownText,
                    currentScreen === screen.id && styles.devDropdownTextActive,
                  ]}>
                  {screen.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/* RENDER ACTIVE SCREEN */}
      <View style={styles.screenContainer}>
        {currentScreen === 'splash' && (
          <LinearGradient
            colors={['#1E5ECF', '#2F76F6', '#60A5FA']}
            style={styles.fullscreen}>
            {/* Simple high fidelity medical grid motif pattern */}
            <View style={styles.patternContainer}>
              <View style={styles.logoCard}>
                {/* Replicated high fidelity Rxbridge logo */}
                <View style={styles.logoHeartIcon}>
                  <View style={styles.leftDoctorBlue} />
                  <View style={styles.rightPatientOrange} />
                  <View style={styles.mortarPestleContainer}>
                    <Icon name="plus" size={24} color="#2F76F6" />
                  </View>
                  <View style={styles.pulseContainer}>
                    <View style={styles.pulseWave} />
                  </View>
                </View>
                <Text style={styles.logoBrandName}>Rxbridge</Text>
                <Text style={styles.logoSubText}>— HealthWatch Pvt. Ltd. —</Text>
              </View>
            </View>
          </LinearGradient>
        )}

        {currentScreen === 'onboard1' && (
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop' }}
            style={styles.fullscreen}
            resizeMode="cover">
            <LinearGradient
              colors={['rgba(30, 94, 207, 0.15)', 'rgba(10, 25, 47, 0.95)']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.onboardContent}>
              <View style={{ flex: 1 }} />
              <Text style={styles.onboardTitle}>
                Healthcare at{'\n'}
                <Text style={styles.blueSpan}>Your Fingertips</Text>
              </Text>
              <Text style={styles.onboardDesc}>
                Book doctors, nurses, and health services anytime from your phone.
              </Text>
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={() => setCurrentScreen('onboard2')}>
                <LinearGradient
                  colors={['#2F76F6', '#1E5ECF']}
                  style={styles.btnPrimaryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Text style={styles.btnText}>Next</Text>
                  <Icon name="arrow.right" size={16} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}

        {currentScreen === 'onboard2' && (
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop' }}
            style={styles.fullscreen}
            resizeMode="cover">
            <LinearGradient
              colors={['rgba(30, 94, 207, 0.15)', 'rgba(10, 25, 47, 0.95)']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.onboardContent}>
              <View style={{ flex: 1 }} />
              <Text style={styles.onboardTitle}>
                Stay on Top of{'\n'}
                <Text style={styles.blueSpan}>Your Health</Text>
              </Text>
              <Text style={styles.onboardDesc}>
                Track medicines, vitals, sleep, stress, and daily wellness in one place.
              </Text>
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={() => setCurrentScreen('onboard3')}>
                <LinearGradient
                  colors={['#2F76F6', '#1E5ECF']}
                  style={styles.btnPrimaryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Text style={styles.btnText}>Next</Text>
                  <Icon name="arrow.right" size={16} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}

        {currentScreen === 'onboard3' && (
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1536064479547-7ee40b904593?q=80&w=600&auto=format&fit=crop' }}
            style={styles.fullscreen}
            resizeMode="cover">
            <LinearGradient
              colors={['rgba(30, 94, 207, 0.15)', 'rgba(10, 25, 47, 0.95)']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.onboardContent}>
              <View style={{ flex: 1 }} />
              <Text style={styles.onboardTitle}>
                Manage Everything{'\n'}
                <Text style={styles.blueSpan}>Securely</Text>
              </Text>
              <Text style={styles.onboardDesc}>
                Store reports, vaccination records, allergies, and family health details securely.
              </Text>
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={() => setCurrentScreen('login')}>
                <LinearGradient
                  colors={['#2F76F6', '#1E5ECF']}
                  style={styles.btnPrimaryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Text style={styles.btnText}>Next</Text>
                  <Icon name="arrow.right" size={16} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}

        {currentScreen === 'login' && (
          <LinearGradient
            colors={['#1E5ECF', '#2F76F6']}
            style={styles.fullscreen}>
            <View style={styles.authTopHeader}>
              <TouchableOpacity style={styles.backCircleBtn} onPress={() => setCurrentScreen('onboard3')}>
                <Icon name="chevron.left" size={16} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.authTitleTop}>Login</Text>
              <View style={{ width: 32 }} />
            </View>

            <View style={styles.authCard}>
              <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 16 }}>
                <Text style={styles.authCardTitle}>Login</Text>

                {/* Form Input fields */}
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setFocusedInput('loginEmail')}
                  style={[styles.inputWrapper, focusedInput === 'loginEmail' && styles.inputWrapperFocused]}>
                  <Icon name="envelope" size={18} color="#8E9AA6" />
                  <TextInput
                    placeholder="Email/Phone"
                    style={styles.inputField}
                    value={loginEmail}
                    onChangeText={setLoginEmail}
                    onFocus={() => setFocusedInput('loginEmail')}
                    showSoftInputOnFocus={false}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setFocusedInput('loginPassword')}
                  style={[styles.inputWrapper, focusedInput === 'loginPassword' && styles.inputWrapperFocused]}>
                  <Icon name="lock" size={18} color="#8E9AA6" />
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.inputField}
                    value={loginPassword}
                    onChangeText={setLoginPassword}
                    onFocus={() => setFocusedInput('loginPassword')}
                    showSoftInputOnFocus={false}
                  />
                  <Icon name="eye" size={18} color="#8E9AA6" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.forgotBtn}>
                  <Text style={styles.forgotBtnTxt}>Forgot password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btnPrimary, { marginTop: 12 }]}
                  onPress={() => setCurrentScreen('otp')}>
                  <LinearGradient
                    colors={['#2F76F6', '#1E5ECF']}
                    style={styles.btnPrimaryGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Text style={styles.btnText}>Sign In</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <View style={styles.authFooterLinkRow}>
                  <Text style={styles.authFooterTxt}>Don’t have an account? </Text>
                  <TouchableOpacity onPress={() => setCurrentScreen('signup')}>
                    <Text style={styles.authFooterLink}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>

              {/* Keypad naturally at the bottom */}
              <View style={styles.cardKeypadWrapper}>
                <CustomKeypad
                  onKeyPress={handleKeypadPress}
                  onDelete={handleKeypadDelete}
                />
              </View>
            </View>
          </LinearGradient>
        )}

        {currentScreen === 'otp' && (
          <LinearGradient
            colors={['#1E5ECF', '#2F76F6']}
            style={styles.fullscreen}>
            <View style={styles.authTopHeader}>
              <TouchableOpacity style={styles.backCircleBtn} onPress={() => setCurrentScreen('login')}>
                <Icon name="chevron.left" size={16} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.authTitleTop}>Verification Code</Text>
              <View style={{ width: 32 }} />
            </View>

            <View style={styles.authCard}>
              <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 16 }}>
                <Text style={styles.authCardTitle}>Verification Code</Text>
                <Text style={styles.otpHelperTxt}>
                  We have sent a verification code to your mobile number ending in *****45.
                </Text>

                {/* Six Digits Box Container */}
                <View style={styles.otpGrid}>
                  {otpValue.map((char, i) => (
                     <View
                      key={i}
                      style={[
                        styles.otpBox,
                        char !== '' && styles.otpBoxFilled,
                        ((char === '' && otpValue.findIndex(v => v === '') === i) || (i === 2 && char === '')) && styles.otpBoxActive,
                      ]}>
                      <Text style={styles.otpBoxTxt}>{char || '-'}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[styles.btnPrimary, { marginTop: Spacing.four }]}
                  onPress={() => setCurrentScreen('signup')}>
                  <LinearGradient
                    colors={['#2F76F6', '#1E5ECF']}
                    style={styles.btnPrimaryGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Text style={styles.btnText}>Sign In</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerTxt}>Or use</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                  style={styles.faceScanBtn}
                  onPress={() => setCurrentScreen('face_scan')}>
                  <Icon name="faceid" size={20} color="#2F76F6" />
                  <Text style={styles.faceScanBtnTxt}>Face Scan</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.resendOtpBtn}>
                  <Text style={styles.resendOtpTxt}>Don’t get OTP? <Text style={styles.resendLink}>Resend OTP!</Text></Text>
                </TouchableOpacity>
              </ScrollView>

              {/* Keypad naturally at the bottom */}
              <View style={styles.cardKeypadWrapper}>
                <CustomKeypad
                  onKeyPress={handleKeypadPress}
                  onDelete={handleKeypadDelete}
                />
              </View>
            </View>
          </LinearGradient>
        )}

        {currentScreen === 'signup' && (
          <LinearGradient
            colors={['#1E5ECF', '#2F76F6']}
            style={styles.fullscreen}>
            <View style={styles.authTopHeader}>
              <TouchableOpacity style={styles.backCircleBtn} onPress={() => setCurrentScreen('otp')}>
                <Icon name="chevron.left" size={16} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.authTitleTop}>Profile Details</Text>
              <View style={{ width: 32 }} />
            </View>

            <View style={styles.authCard}>
              <Text style={styles.authCardTitle}>Profile Details</Text>

              <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {/* Form fields */}
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setFocusedInput('fullName')}
                  style={[styles.inputWrapper, focusedInput === 'fullName' && styles.inputWrapperFocused]}>
                  <TextInput
                    placeholder="Full Name"
                    style={styles.inputField}
                    value={fullName}
                    onChangeText={setFullName}
                    onFocus={() => setFocusedInput('fullName')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setFocusedInput('email')}
                  style={[styles.inputWrapper, focusedInput === 'email' && styles.inputWrapperFocused]}>
                  <Icon name="envelope" size={18} color="#8E9AA6" />
                  <TextInput
                    placeholder="Email"
                    style={styles.inputField}
                    value={signUpEmail}
                    onChangeText={setSignUpEmail}
                    onFocus={() => setFocusedInput('email')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setFocusedInput('mobile')}
                  style={[styles.inputWrapper, focusedInput === 'mobile' && styles.inputWrapperFocused]}>
                  <Icon name="phone" size={18} color="#8E9AA6" />
                  <TextInput
                    placeholder="Mobile Number"
                    style={styles.inputField}
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                    onFocus={() => setFocusedInput('mobile')}
                    showSoftInputOnFocus={false}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setFocusedInput('password')}
                  style={[styles.inputWrapper, focusedInput === 'password' && styles.inputWrapperFocused]}>
                  <Icon name="lock" size={18} color="#8E9AA6" />
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.inputField}
                    value={signUpPassword}
                    onChangeText={setSignUpPassword}
                    onFocus={() => setFocusedInput('password')}
                    showSoftInputOnFocus={false}
                  />
                  <Icon name="eye" size={18} color="#8E9AA6" />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setFocusedInput('dob')}
                  style={[styles.inputWrapper, focusedInput === 'dob' && styles.inputWrapperFocused]}>
                  <TextInput
                    placeholder="Select Date of Birth"
                    style={styles.inputField}
                    value={dob}
                    onChangeText={setDob}
                    onFocus={() => setFocusedInput('dob')}
                    showSoftInputOnFocus={false}
                  />
                  <Icon name="calendar" size={18} color="#8E9AA6" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btnPrimary, { marginTop: Spacing.two }]}
                  onPress={() => setCurrentScreen('pricing')}>
                  <LinearGradient
                    colors={['#2F76F6', '#1E5ECF']}
                    style={styles.btnPrimaryGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Text style={styles.btnText}>Sign Up</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.resendOtpBtn} onPress={() => setCurrentScreen('login')}>
                  <Text style={styles.resendOtpTxt}>Already have an account? <Text style={styles.resendLink}>Login</Text></Text>
                </TouchableOpacity>
              </ScrollView>

              {/* Keypad at the bottom */}
              <View style={styles.cardKeypadWrapper}>
                <CustomKeypad
                  onKeyPress={handleKeypadPress}
                  onDelete={handleKeypadDelete}
                />
              </View>
            </View>
          </LinearGradient>
        )}

        {currentScreen === 'pricing' && (
          <View style={[styles.fullscreen, styles.lightBg]}>
            <View style={styles.priceHeader}>
              <TouchableOpacity style={styles.backCircleBtnGrey} onPress={() => setCurrentScreen('signup')}>
                <Icon name="chevron.left" size={16} color="#1E2229" />
              </TouchableOpacity>
              <Text style={styles.priceHeaderTitle}>Unlock Your{'\n'}<Text style={styles.priceHeaderTitleBold}>Productivity</Text></Text>
              <Text style={styles.priceHeaderSubtitle}>Smart Electronic Health Records.</Text>
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20 }}>
              {/* Tab Selector */}
              <View style={styles.pricingTabs}>
                {(['basic', 'premium', 'super'] as const).map(tab => (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setPricingTab(tab)}
                    style={[styles.pricingTab, pricingTab === tab && styles.pricingTabActive]}>
                    <Text style={[styles.pricingTabTxt, pricingTab === tab && styles.pricingTabTxtActive]}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)} {tab === 'super' && 'Premium'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Benefit Bullet points */}
              <View style={styles.benefitsGrid}>
                {[
                  'Smart medicine reminders',
                  'Detailed health insights & trends',
                  'Track sleep, diet & lifestyle',
                  'Add up to 3 family members',
                  'Priority doctor & nurse booking',
                ].map((benefit, index) => (
                  <View key={index} style={styles.benefitRow}>
                    <View style={styles.benefitCheck}>
                      <Icon name="checkmark" size={10} color="#FFFFFF" />
                    </View>
                    <Text style={styles.benefitTxt}>{benefit}</Text>
                  </View>
                ))}
              </View>

              {/* Plan Options row */}
              <View style={styles.planCardRow}>
                <TouchableOpacity
                  onPress={() => setSelectedPlan('monthly')}
                  style={[styles.planCard, selectedPlan === 'monthly' && styles.planCardActive]}>
                  <View style={styles.planCardCheckRow}>
                    <Text style={styles.planCardTitle}>Monthly</Text>
                    <View style={[styles.planCheckCircle, selectedPlan === 'monthly' && styles.planCheckCircleActive]}>
                      {selectedPlan === 'monthly' && <View style={styles.planCheckDot} />}
                    </View>
                  </View>
                  <Text style={styles.planCardPrice}>$2<Text style={styles.planCardPeriod}>/Monthly</Text></Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSelectedPlan('yearly')}
                  style={[styles.planCard, selectedPlan === 'yearly' && styles.planCardActive]}>
                  <View style={styles.planCardCheckRow}>
                    <View>
                      <Text style={styles.planCardTitle}>Yearly</Text>
                      <View style={styles.offBadge}>
                        <Text style={styles.offBadgeTxt}>-20% OFF</Text>
                      </View>
                    </View>
                    <View style={[styles.planCheckCircle, selectedPlan === 'yearly' && styles.planCheckCircleActive]}>
                      {selectedPlan === 'yearly' && <Icon name="checkmark.circle.fill" size={18} color="#2F76F6" />}
                    </View>
                  </View>
                  <Text style={styles.planCardPrice}>$18<Text style={styles.planCardPeriod}>/Yearly</Text></Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.btnPrimary, { marginTop: 24 }]}
                onPress={() => setCurrentScreen('face_scan')}>
                <LinearGradient
                  colors={['#2F76F6', '#1E5ECF']}
                  style={styles.btnPrimaryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Text style={styles.btnText}>Start 7-day trial</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.restoreBtn}>
                <Text style={styles.restoreBtnTxt}>Restore subscription</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}

        {currentScreen === 'face_scan' && (
          <LinearGradient
            colors={['#1E5ECF', '#2F76F6']}
            style={styles.fullscreen}>
            <View style={styles.authTopHeader}>
              <TouchableOpacity style={styles.backCircleBtn} onPress={() => setCurrentScreen('pricing')}>
                <Icon name="chevron.left" size={16} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.authTitleTop}>Face Verification</Text>
              <View style={{ width: 32 }} />
            </View>

            <View style={styles.faceScanContent}>
              <Text style={styles.faceScanTitle}>Face Verification</Text>
              <Text style={styles.faceScanDesc}>Please look into the camera</Text>

              {/* Camera Scanner bracket viewfinder */}
              <View style={styles.cameraViewfinder}>
                {/* Photo of handsome patient inside scanner */}
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop' }}
                  style={styles.facePhoto}
                />
                {/* Scan box bracket corners */}
                <View style={[styles.scanCorner, styles.cornerTL]} />
                <View style={[styles.scanCorner, styles.cornerTR]} />
                <View style={[styles.scanCorner, styles.cornerBL]} />
                <View style={[styles.scanCorner, styles.cornerBR]} />
              </View>

              <Text style={styles.facePercentTxt}>30% Face Recognized</Text>
              {/* Glowing blue progress bar */}
              <View style={styles.progressBarBg}>
                <View style={styles.progressBarFill} />
              </View>

              <TouchableOpacity
                style={[styles.btnPrimary, { marginTop: 40, alignSelf: 'stretch', marginHorizontal: 24 }]}
                onPress={() => setCurrentScreen('dashboard')}>
                <LinearGradient
                  colors={['#2F76F6', '#1E5ECF']}
                  style={styles.btnPrimaryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Text style={styles.btnText}>Authenticate</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        )}

        {currentScreen === 'dashboard' && (
          <View style={[styles.fullscreen, styles.lightBg]}>
            {/* Dashboard Header with rich LinearGradient */}
            <LinearGradient
              colors={['#1E5ECF', '#2F76F6']}
              style={styles.dashHeaderGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <View style={styles.dashHeaderContent}>
                <View>
                  <Text style={styles.dashHelloWhite}>Hello,</Text>
                  <Text style={styles.dashNameWhite}>Ramesh Patel!</Text>
                </View>

                <View style={styles.dashActionBadgeWhite}>
                  <TouchableOpacity style={styles.dashBellBtnWhite}>
                    <Icon name="bell.fill" size={18} color="#FFFFFF" />
                    <View style={styles.bellDot} />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop' }}
                    style={styles.dashAvatar}
                  />
                </View>
              </View>
            </LinearGradient>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: Spacing.six }}>
              {/* Appointment Category quick selector */}
              <View style={styles.dashSectionRow}>
                <Text style={styles.dashSectionTitle}>Appointment</Text>
              </View>

              <View style={styles.categoryGrid}>
                <TouchableOpacity
                  style={styles.categoryCard}
                  onPress={() => setCurrentScreen('pharmacist_sheet')}>
                  <View style={[styles.categoryIconCircle, { backgroundColor: '#EBF2FF' }]}>
                    <Image source={require('@/assets/images/pharmacist_icon.png')} style={{ width: 36, height: 36 }} contentFit="contain" />
                  </View>
                  <Text style={styles.categoryCardTxt}>Clinical{'\n'}Pharmacist</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.categoryCard} onPress={() => setCurrentScreen('schedule')}>
                  <View style={[styles.categoryIconCircle, { backgroundColor: '#FEE2E2' }]}>
                    <Image source={require('@/assets/images/doctor_icon.png')} style={{ width: 36, height: 36 }} contentFit="contain" />
                  </View>
                  <Text style={styles.categoryCardTxt}>Doctor</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.categoryCard} onPress={() => setCurrentScreen('schedule')}>
                  <View style={[styles.categoryIconCircle, { backgroundColor: '#ECFDF5' }]}>
                    <Image source={require('@/assets/images/nurse_icon.png')} style={{ width: 36, height: 36 }} contentFit="contain" />
                  </View>
                  <Text style={styles.categoryCardTxt}>Nurse</Text>
                </TouchableOpacity>
              </View>

              {/* Upcoming Appointment */}
              <View style={styles.dashSectionRow}>
                <Text style={styles.dashSectionTitle}>Upcoming Appointment</Text>
                <TouchableOpacity onPress={() => setCurrentScreen('programs')}>
                  <Text style={styles.seeAllTxt}>See all</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.upcomingCard}>
                <View style={styles.upcomingHeaderRow}>
                  <Image source={{ uri: UPCOMING_APPOINTMENT.image }} style={styles.upcomingAvatar} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.upcomingName}>{UPCOMING_APPOINTMENT.doctorName}</Text>
                    <Text style={styles.upcomingSpecialty}>{UPCOMING_APPOINTMENT.specialty}</Text>
                  </View>
                  <TouchableOpacity style={styles.viewDetailsBtn} onPress={() => setCurrentScreen('schedule')}>
                    <Text style={styles.viewDetailsTxt}>View Details</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.upcomingDivider} />

                <View style={styles.upcomingDateRow}>
                  <View style={styles.upcomingDateCol}>
                    <Icon name="calendar" size={14} color="#6E7682" />
                    <Text style={styles.upcomingDateTxt}>{UPCOMING_APPOINTMENT.date}</Text>
                  </View>
                  <View style={styles.upcomingDividerVertical} />
                  <View style={styles.upcomingDateCol}>
                    <Icon name="clock" size={14} color="#6E7682" />
                    <Text style={styles.upcomingDateTxt}>{UPCOMING_APPOINTMENT.time}</Text>
                  </View>
                </View>
              </View>

              {/* My Health Information */}
              <View style={styles.dashSectionRow}>
                <Text style={styles.dashSectionTitle}>My Health Information</Text>
              </View>

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.healthInfoScroll}>
                {[
                  { name: 'Medications', img: require('@/assets/images/meds_icon.png') },
                  { name: 'Lab report', img: require('@/assets/images/report_icon.png') },
                  { name: 'Vital', img: require('@/assets/images/vital_icon.png') },
                ].map((item, i) => (
                  <TouchableOpacity key={i} style={styles.healthInfoCard}>
                    <View style={styles.healthInfoIconWrapper}>
                      <Image source={item.img} style={{ width: 28, height: 28 }} contentFit="contain" />
                    </View>
                    <Text style={styles.healthInfoTxt}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Health Summary speedometer widget with blue buttons */}
              <View style={styles.gaugeSectionRow}>
                <View style={styles.gaugeContainerCard}>
                  <Text style={styles.gaugeCardTitle}>Health Summary</Text>
                  <CircularGauge value={65} />
                </View>

                <View style={styles.gaugeStackedButtons}>
                  <TouchableOpacity style={styles.gaugeStackBtn} onPress={() => setCurrentScreen('programs')}>
                    <LinearGradient
                      colors={['#2F76F6', '#1E5ECF']}
                      style={styles.gaugeStackBtnGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}>
                      <Text style={styles.gaugeStackBtnTxt}>My Doctor</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.gaugeStackBtn} onPress={() => setCurrentScreen('programs')}>
                    <LinearGradient
                      colors={['#2F76F6', '#1E5ECF']}
                      style={styles.gaugeStackBtnGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}>
                      <Text style={styles.gaugeStackBtnTxt}>My Lab</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.gaugeStackBtn} onPress={() => setCurrentScreen('programs')}>
                    <LinearGradient
                      colors={['#2F76F6', '#1E5ECF']}
                      style={styles.gaugeStackBtnGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}>
                      <Text style={styles.gaugeStackBtnTxt}>My Pharmacist</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Special Doctor Near You */}
              <View style={styles.dashSectionRow}>
                <Text style={styles.dashSectionTitle}>Special Doctor Near You</Text>
              </View>

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.docsHorizontalScroll}>
                {DOCTORS_DATA.map((doc, idx) => (
                  <View key={idx} style={styles.docMiniCard}>
                    <Image source={{ uri: doc.image }} style={styles.docMiniAvatar} contentFit="cover" />
                    <View style={styles.docRatingBadge}>
                      <Icon name="star.fill" size={10} color="#F59E0B" />
                      <Text style={styles.docRatingTxt}>{doc.rating}</Text>
                    </View>
                    <Text style={styles.docReviewsCount}>{doc.reviews} Reviews</Text>
                    <Text style={styles.docMiniName} numberOfLines={1}>{doc.name}</Text>
                    <Text style={styles.docMiniSpecialty}>{doc.specialty} • {doc.experience}</Text>
                    <Text style={styles.docMiniCredentials} numberOfLines={1}>{doc.credentials}</Text>
                    <View style={styles.langPillsRow}>
                      {doc.languages.map((l, li) => (
                        <View key={li} style={styles.langPill}>
                          <Text style={styles.langPillTxt}>{l}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </ScrollView>

              {/* Alerts */}
              {activeAlerts.length > 0 && (
                <>
                  <View style={styles.dashSectionRow}>
                    <Text style={styles.dashSectionTitle}>Alerts</Text>
                  </View>
                  {activeAlerts.map(alert => (
                    <View key={alert.id} style={styles.alertCard}>
                      <View style={styles.alertIconCircle}>
                        <Icon
                          name={alert.type === 'missed' ? 'pills.fill' : 'exclamationmark.triangle.fill'}
                          size={18}
                          color={alert.color}
                        />
                      </View>
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.alertTitle}>{alert.title}</Text>
                        <Text style={styles.alertSub}>{alert.subtitle}</Text>
                      </View>
                      <TouchableOpacity
                        style={[styles.alertActionBtn, { backgroundColor: alert.type === 'missed' ? '#FEE2E2' : '#FEF3C7' }]}
                        onPress={() => {
                          if (alert.type === 'missed') {
                            // Resolve/remove missed dose alert on tap
                            setActiveAlerts(prev => prev.filter(a => a.id !== alert.id));
                          }
                        }}>
                        <Text style={[styles.alertActionTxt, { color: alert.color }]}>{alert.actionText}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              )}

              {/* Take Action */}
              <View style={styles.dashSectionRow}>
                <Text style={styles.dashSectionTitle}>Take Action</Text>
              </View>

              <View style={styles.actionCard}>
                <View style={styles.actionIconCircle}>
                  <Icon name="clock" size={20} color="#2F76F6" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.actionTitle}>Refill Reminder</Text>
                  <Text style={styles.actionSub}>Porem ipsum dolor sit amet, consectet...</Text>
                </View>
                <TouchableOpacity style={styles.actionBtn} onPress={() => setCurrentScreen('programs')}>
                  <Text style={styles.actionBtnTxt}>Refill Now</Text>
                </TouchableOpacity>
              </View>

              {/* Preventative Tips */}
              <View style={styles.dashSectionRow}>
                <Text style={styles.dashSectionTitle}>Preventative Tip</Text>
              </View>

              {TIPS_DATA.map(tip => (
                <View key={tip.id} style={styles.tipCard}>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.tipDesc}>{tip.description}</Text>
                </View>
              ))}

              {/* Testimonials */}
              <View style={styles.dashSectionRow}>
                <Text style={styles.dashSectionTitle}>Testimonial</Text>
                <TouchableOpacity onPress={() => setCurrentScreen('programs')}>
                  <Text style={styles.seeAllTxt}>See All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.testimonialScroll}>
                {TESTIMONIALS_DATA.map((test, index) => (
                  <View key={index} style={styles.testimonialCard}>
                    <View style={styles.testimonialHeader}>
                      <Image source={{ uri: test.image }} style={styles.testimonialAvatar} contentFit="cover" />
                      <View style={{ marginLeft: 10 }}>
                        <Text style={styles.testimonialName}>{test.name}</Text>
                        <Text style={styles.testimonialRole}>{test.role}</Text>
                      </View>
                    </View>
                    <View style={styles.starRow}>
                      {Array.from({ length: test.rating }).map((_, si) => (
                        <Icon key={si} name="star.fill" size={10} color="#F59E0B" />
                      ))}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </ScrollView>

            {/* Custom Bottom Tab Bar */}
            <View style={styles.bottomTabBar}>
              {[
                { key: 'home', label: 'Home', icon: 'house.fill' },
                { key: 'meds', label: 'Meds', icon: 'pills.fill' },
                { key: 'reports', label: 'Charts', icon: 'doc.plaintext.fill' },
                { key: 'profile', label: 'Profile', icon: 'person.fill' },
              ].map(tab => {
                const isSelected = activeTab === tab.key;
                return (
                  <TouchableOpacity
                    key={tab.key}
                    onPress={() => setActiveTab(tab.key as any)}
                    style={[styles.bottomTabItem, isSelected && styles.bottomTabItemActive]}>
                    {isSelected ? (
                      <View style={styles.activeTabPill}>
                        <Icon name={tab.icon} size={16} color="#FFFFFF" />
                        <Text style={styles.activeTabLabel}>{tab.label}</Text>
                      </View>
                    ) : (
                      <Icon name={tab.icon} size={20} color="#8E9AA6" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {currentScreen === 'pharmacist_sheet' && (
          <View style={[styles.fullscreen, styles.lightBg]}>
            {/* Dashboard renders underneath blurred / dimmed */}
            <View style={[styles.fullscreen, { opacity: 0.25, pointerEvents: 'none' }]}>
              {/* Dummy copy of dashboard */}
              <View style={styles.dashHeader}>
                <Text style={styles.dashName}>Ramesh Patel!</Text>
              </View>
            </View>

            {/* Slide up Sheet modal container */}
            <View style={styles.sheetOverlayContainer}>
              <View style={styles.sheetHandle} />

              <Text style={styles.sheetTitle}>Clinical Pharmacist Appointment Type</Text>
              <Text style={styles.sheetDesc}>
                Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
              </Text>

              <View style={styles.sheetButtonsRow}>
                <TouchableOpacity
                  style={styles.sheetButton}
                  onPress={() => setCurrentScreen('schedule')}>
                  <Text style={styles.sheetButtonTxt}>Appointment</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.sheetButton, styles.sheetButtonPrimary]}
                  onPress={() => setCurrentScreen('schedule')}>
                  <Text style={[styles.sheetButtonTxt, styles.sheetButtonTxtPrimary]}>Premium Appointment</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {currentScreen === 'schedule' && (
          <View style={[styles.fullscreen, styles.lightBg]}>
            {renderSubHeader('Select Schedule', 'dashboard')}

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
              {/* Language Dropdown */}
              <Text style={styles.scheduleLabel}>Select Preferred Language</Text>
              <View style={styles.dropdownSelector}>
                <Text style={styles.dropdownVal}>{selectedLanguage}</Text>
                <Icon name="chevron.down" size={16} color="#6E7682" />
              </View>

              {/* Call Type selector */}
              <Text style={styles.scheduleLabel}>Select Call Type</Text>
              <View style={styles.callTypeRow}>
                <TouchableOpacity
                  onPress={() => setCallType('audio')}
                  style={[styles.callTypeBtn, callType === 'audio' && styles.callTypeBtnActive]}>
                  <Icon name="phone.fill" size={14} color={callType === 'audio' ? '#FFFFFF' : '#6E7682'} />
                  <Text style={[styles.callTypeBtnTxt, callType === 'audio' && styles.callTypeBtnTxtActive]}>Audio Call</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setCallType('video')}
                  style={[styles.callTypeBtn, callType === 'video' && styles.callTypeBtnActive]}>
                  <Icon name="video.fill" size={14} color={callType === 'video' ? '#FFFFFF' : '#6E7682'} />
                  <Text style={[styles.callTypeBtnTxt, callType === 'video' && styles.callTypeBtnTxtActive]}>Video call</Text>
                </TouchableOpacity>
              </View>

              {/* Calendar date selector picker */}
              <Text style={styles.scheduleLabel}>Select Date</Text>
              <View style={styles.datePickerInput}>
                <Text style={styles.datePickerVal}>08/17/2025</Text>
                <Icon name="calendar" size={18} color="#2F76F6" />
              </View>
              <Text style={styles.dateFormatHelp}>MM/DD/YYYY</Text>

              {/* Inline Full Calendar Picker */}
              <View style={styles.calendarContainer}>
                <View style={styles.calendarHeaderRow}>
                  <TouchableOpacity>
                    <Icon name="chevron.left" size={18} color="#1E2229" />
                  </TouchableOpacity>
                  <Text style={styles.calendarMonthTitle}>Aug</Text>
                  <TouchableOpacity>
                    <Icon name="chevron.right" size={18} color="#1E2229" />
                  </TouchableOpacity>

                  <View style={{ width: 24 }} />

                  <TouchableOpacity>
                    <Icon name="chevron.left" size={18} color="#1E2229" />
                  </TouchableOpacity>
                  <Text style={styles.calendarMonthTitle}>2025</Text>
                  <TouchableOpacity>
                    <Icon name="chevron.right" size={18} color="#1E2229" />
                  </TouchableOpacity>
                </View>

                {/* Days initials row */}
                <View style={styles.calendarWeekdays}>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                    <Text key={idx} style={styles.weekdayTxt}>{day}</Text>
                  ))}
                </View>

                {/* Calendar grid numbers */}
                <View style={styles.calendarGrid}>
                  {[
                    26, 27, 28, 29, 30, 31, 1,
                    2, 3, 4, 5, 6, 7, 8,
                    9, 10, 11, 12, 13, 14, 15,
                    16, 17, 18, 19, 20, 21, 22,
                    23, 24, 25, 26, 27, 28, 29,
                    30, 1, 2, 3, 4, 5, 6,
                  ].map((date, idx) => {
                    const isAugDate = idx >= 6 && idx <= 36;
                    const isSelected = selectedDate === date && isAugDate;
                    return (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => isAugDate && setSelectedDate(date)}
                        style={[
                          styles.calendarDayCell,
                          isSelected && styles.calendarDayCellSelected,
                        ]}>
                        <Text
                          style={[
                            styles.calendarDayTxt,
                            !isAugDate && styles.calendarDayGrey,
                            isSelected && styles.calendarDayTxtSelected,
                          ]}>
                          {date}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View style={styles.calendarActionRow}>
                  <TouchableOpacity><Text style={styles.calCancelTxt}>Cancel</Text></TouchableOpacity>
                  <TouchableOpacity><Text style={styles.calOkTxt}>OK</Text></TouchableOpacity>
                </View>
              </View>

              {/* Time Slots grid */}
              <Text style={styles.scheduleLabel}>Select Slot</Text>
              <View style={styles.slotsGrid}>
                {[
                  '10AM - 10:30AM',
                  '10:30AM - 11AM',
                  '11AM - 11:30AM',
                  '12PM - 12:30PM',
                  '1:00PM - 1:30PM',
                  '2:00PM - 2:30PM',
                ].map(slot => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <TouchableOpacity
                      key={slot}
                      onPress={() => setSelectedSlot(slot)}
                      style={[styles.slotBtn, isSelected && styles.slotBtnActive]}>
                      <Text style={[styles.slotBtnTxt, isSelected && styles.slotBtnTxtActive]}>{slot}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Session duration Notes */}
              <Text style={styles.scheduleLabel}>Notes</Text>
              <Text style={styles.sessionNotes}>
                Each session is limited to 30 minutes. To extend the session duration, please upgrade your plan.
              </Text>

              <TouchableOpacity
                style={[styles.btnPrimary, { marginTop: 24 }]}
                onPress={() => setCurrentScreen('success')}>
                <LinearGradient
                  colors={['#2F76F6', '#1E5ECF']}
                  style={styles.btnPrimaryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Text style={styles.btnText}>Book Now</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}

        {currentScreen === 'success' && (
          <View style={[styles.fullscreen, styles.lightBg, styles.successWrapper]}>
            <View style={styles.successIconCircle}>
              <Icon name="calendar.badge.plus" size={48} color="#2F76F6" />
              <View style={styles.successPlusBadge}>
                <Icon name="plus.circle.fill" size={24} color="#10B981" />
              </View>
            </View>

            <Text style={styles.successHeading}>Thank you for your booking.</Text>
            <Text style={styles.bookingIdTxt}>Booking ID : BM000251</Text>
            <Text style={styles.successSub}>
              Your session has been successfully scheduled. Please join at your selected date and time.
            </Text>

            <TouchableOpacity
              style={[styles.btnPrimary, { width: '80%', marginTop: 40 }]}
              onPress={() => setCurrentScreen('programs')}>
              <LinearGradient
                colors={['#2F76F6', '#1E5ECF']}
                style={styles.btnPrimaryGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text style={styles.btnText}>Go to Home Page</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {currentScreen === 'programs' && (
          <View style={[styles.fullscreen, styles.lightBg]}>
            {renderSubHeader('Select Schedule', 'dashboard')}

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20 }}>
              <View style={styles.programsListWrapper}>
                {PROGRAMS_DATA.map((prog, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.programListItem}
                    onPress={() => prog.includes('Chronic') && setCurrentScreen('checklist')}>
                    <Text style={styles.programListItemTxt}>{prog}</Text>
                    <Icon name="chevron.right" size={16} color="#8E9AA6" />
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.programsFooterRow}>
                <TouchableOpacity
                  style={styles.programsSkipBtn}
                  onPress={() => setCurrentScreen('dashboard')}>
                  <Text style={styles.programsSkipTxt}>Skip</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.programsNextBtn}
                  onPress={() => setCurrentScreen('checklist')}>
                  <LinearGradient
                    colors={['#2F76F6', '#1E5ECF']}
                    style={[styles.btnPrimaryGradient, { paddingVertical: 14, borderRadius: 12 }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Text style={styles.programsNextTxt}>Next</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}

        {currentScreen === 'checklist' && (
          <View style={[styles.fullscreen, styles.lightBg]}>
            {renderSubHeader('Chronic Diseases Program', 'programs')}

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
              {/* Search Bar */}
              <View style={styles.searchBarWrapper}>
                <Icon name="magnifyingglass" size={16} color="#8E9AA6" />
                <TextInput
                  placeholder="Search ..."
                  style={styles.searchBarInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              {/* Hierarchical Checklist groups */}
              {CHRONIC_DISEASES_DATA.map((group, groupIdx) => (
                <View key={groupIdx} style={styles.checklistGroup}>
                  <Text style={styles.checklistGroupTitle}>{group.category}</Text>

                  {group.items
                    .filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((item, itemIdx) => {
                      const isChecked = !!checkedItems[item];
                      return (
                        <TouchableOpacity
                          key={itemIdx}
                          onPress={() => toggleCheck(item)}
                          style={styles.checkListItem}>
                          <View style={[styles.customCheck, isChecked && styles.customCheckActive]}>
                            {isChecked && (
                              <Icon name="checkmark" size={10} color="#FFFFFF" />
                            )}
                          </View>
                          <Text style={[styles.checkListItemTxt, isChecked && styles.checkListItemTxtActive]}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                </View>
              ))}

              <TouchableOpacity
                style={[styles.btnPrimary, { marginTop: 32 }]}
                onPress={() => setCurrentScreen('success')}>
                <LinearGradient
                  colors={['#2F76F6', '#1E5ECF']}
                  style={styles.btnPrimaryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Text style={styles.btnText}>Book Now</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  devMenuWrapper: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    alignSelf: 'center',
    zIndex: 9999,
    width: '90%',
    maxWidth: MaxContentWidth,
  },
  devMenuPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E2229',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  devMenuText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  devDropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 6,
    maxHeight: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  devDropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  devDropdownItemActive: {
    backgroundColor: '#EBF2FF',
  },
  devDropdownText: {
    fontSize: 12,
    color: '#6E7682',
    fontWeight: '500',
    fontFamily: 'System',
  },
  devDropdownTextActive: {
    color: '#2F76F6',
    fontWeight: 'bold',
  },
  screenContainer: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    height: '100%',
    position: 'relative',
  },
  fullscreen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  splashBg: {
    backgroundColor: '#2F76F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  logoHeartIcon: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  leftDoctorBlue: {
    width: 40,
    height: 80,
    backgroundColor: '#2F76F6',
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    position: 'absolute',
    left: 0,
  },
  rightPatientOrange: {
    width: 40,
    height: 80,
    backgroundColor: '#F59E0B',
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    position: 'absolute',
    right: 0,
  },
  mortarPestleContainer: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    top: 24,
  },
  pulseContainer: {
    position: 'absolute',
    bottom: 12,
  },
  pulseWave: {
    width: 28,
    height: 2,
    backgroundColor: '#1E2229',
  },
  logoBrandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E2229',
    marginTop: 16,
    fontFamily: 'System',
  },
  logoSubText: {
    fontSize: 9,
    fontWeight: '500',
    color: '#8E9AA6',
    marginTop: 4,
    fontFamily: 'System',
  },
  splashContinueBtn: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    elevation: 4,
  },
  splashContinueBtnTxt: {
    color: '#2F76F6',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  onboardContent: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingBottom: 60,
    justifyContent: 'flex-end',
  },
  onboardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 34,
    fontFamily: 'System',
  },
  blueSpan: {
    color: '#2F76F6',
  },
  onboardDesc: {
    fontSize: 13,
    color: '#E2E8F0',
    marginTop: Spacing.two,
    marginBottom: Spacing.four,
    lineHeight: 18,
    fontFamily: 'System',
  },
  btnPrimary: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#2F76F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  btnPrimaryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
    width: '100%',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  blueBg: {
    backgroundColor: '#2F76F6',
  },
  lightBg: {
    backgroundColor: '#F8F9FC',
  },
  authTopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 110 : 80,
    paddingBottom: 20,
  },
  backCircleBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backCircleBtnGrey: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authTitleTop: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  authCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 28,
    flex: 1,
  },
  authCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E2229',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'System',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'web' ? 12 : 8,
    marginBottom: 14,
    backgroundColor: '#F8F9FC',
    gap: 10,
  },
  inputWrapperFocused: {
    borderColor: '#2F76F6',
    backgroundColor: '#FFFFFF',
  },
  inputField: {
    flex: 1,
    fontSize: 13,
    color: '#1E2229',
    paddingVertical: 4,
    fontFamily: 'System',
    outlineStyle: 'none', // For web view removes default blue outline
  } as any,
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.three,
  },
  forgotBtnTxt: {
    fontSize: 11,
    color: '#2F76F6',
    fontWeight: '500',
    fontFamily: 'System',
  },
  authFooterLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  authFooterTxt: {
    fontSize: 12,
    color: '#6E7682',
    fontFamily: 'System',
  },
  authFooterLink: {
    fontSize: 12,
    color: '#2F76F6',
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  cardKeypadWrapper: {
    width: '100%',
    marginTop: 'auto',
  },
  otpHelperTxt: {
    fontSize: 12,
    color: '#6E7682',
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'System',
  },
  otpGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  otpBox: {
    width: 44,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8F9FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxFilled: {
    borderColor: '#E2E8F0',
  },
  otpBoxActive: {
    borderColor: '#2F76F6',
    backgroundColor: '#FFFFFF',
  },
  otpBoxTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E2229',
    fontFamily: 'System',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 10,
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#E2E8F0',
    flex: 1,
  },
  dividerTxt: {
    fontSize: 10,
    color: '#8E9AA6',
    fontFamily: 'System',
  },
  faceScanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EBF2FF',
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: '#F8F9FC',
    gap: 8,
  },
  faceScanBtnTxt: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2F76F6',
    fontFamily: 'System',
  },
  resendOtpBtn: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  resendOtpTxt: {
    fontSize: 11,
    color: '#6E7682',
    fontFamily: 'System',
  },
  resendLink: {
    color: '#2F76F6',
    fontWeight: 'bold',
  },
  priceHeader: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 110 : 80,
    paddingBottom: 16,
  },
  priceHeaderTitle: {
    fontSize: 28,
    color: '#1E2229',
    lineHeight: 32,
    marginTop: 12,
    fontFamily: 'System',
  },
  priceHeaderTitleBold: {
    fontWeight: 'bold',
    color: '#2F76F6',
  },
  priceHeaderSubtitle: {
    fontSize: 12,
    color: '#6E7682',
    marginTop: 4,
    fontFamily: 'System',
  },
  pricingTabs: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
    padding: 2,
    marginVertical: 14,
  },
  pricingTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 18,
  },
  pricingTabActive: {
    backgroundColor: '#2F76F6',
  },
  pricingTabTxt: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6E7682',
    fontFamily: 'System',
  },
  pricingTabTxtActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  benefitsGrid: {
    gap: 10,
    marginVertical: 12,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  benefitCheck: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2F76F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitTxt: {
    fontSize: 12,
    color: '#1E2229',
    fontFamily: 'System',
  },
  planCardRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  planCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  planCardActive: {
    borderColor: '#2F76F6',
    backgroundColor: '#EBF2FF',
  },
  planCardCheckRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  planCheckCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planCheckCircleActive: {
    borderColor: 'transparent',
  },
  planCheckDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2F76F6',
  },
  planCardTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#6E7682',
    fontFamily: 'System',
  },
  planCardPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E2229',
    fontFamily: 'System',
  },
  planCardPeriod: {
    fontSize: 10,
    fontWeight: 'normal',
    color: '#6E7682',
  },
  offBadge: {
    backgroundColor: '#10B981',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    marginTop: 2,
  },
  offBadgeTxt: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  restoreBtn: {
    alignSelf: 'center',
    marginVertical: 16,
  },
  restoreBtnTxt: {
    fontSize: 11,
    color: '#6E7682',
    fontFamily: 'System',
  },
  faceScanContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    alignItems: 'center',
  },
  faceScanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E2229',
    fontFamily: 'System',
  },
  faceScanDesc: {
    fontSize: 12,
    color: '#6E7682',
    marginTop: 4,
    marginBottom: 28,
    fontFamily: 'System',
  },
  cameraViewfinder: {
    width: 200,
    height: 200,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  facePhoto: {
    width: 170,
    height: 170,
    borderRadius: 85,
  },
  scanCorner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: '#2F76F6',
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  facePercentTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E2229',
    marginTop: 28,
    fontFamily: 'System',
  },
  progressBarBg: {
    width: '75%',
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '30%',
    height: '100%',
    backgroundColor: '#2F76F6',
    borderRadius: 3,
  },
  dashHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 100 : 70,
    paddingBottom: 16,
  },
  dashHeaderGradient: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 70 : 50,
    paddingBottom: 24,
    elevation: 4,
    shadowColor: '#1E5ECF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  dashHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dashHello: {
    fontSize: 12,
    color: '#6E7682',
    fontFamily: 'System',
  },
  dashHelloWhite: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'System',
  },
  dashName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E2229',
    fontFamily: 'System',
  },
  dashNameWhite: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'System',
    marginTop: 2,
  },
  dashActionBadgeWhite: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    padding: 4,
    gap: 8,
  },
  dashBellBtnWhite: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  gaugeStackBtnGradient: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  dashActionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 4,
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dashBellBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bellDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
    position: 'absolute',
    top: 6,
    right: 6,
  },
  dashAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  dashSectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 10,
  },
  dashSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E2229',
    fontFamily: 'System',
  },
  seeAllTxt: {
    fontSize: 11,
    color: '#2F76F6',
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  categoryIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryCardTxt: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1E2229',
    textAlign: 'center',
    lineHeight: 12,
    fontFamily: 'System',
  },
  upcomingCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  upcomingHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upcomingAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  upcomingName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E2229',
    fontFamily: 'System',
  },
  upcomingSpecialty: {
    fontSize: 9,
    color: '#6E7682',
    fontFamily: 'System',
  },
  viewDetailsBtn: {
    backgroundColor: '#EBF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  viewDetailsTxt: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#2F76F6',
  },
  upcomingDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  upcomingDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upcomingDateCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  upcomingDateTxt: {
    fontSize: 10,
    color: '#6E7682',
    fontFamily: 'System',
  },
  upcomingDividerVertical: {
    width: 1,
    height: 12,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 8,
  },
  healthInfoScroll: {
    paddingLeft: 20,
    marginVertical: 4,
  },
  healthInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minWidth: 120,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  healthInfoIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F8F9FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthInfoTxt: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E2229',
    fontFamily: 'System',
  },
  gaugeSectionRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    gap: 12,
    marginTop: 18,
  },
  gaugeContainerCard: {
    flex: 1.2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  gaugeCardTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1E2229',
    fontFamily: 'System',
    marginBottom: 4,
  },
  gaugeStackedButtons: {
    flex: 1,
    justifyContent: 'space-between',
  },
  gaugeStackBtn: {
    backgroundColor: '#2F76F6',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeStackBtnTxt: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  docsHorizontalScroll: {
    paddingLeft: 20,
  },
  docMiniCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    width: 140,
    marginRight: 10,
    alignItems: 'center',
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  docMiniAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginBottom: 4,
  },
  docRatingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  docRatingTxt: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#D97706',
  },
  docReviewsCount: {
    fontSize: 8,
    color: '#6E7682',
    fontFamily: 'System',
  },
  docMiniName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1E2229',
    marginTop: 4,
    textAlign: 'center',
    width: '100%',
    fontFamily: 'System',
  },
  docMiniSpecialty: {
    fontSize: 8,
    color: '#6E7682',
    fontFamily: 'System',
  },
  docMiniCredentials: {
    fontSize: 8,
    color: '#8E9AA6',
    marginVertical: 2,
    textAlign: 'center',
    width: '100%',
    fontFamily: 'System',
  },
  langPillsRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 4,
  },
  langPill: {
    backgroundColor: '#F8F9FC',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
  },
  langPillTxt: {
    fontSize: 7,
    color: '#6E7682',
    fontWeight: '500',
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  alertIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1E2229',
    fontFamily: 'System',
  },
  alertSub: {
    fontSize: 9,
    color: '#6E7682',
    fontFamily: 'System',
  },
  alertActionBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  alertActionTxt: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  actionIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EBF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1E2229',
    fontFamily: 'System',
  },
  actionSub: {
    fontSize: 9,
    color: '#8E9AA6',
    fontFamily: 'System',
  },
  actionBtn: {
    backgroundColor: '#2F76F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionBtnTxt: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tipCard: {
    backgroundColor: '#F1F5F9',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1E2229',
    fontFamily: 'System',
  },
  tipDesc: {
    fontSize: 9,
    color: '#6E7682',
    marginTop: 2,
    fontFamily: 'System',
  },
  testimonialScroll: {
    paddingLeft: 20,
  },
  testimonialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    width: 180,
    marginRight: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testimonialAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  testimonialName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1E2229',
    fontFamily: 'System',
  },
  testimonialRole: {
    fontSize: 8,
    color: '#8E9AA6',
  },
  starRow: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 6,
  },
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomTabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  bottomTabItemActive: {
    flex: 1.6,
  },
  activeTabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F76F6',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
    gap: 6,
  },
  activeTabLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  sheetOverlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
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
    color: '#1E2229',
    fontFamily: 'System',
    marginBottom: 8,
  },
  sheetDesc: {
    fontSize: 12,
    color: '#6E7682',
    lineHeight: 18,
    fontFamily: 'System',
    marginBottom: 24,
  },
  sheetButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sheetButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#2F76F6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sheetButtonPrimary: {
    backgroundColor: '#2F76F6',
  },
  sheetButtonTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2F76F6',
    fontFamily: 'System',
  },
  sheetButtonTxtPrimary: {
    color: '#FFFFFF',
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 100 : 70,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E2229',
    fontFamily: 'System',
  },
  scheduleLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E2229',
    marginTop: 18,
    marginBottom: 8,
    fontFamily: 'System',
  },
  dropdownSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  dropdownVal: {
    fontSize: 13,
    color: '#1E2229',
    fontFamily: 'System',
  },
  callTypeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  callTypeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  callTypeBtnActive: {
    backgroundColor: '#2F76F6',
    borderColor: 'transparent',
  },
  callTypeBtnTxt: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6E7682',
    fontFamily: 'System',
  },
  callTypeBtnTxtActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  datePickerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2F76F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  datePickerVal: {
    fontSize: 13,
    color: '#1E2229',
    fontWeight: '500',
    fontFamily: 'System',
  },
  dateFormatHelp: {
    fontSize: 9,
    color: '#8E9AA6',
    marginTop: 4,
    fontFamily: 'System',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },
  calendarHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 16,
  },
  calendarMonthTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E2229',
    marginHorizontal: 4,
    fontFamily: 'System',
  },
  calendarWeekdays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekdayTxt: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#8E9AA6',
    fontFamily: 'System',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDayCell: {
    width: '14.28%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1,
  },
  calendarDayCellSelected: {
    backgroundColor: '#2F76F6',
    borderRadius: 18,
  },
  calendarDayTxt: {
    fontSize: 11,
    fontWeight: '500',
    color: '#1E2229',
    fontFamily: 'System',
  },
  calendarDayGrey: {
    color: '#CBD5E1',
  },
  calendarDayTxtSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  calendarActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 14,
  },
  calCancelTxt: {
    fontSize: 12,
    color: '#6E7682',
    fontWeight: '600',
    fontFamily: 'System',
  },
  calOkTxt: {
    fontSize: 12,
    color: '#2F76F6',
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  slotBtn: {
    width: '48.5%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  slotBtnActive: {
    backgroundColor: '#2F76F6',
    borderColor: 'transparent',
  },
  slotBtnTxt: {
    fontSize: 11,
    fontWeight: '500',
    color: '#1E2229',
    fontFamily: 'System',
  },
  slotBtnTxtActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sessionNotes: {
    fontSize: 10,
    color: '#6E7682',
    lineHeight: 14,
    fontFamily: 'System',
  },
  successWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  successIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EBF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 24,
  },
  successPlusBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
  },
  successHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E2229',
    textAlign: 'center',
    fontFamily: 'System',
  },
  bookingIdTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E2229',
    marginTop: 10,
    marginBottom: 16,
    fontFamily: 'System',
  },
  successSub: {
    fontSize: 11,
    color: '#6E7682',
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: 'System',
  },
  programsListWrapper: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 18,
  },
  programListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  programListItemTxt: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E2229',
    fontFamily: 'System',
    flex: 1,
    paddingRight: 10,
  },
  programsFooterRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: Spacing.five,
    marginBottom: 40,
  },
  programsSkipBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#2F76F6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  programsSkipTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2F76F6',
    fontFamily: 'System',
  },
  programsNextBtn: {
    flex: 1,
    backgroundColor: '#2F76F6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  programsNextTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    marginTop: 18,
    marginBottom: 14,
    gap: 8,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 12,
    color: '#1E2229',
    paddingVertical: 2,
    fontFamily: 'System',
    outlineStyle: 'none',
  } as any,
  checklistGroup: {
    marginTop: 14,
  },
  checklistGroupTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E2229',
    marginBottom: 8,
    fontFamily: 'System',
  },
  checkListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  customCheck: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  customCheckActive: {
    backgroundColor: '#2F76F6',
    borderColor: 'transparent',
  },
  checkListItemTxt: {
    fontSize: 12,
    color: '#6E7682',
    fontFamily: 'System',
  },
  checkListItemTxtActive: {
    color: '#1E2229',
    fontWeight: '500',
  },
});
