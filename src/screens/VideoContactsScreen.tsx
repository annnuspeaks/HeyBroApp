import React, { useContext } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import {
  verticalScale,
  moderateScale,
  fontScale,
  isTablet,
} from '../theme/responsive';

import { COLORS } from '../theme/colors';

import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../theme/ThemeContext';

import { useNavigation } from '@react-navigation/native';

const VideoContactsScreen = () => {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation<any>();

  const contacts = [
    {
      id: '1',
      name: 'Shreya Ji',
      online: true,
      image: 'https://i.pravatar.cc/150?img=10',
    },

    {
      id: '2',
      name: 'Rohan',
      online: false,
      image: 'https://i.pravatar.cc/150?img=11',
    },

    {
      id: '3',
      name: 'Aaditya',
      online: true,
      image: 'https://i.pravatar.cc/150?img=12',
    },

    {
      id: '4',
      name: 'Ishmriti',
      online: true,
      image: 'https://i.pravatar.cc/150?img=32',
    },

    {
      id: '5',
      name: 'Stuti Sethi',
      online: false,
      image: 'https://i.pravatar.cc/150?img=31',
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      {/* HEADER */}

      <Text style={[styles.header, { color: theme.text }]}>Select Contact</Text>

      <Text
        style={[
          styles.subHeader,
          {
            color: theme.subText,
          },
        ]}
      >
        Start a new video call
      </Text>

      {/* CONTACTS */}

      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate('OutgoingVideoCallScreen', {
                user: item,
              })
            }
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.985 : 1 }],
            })}
          >
            <View
              style={[
                styles.card,
                {
                  backgroundColor:
                    theme.background === '#020617'
                      ? 'rgba(255,255,255,0.05)'
                      : COLORS.white,

                  borderColor:
                    theme.background === '#020617'
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(0,0,0,0.06)',
                },
              ]}
            >
              <View style={{ position: 'relative' }}>
                <Image source={{ uri: item.image }} style={styles.avatar} />

                <View
                  style={[
                    styles.onlineDot,
                    {
                      backgroundColor: item.online ? COLORS.success : '#64748B',
                    },
                  ]}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={[styles.name, { color: theme.text }]}>
                  {item.name}
                </Text>

                <Text
                  style={[
                    styles.statusText,
                    {
                      color: item.online ? '#22C55E' : '#64748B',
                    },
                  ]}
                >
                  {item.online ? 'Online' : 'Offline'}
                </Text>
              </View>

              <TouchableOpacity style={styles.videoButton}>
                <Icon name="videocam" size={18} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default VideoContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: isTablet ? 18 : 14,
    paddingTop: isTablet ? 12 : 10,
  },

  header: {
    fontSize: fontScale(isTablet ? 28 : 34),
    fontWeight: '700',
  },

  subHeader: {
    marginTop: verticalScale(4),
    marginBottom: verticalScale(22),
    fontSize: fontScale(14),
    opacity: 0.7,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(14),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(10),
    borderWidth: 1,
  },

  avatar: {
    width: isTablet ? 56 : 62,
    height: isTablet ? 56 : 62,
    borderRadius: isTablet ? 28 : 31,
    marginRight: moderateScale(14),
  },

  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 27,
    width: isTablet ? 12 : 13,
    height: isTablet ? 12 : 13,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#020617',
  },

  name: {
    fontSize: fontScale(16),
    fontWeight: '600',
  },

  statusText: {
    marginTop: 4,
    fontSize: fontScale(13),
  },

  videoButton: {
    width: isTablet ? 36 : 38,
    height: isTablet ? 36 : 38,
    borderRadius: isTablet ? 18 : 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
});
