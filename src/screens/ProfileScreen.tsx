import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from 'react-native';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
  isTablet,
} from '../theme/responsive';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUserStore } from '../store/userStore';
import { COLORS } from '../theme/colors';

const menuItems1 = [
  {
    title: 'Account',
    icon: 'person-outline',
  },
  {
    title: 'Privacy',
    icon: 'lock-closed-outline',
  },
  {
    title: 'Chats',
    icon: 'chatbubble-ellipses-outline',
  },
  {
    title: 'Notifications',
    icon: 'notifications-outline',
  },
  {
    title: 'Storage',
    icon: 'server-outline',
  },
  {
    title: 'Linked Devices',
    icon: 'desktop-outline',
  },
];

const menuItems2 = [
  {
    title: 'Invite a Friend',
    icon: 'heart-outline',
  },
  {
    title: 'Help and Feedback',
    icon: 'help-circle-outline',
  },
  {
    title: 'Terms and Conditions',
    icon: 'document-text-outline',
  },
];

export default function ProfileScreen({ navigation }: any) {
  const { profile } = useUserStore();

  const renderItem = (item: any, isLogout = false) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.menuItem}
      onPress={() => {
        if (item.title === 'Account') {
          navigation.navigate('EditProfile', {});
        }

        if (item.title === 'Privacy') {
          navigation.navigate('PrivacyScreen');
        }

        if (item.title === 'Chats') {
          navigation.navigate('ChatSettingScreen');
        }

        if (item.title === 'Notifications') {
          navigation.navigate('NotificationsScreen');
        }

        if (item.title === 'Storage') {
          navigation.navigate('StorageScreen');
        }

        if (item.title === 'Linked Devices') {
          navigation.navigate('LinkedDevicesScreen');
        }

        if (item.title === 'Invite a Friend') {
          navigation.navigate('InviteFriendsScreen');
        }

        if (item.title === 'Help and Feedback') {
          navigation.navigate('HelpAndFeedbackScreen');
        }

        if (item.title === 'Terms and Conditions') {
          navigation.navigate('TermsAndConditionsScreen');
        }

        if (item.title === 'Logout') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          });
        }
      }}
    >
      <View style={styles.leftRow}>
        <Ionicons
          name={item.icon}
          size={isTablet ? 26 : 24}
          color={isLogout ? '#ff3b30' : COLORS.white}
        />

        <Text
          style={[
            styles.menuText,

            isLogout && {
              color: '#ff3b30',
            },
          ]}
        >
          {item.title}
        </Text>
      </View>

      {!isLogout && (
        <Ionicons
          name="chevron-forward"
          size={isTablet ? 22 : 20}
          color="rgba(255,255,255,0.4)"
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >
        {/* PROFILE */}

        <View style={styles.profileContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: profile.image,
              }}
              style={styles.avatar}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.qrButton}
              onPress={() =>
                navigation.navigate('MyProfileQRScreen', {
                  profile: profile, // <-- YE IMPORTANT FIX HAI
                })
              }
            >
              <Ionicons
                name="qr-code-outline"
                size={isTablet ? 18 : 16}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{profile.name}</Text>

          <Text style={styles.number}>{profile.phone}</Text>

          {!!profile.bio && (
            <View style={styles.bioBox}>
              <Text style={styles.bioText}>“{profile.bio}”</Text>
            </View>
          )}

          {!!profile.website && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.websiteContainer}
              onPress={() => {
                if (profile.website) {
                  Linking.openURL(profile.website);
                }
              }}
            >
              <Ionicons name="globe-outline" size={18} color="#C084FC" />

              <Text numberOfLines={1} style={styles.website}>
                {profile.website}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* SETTINGS */}

        <View style={styles.card}>
          <Text style={styles.groupTitle}>Settings</Text>

          {menuItems1.map((item, index) => (
            <View key={index}>
              {renderItem(item)}

              {index !== menuItems1.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>

        {/* SECOND GROUP */}

        <View style={styles.card}>
          {menuItems2.map((item, index) => (
            <View key={index}>
              {renderItem(item)}

              {index !== menuItems2.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>

        {/* LOGOUT */}

        <View style={styles.card}>
          {renderItem(
            {
              title: 'Logout',
              icon: 'log-out-outline',
            },
            true,
          )}
        </View>

        {/* FOOTER */}

        <View style={styles.footerContainer}>
          <Text style={styles.fromText}>from</Text>

          <Image
            source={require('../assets/brand-logo.png')}
            style={styles.tasLogo}
            resizeMode="contain"
          />
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

  profileContainer: {
    alignItems: 'center',
    marginTop: verticalScale(isTablet ? 28 : 42),
    marginBottom: verticalScale(35),
    paddingHorizontal: scale(20),
    width: '100%',
  },

  avatarWrapper: {
    position: 'relative',
  },

  avatar: {
    width: isTablet ? 110 : 95,
    height: isTablet ? 110 : 95,
    borderRadius: 999,
    marginBottom: verticalScale(18),
    borderWidth: moderateScale(2),
    borderColor: COLORS.primaryDark,
  },

  qrButton: {
    position: 'absolute',
    right: scale(-2),
    bottom: verticalScale(10),
    width: isTablet ? 34 : 32,
    height: isTablet ? 34 : 32,
    borderRadius: 999,
    borderWidth: moderateScale(2),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.background,
  },

  name: {
    color: COLORS.white,
    fontSize: fontScale(isTablet ? 32 : 28),
    fontWeight: '700',
  },

  number: {
    color: COLORS.textMuted,
    marginTop: verticalScale(8),
    fontSize: fontScale(isTablet ? 18 : 16),
  },

  bioBox: {
    marginTop: verticalScale(18),
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(18),
    maxWidth: isTablet ? '72%' : '88%',
    backgroundColor: 'rgba(124,58,237,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.35)',
  },

  bioText: {
    color: '#E9D5FF',
    fontSize: fontScale(isTablet ? 17 : 15),
    lineHeight: verticalScale(isTablet ? 30 : 24),
    textAlign: 'center',
    fontStyle: 'italic',
  },

  websiteContainer: {
    marginTop: verticalScale(18),
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(16),
    maxWidth: isTablet ? '70%' : '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(168,85,247,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(192,132,252,0.28)',
  },

  website: {
    color: '#E9D5FF',
    fontSize: fontScale(isTablet ? 15 : 14),
    fontWeight: '700',
    marginLeft: scale(10),
    letterSpacing: 0.5,
  },

  card: {
    marginHorizontal: scale(20),
    marginBottom: verticalScale(22),
    borderRadius: moderateScale(26),
    maxWidth: 1300,
    width: '92%',
    alignSelf: 'center',
    overflow: 'hidden',
    backgroundColor: COLORS.glass,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },

  groupTitle: {
    color: COLORS.textMuted,
    fontSize: fontScale(isTablet ? 17 : 15),
    marginTop: verticalScale(18),
    marginLeft: scale(22),
    marginBottom: verticalScale(8),
  },

  menuItem: {
    minHeight: isTablet ? 82 : 72,
    paddingHorizontal: scale(22),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuText: {
    color: COLORS.white,
    marginLeft: scale(18),
    fontSize: fontScale(isTablet ? 18 : 17),
    fontWeight: '500',
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginLeft: scale(65),
  },

  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(50),
  },

  fromText: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginBottom: 10,
    letterSpacing: 1,
  },

  tasLogo: {
    width: isTablet ? 140 : 110,
    height: isTablet ? 70 : 55,
  },
});
