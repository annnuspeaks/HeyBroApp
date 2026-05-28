import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Switch,
  Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../theme/colors';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768;

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
            setDevices(prev =>
              prev.filter(device => device.id !== id),
            );
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
              size={24}
              color={COLORS.white}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Linked Devices
          </Text>

          <View style={{ width: 48 }} />
        </View>

        {/* TOP CARD */}

        <View style={styles.heroCard}>
          <View style={styles.glow1} />

          <View style={styles.glow2} />

          <View style={styles.heroIcon}>
            <Ionicons
              name="desktop-outline"
              size={48}
              color="#A855F7"
            />
          </View>

          <Text style={styles.heroTitle}>
            Manage Connected Devices
          </Text>

          <Text style={styles.heroSubtitle}>
            Securely manage devices connected to your
            HeyBro account.
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.linkButton}
          >
            <Ionicons
              name="add-circle-outline"
              size={22}
              color={COLORS.white}
            />

            <Text style={styles.linkButtonText}>
              Link New Device
            </Text>
          </TouchableOpacity>
        </View>

        {/* DEVICE LIST */}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Connected Devices
          </Text>

          {devices.map(device => (
            <View key={device.id} style={styles.deviceCard}>
              {/* TOP */}

              <View style={styles.deviceTop}>
                <View style={styles.leftSection}>
                  <View style={styles.deviceIconWrapper}>
                    <Ionicons
                      name={device.type as any}
                      size={28}
                      color="#A855F7"
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={styles.nameRow}>
                      <Text
                        numberOfLines={1}
                        style={styles.deviceName}
                      >
                        {device.name}
                      </Text>

                      {device.active && (
                        <View style={styles.activeDot} />
                      )}
                    </View>

                    <Text style={styles.location}>
                      {device.location}
                    </Text>

                    <Text style={styles.lastActive}>
                      {device.lastActive}
                    </Text>
                  </View>
                </View>
              </View>

              {/* TRUST */}

              <View style={styles.bottomRow}>
                <View>
                  <Text style={styles.trustedTitle}>
                    Trusted Device
                  </Text>

                  <Text style={styles.trustedSubtitle}>
                    Allow seamless secure login
                  </Text>
                </View>

                <Switch
                  value={device.trusted}
                  onValueChange={() =>
                    toggleTrusted(device.id)
                  }
                  thumbColor={
                    device.trusted
                      ? COLORS.primary
                      : COLORS.secondary
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
                onPress={() =>
                  unlinkDevice(device.id)
                }
              >
                <Ionicons
                  name="unlink-outline"
                  size={18}
                  color="#ff4d4f"
                />

                <Text style={styles.removeText}>
                  Unlink Device
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Ionicons
            name="shield-checkmark"
            size={18}
            color={COLORS.success}
          />

          <Text style={styles.footerText}>
            Your devices are protected with secure
            authentication.
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
    marginTop: 36,

    marginHorizontal: 20,

    borderRadius: 30,

    overflow: 'hidden',

    paddingVertical: 38,
    paddingHorizontal: 28,

    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.04)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  glow1: {
    position: 'absolute',

    top: -90,
    left: -80,

    width: 220,
    height: 220,

    borderRadius: 999,

    backgroundColor: 'rgba(168,85,247,0.15)',
  },

  glow2: {
    position: 'absolute',

    bottom: -100,
    right: -70,

    width: 220,
    height: 220,

    borderRadius: 999,

    backgroundColor: 'rgba(34,197,94,0.08)',
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

  linkButton: {
    marginTop: 28,

    height: 58,

    paddingHorizontal: 26,

    borderRadius: 18,

    backgroundColor: COLORS.primary,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  linkButtonText: {
    color: COLORS.white,

    fontSize: 16,
    fontWeight: '700',

    marginLeft: 10,
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

  deviceCard: {
    borderRadius: 26,

    padding: 22,

    marginBottom: 18,

    backgroundColor: 'rgba(255,255,255,0.04)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  deviceTop: {
    marginBottom: 20,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  deviceIconWrapper: {
    width: 64,
    height: 64,

    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(168,85,247,0.12)',

    marginRight: 16,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  activeDot: {
    width: 10,
    height: 10,

    borderRadius: 999,

    backgroundColor: COLORS.success,

    marginLeft: 10,
  },

  deviceName: {
    color: COLORS.white,

    fontSize: 18,
    fontWeight: '700',

    maxWidth: width * 0.45,
  },

  location: {
    color: 'rgba(255,255,255,0.55)',

    marginTop: 6,

    fontSize: 14,
  },

  lastActive: {
    color: '#A855F7',

    marginTop: 6,

    fontSize: 13,
    fontWeight: '600',
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 18,
  },

  trustedTitle: {
    color: COLORS.white,

    fontSize: 15,
    fontWeight: '700',
  },

  trustedSubtitle: {
    color: 'rgba(255,255,255,0.45)',

    marginTop: 4,

    fontSize: 13,
  },

  removeButton: {
    height: 48,

    borderRadius: 16,

    backgroundColor: 'rgba(255,77,79,0.12)',

    borderWidth: 1,
    borderColor: 'rgba(255,77,79,0.18)',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  removeText: {
    color: '#ff4d4f',

    fontSize: 15,
    fontWeight: '700',

    marginLeft: 8,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 20,

    paddingHorizontal: 20,
  },

  footerText: {
    color: 'rgba(255,255,255,0.5)',

    marginLeft: 10,

    fontSize: 13,

    textAlign: 'center',

    flex: 1,
  },
});