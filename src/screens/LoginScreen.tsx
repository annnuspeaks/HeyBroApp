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
          Phone Number
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
    borderRadius: 24,
    borderWidth: 1,

    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },

    elevation: 8, // android
  },

  label: {
    fontSize: 13,
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#7C3AED',
    shadowColor: '#7C3AED',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
