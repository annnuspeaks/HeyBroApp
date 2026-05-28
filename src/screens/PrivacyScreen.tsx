import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
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

export default function PrivacyScreen({ navigation }: any) {
  const [privacy, setPrivacy] = useState({
    lastSeen: true,
    profilePhoto: true,
    onlineStatus: true,
    readReceipts: true,
    calls: true,
    groups: false,
    fingerprintLock: false,
    screenshotProtection: true,
  });

  const toggleSwitch = (key: string) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const privacyItems = [
    {
      title: 'Last Seen',
      subtitle: 'Allow others to see your last seen',
      icon: 'time-outline',
      color: COLORS.primary,
      key: 'lastSeen',
    },

    {
      title: 'Profile Photo',
      subtitle: 'Control profile picture visibility',
      icon: 'image-outline',
      color: '#3B82F6',
      key: 'profilePhoto',
    },

    {
      title: 'Online Status',
      subtitle: 'Show when you are online',
      icon: 'radio-outline',
      color: COLORS.success,
      key: 'onlineStatus',
    },

    {
      title: 'Read Receipts',
      subtitle: 'Let others know you read messages',
      icon: 'checkmark-done-outline',
      color: '#F59E0B',
      key: 'readReceipts',
    },

    {
      title: 'Voice & Video Calls',
      subtitle: 'Allow incoming calls from others',
      icon: 'call-outline',
      color: '#EC4899',
      key: 'calls',
    },

    {
      title: 'Group Invitations',
      subtitle: 'Allow people to add you to groups',
      icon: 'people-outline',
      color: '#14B8A6',
      key: 'groups',
    },

    {
      title: 'Fingerprint Lock',
      subtitle: 'Secure chats using biometric lock',
      icon: 'finger-print-outline',
      color: '#6366F1',
      key: 'fingerprintLock',
    },

    {
      title: 'Screenshot Protection',
      subtitle: 'Prevent screenshots in private chats',
      icon: 'shield-checkmark-outline',
      color: '#EF4444',
      key: 'screenshotProtection',
    },
  ];

  return (
    <View style={styles.container}>
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
              size={isTablet ? 26 : 22}
              color={COLORS.white}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Privacy</Text>

          <View style={{ width: 48 }} />
        </View>

        {/* HERO CARD */}

        <View style={styles.heroCard}>
          <View style={styles.glow1} />

          <View style={styles.glow2} />

          <View style={styles.heroIcon}>
            <Ionicons
              name="lock-closed-outline"
              size={isTablet ? 46 : 40}
              color="#8B5CF6"
            />
          </View>

          <Text style={styles.heroTitle}>Privacy & Security</Text>

          <Text style={styles.heroSubtitle}>
            Manage your privacy settings and control how others interact with
            you on HeyBro.
          </Text>
        </View>

        {/* SETTINGS */}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Privacy Preferences</Text>

          {privacyItems.map((item, index) => (
            <View key={index} style={styles.settingCard}>
              <View style={styles.leftSection}>
                <View
                  style={[
                    styles.iconWrapper,
                    {
                      backgroundColor: `${item.color}20`,
                    },
                  ]}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={isTablet ? 26 : 22}
                    color={item.color}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>

                  <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>

              <Switch
                value={privacy[item.key as keyof typeof privacy]}
                onValueChange={() => toggleSwitch(item.key)}
                thumbColor={
                  privacy[item.key as keyof typeof privacy]
                    ? COLORS.primary
                    : COLORS.secondary
                }
                trackColor={{
                  false: '#767577',
                  true: 'rgba(168,85,247,0.35)',
                }}
              />
            </View>
          ))}
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Ionicons
            name="shield-checkmark"
            size={isTablet ? 20 : 18}
            color={COLORS.success}
          />

          <Text style={styles.footerText}>
            Your privacy preferences are encrypted and securely protected.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingBottom: verticalScale(60),
  },

  header: {
    marginTop: verticalScale(isTablet ? 20 : 28),
    paddingHorizontal: scale(20),
    width: '100%',
    alignSelf: 'center',
    maxWidth: 1300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: isTablet ? 52 : 46,
    height: isTablet ? 52 : 46,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: fontScale(isTablet ? 30 : 26),
    fontWeight: '700',
  },

  heroCard: {
    marginTop: verticalScale(34),
    marginHorizontal: scale(20),
    borderRadius: moderateScale(32),
    paddingVertical: verticalScale(40),
    paddingHorizontal: scale(28),
    width: '92%',
    alignSelf: 'center',
    maxWidth: 1300,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  glow1: {
    position: 'absolute',
    top: verticalScale(-90),
    left: scale(-70),
    width: scale(isTablet ? 260 : 220),
    height: scale(isTablet ? 260 : 220),
    borderRadius: 999,
    backgroundColor: 'rgba(168,85,247,0.16)',
  },

  glow2: {
    position: 'absolute',
    bottom: verticalScale(-100),
    right: scale(-80),
    width: scale(isTablet ? 260 : 220),
    height: scale(isTablet ? 260 : 220),
    borderRadius: 999,
    backgroundColor: 'rgba(59,130,246,0.12)',
  },

  heroIcon: {
    width: isTablet ? 95 : 82,
    height: isTablet ? 95 : 82,
    borderRadius: 999,
    marginBottom: verticalScale(22),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(168,85,247,0.14)',
  },

  heroTitle: {
    color: COLORS.white,
    fontSize: fontScale(isTablet ? 30 : 27),
    fontWeight: '700',
    textAlign: 'center',
  },

  heroSubtitle: {
    color: 'rgba(255,255,255,0.6)',
    marginTop: verticalScale(14),
    lineHeight: verticalScale(isTablet ? 28 : 24),
    fontSize: fontScale(isTablet ? 16 : 15),
    maxWidth: isTablet ? '75%' : '100%',
    textAlign: 'center',
  },

  sectionContainer: {
    marginTop: verticalScale(34),
    paddingHorizontal: scale(20),
    width: '100%',
    alignSelf: 'center',
    maxWidth: 1300,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: fontScale(isTablet ? 22 : 20),
    marginBottom: verticalScale(18),
    fontWeight: '700',
  },

  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: moderateScale(24),
    paddingVertical: verticalScale(18),
    paddingHorizontal: scale(18),
    marginBottom: verticalScale(14),
    minHeight: isTablet ? 92 : 82,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  iconWrapper: {
    width: isTablet ? 62 : 54,
    height: isTablet ? 62 : 54,
    borderRadius: moderateScale(18),
    marginRight: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
  },

  itemTitle: {
    color: COLORS.white,
    fontSize: fontScale(isTablet ? 18 : 16),
    fontWeight: '700',
  },

  itemSubtitle: {
    color: 'rgba(255,255,255,0.5)',
    marginTop: verticalScale(6),
    fontSize: fontScale(isTablet ? 14 : 13),
    lineHeight: verticalScale(isTablet ? 24 : 20),
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(28),
    paddingHorizontal: scale(24),
    maxWidth: 1200,
    alignSelf: 'center',
  },

  footerText: {
    color: 'rgba(255,255,255,0.5)',
    marginLeft: 10,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 13,
    flex: 1,
  },
});
