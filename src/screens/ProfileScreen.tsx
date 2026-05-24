import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const isTablet = width >= 768;

const menuItems1 = [
  {
    title: 'Edit Profile',
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
];

export default function ProfileScreen() {
  const renderItem = (item: any, isLogout = false) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.menuItem}>
      
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
          ]}>
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
        }}>
        
        {/* PROFILE SECTION */}

        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: 'https://i.pravatar.cc/300',
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>
            Harshvardhan
          </Text>

          <Text style={styles.number}>
            +91 9876543210
          </Text>
        </View>

        {/* SETTINGS GROUP */}

        <View style={styles.card}>
          <Text style={styles.groupTitle}>
            Settings
          </Text>

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
  },

  avatar: {
    width: isTablet ? 120 : 95,
    height: isTablet ? 120 : 95,

    borderRadius: 100,

    marginBottom: 18,
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
});