import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
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
      image: 'https://i.pravatar.cc/150?img=5',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>heybro 💬</Text>

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
});
