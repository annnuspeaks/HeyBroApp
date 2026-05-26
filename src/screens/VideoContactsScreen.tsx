import React, { useContext } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

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
          <TouchableOpacity
            style={[
              styles.card,

              {
                backgroundColor:
                  theme.background === '#020617'
                    ? 'rgba(255,255,255,0.05)'
                    : '#fff',

                borderColor:
                  theme.background === '#020617'
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(0,0,0,0.06)',
              },
            ]}
            activeOpacity={0.88}
            onPress={() =>
              navigation.navigate('OutgoingVideoCallScreen', {
                user: item,
              })
            }
          >
            {/* AVATAR */}

            <View
              style={{
                position: 'relative',
              }}
            >
              <Image
                source={{
                  uri: item.image,
                }}
                style={styles.avatar}
              />

              {item.online && <View style={styles.onlineDot} />}
            </View>

            {/* USER INFO */}

            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.name,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {item.name}
              </Text>

              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor: item.online ? '#22C55E' : '#64748B',
                    },
                  ]}
                />

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
            </View>

            {/* VIDEO BUTTON */}

            <TouchableOpacity
              style={styles.videoButton}
              onPress={() =>
                navigation.navigate('OutgoingVideoCallScreen', {
                  user: item,
                })
              }
            >
              <Icon name="videocam" size={18} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default VideoContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 14,
  },

  header: {
    fontSize: 34,
    fontWeight: '700',
  },

  subHeader: {
    marginTop: 4,
    marginBottom: 22,
    fontSize: 14,
    opacity: 0.7,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 22,
    marginBottom: 12,
    borderWidth: 1,
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginRight: 14,
  },

  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 14,
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#020617',
    backgroundColor: '#22C55E',
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },

  videoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#8B5CF6',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
});
