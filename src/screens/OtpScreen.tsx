import React, { useRef, useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

const OtpScreen = ({ navigation }: any) => {
  const { theme } = useContext(ThemeContext);

  const [otp, setOtp] = useState(['', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const scaleAnim = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]).current;

  const inputs = useRef<Array<TextInput | null>>([]);

  React.useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // 🔥 SCALE ANIMATION
    Animated.sequence([
      Animated.timing(scaleAnim[index], {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // 🔥 NEXT INPUT
    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }

    // 🔥 AUTO SUBMIT
    if (newOtp.every(d => d !== '')) {
      setTimeout(() => {
        navigation.replace('MainTabs');
      }, 400);
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Verify OTP 🔐</Text>
        <Text style={[styles.subtitle, { color: theme.subText }]}>
          Enter the 4-digit code sent to your phone
        </Text>
      </View>

      {/* OTP BOXES */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <Animated.View
            key={`otp-${index}`}
            style={{
              transform: [{ scale: scaleAnim[index] }],
              shadowColor: '#7C3AED',
              shadowOpacity: activeIndex === index ? 0.6 : 0.1,
              shadowRadius: activeIndex === index ? 12 : 4,
              elevation: activeIndex === index ? 8 : 2,
            }}
          >
            <TextInput
              key={index}
              onFocus={() => setActiveIndex(index)}
              ref={ref => {
                inputs.current[index] = ref;
              }}
              style={[
                styles.otpBox,
                {
                  color: theme.text,
                  borderColor:
                    activeIndex === index
                      ? '#7C3AED'
                      : otp[index]
                      ? '#7C3AED'
                      : 'rgba(255,255,255,0.2)',

                  backgroundColor:
                    activeIndex === index
                      ? 'rgba(124,58,237,0.15)'
                      : 'rgba(255,255,255,0.05)',
                  shadowColor: otp[index] ? '#7C3AED' : '#000',
                  shadowOpacity: otp[index] ? 0.5 : 0.1,
                },
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) =>
                nativeEvent.key === 'Backspace' && handleBackspace(digit, index)
              }
            />
          </Animated.View>
        ))}
      </View>

      {/* VERIFY BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
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
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 40,
  },

  otpBox: {
    width: 55,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 20,
    shadowColor: '#17013d',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    elevation: 4,
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
