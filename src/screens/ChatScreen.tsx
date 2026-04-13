import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const chatData = [
  {
    id: '1',
    name: 'Rahul',
    message: 'Bro kal milte hain 🔥',
    time: '10:45 AM',
    unread: 2,
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Aman',
    message: 'Project complete ho gaya',
    time: '9:30 AM',
    unread: 0,
    image: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Priya',
    message: 'Call me when free 📞',
    time: 'Yesterday',
    unread: 5,
    image: 'https://i.pravatar.cc/150?img=3',
  },
];

const ChatScreen = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.chatItem}>
      <Image source={{ uri: item.image }} style={styles.avatar} />

      <View style={styles.chatContent}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.message}>{item.message}</Text>

          {item.unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={chatData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    color: '#555',
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  badge: {
    backgroundColor: '#25D366',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
});