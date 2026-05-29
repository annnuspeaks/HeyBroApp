import React, { useContext, useEffect, useRef, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
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

import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../theme/ThemeContext';

const VideoCallItem = ({ item, index, theme, navigation }: any) => {
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

  const getIcon = () => {
    if (item.type === 'Missed') {
      return 'videocam-outline';
    }

    return 'arrow-up-outline';
  };

  const getIconColor = () => {
    if (item.type === 'Missed') {
      return '#EF4444';
    }

    return '#8B5CF6';
  };

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('OutgoingVideoCallScreen', {
          user: item,
        })
      }
      style={({ pressed }) => [
        {
          transform: [
            {
              scale: pressed ? 0.985 : 1,
            },
          ],
        },
      ]}
    >
      <Animated.View
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

            opacity,

            transform: [{ translateY }],
          },
        ]}
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

        {/* INFO */}

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

          <View style={styles.row}>
            <Icon name={getIcon()} size={14} color={getIconColor()} />

            <Text
              style={[
                styles.callType,
                {
                  color: item.type === 'Missed' ? '#EF4444' : '#8B5CF6',
                },
              ]}
            >
              {item.type}
            </Text>
          </View>
        </View>

        {/* RIGHT */}

        <View
          style={{
            alignItems: 'flex-end',
          }}
        >
          <Text
            style={[
              styles.time,
              {
                color: theme.subText,
              },
            ]}
          >
            {new Date(item.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>

          <TouchableOpacity
            style={styles.callButton}
            onPress={() =>
              navigation.navigate('OutgoingVideoCallScreen', {
                user: item,
              })
            }
          >
            <Icon name="videocam" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const VideoScreen = () => {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation<any>();

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

  const videoCalls = [
    {
      id: '1',
      name: 'Shreya Rajput',
      type: 'Incoming',
      online: true,
      timestamp: new Date(),
      image: 'https://i.pravatar.cc/150?img=10',
    },

    {
      id: '2',
      name: 'Sundar Mehta',
      type: 'Missed',
      online: false,
      timestamp: new Date('2026-05-25'),
      image: 'https://i.pravatar.cc/150?img=7',
    },

    {
      id: '3',
      name: 'Stuti Sethi',
      type: 'Missed',
      online: true,
      timestamp: new Date('2026-05-24'),
      image: 'https://i.pravatar.cc/150?img=31',
    },

    {
      id: '4',
      name: 'Henrick Peterson',
      type: 'Outgoing',
      online: true,
      timestamp: new Date('2026-05-23'),
      image: 'https://i.pravatar.cc/150?img=6',
    },

    {
      id: '5',
      name: 'Aham Deshwal',
      type: 'Outgoing',
      online: true,
      timestamp: new Date('2026-05-18'),
      image: 'https://i.pravatar.cc/150?img=25',
    },
  ];

  const filteredCalls =
    activeTab === 'Missed'
      ? videoCalls.filter(item => item.type === 'Missed')
      : videoCalls;

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
        {/* HEADER */}

        <View style={styles.headerRow}>
          <View>
            <Text
              style={[
                styles.header,
                {
                  color: theme.text,
                },
              ]}
            >
              Video Calls
            </Text>

            <Text
              style={[
                styles.subHeader,
                {
                  color: theme.subText,
                },
              ]}
            >
              Recent video activity
            </Text>
          </View>

          <TouchableOpacity
            style={styles.videoFab}
            onPress={() => navigation.navigate('VideoContactsScreen')}
          >
            <Icon name="videocam" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* TOGGLE */}

        <View style={styles.segmentOuter}>
          <View style={styles.segmentContainer}>
            <Animated.View
              style={[
                styles.activePill,

                {
                  backgroundColor: activeTab === 'All' ? '#8B5CF6' : '#EF4444',

                  transform: [
                    {
                      translateX: toggleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, isTablet ? 74 : 78],
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

        {/* LIST */}

        <FlatList
          data={Object.keys(groupedCalls)}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 2,
              }}
            />
          )}
          renderItem={({ item: section }) => (
            <View>
              <Text style={styles.groupLabel}>{section}</Text>

              {groupedCalls[section].map((call: any, index: number) => (
                <VideoCallItem
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

export default VideoScreen;

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
    fontSize: fontScale(14),
    marginBottom: 0,
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
    backgroundColor: COLORS.success,
  },

  name: {
    fontSize: fontScale(16),
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  callType: {
    marginLeft: 5,
    fontSize: fontScale(13),
  },

  time: {
    fontSize: 12,
    marginBottom: 12,
  },

  callButton: {
    width: isTablet ? 36 : 38,
    height: isTablet ? 36 : 38,
    borderRadius: isTablet ? 18 : 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
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

  videoFab: {
    width: isTablet ? 44 : 48,
    height: isTablet ? 44 : 48,
    borderRadius: isTablet ? 22 : 24,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },

  segmentOuter: {
    alignItems: 'center',
    marginBottom: 22,
  },

  segmentContainer: {
    width: isTablet ? 160 : 170,
    height: isTablet ? 42 : 44,
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
    width: isTablet ? 78 : 85,
    height: isTablet ? 36 : 38,
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
    color: COLORS.white,
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
