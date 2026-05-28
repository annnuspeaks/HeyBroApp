import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
  isTablet,
  SCREEN_WIDTH,
} from '../theme/responsive';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../theme/colors';

export default function LinkedDevices({ navigation }: any) {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'MacBook Pro',
      type: 'desktop-outline',
      location: 'New Delhi, India',
      active: true,
      lastActive: 'Active now',
      trusted: true,
    },

    {
      id: 2,
      name: 'iPad Air',
      type: 'tablet-portrait-outline',
      location: 'Mumbai, India',
      active: false,
      lastActive: 'Last active 2h ago',
      trusted: true,
    },

    {
      id: 3,
      name: 'Windows Laptop',
      type: 'laptop-outline',
      location: 'Bangalore, India',
      active: false,
      lastActive: 'Last active yesterday',
      trusted: false,
    },
  ]);

  const toggleTrusted = (id: number) => {
    setDevices(prev =>
      prev.map(device =>
        device.id === id
          ? {
              ...device,
              trusted: !device.trusted,
            }
          : device,
      ),
    );
  };

  const unlinkDevice = (id: number) => {
    Alert.alert(
      'Remove Device',
      'Are you sure you want to unlink this device?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Remove',
          style: 'destructive',

          onPress: () => {
            setDevices(prev => prev.filter(device => device.id !== id));
          },
        },
      ],
    );
  };

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

          <Text style={styles.headerTitle}>Linked Devices</Text>

          <View style={{ width: 48 }} />
        </View>

        {/* TOP CARD */}

        <View style={styles.heroCard}>
          <View style={styles.glow1} />

          <View style={styles.glow2} />

          <View style={styles.heroIcon}>
            <Ionicons
              name="desktop-outline"
              size={isTablet ? 46 : 40}
              color="#A855F7"
            />
          </View>

          <Text style={styles.heroTitle}>Manage Connected Devices</Text>

          <Text style={styles.heroSubtitle}>
            Securely manage devices connected to your HeyBro account.
          </Text>

          <TouchableOpacity activeOpacity={0.85} style={styles.linkButton}>
            <Ionicons
              name="add-circle-outline"
              size={isTablet ? 24 : 22}
              color={COLORS.white}
            />

            <Text style={styles.linkButtonText}>Link New Device</Text>
          </TouchableOpacity>
        </View>

        {/* DEVICE LIST */}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Connected Devices</Text>

          {devices.map(device => (
            <View key={device.id} style={styles.deviceCard}>
              {/* TOP */}

              <View style={styles.deviceTop}>
                <View style={styles.leftSection}>
                  <View style={styles.deviceIconWrapper}>
                    <Ionicons
                      name={device.type as any}
                      size={isTablet ? 30 : 26}
                      color="#A855F7"
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={styles.nameRow}>
                      <Text numberOfLines={1} style={styles.deviceName}>
                        {device.name}
                      </Text>

                      {device.active && <View style={styles.activeDot} />}
                    </View>

                    <Text style={styles.location}>{device.location}</Text>

                    <Text style={styles.lastActive}>{device.lastActive}</Text>
                  </View>
                </View>
              </View>

              {/* TRUST */}

              <View style={styles.bottomRow}>
                <View>
                  <Text style={styles.trustedTitle}>Trusted Device</Text>

                  <Text style={styles.trustedSubtitle}>
                    Allow seamless secure login
                  </Text>
                </View>

                <Switch
                  value={device.trusted}
                  onValueChange={() => toggleTrusted(device.id)}
                  thumbColor={
                    device.trusted ? COLORS.primary : COLORS.secondary
                  }
                  trackColor={{
                    false: '#767577',
                    true: 'rgba(168,85,247,0.4)',
                  }}
                />
              </View>

              {/* REMOVE */}

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.removeButton}
                onPress={() => unlinkDevice(device.id)}
              >
                <Ionicons
                  name="unlink-outline"
                  size={isTablet ? 20 : 18}
                  color="#ff4d4f"
                />

                <Text style={styles.removeText}>Unlink Device</Text>
              </TouchableOpacity>
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
            Your devices are protected with secure authentication.
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
    marginTop: verticalScale(36),
    marginHorizontal: scale(20),
    borderRadius: moderateScale(30),
    paddingVertical: verticalScale(38),
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
    left: scale(-80),
    width: scale(isTablet ? 260 : 220),
    height: scale(isTablet ? 260 : 220),
    borderRadius: 999,
    backgroundColor: 'rgba(168,85,247,0.15)',
  },

  glow2: {
    position: 'absolute',
    bottom: verticalScale(-100),
    right: scale(-70),
    width: scale(isTablet ? 260 : 220),
    height: scale(isTablet ? 260 : 220),
    borderRadius: 999,
    backgroundColor: 'rgba(34,197,94,0.08)',
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
    textAlign: 'center',
    marginTop: verticalScale(14),
    lineHeight: verticalScale(isTablet ? 28 : 24),
    fontSize: fontScale(isTablet ? 16 : 15),
    maxWidth: isTablet ? '75%' : '100%',
  },

  linkButton: {
    marginTop: verticalScale(28),
    height: isTablet ? 64 : 58,
    paddingHorizontal: scale(26),
    borderRadius: moderateScale(18),
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  linkButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: fontScale(isTablet ? 17 : 16),
    marginLeft: scale(10),
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
    fontWeight: '700',
    fontSize: fontScale(isTablet ? 22 : 20),
    marginBottom: verticalScale(18),
  },

  deviceCard: {
    borderRadius: moderateScale(26),
    padding: scale(22),
    marginBottom: verticalScale(18),
    minHeight: isTablet ? 190 : 170,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  deviceTop: {
    marginBottom: verticalScale(20),
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  deviceIconWrapper: {
    width: isTablet ? 68 : 58,
    height: isTablet ? 68 : 58,
    borderRadius: moderateScale(20),
    marginRight: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(168,85,247,0.12)',
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  activeDot: {
    width: isTablet ? 12 : 10,
    height: isTablet ? 12 : 10,
    marginLeft: scale(10),
    borderRadius: 999,
    backgroundColor: COLORS.success,
  },

  deviceName: {
    color: COLORS.white,
    fontSize: fontScale(isTablet ? 19 : 17),
    maxWidth: SCREEN_WIDTH * 0.42,
    fontWeight: '700',
  },

  location: {
    color: 'rgba(255,255,255,0.55)',
    marginTop: verticalScale(6),
    fontSize: fontScale(isTablet ? 15 : 14),
  },

  lastActive: {
    color: '#A855F7',
    marginTop: verticalScale(6),
    fontSize: fontScale(isTablet ? 14 : 13),
    fontWeight: '600',
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(18),
  },

  trustedTitle: {
    color: COLORS.white,
    fontSize: fontScale(isTablet ? 16 : 15),
    fontWeight: '700',
  },

  trustedSubtitle: {
    color: 'rgba(255,255,255,0.45)',
    marginTop: verticalScale(4),
    fontSize: fontScale(isTablet ? 14 : 13),
  },

  removeButton: {
    height: isTablet ? 52 : 48,
    borderRadius: moderateScale(16),
    backgroundColor: 'rgba(255,77,79,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,77,79,0.18)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  removeText: {
    color: '#ff4d4f',
    fontSize: fontScale(isTablet ? 16 : 15),
    marginLeft: scale(8),
    fontWeight: '700',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),
    paddingHorizontal: scale(20),
    maxWidth: 1200,
    alignSelf: 'center',
  },

  footerText: {
    color: 'rgba(255,255,255,0.5)',
    marginLeft: scale(10),
    fontSize: fontScale(isTablet ? 14 : 13),
    textAlign: 'center',
    flex: 1,
  },
});
