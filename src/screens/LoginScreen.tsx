import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

const LoginScreen = ({ navigation }: any) => {
  const { theme } = useContext(ThemeContext);
  const [phone, setPhone] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 🔥 HEADER */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>HeyBro 👋</Text>
        <Text style={[styles.subtitle, { color: theme.subText }]}>
          Connect instantly with your friends
        </Text>
      </View>

      {/* 🔥 INPUT CARD */}
      <View
        style={[
          styles.card,
          {
            backgroundColor:
              theme.background === '#020617'
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.05)',
            borderColor: theme.border,
          },
        ]}
      >
        <Text style={[styles.label, { color: theme.subText }]}>
          PHONE NUMBER
        </Text>

        <TextInput
          placeholder="Enter phone number"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          style={[styles.input, { color: theme.text }]}
        />

        <TouchableOpacity
          style={[
            styles.button,
            {
              opacity: phone.length < 10 ? 0.5 : 1,
            },
          ]}
          disabled={phone.length < 10}
          onPress={() => navigation.navigate('OtpScreen', { phone })}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 60,
  },

  header: {
    marginTop: 20,
    marginBottom: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
  },

  subtitle: {
    fontSize: 14,
    marginTop: 6,
  },

  card: {
    padding: 22,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    paddingVertical: 24,
    paddingHorizontal: 20,
    elevation: 8, // android
  },

  label: {
    fontSize: 12,
    marginBottom: 8,
    letterSpacing: 1, // 🔥 premium feel
    textTransform: 'uppercase', // 🔥 modern look
    opacity: 0.8,
    fontWeight: '600',
  },

  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16, // 🔥 IMPORTANT FIX
    fontSize: 15,
    marginBottom: 30,
    paddingLeft: 16,
  },

  button: {
    backgroundColor: '#7C3AED',
    shadowColor: '#7C3AED',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    padding: 14,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
