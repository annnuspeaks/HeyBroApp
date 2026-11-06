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
import { useTheme } from '../theme/ThemeContext';

export default function ChatSettingScreen({ navigation }: any) {
  const { theme } = useTheme();

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
    { title: 'Read Receipts', subtitle: 'Show when messages are read', icon: 'checkmark-done-outline', color: COLORS.primary, key: 'readReceipts' },
    { title: 'Typing Indicators', subtitle: 'Show typing status in chats', icon: 'create-outline', color: COLORS.success, key: 'typingIndicators' },
    { title: 'Auto Download Media', subtitle: 'Automatically download media files', icon: 'cloud-download-outline', color: '#3B82F6', key: 'autoDownloadMedia' },
    { title: 'Enter to Send', subtitle: 'Send messages using enter key', icon: 'send-outline', color: '#F59E0B', key: 'enterToSend' },
    { title: 'Archive Inactive Chats', subtitle: 'Automatically archive old chats', icon: 'archive-outline', color: '#EC4899', key: 'archiveChats' },
    { title: 'Save to Gallery', subtitle: 'Save received photos and videos', icon: 'images-outline', color: '#14B8A6', key: 'saveToGallery' },
    { title: 'Smart Replies', subtitle: 'AI suggested quick replies', icon: 'sparkles-outline', color: '#6366F1', key: 'smartReplies' },
    { title: 'Pinned Chats Priority', subtitle: 'Keep pinned chats on top', icon: 'pin-outline', color: '#EF4444', key: 'pinnedChats' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={isTablet ? 26 : 22} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Chat Settings</Text>
          <View style={{ width: 48 }} />
        </View>

        <View style={[styles.heroCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.glow1} />
          <View style={styles.glow2} />
          <View style={styles.heroIcon}>
            <Ionicons name="chatbubble-ellipses-outline" size={isTablet ? 46 : 40} color={COLORS.primary} />
          </View>
          <Text style={[styles.heroTitle, { color: theme.text }]}>Customize Your Chats</Text>
          <Text style={[styles.heroSubtitle, { color: theme.subText }]}>
            Personalize chat experience, media behavior, smart replies and
            privacy preferences.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Messaging Preferences</Text>
          {chatItems.map((item, index) => (
            <View
              key={index}
              style={[styles.settingCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              <View style={styles.leftSection}>
                <View style={[styles.iconWrapper, { backgroundColor: `${item.color}20` }]}>
                  <Ionicons name={item.icon as any} size={isTablet ? 26 : 22} color={item.color} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.itemTitle, { color: theme.text }]}>{item.title}</Text>
                  <Text style={[styles.itemSubtitle, { color: theme.subText }]}>{item.subtitle}</Text>
                </View>
              </View>
              <Switch
                value={settings[item.key as keyof typeof settings]}
                onValueChange={() => toggleSwitch(item.key)}
                thumbColor={settings[item.key as keyof typeof settings] ? COLORS.primary : COLORS.secondary}
                trackColor={{ false: '#767577', true: 'rgba(168,85,247,0.35)' }}
              />
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Ionicons name="shield-checkmark-outline" size={isTablet ? 20 : 18} color={COLORS.success} />
          <Text style={[styles.footerText, { color: theme.subText }]}>
            Your chat settings are securely synced across all linked devices.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: verticalScale(60) },
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
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: fontScale(isTablet ? 30 : 26), fontWeight: '700' },
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
    borderWidth: 1,
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
  heroTitle: { fontSize: fontScale(isTablet ? 30 : 27), fontWeight: '700', textAlign: 'center' },
  heroSubtitle: {
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
    borderWidth: 1,
  },
  leftSection: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconWrapper: {
    width: isTablet ? 62 : 54,
    height: isTablet ? 62 : 54,
    borderRadius: moderateScale(18),
    marginRight: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: { flex: 1 },
  itemTitle: { fontSize: fontScale(isTablet ? 18 : 16), fontWeight: '700' },
  itemSubtitle: {
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
    textAlign: 'center',
    marginLeft: scale(10),
    lineHeight: verticalScale(isTablet ? 24 : 22),
    fontSize: fontScale(isTablet ? 14 : 13),
    flex: 1,
  },
});
