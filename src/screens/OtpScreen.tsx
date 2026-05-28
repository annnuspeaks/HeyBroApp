import React, { useRef, useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768;
const isLandscape = width > height;

const OtpScreen = ({ navigation }: any) => {
  const [otp, setOtp] = useState(['', '', '', '']);

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
    if (cleaned && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // AUTO BACK TO PREVIOUS
    if (!cleaned && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // AUTO NAVIGATE
    if (updatedOtp.join('').length === 4) {
      setTimeout(() => {
        navigation.replace('MainTabs');
      }, 250);
    }
  };

  const isOtpComplete = otp.join('').length === 4;

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
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.appName}>HeyBro</Text>

          <Text style={styles.title}>VERIFY OTP</Text>

          <Text style={styles.subtitle}>
            Enter the 4 digit OTP sent to your phone
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
                caretHidden={true} // CURSOR HIDE
                selectionColor="transparent"
                contextMenuHidden={true}
                importantForAutofill="yes"
                textContentType="oneTimeCode"
                style={[
                  styles.otpInput,
                  digit ? styles.activeOtpInput : null,
                ]}
                placeholder="•"
                placeholderTextColor="rgba(255,255,255,0.25)"
              />
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!isOtpComplete}
            onPress={() => navigation.replace('MainTabs')}
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
                  opacity: isOtpComplete ? 1 : 0.5,
                },
              ]}
            >
              Verify
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.resendText}>Resend OTP</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 35,
  },

  otpInput: {
    width: isTablet ? 78 : 62,
    height: isTablet ? 78 : 62,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.10)',
    color: '#FFFFFF',
    textAlign: 'center', // CENTER ALIGN
    textAlignVertical: 'center',
    fontSize: isTablet ? 28 : 22,
    fontWeight: '600',
    marginHorizontal: 6,
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
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
});