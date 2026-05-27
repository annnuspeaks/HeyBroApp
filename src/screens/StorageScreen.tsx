import React, { useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768;

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
    Alert.alert(
      'Clear Cache',
      'Do you want to clear temporary cached files?',
      [
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

            Alert.alert(
              'Success',
              'Cache cleared successfully.',
            );
          },
        },
      ],
    );
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
      color: '#22C55E',
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
              size={24}
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
            <Text style={styles.storageValue}>
              {totalUsed.toFixed(1)} GB
            </Text>

            <Text style={styles.storageLabel}>
              Used Storage
            </Text>
          </View>

          <Text style={styles.heroTitle}>
            Manage Your Storage
          </Text>

          <Text style={styles.heroSubtitle}>
            Review media usage and optimize storage
            space for better app performance.
          </Text>
        </View>

        {/* STORAGE LIST */}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Storage Breakdown
          </Text>

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
                    size={24}
                    color={item.color}
                  />
                </View>

                <View>
                  <Text style={styles.itemTitle}>
                    {item.title}
                  </Text>

                  <Text style={styles.itemSubtitle}>
                    App related stored data
                  </Text>
                </View>
              </View>

              <Text style={styles.itemValue}>
                {item.value.toFixed(1)} GB
              </Text>
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
              size={22}
              color="#fff"
            />

            <Text style={styles.clearButtonText}>
              Clear Cache
            </Text>
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
              size={22}
              color="#fff"
            />

            <Text style={styles.manageButtonText}>
              Manage Storage
            </Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={18}
            color="#22C55E"
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

  storageCircle: {
    width: isTablet ? 190 : 160,
    height: isTablet ? 190 : 160,

    borderRadius: 999,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(168,85,247,0.14)',

    borderWidth: 3,
    borderColor: 'rgba(168,85,247,0.28)',

    marginBottom: 26,
  },

  storageValue: {
    color: '#fff',

    fontSize: isTablet ? 34 : 30,
    fontWeight: '800',
  },

  storageLabel: {
    color: 'rgba(255,255,255,0.6)',

    marginTop: 6,

    fontSize: 14,
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

  storageCard: {
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

  leftRow: {
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

  itemTitle: {
    color: '#fff',

    fontSize: 17,
    fontWeight: '700',
  },

  itemSubtitle: {
    color: 'rgba(255,255,255,0.5)',

    marginTop: 6,

    fontSize: 13,
  },

  itemValue: {
    color: '#fff',

    fontSize: 15,
    fontWeight: '700',
  },

  actionsContainer: {
    marginTop: 18,

    paddingHorizontal: 20,
  },

  clearButton: {
    height: 58,

    borderRadius: 18,

    backgroundColor: '#EF4444',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 14,
  },

  clearButtonText: {
    color: '#fff',

    fontSize: 16,
    fontWeight: '700',

    marginLeft: 10,
  },

  manageButton: {
    height: 58,

    borderRadius: 18,

    backgroundColor: '#8B5CF6',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  manageButtonText: {
    color: '#fff',

    fontSize: 16,
    fontWeight: '700',

    marginLeft: 10,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 32,

    paddingHorizontal: 26,
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