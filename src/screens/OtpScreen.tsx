import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const OtpScreen = ({ navigation }) => {
  const { theme } = useTheme();

  const [otp, setOtp] = useState(['', '', '', '']);

  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Verify OTP 🔐
        </Text>
        <Text style={[styles.subtitle, { color: theme.subText }]}>
          Enter the 4-digit code sent to your phone
        </Text>
      </View>

      {/* OTP BOXES */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={[
              styles.otpBox,
              {
                color: theme.text,
                borderColor: 'rgba(255,255,255,0.2)',
                backgroundColor: 'rgba(255,255,255,0.05)',
              },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              nativeEvent.key === 'Backspace' &&
              handleBackspace(digit, index)
            }
          />
        ))}
      </View>

      {/* VERIFY BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('MainTabs')}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      {/* RESEND */}
      <Text style={[styles.resend, { color: theme.subText }]}>
        Didn’t receive code? <Text style={styles.resendAction}>Resend</Text>
      </Text>

    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
  },

  header: {
    marginBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },

  otpBox: {
    width: 60,
    height: 65,
    borderRadius: 16,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 20,
  },

  button: {
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',

    shadowColor: '#7C3AED',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  resend: {
    marginTop: 20,
    textAlign: 'center',
  },

  resendAction: {
    color: '#7C3AED',
    fontWeight: '600',
  },
});