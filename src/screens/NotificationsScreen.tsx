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

export default function NotificationsScreen({ navigation }: any) {
  const [notifications, setNotifications] = useState({
    messages: true,
    calls: true,
    groupMessages: true,
    mentions: true,
    sound: true,
    vibration: true,
    popup: false,
    appUpdates: true,
  });

  const toggleSwitch = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const notificationItems = [
    {
      title: 'Messages',
      subtitle: 'Get notified for new messages',
      icon: 'chatbubble-ellipses-outline',
      color: COLORS.primary,
      key: 'messages',
    },

    {
      title: 'Calls',
      subtitle: 'Incoming voice & video calls',
      icon: 'call-outline',
      color: COLORS.success,
      key: 'calls',
    },

    {
      title: 'Group Messages',
      subtitle: 'Notifications from group chats',
      icon: 'people-outline',
      color: '#3B82F6',
      key: 'groupMessages',
    },

    {
      title: 'Mentions',
      subtitle: 'When someone mentions you',
      icon: 'at-outline',
      color: '#F59E0B',
      key: 'mentions',
    },

    {
      title: 'Sound',
      subtitle: 'Notification sounds',
      icon: 'volume-high-outline',
      color: '#EC4899',
      key: 'sound',
    },

    {
      title: 'Vibration',
      subtitle: 'Vibrate on notifications',
      icon: 'phone-portrait-outline',
      color: '#14B8A6',
      key: 'vibration',
    },

    {
      title: 'Popup Notifications',
      subtitle: 'Show popup notifications',
      icon: 'albums-outline',
      color: '#EF4444',
      key: 'popup',
    },

    {
      title: 'App Updates',
      subtitle: 'Updates and announcements',
      icon: 'cloud-download-outline',
      color: '#6366F1',
      key: 'appUpdates',
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

          <Text style={styles.headerTitle}>Notifications</Text>

          <View style={{ width: 48 }} />
        </View>

        {/* HERO CARD */}

        <View style={styles.heroCard}>
          <View style={styles.glow1} />

          <View style={styles.glow2} />

          <View style={styles.heroIcon}>
            <Ionicons
              name="notifications-outline"
              size={isTablet ? 46 : 40}
              color={COLORS.primary}
            />
          </View>

          <Text style={styles.heroTitle}>Notification Preferences</Text>

          <Text style={styles.heroSubtitle}>
            Customize alerts, sounds, calls and popup notifications exactly the
            way you want.
          </Text>
        </View>

        {/* SETTINGS */}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>

          {notificationItems.map((item, index) => (
            <View key={index} style={styles.notificationCard}>
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
                value={notifications[item.key as keyof typeof notifications]}
                onValueChange={() => toggleSwitch(item.key)}
                thumbColor={
                  notifications[item.key as keyof typeof notifications]
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
            name="shield-checkmark-outline"
            size={isTablet ? 20 : 18}
            color={COLORS.success}
          />

          <Text style={styles.footerText}>
            Your notification preferences are securely saved.
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

  notificationCard: {
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
    textAlign: 'center',
    marginLeft: scale(10),
    lineHeight: verticalScale(isTablet ? 24 : 22),
    fontSize: fontScale(isTablet ? 14 : 13),
    flex: 1,
  },
});
