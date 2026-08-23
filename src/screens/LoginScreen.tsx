import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
  isTablet,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../theme/responsive';

import LinearGradient from 'react-native-linear-gradient';

import {COLORS} from '../theme/colors';
import {sendPhoneOtp} from '../services/authService';

const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;

const LoginScreen = ({navigation}: any) => {
  const [phone, setPhone] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const isValidPhone = phone.length === 10;

  const handleContinue = async () => {
    if (!isValidPhone || isSendingOtp) {
      return;
    }

    try {
      setIsSendingOtp(true);

      const phoneNumber = `+91${phone}`;

      const confirmation = await sendPhoneOtp(phoneNumber);

      navigation.navigate('OtpScreen', {
        phone,
        confirmation,
      });
    } catch (error: any) {
      console.log('PHONE OTP ERROR:', error);

      Alert.alert(
        'Unable to send OTP',
        error?.message ||
          'Something went wrong while sending the OTP. Please try again.',
      );
    } finally {
      setIsSendingOtp(false);
    }
  };

  return (
    <LinearGradient
      colors={['#090B2A', '#1A145C', '#2A0A52']}
      style={styles.container}>
      {/* Floating Spheres */}

      <View style={styles.sphereTop} />
      <View style={styles.sphereLeft} />
      <View style={styles.sphereBottom} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.centerContainer}>
        <View
          style={[
            styles.card,
            {
              width: isLandscape
                ? isTablet
                  ? '52%'
                  : '70%'
                : '88%',
            },
          ]}>
          <Text style={styles.appName}>HeyBro</Text>

          <Text style={styles.loginText}>LOGIN</Text>

          <Text style={styles.label}>PHONE NUMBER</Text>

          <TextInput
            value={phone}
            onChangeText={text => {
              const cleaned = text.replace(/[^0-9]/g, '');
              setPhone(cleaned);
            }}
            placeholder="Enter phone number"
            placeholderTextColor="rgba(255,255,255,0.45)"
            keyboardType="number-pad"
            maxLength={10}
            editable={!isSendingOtp}
            style={styles.input}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!isValidPhone || isSendingOtp}
            onPress={handleContinue}
            style={[
              styles.button,
              {
                backgroundColor:
                  isValidPhone && !isSendingOtp
                    ? '#A020F0'
                    : 'rgba(255,255,255,0.15)',
              },
            ]}>
            <Text
              style={[
                styles.buttonText,
                {
                  opacity:
                    isValidPhone && !isSendingOtp
                      ? 1
                      : 0.5,
                },
              ]}>
              {isSendingOtp ? 'Sending OTP...' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;

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
    borderRadius: moderateScale(34),
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(40),
    overflow: 'hidden',
  },

  appName: {
    color: COLORS.white,
    fontSize: fontScale(isTablet ? 42 : 34),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: verticalScale(14),
    fontFamily: 'ClashDisplay-Bold',
    letterSpacing: fontScale(9),
  },

  loginText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: fontScale(isTablet ? 36 : 28),
    letterSpacing: 4,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: verticalScale(40),
  },

  label: {
    color: 'rgba(255,255,255,0.7)',
    marginBottom: verticalScale(10),
    fontSize: fontScale(isTablet ? 18 : 15),
  },

  input: {
    height: verticalScale(isTablet ? 68 : 58),
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(10),
    backgroundColor: 'rgba(255,255,255,0.10)',
    color: COLORS.white,
    fontSize: fontScale(isTablet ? 20 : 16),
    marginBottom: verticalScale(30),
  },

  button: {
    height: verticalScale(isTablet ? 64 : 56),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#A020F0',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: moderateScale(16),
    elevation: 5,
    opacity: 0.8,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: fontScale(isTablet ? 20 : 17),
    fontWeight: '600',
    letterSpacing: fontScale(1.5),
  },

  sphereTop: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#C026FF',
    top: -40,
    alignSelf: 'center',
    opacity: 0.85,
  },

  sphereLeft: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 100,
    backgroundColor: '#A000FF',
    left: -20,
    bottom: 180,
    opacity: 0.85,
  },

  sphereBottom: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 220,
    backgroundColor: '#B000FF',
    right: -65,
    bottom: -20,
  },
});