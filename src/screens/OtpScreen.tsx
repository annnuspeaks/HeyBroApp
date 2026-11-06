import React, { useRef, useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import {
  getCurrentUser,
  confirmPhoneOtp,
  resendPhoneOtp,
} from '../services/authService';
import { getUserProfile } from '../services/firestoreService';
import { useUserStore } from '../store/userStore';

import Ionicons from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768;
const isLandscape = width > height;

// Match the OTP row to the card's usable width (card width minus 30dp padding on each side).
const otpCardWidth = isLandscape
  ? width * (isTablet ? 0.52 : 0.70)
  : width * 0.88;
const otpGap = isTablet ? 8 : 4;
const otpBoxWidth = Math.max(
  30,
  Math.min(isTablet ? 68 : 42, Math.floor((otpCardWidth - 60 - otpGap * 5) / 6)),
);

const OtpScreen = ({ navigation }: any) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<any[]>([]);

  // AUTO FOCUS FIRST BOX
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    const cleaned = text.replace(/[^0-9]/g, '');

    const updatedOtp = [...otp];

    updatedOtp[index] = cleaned;

    setOtp(updatedOtp);

    // NEXT INPUT AUTO FOCUS
    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // AUTO BACK TO PREVIOUS
    if (!cleaned && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const isOtpComplete = otp.join('').length === 6;

  const handleVerify = async () => {
    if (!isOtpComplete || isVerifying) {
      return;
    }

    try {
      setIsVerifying(true);

      await confirmPhoneOtp(otp.join(''));

      const user = getCurrentUser();

      if (user) {
        const profile = await getUserProfile(user.uid);

        if (profile) {
          useUserStore.getState().setProfile(profile);
        }
      }

      navigation.replace('MainTabs');
    } catch (error: any) {
      Alert.alert(
        'Invalid OTP',
        'The OTP you entered is incorrect or has expired. Please check the code and try again.',
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (isResending || isVerifying) {
      return;
    }

    try {
      setIsResending(true);

      await resendPhoneOtp();

      setOtp(['', '', '', '', '', '']);

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);

      Alert.alert('OTP Sent', 'A new OTP has been sent to your phone.');
    } catch (error: any) {
      Alert.alert(
        'Unable to Resend OTP',
        'We could not send a new OTP. Please try again.',
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <LinearGradient
      colors={['#090B2A', '#1A145C', '#2A0A52']}
      style={styles.container}
    >
      {/* Floating Spheres */}
      <View style={styles.sphereTop} />
      <View style={styles.sphereLeft} />
      <View style={styles.sphereBottom} />

      <KeyboardAvoidingView
        style={styles.centerContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View
          style={[
            styles.card,
            {
              width: isLandscape ? (isTablet ? '52%' : '70%') : '88%',
            },
          ]}
        >
          {/* BACK BUTTON
              Visual size remains exactly the same.
              Only invisible touch area is enlarged. */}
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
            onPressIn={handleBack}
            hitSlop={8}
            android_ripple={{
              color: 'rgba(255,255,255,0.15)',
              borderless: true,
            }}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>

          <Text style={styles.appName}>HeyBro</Text>

          <Text style={styles.title}>VERIFY OTP</Text>

          <Text style={styles.subtitle}>
            Enter the 6 digit OTP sent to your phone
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => {
                  if (ref) {
                    inputRefs.current[index] = ref;
                  }
                }}
                value={digit}
                onChangeText={text => handleOtpChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                autoFocus={index === 0}
                multiline={false}
                caretHidden={true}
                selectionColor="transparent"
                contextMenuHidden={true}
                importantForAutofill="yes"
                textContentType="oneTimeCode"
                style={[styles.otpInput, digit ? styles.activeOtpInput : null]}
                placeholder="•"
                placeholderTextColor="rgba(255,255,255,0.25)"
              />
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!isOtpComplete || isVerifying}
            onPress={handleVerify}
            style={[
              styles.button,
              {
                backgroundColor: isOtpComplete
                  ? '#A020F0'
                  : 'rgba(255,255,255,0.15)',
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  opacity: isOtpComplete && !isVerifying ? 1 : 0.5,
                },
              ]}
            >
              {isVerifying ? 'Verifying...' : 'Verify'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleResendOtp}
            disabled={isResending || isVerifying}
          >
            <Text style={styles.resendText}>
              {isResending ? 'Sending...' : 'Resend OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 34,
    paddingHorizontal: 30,
    paddingVertical: 40,
    overflow: 'hidden',
  },

  appName: {
    color: '#FFFFFF',
    fontSize: isTablet ? 42 : 34,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 14,
  },

  title: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: isTablet ? 34 : 28,
    letterSpacing: 4,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 14,
  },

  subtitle: {
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'center',
    fontSize: isTablet ? 18 : 14,
    marginBottom: 40,
  },

  otpContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
    gap: otpGap,
  },

  otpInput: {
    flex: 0,
    width: otpBoxWidth,
    height: isTablet ? 68 : 54,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.10)',
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: isTablet ? 26 : 20,
    fontWeight: '600',
    marginHorizontal: 0,
    padding: 0,
  },

  activeOtpInput: {
    borderWidth: 1.5,
    borderColor: '#C026FF',
    shadowColor: '#C026FF',
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },

  button: {
    height: isTablet ? 64 : 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#A020F0',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: isTablet ? 20 : 17,
    fontWeight: '600',
  },

  resendText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.7)',
    fontSize: isTablet ? 17 : 14,
  },

  sphereTop: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 200,
    backgroundColor: '#C026FF',
    top: -50,
    right: 80,
    opacity: 0.95,
  },

  sphereLeft: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 105,
    backgroundColor: '#A000FF',
    left: -50,
    top: 280,
  },

  sphereBottom: {
    position: 'absolute',
    width: 270,
    height: 270,
    borderRadius: 140,
    backgroundColor: '#B000FF',
    right: -70,
    bottom: -40,
  },

  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    zIndex: 10,
    elevation: 10,
  },

  backButtonPressed: {
    opacity: 0.7,
  },
});
