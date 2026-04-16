import React, { useContext, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Pressable, // ✅ replace
  Animated,
} from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import FloatingThemeToggle from '../components/FloatingThemeToggle';

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

const ChatItem = ({ item, index, theme, onPress }: any) => {
  const translateY = useRef(new Animated.Value(30)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color:
          theme.background === '#020617'
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(0,0,0,0.1)',
      }}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.97 : 1 }], // 🔥 press shrink
        },
      ]}
    >
      <Animated.View
        style={[
          styles.chatItem,
          {
            backgroundColor:
              theme.background === '#020617'
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.04)',

            borderColor:
              theme.background === '#020617'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(0,0,0,0.08)',

            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.avatar} />

        <View style={styles.flexOne}>
          <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>

          <Text style={[styles.message, { color: theme.subText }]}>
            {item.message}
          </Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={[styles.time, { color: theme.subText }]}>
            {item.time}
          </Text>

          {item.unread > 0 && <UnreadBadge count={item.unread} />}
        </View>
      </Animated.View>
    </Pressable>
  );
};

const ChatScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useContext(ThemeContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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

  const renderItem = ({ item, index }: any) => (
    <ChatItem
      item={item}
      index={index}
      theme={theme}
      onPress={() => navigation.navigate('ChatOpen', { user: item })}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FloatingThemeToggle />
      <Animated.FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        style={{
          opacity: fadeAnim, // 🔥 fade in whole screen
        }}
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
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
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

            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Recent Chats
            </Text>
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
    paddingTop: 16,
  },

  chatItem: {
    flexDirection: 'row',
    padding: 18,
    borderRadius: 18,
    marginBottom: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
    fontSize: 17,
  },

  message: {
    color: '#fff',
    marginTop: 4,
    fontSize: 14,
  },

  rightSection: {
    alignItems: 'flex-end',
  },

  time: {
    color: '#64748B',
    fontSize: 11,
  },

  unreadBadge: {
    marginTop: 6,
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },

  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 5,
    opacity: 0.5,
  },

  activeUser: {
    marginRight: 15,
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
  listContent: {
    paddingBottom: 100,
  },
});
