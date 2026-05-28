import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
  isTablet,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../theme/responsive';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useUserStore } from '../store/userStore';

import { COLORS } from '../theme/colors';

import QRCode from 'react-native-qrcode-svg';

const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;

export default function MyProfileQRScreen({ navigation }: any) {
  // PROFILE SCREEN SE DATA SYNC

  const { profile } = useUserStore();

  const qrValue = JSON.stringify({
    id: 'tas_user_001',
    name: profile.name,
    phone: profile.phone,
  });

  // RESPONSIVE QR SIZE

  const qrSize = isLandscape ? (isTablet ? 240 : 210) : isTablet ? 300 : 240;

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
            <Ionicons
              name="arrow-back"
              size={isTablet ? 26 : 22}
              color={COLORS.white}
            />
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

          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.name}>
            {profile.name}
          </Text>

          {/* PHONE */}

          <Text style={styles.phone}>{profile.phone}</Text>

          {/* SUBTEXT */}

          <Text style={styles.subText}>Scan this QR to start chatting</Text>

          {/* QR */}

          <View style={styles.qrWrapper}>
            <QRCode
              value={qrValue}
              size={qrSize}
              color="#000"
              backgroundColor={COLORS.qrBackground}
            />
          </View>

          {/* FOOTER */}

          <Text style={styles.infoText}>TAS Secure Chat Identity</Text>

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
    backgroundColor: COLORS.background,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: verticalScale(30),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
    marginTop: verticalScale(isTablet ? 14 : 10),
    width: '100%',
    alignSelf: 'center',
    maxWidth: 1300,
  },

  backBtn: {
    width: isTablet ? 52 : 42,
    height: isTablet ? 52 : 42,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: fontScale(isTablet ? 24 : 21),
    fontWeight: '700',
  },

  qrCard: {
    overflow: 'hidden',
    flex: 1,
    marginTop: isLandscape ? verticalScale(16) : verticalScale(38),
    marginHorizontal: scale(isLandscape ? 36 : 18),
    borderRadius: moderateScale(34),
    paddingTop: verticalScale(isLandscape ? 24 : 34),
    paddingBottom: verticalScale(isLandscape ? 26 : 34),
    paddingHorizontal: scale(isLandscape ? 18 : 20),
    width: '92%',
    alignSelf: 'center',
    maxWidth: isTablet ? 760 : 500,
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },

  glowTop: {
    position: 'absolute',
    top: verticalScale(-120),
    left: scale(-120),
    width: scale(isTablet ? 300 : 240),
    height: scale(isTablet ? 300 : 240),
    borderRadius: 999,
    backgroundColor: 'rgba(139,92,246,0.16)',
  },

  glowBottom: {
    position: 'absolute',
    bottom: verticalScale(-120),
    right: scale(-120),
    width: scale(isTablet ? 300 : 240),
    height: scale(isTablet ? 300 : 240),
    borderRadius: 999,
    backgroundColor: 'rgba(59,130,246,0.12)',
  },

  avatar: {
    width: isLandscape ? (isTablet ? 90 : 82) : isTablet ? 100 : 92,
    height: isLandscape ? (isTablet ? 90 : 82) : isTablet ? 100 : 92,
    borderRadius: 100,
    borderWidth: 2.5,
    borderColor: COLORS.primary,
    marginBottom: verticalScale(18),
  },

  name: {
    color: COLORS.white,
    fontSize: fontScale(
      isLandscape ? (isTablet ? 30 : 28) : isTablet ? 38 : 34,
    ),
    fontWeight: '800',
    maxWidth: '90%',
  },

  phone: {
    color: 'rgba(255,255,255,0.62)',
    marginTop: verticalScale(8),
    fontSize: fontScale(isLandscape ? 15 : isTablet ? 18 : 17),
  },

  subText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: fontScale(isTablet ? 16 : 15),
    marginTop: verticalScale(14),
    marginBottom: verticalScale(isLandscape ? 18 : 26),
    textAlign: 'center',
  },

  qrWrapper: {
    backgroundColor: COLORS.white,
    padding: scale(isLandscape ? 12 : 16),
    borderRadius: moderateScale(28),
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
    marginTop: verticalScale(isLandscape ? 18 : 24),
    fontSize: fontScale(isTablet ? 16 : 15),
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  bottomInfo: {
    color: 'rgba(255,255,255,0.42)',
    marginTop: verticalScale(10),
    fontSize: fontScale(isTablet ? 13.5 : 12.5),
    lineHeight: verticalScale(isTablet ? 22 : 19),
    paddingHorizontal: scale(14),
    maxWidth: isTablet ? 520 : 420,
    textAlign: 'center',
  },
});
