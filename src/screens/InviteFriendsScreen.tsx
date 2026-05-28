import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Share,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../theme/colors';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
  isTablet,
} from '../theme/responsive';

export default function InviteFriendsScreen({ navigation }: any) {
  const handleInvite = async () => {
    try {
      await Share.share({
        message:
          'Join me on TAS 🚀\n\nExperience secure chats, voice calls, video calls and much more.\n\nDownload now and connect instantly!',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={isTablet ? 34 : 24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Invite Friends</Text>

        <View style={{ width: 42 }} />
      </View>

      {/* CONTENT */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO CARD */}

        <View style={styles.heroCard}>
          <View style={styles.glow1} />
          <View style={styles.glow2} />

          <View style={styles.iconWrapper}>
            <Ionicons name="people" size={isTablet ? 110 : 58} color="#fff" />
          </View>

          <Text style={styles.heroTitle}>Invite Your Friends</Text>

          <Text style={styles.heroSubtitle}>
            Bring your friends to TAS and enjoy secure messaging, crystal clear
            voice calls and ultra smooth video calling experience together.
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.inviteButton}
            onPress={handleInvite}
          >
            <Ionicons
              name="paper-plane"
              size={isTablet ? 34 : 22}
              color="#fff"
            />

            <Text style={styles.inviteButtonText}>Send Invite</Text>
          </TouchableOpacity>
        </View>

        {/* FEATURES */}

        <View style={styles.card}>
          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons
                name="chatbubble-ellipses"
                size={isTablet ? 34 : 24}
                color="#A855F7"
              />
            </View>

            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Secure Messaging</Text>

              <Text style={styles.featureDescription}>
                Fast and private conversations with your friends.
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons
                name="call"
                size={isTablet ? 34 : 24}
                color={COLORS.success}
              />
            </View>

            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Crystal Voice Calls</Text>

              <Text style={styles.featureDescription}>
                Smooth and clear voice calling experience.
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons
                name="videocam"
                size={isTablet ? 34 : 24}
                color={COLORS.primary}
              />
            </View>

            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>HD Video Calls</Text>

              <Text style={styles.featureDescription}>
                Connect face-to-face anytime anywhere.
              </Text>
            </View>
          </View>
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Invite more • Connect faster • Stay secure
          </Text>
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
    marginTop: verticalScale(10),
    marginBottom: verticalScale(18),
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
    color: '#fff',
    fontSize: fontScale(24),
    fontWeight: '700',
  },

  scrollContent: {
    paddingBottom: 60,
  },

  heroCard: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(10),
    borderRadius: moderateScale(34),
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: scale(26),
    paddingVertical: verticalScale(40),
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  glow1: {
    position: 'absolute',
    top: verticalScale(-90),
    left: scale(-70),
    width: scale(220),
    height: scale(220),
    borderRadius: 999,
    backgroundColor: 'rgba(168,85,247,0.18)',
  },

  glow2: {
    position: 'absolute',
    bottom: verticalScale(-110),
    right: scale(-70),
    width: scale(220),
    height: scale(220),
    borderRadius: 999,
    backgroundColor: 'rgba(34,197,94,0.10)',
  },

  iconWrapper: {
    width: isTablet ? 240 : 105,
    height: isTablet ? 240 : 105,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginBottom: verticalScale(24),
  },

  heroTitle: {
    color: '#fff',
    fontSize: isTablet ? 54 : 30,
    fontWeight: '800',
    textAlign: 'center',
  },

  heroSubtitle: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: isTablet ? 28 : 15,
    lineHeight: verticalScale(28),
    textAlign: 'center',
    marginTop: verticalScale(18),
    maxWidth: scale(550),
  },

  inviteButton: {
    marginTop: verticalScale(34),
    height: verticalScale(60),
    paddingHorizontal: scale(32),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inviteButtonText: {
    color: '#fff',
    fontSize: fontScale(17),
    fontWeight: '700',
    marginLeft: scale(12),
  },

  card: {
    maxWidth: 1350,
    alignSelf: 'center',
    width: '92%',
    marginTop: verticalScale(26),
    marginHorizontal: scale(20),
    borderRadius: moderateScale(30),
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(22),
    paddingVertical: verticalScale(24),
  },

  featureIcon: {
    width: isTablet ? 90 : 58,
    height: isTablet ? 90 : 58,
    borderRadius: moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  featureTextContainer: {
    flex: 1,
    marginLeft: 18,
  },

  featureTitle: {
    color: '#fff',
    fontSize: fontScale(18),
    fontWeight: '700',
  },

  featureDescription: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: fontScale(14),
    lineHeight: verticalScale(24),
    marginTop: verticalScale(6),
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginLeft: scale(96),
  },

  footer: {
    alignItems: 'center',
    marginTop: verticalScale(36),
  },

  footerText: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: fontScale(14),
    letterSpacing: 0.5,
  },
});
