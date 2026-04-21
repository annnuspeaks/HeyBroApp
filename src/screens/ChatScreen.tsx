import React, { useContext, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Pressable,
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
  }, [index]);

  return (
    <Pressable
      onPress={() => {
        const HapticFeedback = require('react-native-haptic-feedback').default;
        HapticFeedback.trigger('impactLight'); // ✅ subtle haptic on press
        onPress();
      }}
      android_ripple={{
        color:
          theme.background === '#020617'
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(0,0,0,0.1)',
      }}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.97 : 1 }],
          opacity: pressed ? 0.9 : 1,
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
                : 'rgba(255,255,255,0.9)', // ✅ clean glass

            borderColor:
              theme.background === '#020617'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(0,0,0,0.06)',

            shadowColor: '#000',

            shadowOpacity: theme.background === '#020617' ? 0.25 : 0.08, // ✅ soft light shadow

            shadowRadius: 8,
            elevation: theme.background === '#020617' ? 6 : 3,

            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={{ position: 'relative' }}>
          <Image source={{ uri: item.image }} style={styles.avatar} />

          {/* 🟢 ONLINE DOT */}
          <View
            style={[
              styles.onlineDotChat,
              {
                borderColor: theme.background,
              },
            ]}
          />
        </View>

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
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();
  const { theme } = useContext(ThemeContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

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
      name: 'Shreya Ji',
      message: 'Kal milte hain 😊',
      time: '10:45 PM',
      unread: 2,
      image: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: '2',
      name: 'Rohan Shukla',
      message: 'Vishu, tum kahan ho bro? 😟',
      time: '10:45 PM',
      unread: 1,
      image: 'https://i.pravatar.cc/150?img=11',
    },
    {
      id: '3',
      name: 'Aaditya',
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

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        {[1, 2, 3].map(i => (
          <View
            key={i}
            style={{
              height: 70,
              borderRadius: 16,
              marginBottom: 12,
              backgroundColor:
                theme.background === '#020617'
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(0,0,0,0.05)',
            }}
          />
        ))}
      </View>
    );
  }

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
          opacity: fadeAnim,
        }}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 100 }}>
            <Text style={{ color: theme.text, opacity: 0.5 }}>
               Start a new conversation 🚀
            </Text>
          </View>
        )}
        ListHeaderComponent={
          <>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
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

            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Active Now
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[1, 2, 3].map(i => (
                <View key={i} style={styles.activeUser}>
                  <View style={{ position: 'relative' }}>
                    <Image
                      source={{ uri: `https://i.pravatar.cc/150?img=${i}` }}
                      style={styles.activeAvatar}
                    />

                    <View
                      style={[
                        styles.onlineDotActive,
                        {
                          borderColor: theme.background,
                        },
                      ]}
                    />
                  </View>
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
    marginBottom: 10,
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
    fontSize: 16,
  },

  message: {
    color: '#fff',
    marginTop: 4,
    fontSize: 14,
    opacity: 0.8,
  },

  rightSection: {
    alignItems: 'flex-end',
  },

  time: {
    color: '#64748B',
    fontSize: 11,
    opacity: 0.8,
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
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 5,
    opacity: 0.7,
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
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  listContent: {
    paddingBottom: 100,
  },
  onlineDotChat: {
    position: 'absolute',
    bottom: 0,
    right: 16,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#22C55E',
    shadowColor: '#22C55E',
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 4,
  },
  onlineDotActive: {
    position: 'absolute',
    bottom: 0,
    right: 7,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#22C55E',
    shadowColor: '#22C55E',
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 4,
  },
});
