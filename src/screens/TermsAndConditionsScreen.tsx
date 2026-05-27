import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const isTablet = width >= 768;

export default function TermsAndConditionsScreen({
  navigation,
}: any) {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Terms & Conditions
        </Text>

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
            size={54}
            color="#A855F7"
          />

          <Text style={styles.heroTitle}>
            TAS Secure Platform
          </Text>

          <Text style={styles.heroSubtitle}>
            Please read these Terms & Conditions carefully
            before using the application.
          </Text>
        </View>

        {/* SECTION */}

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            1. Acceptance of Terms
          </Text>

          <Text style={styles.sectionText}>
            By accessing and using TAS, you agree to comply
            with and be legally bound by these Terms and
            Conditions. If you do not agree with any part of
            these terms, you must discontinue use of the app
            immediately.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            2. User Responsibility
          </Text>

          <Text style={styles.sectionText}>
            Users are responsible for maintaining the
            confidentiality of their account information and
            all activities that occur under their account.
            TAS will not be liable for any unauthorized
            access resulting from user negligence.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            3. Privacy & Security
          </Text>

          <Text style={styles.sectionText}>
            TAS values user privacy and implements secure
            communication technologies. However, users
            acknowledge that no online platform can guarantee
            absolute security. Users should avoid sharing
            highly confidential data over public networks.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            4. Prohibited Activities
          </Text>

          <Text style={styles.sectionText}>
            Users must not misuse the application for spam,
            harassment, illegal activities, fraud,
            impersonation, unauthorized data collection, or
            any activity that violates applicable laws and
            regulations.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            5. Audio & Video Calls
          </Text>

          <Text style={styles.sectionText}>
            TAS provides audio and video calling features.
            Call quality may vary depending on internet
            connectivity, device compatibility, and server
            availability. TAS is not responsible for call
            interruptions caused by third-party networks.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            6. QR Identity Sharing
          </Text>

          <Text style={styles.sectionText}>
            QR identity sharing is intended only for secure
            user connection purposes. Users must ensure they
            share their QR identity responsibly and avoid
            exposing it publicly to prevent unwanted contact.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            7. Intellectual Property
          </Text>

          <Text style={styles.sectionText}>
            All trademarks, logos, designs, UI elements, and
            software components within TAS are the exclusive
            property of TAS and its creators. Unauthorized
            reproduction or redistribution is prohibited.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            8. Account Suspension
          </Text>

          <Text style={styles.sectionText}>
            TAS reserves the right to suspend or terminate
            accounts that violate these Terms & Conditions or
            engage in harmful activities affecting the
            platform or its users.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            9. Updates to Terms
          </Text>

          <Text style={styles.sectionText}>
            TAS may update these Terms & Conditions from time
            to time. Continued use of the application after
            updates constitutes acceptance of the revised
            terms.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            10. Contact Information
          </Text>

          <Text style={styles.sectionText}>
            For support, legal concerns, or policy-related
            questions, users may contact the TAS support
            team through the Help & Feedback section inside
            the application.
          </Text>
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Last Updated • May 2026
          </Text>

          <Text style={styles.footerSubText}>
            © TAS Secure Communications
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#020826',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 18,

    marginTop: 10,
    marginBottom: 20,
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  headerTitle: {
    color: '#fff',

    fontSize: 22,
    fontWeight: '700',
  },

  scrollContent: {
    paddingBottom: 50,
  },

  heroCard: {
    marginHorizontal: 20,

    borderRadius: 34,

    paddingVertical: 38,
    paddingHorizontal: 24,

    alignItems: 'center',

    overflow: 'hidden',

    backgroundColor: 'rgba(255,255,255,0.04)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },

  heroGlow: {
    position: 'absolute',

    top: -80,
    right: -60,

    width: 200,
    height: 200,

    borderRadius: 999,

    backgroundColor: 'rgba(168,85,247,0.18)',
  },

  heroTitle: {
    color: '#fff',

    fontSize: isTablet ? 34 : 28,
    fontWeight: '800',

    marginTop: 18,
  },

  heroSubtitle: {
    color: 'rgba(255,255,255,0.6)',

    fontSize: 15,

    textAlign: 'center',

    lineHeight: 24,

    marginTop: 14,

    maxWidth: 500,
  },

  sectionCard: {
    marginTop: 18,

    marginHorizontal: 20,

    borderRadius: 28,

    paddingVertical: 24,
    paddingHorizontal: 22,

    backgroundColor: 'rgba(255,255,255,0.03)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  sectionTitle: {
    color: '#C084FC',

    fontSize: 18,
    fontWeight: '700',

    marginBottom: 14,
  },

  sectionText: {
    color: 'rgba(255,255,255,0.72)',

    fontSize: 15,

    lineHeight: 28,

    letterSpacing: 0.2,
  },

  footer: {
    alignItems: 'center',

    marginTop: 40,
  },

  footerText: {
    color: '#A855F7',

    fontSize: 15,
    fontWeight: '700',
  },

  footerSubText: {
    color: 'rgba(255,255,255,0.4)',

    fontSize: 13,

    marginTop: 10,
  },
});