import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Linking,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768;

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

export default function ProfileScreen({ navigation, route }: any) {
  const [profile, setProfile] = useState({
    name: 'Harshvardhan',

    phone: '+91 9876543210',

    bio: '',

    website: '',

    image: 'https://i.pravatar.cc/300',

    gender: '',

    qualification: '',

    dob: '',

    email: '',
  });

  useEffect(() => {
    if (route?.params?.updatedProfile) {
      setProfile(route.params.updatedProfile);
    }
  }, [route?.params?.updatedProfile]);

  const renderItem = (item: any, isLogout = false) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.menuItem}
      onPress={() => {
        if (item.title === 'Edit Profile') {
          navigation.navigate('EditProfile', {
            profile: profile,

            onGoBack: (updatedProfile: any) => {
              setProfile(updatedProfile);
            },
          });
        }

        if (item.title === 'Terms and Conditions') {
          navigation.navigate('TermsAndConditionsScreen');
        }
      }}
    >
      <View style={styles.leftRow}>
        <Ionicons
          name={item.icon}
          size={24}
          color={isLogout ? '#ff3b30' : '#ffffff'}
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
          size={20}
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
              onPress={() => navigation.navigate('MyProfileQRScreen')}
            >
              <Ionicons name="qr-code-outline" size={18} color="#fff" />
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
              onPress={() => Linking.openURL(profile.website)}
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

    backgroundColor: '#020826',
  },

  profileContainer: {
    alignItems: 'center',

    marginTop: height * 0.06,
    marginBottom: 35,

    paddingHorizontal: 20,
  },

  avatarWrapper: {
    position: 'relative',
  },

  avatar: {
    width: isTablet ? 120 : 95,
    height: isTablet ? 120 : 95,

    borderRadius: 100,

    marginBottom: 18,

    borderWidth: 2,
    borderColor: '#7C3AED',
  },

  qrButton: {
    position: 'absolute',

    right: -2,
    bottom: 12,

    width: 32,
    height: 32,

    borderRadius: 16,

    backgroundColor: '#8B5CF6',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 2,
    borderColor: '#020826',
  },

  name: {
    color: '#ffffff',

    fontSize: isTablet ? 34 : 28,
    fontWeight: '700',
  },

  number: {
    color: 'rgba(255,255,255,0.6)',

    marginTop: 8,

    fontSize: isTablet ? 20 : 16,
  },

  bioBox: {
    marginTop: 18,

    paddingHorizontal: 18,
    paddingVertical: 14,

    borderRadius: 18,

    backgroundColor: 'rgba(124,58,237,0.14)',

    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.35)',

    maxWidth: width * 0.8,
  },

  bioText: {
    color: '#E9D5FF',

    fontSize: 15,

    textAlign: 'center',

    fontStyle: 'italic',

    lineHeight: 24,
  },

  websiteContainer: {
    marginTop: 18,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 18,
    paddingVertical: 12,

    borderRadius: 16,

    backgroundColor: 'rgba(168,85,247,0.14)',

    borderWidth: 1,
    borderColor: 'rgba(192,132,252,0.28)',
  },

  website: {
    color: '#E9D5FF',

    fontSize: 14,

    fontWeight: '700',

    marginLeft: 10,

    letterSpacing: 0.5,
  },

  card: {
    marginHorizontal: 20,
    marginBottom: 22,

    borderRadius: 26,

    overflow: 'hidden',

    backgroundColor: 'rgba(255,255,255,0.03)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  groupTitle: {
    color: 'rgba(255,255,255,0.5)',

    fontSize: 15,

    marginTop: 18,
    marginLeft: 22,
    marginBottom: 8,
  },

  menuItem: {
    minHeight: 72,

    paddingHorizontal: 22,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuText: {
    color: '#ffffff',

    marginLeft: 18,

    fontSize: isTablet ? 20 : 17,
    fontWeight: '500',
  },

  divider: {
    height: 1,

    backgroundColor: 'rgba(255,255,255,0.05)',

    marginLeft: 65,
  },

  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 10,
    marginBottom: 50,
  },

  fromText: {
    color: 'rgba(255,255,255,0.45)',

    fontSize: 14,

    marginBottom: 10,

    letterSpacing: 1,
  },

  tasLogo: {
    width: 110,
    height: 55,
  },
});
