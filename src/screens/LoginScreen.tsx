import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const isTablet = width >= 768;
const isLandscape = width > height;

const LoginScreen = ({navigation}: any) => {
  const [phone, setPhone] = useState('');

  const isValidPhone = phone.length === 10;

  const handleContinue = () => {
    if (!isValidPhone) {
      return;
    }

    navigation.navigate('OtpScreen', {
      phone,
    });
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
            style={styles.input}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!isValidPhone}
            onPress={handleContinue}
            style={[
              styles.button,
              {
                backgroundColor: isValidPhone
                  ? '#A020F0'
                  : 'rgba(255,255,255,0.15)',
              },
            ]}>
            
            <Text
              style={[
                styles.buttonText,
                {
                  opacity: isValidPhone ? 1 : 0.5,
                },
              ]}>
              Continue
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
    fontFamily: 'ClashDisplay-Bold',
  },

  loginText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: isTablet ? 36 : 28,
    letterSpacing: 4,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 40,
  },

  label: {
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 10,
    fontSize: isTablet ? 18 : 15,
  },

  input: {
    height: isTablet ? 68 : 58,
    borderRadius: 18,
    paddingHorizontal: 22,
    backgroundColor: 'rgba(255,255,255,0.10)',
    color: '#FFFFFF',
    fontSize: isTablet ? 20 : 16,
    marginBottom: 30,
  },

  button: {
    height: isTablet ? 64 : 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
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