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
      <View style={styles.chatItem}>
        {/* Avatar */}
        <Image source={{ uri: item.image }} style={styles.avatar} />

        {/* Name + Message */}
        <View style={styles.flexOne}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>

        {/* Time + Unread */}
        <View style={styles.rightSection}>
          <Text style={styles.time}>{item.time}</Text>

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
              style={styles.search}
            />

            {/* Active Now */}
            <Text style={styles.section}>Active Now</Text>

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
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  flexOne: {
    flex: 1,
  },

  name: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 15,
  },

  message: {
    color: '#aaa',
    marginTop: 2,
    fontSize: 13,
  },

  rightSection: {
    alignItems: 'flex-end',
  },

  time: {
    color: '#aaa',
    fontSize: 12,
  },

  unreadBadge: {
    marginTop: 5,
    backgroundColor: '#7C3AED',
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
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
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: 18,
    color: '#fff',
    fontSize: 14,
  },

  section: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },

  activeUser: {
    marginRight: 10,
  },

  activeAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#7C3AED',
    shadowColor: '#7C3AED',
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
});
