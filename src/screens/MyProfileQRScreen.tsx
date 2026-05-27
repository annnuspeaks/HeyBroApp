import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg';

const { width, height } = Dimensions.get('window');

const isLandscape = width > height;
const isTablet = width >= 768;

export default function MyProfileQRScreen({
  navigation,
  route,
}: any) {
  // PROFILE SCREEN SE DATA SYNC

  const profile = route?.params?.profile || {
    name: 'Harshvardhan',
    phone: '+91 9876543210',
    image: 'https://i.pravatar.cc/300',
  };

  const qrValue = JSON.stringify({
    id: 'tas_user_001',
    name: profile.name,
    phone: profile.phone,
  });

  // RESPONSIVE QR SIZE

  const qrSize = isLandscape
    ? Math.min(height * 0.44, 320)
    : Math.min(width * 0.62, 340);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My QR Code</Text>

          <View style={{ width: 42 }} />
        </View>

        {/* QR CARD */}

        <View style={styles.qrCard}>
          {/* DECORATION */}

          <View style={styles.glowTop} />

          <View style={styles.glowBottom} />

          {/* PROFILE IMAGE */}

          <Image
            source={{
              uri: profile.image,
            }}
            style={styles.avatar}
          />

          {/* NAME */}

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.name}
          >
            {profile.name}
          </Text>

          {/* PHONE */}

          <Text style={styles.phone}>{profile.phone}</Text>

          {/* SUBTEXT */}

          <Text style={styles.subText}>
            Scan this QR to start chatting
          </Text>

          {/* QR */}

          <View style={styles.qrWrapper}>
            <QRCode
              value={qrValue}
              size={qrSize}
              color="#000"
              backgroundColor="#fff"
            />
          </View>

          {/* FOOTER */}

          <Text style={styles.infoText}>
            TAS Secure Chat Identity
          </Text>

          <Text style={styles.bottomInfo}>
            Share this QR with your friends to connect instantly.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#020826',
  },

  scrollContainer: {
    flexGrow: 1,

    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 18,

    marginTop: 10,
  },

  backBtn: {
    width: 42,
    height: 42,

    borderRadius: 21,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.06)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  headerTitle: {
    color: '#fff',

    fontSize: 21,
    fontWeight: '700',
  },

  qrCard: {
    overflow: 'hidden',

    flex: 1,

    marginTop: isLandscape ? 16 : 38,

    marginHorizontal: isLandscape ? 36 : 18,

    borderRadius: 34,

    paddingTop: isLandscape ? 24 : 34,
    paddingBottom: isLandscape ? 26 : 34,

    paddingHorizontal: isLandscape ? 18 : 20,

    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.04)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },

  glowTop: {
    position: 'absolute',

    top: -120,
    left: -120,

    width: 240,
    height: 240,

    borderRadius: 999,

    backgroundColor: 'rgba(139,92,246,0.16)',
  },

  glowBottom: {
    position: 'absolute',

    bottom: -120,
    right: -120,

    width: 240,
    height: 240,

    borderRadius: 999,

    backgroundColor: 'rgba(59,130,246,0.12)',
  },

  avatar: {
    width: isLandscape ? 82 : 92,
    height: isLandscape ? 82 : 92,

    borderRadius: 100,

    borderWidth: 2.5,
    borderColor: '#8B5CF6',

    marginBottom: 18,
  },

  name: {
    color: '#fff',

    fontSize: isLandscape ? 28 : 34,
    fontWeight: '800',

    maxWidth: '90%',
  },

  phone: {
    color: 'rgba(255,255,255,0.62)',

    marginTop: 8,

    fontSize: isLandscape ? 15 : 17,
  },

  subText: {
    color: 'rgba(255,255,255,0.5)',

    fontSize: 15,

    marginTop: 14,
    marginBottom: isLandscape ? 18 : 26,

    textAlign: 'center',
  },

  qrWrapper: {
    backgroundColor: '#fff',

    padding: isLandscape ? 12 : 16,

    borderRadius: 28,

    shadowColor: '#000',

    shadowOpacity: 0.28,
    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 12,
  },

  infoText: {
    color: '#A78BFA',

    marginTop: isLandscape ? 18 : 24,

    fontSize: 15,
    fontWeight: '700',

    letterSpacing: 0.4,
  },

  bottomInfo: {
    color: 'rgba(255,255,255,0.42)',

    marginTop: 10,

    fontSize: 12.5,

    lineHeight: 19,

    textAlign: 'center',

    paddingHorizontal: 14,

    maxWidth: 420,
  },
});