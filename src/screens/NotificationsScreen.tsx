import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768;

export default function NotificationsScreen({
  navigation,
}: any) {
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
      color: '#8B5CF6',
      key: 'messages',
    },

    {
      title: 'Calls',
      subtitle: 'Incoming voice & video calls',
      icon: 'call-outline',
      color: '#22C55E',
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
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Notifications
          </Text>

          <View style={{ width: 48 }} />
        </View>

        {/* HERO CARD */}

        <View style={styles.heroCard}>
          <View style={styles.glow1} />

          <View style={styles.glow2} />

          <View style={styles.heroIcon}>
            <Ionicons
              name="notifications-outline"
              size={48}
              color="#8B5CF6"
            />
          </View>

          <Text style={styles.heroTitle}>
            Notification Preferences
          </Text>

          <Text style={styles.heroSubtitle}>
            Customize alerts, sounds, calls and popup
            notifications exactly the way you want.
          </Text>
        </View>

        {/* SETTINGS */}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Notification Settings
          </Text>

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
                    size={24}
                    color={item.color}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>
                    {item.title}
                  </Text>

                  <Text style={styles.itemSubtitle}>
                    {item.subtitle}
                  </Text>
                </View>
              </View>

              <Switch
                value={
                  notifications[
                    item.key as keyof typeof notifications
                  ]
                }
                onValueChange={() =>
                  toggleSwitch(item.key)
                }
                thumbColor={
                  notifications[
                    item.key as keyof typeof notifications
                  ]
                    ? '#8B5CF6'
                    : '#f4f3f4'
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
            size={18}
            color="#22C55E"
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

    backgroundColor: '#020826',
  },

  scrollContent: {
    paddingBottom: 60,
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

  heroCard: {
    marginTop: 34,

    marginHorizontal: 20,

    borderRadius: 32,

    overflow: 'hidden',

    alignItems: 'center',

    paddingVertical: 40,
    paddingHorizontal: 28,

    backgroundColor: 'rgba(255,255,255,0.04)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  glow1: {
    position: 'absolute',

    top: -90,
    left: -70,

    width: 220,
    height: 220,

    borderRadius: 999,

    backgroundColor: 'rgba(168,85,247,0.16)',
  },

  glow2: {
    position: 'absolute',

    bottom: -100,
    right: -80,

    width: 220,
    height: 220,

    borderRadius: 999,

    backgroundColor: 'rgba(59,130,246,0.12)',
  },

  heroIcon: {
    width: 90,
    height: 90,

    borderRadius: 45,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(168,85,247,0.14)',

    marginBottom: 22,
  },

  heroTitle: {
    color: '#fff',

    fontSize: isTablet ? 34 : 28,
    fontWeight: '700',

    textAlign: 'center',
  },

  heroSubtitle: {
    color: 'rgba(255,255,255,0.6)',

    marginTop: 14,

    textAlign: 'center',

    lineHeight: 24,

    fontSize: isTablet ? 18 : 15,
  },

  sectionContainer: {
    marginTop: 34,

    paddingHorizontal: 20,
  },

  sectionTitle: {
    color: '#fff',

    fontSize: isTablet ? 24 : 20,
    fontWeight: '700',

    marginBottom: 18,
  },

  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderRadius: 24,

    paddingVertical: 18,
    paddingHorizontal: 18,

    marginBottom: 14,

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
    width: 58,
    height: 58,

    borderRadius: 18,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 16,
  },

  textContainer: {
    flex: 1,
  },

  itemTitle: {
    color: '#fff',

    fontSize: 17,
    fontWeight: '700',
  },

  itemSubtitle: {
    color: 'rgba(255,255,255,0.5)',

    marginTop: 6,

    fontSize: 13,

    lineHeight: 20,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 28,

    paddingHorizontal: 24,
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