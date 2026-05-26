import React, { useContext, useEffect, useRef, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Animated,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../theme/ThemeContext';


const CallItem = ({ item, index, theme, navigation }: any) => {
  const translateY = useRef(new Animated.Value(30)).current;

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('OutgoingVoiceCallScreen', {
          user: item,
        })
      }
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.callCard,
          {
            backgroundColor:
              theme.background === '#020617'
                ? 'rgba(255,255,255,0.05)'
                : '#fff',

            borderColor:
              theme.background === '#020617'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(0,0,0,0.06)',

            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={{ position: 'relative' }}>
          <Image source={{ uri: item.image }} style={styles.avatar} />

          <View
            style={[
              styles.onlineDot,
              {
                backgroundColor: item.online ? '#22C55E' : '#64748B',
              },
            ]}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>

          <View style={styles.row}>
            <Icon
              name={
                item.type === 'Missed' ? 'call-outline' : 'arrow-up-outline'
              }
              size={14}
              color={item.type === 'Missed' ? '#EF4444' : '#22C55E'}
            />

            <Text style={[styles.callType, { color: theme.subText }]}>
              {item.type}
            </Text>
          </View>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[styles.time, { color: theme.subText }]}>
            {new Date(item.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>

          <TouchableOpacity
            style={styles.smallCallButton}
            onPress={() =>
              navigation.navigate('OutgoingVoiceCallScreen', {
                user: item,
              })
            }
          >
            <Icon name="call" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const VoiceScreen = () => {
  const navigation = useNavigation<any>();

  const { theme } = useContext(ThemeContext);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleAnim = useRef(new Animated.Value(0)).current;

  const [activeTab, setActiveTab] = useState<'All' | 'Missed'>('All');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    Animated.spring(toggleAnim, {
      toValue: activeTab === 'All' ? 0 : 1,
      useNativeDriver: true,

      friction: 8,
      tension: 70,
    }).start();
  }, [activeTab]);

  const recentCalls = [
    {
      id: '1',
      name: 'Shreya Ji',
      type: 'Incoming',
      online: true,
      timestamp: new Date(),
      image: 'https://i.pravatar.cc/150?img=10',
    },

    {
      id: '2',
      name: 'Rohan',
      type: 'Missed',
      online: false,
      timestamp: new Date('2026-05-17'),
      image: 'https://i.pravatar.cc/150?img=11',
    },

    {
      id: '3',
      name: 'Rowling Patton',
      type: 'Incoming',
      online: true,
      timestamp: new Date(),
      image: 'https://i.pravatar.cc/150?img=13',
    },

    {
      id: '4',
      name: 'Ishmriti Chhetri',
      type: 'Missed',
      online: true,
      timestamp: new Date(),
      image: 'https://i.pravatar.cc/150?img=19',
    },

    {
      id: '5',
      name: 'Aham Deshwal',
      type: 'Outgoing',
      online: true,
      timestamp: new Date(),
      image: 'https://i.pravatar.cc/150?img=31',
    },

    {
      id: '6',
      name: 'Trupti Sethi',
      type: 'Incoming',
      online: true,
      timestamp: new Date(),
      image: 'https://i.pravatar.cc/150?img=25',
    },
  ];

  const filteredCalls =
    activeTab === 'Missed'
      ? recentCalls.filter(item => item.type === 'Missed')
      : recentCalls;

  const getGroupLabel = (date: Date) => {
    const today = new Date();

    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    const input = new Date(date);

    if (input.toDateString() === today.toDateString()) {
      return 'Today';
    }

    if (input.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }

    const diff = (today.getTime() - input.getTime()) / (1000 * 60 * 60 * 24);

    if (diff < 7) {
      return input.toLocaleDateString('en-US', {
        weekday: 'long',
      });
    }

    return input.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const groupedCalls = filteredCalls.reduce((groups: any, item) => {
    const label = getGroupLabel(item.timestamp);

    if (!groups[label]) {
      groups[label] = [];
    }

    groups[label].push(item);

    return groups;
  }, {});

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          flex: 1,
        }}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.header, { color: theme.text }]}>Calls</Text>

            <Text style={[styles.subHeader, { color: theme.subText }]}>
              Recent voice activity
            </Text>
          </View>

          <TouchableOpacity
            style={styles.topCallButton}
            onPress={() => navigation.navigate('ContactsScreen')}
          >
            <Icon name="call" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.segmentOuter}>
          <View style={styles.segmentContainer}>
            <Animated.View
              style={[
                styles.activePill,

                {
                  backgroundColor: activeTab === 'All' ? '#25D366' : '#EF4444',

                  transform: [
                    {
                      translateX: toggleAnim.interpolate({
                        inputRange: [0, 1],

                        outputRange: [0, 78],
                      }),
                    },
                  ],
                },
              ]}
            />

            <TouchableOpacity
              style={styles.segmentButton}
              onPress={() => setActiveTab('All')}
            >
              <Text
                style={[
                  styles.segmentText,

                  activeTab === 'All' && styles.activeSegmentText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.segmentButton}
              onPress={() => setActiveTab('Missed')}
            >
              <Text
                style={[
                  styles.segmentText,

                  activeTab === 'Missed' && styles.activeSegmentText,
                ]}
              >
                Missed
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={Object.keys(groupedCalls)}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          renderItem={({ item: section }) => (
            <View>
              <Text style={styles.groupLabel}>{section}</Text>

              {groupedCalls[section].map((call: any, index: number) => (
                <CallItem
                  key={call.id}
                  item={call}
                  index={index}
                  theme={theme}
                  navigation={navigation}
                />
              ))}
            </View>
          )}
        />
      </Animated.View>
    </View>
  );
};

export default VoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 12,
  },

  header: {
    fontSize: 34,
    fontWeight: '700',
  },

  subHeader: {
    marginTop: 5,
    marginBottom: 0,
    fontSize: 14,
    opacity: 0.7,
  },

  callCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 22,
    marginBottom: 10,
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
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  callType: {
    marginLeft: 5,
    fontSize: 13,
  },

  time: {
    fontSize: 12,
    marginBottom: 12,
  },

  smallCallButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#25D366',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  topCallButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#25D366',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },

  segmentOuter: {
    alignItems: 'center',

    marginBottom: 22,
  },

  segmentContainer: {
    width: 170,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  activePill: {
    position: 'absolute',
    width: 85,
    height: 38,
    borderRadius: 19,
    top: 3,
    left: 3,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  segmentButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  segmentText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },

  activeSegmentText: {
    color: '#fff',
  },

  groupLabel: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
