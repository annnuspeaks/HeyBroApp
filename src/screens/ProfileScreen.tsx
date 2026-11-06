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
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '../theme/colors';

const menuItems1 = [
  { title: 'Account', icon: 'person-outline' },
  { title: 'Privacy', icon: 'lock-closed-outline' },
  { title: 'Chats', icon: 'chatbubble-ellipses-outline' },
  { title: 'Notifications', icon: 'notifications-outline' },
  { title: 'Storage', icon: 'server-outline' },
  { title: 'Linked Devices', icon: 'desktop-outline' },
];

const menuItems2 = [
  { title: 'Invite a Friend', icon: 'heart-outline' },
  { title: 'Help and Feedback', icon: 'help-circle-outline' },
  { title: 'Terms and Conditions', icon: 'document-text-outline' },
];

export default function ProfileScreen({ navigation }: any) {
  const { profile } = useUserStore();
  const { theme } = useTheme();

  const renderItem = (item: any, isLogout = false) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.menuItem}
      onPress={() => {
        if (item.title === 'Account') navigation.navigate('EditProfile');
        if (item.title === 'Privacy') navigation.navigate('PrivacyScreen');
        if (item.title === 'Chats') navigation.navigate('ChatSettingScreen');
        if (item.title === 'Notifications') navigation.navigate('NotificationsScreen');
        if (item.title === 'Storage') navigation.navigate('StorageScreen');
        if (item.title === 'Linked Devices') navigation.navigate('LinkedDevicesScreen');
        if (item.title === 'Invite a Friend') navigation.navigate('InviteFriendsScreen');
        if (item.title === 'Help and Feedback') navigation.navigate('HelpAndFeedbackScreen');
        if (item.title === 'Terms and Conditions') navigation.navigate('TermsAndConditionsScreen');

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
          color={isLogout ? '#ff3b30' : theme.text}
        />

        <Text
          style={[
            styles.menuText,
            { color: isLogout ? '#ff3b30' : theme.text },
          ]}
        >
          {item.title}
        </Text>
      </View>

      {!isLogout && (
        <Ionicons
          name="chevron-forward"
          size={isTablet ? 22 : 20}
          color={theme.subText}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* PROFILE */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: profile.image }}
              style={styles.avatar}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.qrButton,
                { borderColor: theme.background },
              ]}
              onPress={() =>
                navigation.navigate('MyProfileQRScreen', {
                  profile: profile,
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

          <Text style={[styles.name, { color: theme.text }]}>
            {profile.name}
          </Text>

          <Text style={[styles.number, { color: theme.subText }]}>
            {profile.phone}
          </Text>

          {!!profile.bio && (
            <View
              style={[
                styles.bioBox,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.bioText, { color: theme.text }]}>
                “{profile.bio}”
              </Text>
            </View>
          )}

          {!!profile.website && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.websiteContainer,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
              onPress={() => {
                if (profile.website) {
                  Linking.openURL(profile.website);
                }
              }}
            >
              <Ionicons
                name="globe-outline"
                size={18}
                color={COLORS.primaryLight}
              />

              <Text
                numberOfLines={1}
                style={[styles.website, { color: theme.text }]}
              >
                {profile.website}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* SETTINGS */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.groupTitle, { color: theme.subText }]}>
            Settings
          </Text>

          {menuItems1.map((item, index) => (
            <View key={index}>
              {renderItem(item)}
              {index !== menuItems1.length - 1 && (
                <View
                  style={[styles.divider, { backgroundColor: theme.border }]}
                />
              )}
            </View>
          ))}
        </View>

        {/* SECOND GROUP */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          {menuItems2.map((item, index) => (
            <View key={index}>
              {renderItem(item)}
              {index !== menuItems2.length - 1 && (
                <View
                  style={[styles.divider, { backgroundColor: theme.border }]}
                />
              )}
            </View>
          ))}
        </View>

        {/* LOGOUT */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
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
          <Text style={[styles.fromText, { color: theme.subText }]}>
            from
          </Text>

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
  },

  name: {
    fontSize: fontScale(isTablet ? 32 : 28),
    fontWeight: '700',
  },

  number: {
    marginTop: verticalScale(8),
    fontSize: fontScale(isTablet ? 18 : 16),
  },

  bioBox: {
    marginTop: verticalScale(18),
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(18),
    maxWidth: isTablet ? '72%' : '88%',
    borderWidth: 1,
  },

  bioText: {
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
    borderWidth: 1,
  },

  website: {
    fontSize: fontScale(isTablet ? 15 : 14),
    fontWeight: '700',
    marginLeft: scale(10),
    letterSpacing: 0.5,
    flexShrink: 1,
  },

  card: {
    marginHorizontal: scale(20),
    marginBottom: verticalScale(22),
    borderRadius: moderateScale(26),
    maxWidth: 1300,
    width: '92%',
    alignSelf: 'center',
    overflow: 'hidden',
    borderWidth: 1,
  },

  groupTitle: {
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
    marginLeft: scale(18),
    fontSize: fontScale(isTablet ? 18 : 17),
    fontWeight: '500',
  },

  divider: {
    height: 1,
    marginLeft: scale(65),
  },

  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(50),
  },

  fromText: {
    fontSize: 14,
    marginBottom: 10,
    letterSpacing: 1,
  },

  tasLogo: {
    width: isTablet ? 140 : 110,
    height: isTablet ? 70 : 55,
  },
});
