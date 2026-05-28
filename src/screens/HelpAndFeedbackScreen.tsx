import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
  isTablet,
} from '../theme/responsive';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../theme/colors';

export default function HelpAndFeedbackScreen({ navigation }: any) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert('Incomplete', 'Please fill all fields.');
      return;
    }

    Alert.alert(
      'Feedback Submitted',
      'Thank you for helping us improve HeyBro 💜',
    );

    setSubject('');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* HEADER */}

          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="arrow-back"
                size={isTablet ? 34 : 24}
                color="#fff"
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Help & Feedback</Text>

            <View style={{ width: 48 }} />
          </View>

          {/* TOP CARD */}

          <View style={styles.topCard}>
            {/* CROPPED BUBBLES */}

            <View style={styles.topLeftBubble} />

            <View style={styles.bottomRightBubble} />

            <View style={styles.iconWrapper}>
              <Ionicons
                name="help-circle-outline"
                size={isTablet ? 68 : 42}
                color="#A855F7"
              />
            </View>

            <Text style={styles.mainTitle}>Need Help?</Text>

            <Text style={styles.subtitle}>
              We are always here to help you. Share your issue, feedback or
              suggestion and our team will review it soon.
            </Text>
          </View>

          {/* QUICK OPTIONS */}

          <View style={styles.quickContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.quickCard}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={isTablet ? 38 : 26}
                color="#8B5CF6"
              />

              <Text style={styles.quickTitle}>Chat Support</Text>

              <Text style={styles.quickSub}>
                Get quick assistance instantly
              </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.quickCard}>
              <Ionicons
                name="mail-outline"
                size={isTablet ? 38 : 26}
                color={COLORS.success}
              />

              <Text style={styles.quickTitle}>Email Us</Text>

              <Text style={styles.quickSub}>support@heybroapp.com</Text>
            </TouchableOpacity>
          </View>

          {/* FORM */}

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Send Feedback</Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="create-outline"
                size={20}
                color="rgba(255,255,255,0.5)"
              />

              <TextInput
                placeholder="Subject"
                placeholderTextColor="rgba(255,255,255,0.35)"
                value={subject}
                onChangeText={setSubject}
                style={styles.input}
              />
            </View>

            <View
              style={[
                styles.inputWrapper,
                {
                  alignItems: 'flex-start',
                  paddingTop: 16,
                },
              ]}
            >
              <Ionicons
                name="document-text-outline"
                size={20}
                color="rgba(255,255,255,0.5)"
                style={{ marginTop: 2 }}
              />

              <TextInput
                placeholder="Describe your issue or feedback..."
                placeholderTextColor="rgba(255,255,255,0.35)"
                value={message}
                onChangeText={setMessage}
                multiline
                textAlignVertical="top"
                style={styles.messageInput}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Ionicons name="send" size={20} color="#fff" />

              <Text style={styles.submitText}>Submit Feedback</Text>
            </TouchableOpacity>
          </View>

          {/* FAQ */}

          <View style={styles.faqCard}>
            <Text style={styles.sectionTitle}>Frequently Asked</Text>

            {[
              'How to recover deleted chats?',
              'How to change privacy settings?',
              'How to report a user?',
              'How to update profile information?',
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={styles.faqItem}
              >
                <Text style={styles.faqText}>{item}</Text>

                <Ionicons
                  name="chevron-forward"
                  size={isTablet ? 28 : 18}
                  color="rgba(255,255,255,0.35)"
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingBottom: 50,
  },

  header: {
    marginTop: verticalScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
  },

  backButton: {
    width: isTablet ? 58 : 42,
    height: isTablet ? 58 : 42,
    borderRadius: isTablet ? 29 : 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: fontScale(isTablet ? 28 : 24),
    fontWeight: '700',
  },

  topCard: {
    marginTop: verticalScale(40),
    marginHorizontal: scale(20),
    borderRadius: moderateScale(28),
    paddingVertical: verticalScale(38),
    paddingHorizontal: scale(28),
    maxWidth: 1350,
    width: '92%',
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  /* CROPPED BUBBLES */

  topLeftBubble: {
    position: 'absolute',
    top: isTablet ? -110 : -75,
    left: isTablet ? -110 : -75,
    width: isTablet ? 280 : 190,
    height: isTablet ? 280 : 190,
    borderRadius: 999,
    backgroundColor: 'rgba(168,85,247,0.22)',
  },

  bottomRightBubble: {
    position: 'absolute',
    bottom: isTablet ? -100 : -65,
    right: isTablet ? -100 : -65,
    width: isTablet ? 260 : 170,
    height: isTablet ? 260 : 170,
    borderRadius: 999,
    backgroundColor: 'rgba(20,184,166,0.16)',
  },

  iconWrapper: {
    width: isTablet ? 130 : 82,
    height: isTablet ? 130 : 82,
    borderRadius: 999,
    marginBottom: verticalScale(22),

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(168,85,247,0.15)',
  },

  mainTitle: {
    color: COLORS.white,
    fontSize: isTablet ? 48 : 28,
    fontWeight: '700',
  },

  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    marginTop: verticalScale(14),
    lineHeight: verticalScale(isTablet ? 42 : 24),
    fontSize: isTablet ? 26 : 15,
    maxWidth: scale(700),
    textAlign: 'center',
  },

  quickContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(26),
    paddingHorizontal: scale(20),
  },

  quickCard: {
    width: '48%',
    borderRadius: moderateScale(24),
    paddingVertical: verticalScale(28),
    paddingHorizontal: scale(18),
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  quickTitle: {
    color: COLORS.white,

    marginTop: 16,

    fontSize: isTablet ? 22 : 17,
    fontWeight: '700',
  },

  quickSub: {
    color: 'rgba(255,255,255,0.55)',

    marginTop: 8,

    lineHeight: 20,

    fontSize: 13,
  },

  formCard: {
    marginTop: verticalScale(28),
    marginHorizontal: scale(20),
    borderRadius: moderateScale(28),
    padding: scale(24),

    maxWidth: 1350,
    width: '92%',
    alignSelf: 'center',

    backgroundColor: 'rgba(255,255,255,0.04)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  sectionTitle: {
    color: '#fff',

    fontSize: isTablet ? 24 : 20,
    fontWeight: '700',

    marginBottom: 20,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 18,

    paddingHorizontal: 16,

    backgroundColor: 'rgba(255,255,255,0.05)',

    marginBottom: 18,
  },

  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    height: isTablet ? 72 : 58,
  },

  messageInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    minHeight: isTablet ? 220 : 140,
    maxHeight: isTablet ? 340 : 220,
  },

  submitButton: {
    height: isTablet ? 72 : 58,

    borderRadius: moderateScale(18),

    backgroundColor: COLORS.primary,

    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',

    marginTop: 8,
  },

  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },

  faqCard: {
    marginTop: verticalScale(28),
    marginHorizontal: scale(20),
    borderRadius: moderateScale(28),
    padding: scale(24),
    maxWidth: 1350,
    width: '92%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 18,

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },

  faqText: {
    color: '#fff',

    fontSize: 15,

    flex: 1,

    marginRight: 10,
  },
});
