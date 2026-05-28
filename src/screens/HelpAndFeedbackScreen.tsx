import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../theme/colors';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768;

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
              <Ionicons name="arrow-back" size={24} color="#fff" />
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
                size={42}
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
                size={26}
                color="#8B5CF6"
              />

              <Text style={styles.quickTitle}>Chat Support</Text>

              <Text style={styles.quickSub}>
                Get quick assistance instantly
              </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.quickCard}>
              <Ionicons name="mail-outline" size={26} color={COLORS.success} />

              <Text style={styles.quickTitle}>Email Us</Text>

              <Text style={styles.quickSub}>
                support@heybroapp.com
              </Text>
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
                  size={18}
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
    marginTop: height * 0.03,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
  },

  backButton: {
    width: 48,
    height: 48,

    borderRadius: 24,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  headerTitle: {
    color: '#fff',

    fontSize: isTablet ? 34 : 26,
    fontWeight: '700',
  },

  topCard: {
    marginTop: 40,

    marginHorizontal: 20,

    borderRadius: 28,

    paddingVertical: 38,
    paddingHorizontal: 28,

    alignItems: 'center',

    overflow: 'hidden',

    backgroundColor: 'rgba(255,255,255,0.04)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  /* CROPPED BUBBLES */

  topLeftBubble: {
    position: 'absolute',

    top: -75,
    left: -75,

    width: 190,
    height: 190,

    borderRadius: 999,

    backgroundColor: 'rgba(168,85,247,0.22)',
  },

  bottomRightBubble: {
    position: 'absolute',

    bottom: -65,
    right: -65,

    width: 170,
    height: 170,

    borderRadius: 999,

    backgroundColor: 'rgba(20,184,166,0.16)',
  },

  iconWrapper: {
    width: 82,
    height: 82,

    borderRadius: 41,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(168,85,247,0.15)',

    marginBottom: 22,
  },

  mainTitle: {
    color: '#fff',

    fontSize: isTablet ? 34 : 28,
    fontWeight: '700',
  },

  subtitle: {
    color: 'rgba(255,255,255,0.6)',

    marginTop: 14,

    textAlign: 'center',

    lineHeight: 24,

    fontSize: isTablet ? 18 : 15,
  },

  quickContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: 26,

    paddingHorizontal: 20,
  },

  quickCard: {
    width: '48%',

    borderRadius: 24,

    paddingVertical: 28,
    paddingHorizontal: 18,

    backgroundColor: 'rgba(255,255,255,0.04)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  quickTitle: {
    color: '#fff',

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
    marginTop: 28,

    marginHorizontal: 20,

    borderRadius: 28,

    padding: 24,

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

    height: 58,
  },

  messageInput: {
    flex: 1,

    color: '#fff',

    fontSize: 16,

    marginLeft: 12,

    minHeight: 140,
    maxHeight: 220,
  },

  submitButton: {
    height: 58,

    borderRadius: 18,

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
    marginTop: 28,

    marginHorizontal: 20,

    borderRadius: 28,

    padding: 24,

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