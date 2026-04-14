import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView,FlatList, Image } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

const ChatScreen = () => {
  const { theme } = useContext(ThemeContext);

  const data = [
    {
      id: '1',
      name: 'Riya Sharma',
      message: 'Kal milte hain 😊',
      time: '10:45 PM',
      unread: 2,
      image: 'https://i.pravatar.cc/150?img=5',
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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <TextInput
        placeholder="Search chats..."
        placeholderTextColor="#aaa"
        style={styles.search}
      />

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

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Image source={{ uri: item.image }} style={styles.avatar} />

            <View style={styles.flexOne}>
              <Text style={[styles.bold, { color: theme.text }]}>
                {item.name}
              </Text>
              <Text style={{ color: theme.subText }}>{item.message}</Text>
            </View>

            <View>
              <Text style={{ color: theme.subText }}>{item.time}</Text>
              {item.unread > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.whiteText}>{item.unread}</Text>
                </View>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  badge: {
    backgroundColor: '#7C3AED',
    borderRadius: 10,
    paddingHorizontal: 6,
    marginTop: 5,
  },

  flexOne: {
    flex: 1,
  },

  bold: {
    fontWeight: 'bold',
  },

  whiteText: {
    color: '#fff',
  },
  logo: {
    width: 160,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  search: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    color: '#fff',
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
  },
});
