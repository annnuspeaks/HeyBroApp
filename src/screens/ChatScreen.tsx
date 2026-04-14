import React, { useContext, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

const UnreadBadge = ({ count }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <Animated.View
      style={[
        styles.unreadBadge,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Text style={styles.unreadText}>{count}</Text>
    </Animated.View>
  );
};

const ChatScreen = () => {
  const { theme } = useContext(ThemeContext);

  const chats = [
    {
      id: '1',
      name: 'Harshvardhan Pundir',
      message: 'Kal milte hain 😊',
      time: '10:45 PM',
      unread: 2,
      image: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: '2',
      name: 'Anurag Shukla',
      message: 'Vishu, tum kahan ho bro? 😟',
      time: '10:45 PM',
      unread: 1,
      image: 'https://i.pravatar.cc/150?img=11',
    },
    {
      id: '3',
      name: 'Aanya Patil',
      message: 'Meet me in cafe at 5? ☕',
      time: '10:45 PM',
      unread: 0,
      image: 'https://i.pravatar.cc/150?img=9',
    },
    {
      id: '4',
      name: 'Oliver Smith',
      message: 'Beat the bug!',
      time: '10:45 PM',
      unread: 1,
      image: 'https://i.pravatar.cc/150?img=12',
    },
    {
      id: '5',
      name: 'Freddy McLachlan',
      message: 'Kinda! nn😟',
      time: '10:45 PM',
      unread: 0,
      image: 'https://i.pravatar.cc/150?img=6',
    },
    {
      id: '6',
      name: 'Andy Rodriguez',
      message: 'Walking downstairs, meet me there.',
      time: '10:45 PM',
      unread: 1,
      image: 'https://i.pravatar.cc/150?img=15',
    },
  ];

  // 🔥 renderItem FIXED + CLEAN
  const renderItem = ({ item }: any) => {
    // 🔥 animation values
    return (
      <View
        style={[
          styles.chatItem,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        {/* Avatar */}
        <Image source={{ uri: item.image }} style={styles.avatar} />

        {/* Name + Message */}
        <View style={styles.flexOne}>
          <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
          <Text style={[styles.message, { color: theme.subText }]}>
            {item.message}
          </Text>
        </View>

        {/* Time + Unread */}
        <View style={styles.rightSection}>
          <Text style={[styles.time, { color: theme.subText }]}>
            {item.time}
          </Text>

          {item.unread > 0 && <UnreadBadge count={item.unread} />}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            {/* Logo */}
            <Image source={require('../assets/logo.png')} style={styles.logo} />

            {/* Search */}
            <TextInput
              placeholder="Search chats..."
              placeholderTextColor="#aaa"
              style={[
                styles.search,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
            />

            {/* Active Now */}
            <Text style={[styles.section, { color: theme.subText }]}>
              Active Now
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[1, 2, 3].map(i => (
                <View key={i} style={styles.activeUser}>
                  <Image
                    source={{ uri: `https://i.pravatar.cc/150?img=${i}` }}
                    style={styles.activeAvatar}
                  />
                </View>
              ))}
            </ScrollView>

            <Text style={styles.section}>Recent Chats</Text>
          </>
        }
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 10,
  },

  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    elevation: 4,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  flexOne: {
    flex: 1,
  },

  name: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 16,
  },

  message: {
    color: '#fff',
    marginTop: 4,
    fontSize: 13,
  },

  rightSection: {
    alignItems: 'flex-end',
  },

  time: {
    color: '#94A3B8',
    fontSize: 11,
  },

  unreadBadge: {
    marginTop: 6,
    backgroundColor: '#8B5CF6',
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },

  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  logo: {
    width: 160,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  search: {
    backgroundColor: '#1E293B',
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 20,
    color: '#fff',
    fontSize: 14,
  },

  section: {
    color: '#94A3B8', // 🔥 soft white
    fontSize: 15,
    marginBottom: 10,
    marginTop: 8,
  },

  activeUser: {
    marginRight: 10,
  },

  activeAvatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: '#8B5CF6',

    shadowColor: '#8B5CF6',
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
});
