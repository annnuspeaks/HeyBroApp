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

import {COLORS} from '../theme/colors';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768;

export default function ChatSettingScreen({
  navigation,
}: any) {
  const [settings, setSettings] = useState({
    readReceipts: true,
    typingIndicators: true,
    autoDownloadMedia: false,
    enterToSend: true,
    archiveChats: false,
    saveToGallery: true,
    smartReplies: true,
    pinnedChats: true,
  });

  const toggleSwitch = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const chatItems = [
    {
      title: 'Read Receipts',
      subtitle: 'Show when messages are read',
      icon: 'checkmark-done-outline',
      color: COLORS.primary,
      key: 'readReceipts',
    },

    {
      title: 'Typing Indicators',
      subtitle: 'Show typing status in chats',
      icon: 'create-outline',
      color: COLORS.success,
      key: 'typingIndicators',
    },

    {
      title: 'Auto Download Media',
      subtitle: 'Automatically download media files',
      icon: 'cloud-download-outline',
      color: '#3B82F6',
      key: 'autoDownloadMedia',
    },

    {
      title: 'Enter to Send',
      subtitle: 'Send messages using enter key',
      icon: 'send-outline',
      color: '#F59E0B',
      key: 'enterToSend',
    },

    {
      title: 'Archive Inactive Chats',
      subtitle: 'Automatically archive old chats',
      icon: 'archive-outline',
      color: '#EC4899',
      key: 'archiveChats',
    },

    {
      title: 'Save to Gallery',
      subtitle: 'Save received photos and videos',
      icon: 'images-outline',
      color: '#14B8A6',
      key: 'saveToGallery',
    },

    {
      title: 'Smart Replies',
      subtitle: 'AI suggested quick replies',
      icon: 'sparkles-outline',
      color: '#6366F1',
      key: 'smartReplies',
    },

    {
      title: 'Pinned Chats Priority',
      subtitle: 'Keep pinned chats on top',
      icon: 'pin-outline',
      color: '#EF4444',
      key: 'pinnedChats',
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
              color={COLORS.white}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Chat Settings
          </Text>

          <View style={{ width: 48 }} />
        </View>

        {/* HERO CARD */}

        <View style={styles.heroCard}>
          <View style={styles.glow1} />

          <View style={styles.glow2} />

          <View style={styles.heroIcon}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={48}
              color={COLORS.primary}
            />
          </View>

          <Text style={styles.heroTitle}>
            Customize Your Chats
          </Text>

          <Text style={styles.heroSubtitle}>
            Personalize chat experience, media behavior,
            smart replies and privacy preferences.
          </Text>
        </View>

        {/* SETTINGS */}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Messaging Preferences
          </Text>

          {chatItems.map((item, index) => (
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
                  settings[
                    item.key as keyof typeof settings
                  ]
                }
                onValueChange={() =>
                  toggleSwitch(item.key)
                }
                thumbColor={
                  settings[
                    item.key as keyof typeof settings
                  ]
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
            size={18}
            color={COLORS.success}
          />

          <Text style={styles.footerText}>
            Your chat settings are securely synced across
            all linked devices.
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
    color: COLORS.white,
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
    color: COLORS.white,
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
    color: COLORS.white,
    fontSize: isTablet ? 24 : 20,
    fontWeight: '700',
    marginBottom: 18,
  },

  settingCard: {
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
    color: COLORS.white,
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