import React, { useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
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

export default function StorageScreen({ navigation }: any) {
  const [storageData, setStorageData] = useState({
    photos: 2.8,
    videos: 8.4,
    voice: 1.6,
    documents: 0.9,
    cache: 1.3,
  });

  const totalUsed = useMemo(() => {
    return (
      storageData.photos +
      storageData.videos +
      storageData.voice +
      storageData.documents +
      storageData.cache
    );
  }, [storageData]);

  const clearCache = () => {
    Alert.alert('Clear Cache', 'Do you want to clear temporary cached files?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },

      {
        text: 'Clear',
        style: 'destructive',

        onPress: () => {
          setStorageData(prev => ({
            ...prev,
            cache: 0,
          }));

          Alert.alert('Success', 'Cache cleared successfully.');
        },
      },
    ]);
  };

  const storageItems = [
    {
      title: 'Photos',
      value: storageData.photos,
      icon: 'image-outline',
      color: '#A855F7',
    },

    {
      title: 'Videos',
      value: storageData.videos,
      icon: 'videocam-outline',
      color: '#3B82F6',
    },

    {
      title: 'Voice Messages',
      value: storageData.voice,
      icon: 'mic-outline',
      color: COLORS.success,
    },

    {
      title: 'Documents',
      value: storageData.documents,
      icon: 'document-text-outline',
      color: '#F59E0B',
    },

    {
      title: 'Cache',
      value: storageData.cache,
      icon: 'trash-outline',
      color: '#EF4444',
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
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Storage</Text>

          <View style={{ width: 48 }} />
        </View>

        {/* STORAGE HERO */}

        <View style={styles.heroCard}>
          <View style={styles.glow1} />

          <View style={styles.glow2} />

          <View style={styles.storageCircle}>
            <Text style={styles.storageValue}>{totalUsed.toFixed(1)} GB</Text>

            <Text style={styles.storageLabel}>Used Storage</Text>
          </View>

          <Text style={styles.heroTitle}>Manage Your Storage</Text>

          <Text style={styles.heroSubtitle}>
            Review media usage and optimize storage space for better app
            performance.
          </Text>
        </View>

        {/* STORAGE LIST */}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Storage Breakdown</Text>

          {storageItems.map((item, index) => (
            <View key={index} style={styles.storageCard}>
              <View style={styles.leftRow}>
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

                <View>
                  <Text style={styles.itemTitle}>{item.title}</Text>

                  <Text style={styles.itemSubtitle}>
                    App related stored data
                  </Text>
                </View>
              </View>

              <Text style={styles.itemValue}>{item.value.toFixed(1)} GB</Text>
            </View>
          ))}
        </View>

        {/* ACTIONS */}

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.clearButton}
            onPress={clearCache}
          >
            <Ionicons
              name="trash-bin-outline"
              size={isTablet ? 24 : 22}
              color="#fff"
            />

            <Text style={styles.clearButtonText}>Clear Cache</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.manageButton}
            onPress={() =>
              Alert.alert(
                'Coming Soon',
                'Advanced storage management will be available soon.',
              )
            }
          >
            <Ionicons
              name="settings-outline"
              size={isTablet ? 24 : 22}
              color="#fff"
            />

            <Text style={styles.manageButtonText}>Manage Storage</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={isTablet ? 20 : 18}
            color={COLORS.success}
          />

          <Text style={styles.footerText}>
            Your media files are securely stored and encrypted.
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

  storageCircle: {
    width: isTablet ? 180 : 150,
    height: isTablet ? 180 : 150,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(168,85,247,0.14)',
    borderWidth: moderateScale(3),
    borderColor: 'rgba(168,85,247,0.28)',
    marginBottom: verticalScale(26),
  },

  storageValue: {
    color: COLORS.white,
    fontSize: fontScale(isTablet ? 32 : 28),
    fontWeight: '800',
  },

  storageLabel: {
    color: 'rgba(255,255,255,0.6)',
    marginTop: verticalScale(6),
    fontSize: fontScale(isTablet ? 15 : 14),
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
    color: '#fff',
    fontSize: fontScale(isTablet ? 22 : 20),
    marginBottom: verticalScale(18),
    fontWeight: '700',
  },

  storageCard: {
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

  leftRow: {
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

  itemTitle: {
    color: '#fff',
    fontSize: fontScale(isTablet ? 18 : 16),
    fontWeight: '700',
  },

  itemSubtitle: {
    color: 'rgba(255,255,255,0.5)',
    marginTop: verticalScale(6),
    fontSize: fontScale(isTablet ? 14 : 13),
  },

  itemValue: {
    color: '#fff',
    fontSize: fontScale(isTablet ? 16 : 15),
    fontWeight: '700',
  },

  actionsContainer: {
    marginTop: verticalScale(18),
    paddingHorizontal: scale(20),
    width: '100%',
    alignSelf: 'center',
    maxWidth: 1300,
  },

  clearButton: {
    height: isTablet ? 64 : 58,
    borderRadius: moderateScale(18),
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  clearButtonText: {
    color: '#fff',
    fontSize: fontScale(isTablet ? 17 : 16),
    marginLeft: scale(10),
    fontWeight: '700',
  },

  manageButton: {
    height: isTablet ? 64 : 58,
    borderRadius: moderateScale(18),
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  manageButtonText: {
    color: '#fff',
    fontSize: fontScale(isTablet ? 17 : 16),
    marginLeft: scale(10),
    fontWeight: '700',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(32),
    paddingHorizontal: scale(26),
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
