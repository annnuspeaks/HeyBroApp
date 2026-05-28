import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
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

export default function TermsAndConditionsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={isTablet ? 26 : 22}
            color={COLORS.white}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Terms & Conditions</Text>

        <View style={{ width: 42 }} />
      </View>

      {/* CONTENT */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TOP CARD */}

        <View style={styles.heroCard}>
          <View style={styles.heroGlow} />

          <Ionicons
            name="shield-checkmark"
            size={isTablet ? 60 : 50}
            color="#A855F7"
          />

          <Text style={styles.heroTitle}>TAS Secure Platform</Text>

          <Text style={styles.heroSubtitle}>
            Please read these Terms & Conditions carefully before using the
            application.
          </Text>
        </View>

        {/* SECTION */}

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>

          <Text style={styles.sectionText}>
            By accessing and using TAS, you agree to comply with and be legally
            bound by these Terms and Conditions. If you do not agree with any
            part of these terms, you must discontinue use of the app
            immediately.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>2. User Responsibility</Text>

          <Text style={styles.sectionText}>
            Users are responsible for maintaining the confidentiality of their
            account information and all activities that occur under their
            account. TAS will not be liable for any unauthorized access
            resulting from user negligence.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>3. Privacy & Security</Text>

          <Text style={styles.sectionText}>
            TAS values user privacy and implements secure communication
            technologies. However, users acknowledge that no online platform can
            guarantee absolute security. Users should avoid sharing highly
            confidential data over public networks.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>4. Prohibited Activities</Text>

          <Text style={styles.sectionText}>
            Users must not misuse the application for spam, harassment, illegal
            activities, fraud, impersonation, unauthorized data collection, or
            any activity that violates applicable laws and regulations.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>5. Audio & Video Calls</Text>

          <Text style={styles.sectionText}>
            TAS provides audio and video calling features. Call quality may vary
            depending on internet connectivity, device compatibility, and server
            availability. TAS is not responsible for call interruptions caused
            by third-party networks.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>6. QR Identity Sharing</Text>

          <Text style={styles.sectionText}>
            QR identity sharing is intended only for secure user connection
            purposes. Users must ensure they share their QR identity responsibly
            and avoid exposing it publicly to prevent unwanted contact.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>7. Intellectual Property</Text>

          <Text style={styles.sectionText}>
            All trademarks, logos, designs, UI elements, and software components
            within TAS are the exclusive property of TAS and its creators.
            Unauthorized reproduction or redistribution is prohibited.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>8. Account Suspension</Text>

          <Text style={styles.sectionText}>
            TAS reserves the right to suspend or terminate accounts that violate
            these Terms & Conditions or engage in harmful activities affecting
            the platform or its users.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>9. Updates to Terms</Text>

          <Text style={styles.sectionText}>
            TAS may update these Terms & Conditions from time to time. Continued
            use of the application after updates constitutes acceptance of the
            revised terms.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>10. Contact Information</Text>

          <Text style={styles.sectionText}>
            For support, legal concerns, or policy-related questions, users may
            contact the TAS support team through the Help & Feedback section
            inside the application.
          </Text>
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Last Updated • May 2026</Text>

          <Text style={styles.footerSubText}>© TAS Secure Communications</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
    marginTop: verticalScale(isTablet ? 14 : 10),
    marginBottom: verticalScale(20),
    width: '100%',
    alignSelf: 'center',
    maxWidth: 1300,
  },

  backButton: {
    width: isTablet ? 52 : 42,
    height: isTablet ? 52 : 42,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: fontScale(isTablet ? 26 : 22),
    fontWeight: '700',
  },

  scrollContent: {
    paddingBottom: 50,
  },

  heroCard: {
    marginHorizontal: scale(20),
    borderRadius: moderateScale(34),
    paddingVertical: verticalScale(38),
    paddingHorizontal: scale(24),
    width: '92%',
    alignSelf: 'center',
    maxWidth: 1300,
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: COLORS.heroCardBackgroundColor,
    borderWidth: 1,
    borderColor: COLORS.heroCardBorderColor,
  },

  heroGlow: {
    position: 'absolute',
    top: verticalScale(-80),
    right: scale(-60),
    width: scale(isTablet ? 240 : 200),
    height: scale(isTablet ? 240 : 200),
    borderRadius: 999,
    backgroundColor: COLORS.heroGlowColor,
  },

  heroTitle: {
    color: COLORS.white,
    fontSize: fontScale(isTablet ? 32 : 28),
    marginTop: verticalScale(18),
    fontWeight: '800',
  },

  heroSubtitle: {
    color: COLORS.heroSubtitleColor,
    textAlign: 'center',
    fontSize: fontScale(isTablet ? 16 : 15),
    lineHeight: verticalScale(isTablet ? 28 : 24),
    marginTop: verticalScale(14),
    maxWidth: isTablet ? 720 : 500,
  },

  sectionCard: {
    marginTop: verticalScale(18),
    marginHorizontal: scale(20),
    borderRadius: moderateScale(28),
    paddingVertical: verticalScale(24),
    paddingHorizontal: scale(22),
    width: '92%',
    alignSelf: 'center',
    maxWidth: 1300,
    backgroundColor: COLORS.sectionCardBackgroundColor,
    borderWidth: 1,
    borderColor: COLORS.sectionCardBorderColor,
  },

  sectionTitle: {
    color: COLORS.sectionTitleColor,
    fontWeight: '700',
    fontSize: fontScale(isTablet ? 20 : 18),
    marginBottom: verticalScale(14),
  },

  sectionText: {
    color: COLORS.sectionTextColor,
    fontSize: fontScale(isTablet ? 16 : 15),
    lineHeight: verticalScale(isTablet ? 32 : 28),
    letterSpacing: 0.2,
  },

  footer: {
    alignItems: 'center',
    marginTop: verticalScale(40),
    paddingBottom: verticalScale(40),
  },

  footerText: {
    color: COLORS.footerColor,
    fontSize: fontScale(isTablet ? 16 : 15),
    fontWeight: '700',
  },

  footerSubText: {
    color: COLORS.footerSubColor,
    fontSize: fontScale(isTablet ? 14 : 13),
    marginTop: verticalScale(10),
  },
});
