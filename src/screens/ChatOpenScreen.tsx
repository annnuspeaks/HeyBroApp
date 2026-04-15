import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatOpenScreen = ({ route, navigation }: any) => {
  const { theme } = useContext(ThemeContext);
  const { user } = route.params;

  const messages = [
    { id: '1', text: 'Hello bro 👋', sender: 'them' },
    { id: '2', text: 'Hey! kya haal hai?', sender: 'me' },
    { id: '3', text: 'Sab mast 🔥', sender: 'them' },
  ];

  const renderMessage = ({ item }: any) => {
    const isMe = item.sender === 'me';

    return (
      <View
        style={[
          styles.messageBubble,
          isMe ? styles.myMessage : styles.otherMessage,
          !isMe && { backgroundColor: theme.border },
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 🔥 HEADER */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>

        <Image source={{ uri: user.image }} style={styles.avatar} />

        <View>
          <Text style={[styles.name, { color: theme.text }]}>{user.name}</Text>
          <Text style={[styles.timeText, { color: theme.subText }]}>online</Text>
        </View>
      </View>

      {/* 🔥 MESSAGES */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContent}
      />

      {/* 🔥 INPUT */}
      <View style={[styles.inputBar, { borderColor: theme.border }]}>
        <TextInput
          placeholder="Type message..."
          placeholderTextColor="#aaa"
          style={[styles.input, { color: theme.text }]}
        />

        <TouchableOpacity style={styles.sendBtn}>
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatOpenScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  messageBubble: {
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    maxWidth: '70%',
  },

  inputBar: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    alignItems: 'center',
  },

  input: {
    flex: 1,
    fontSize: 14,
  },

  sendBtn: {
    backgroundColor: '#8B5CF6',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },

  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#8B5CF6',
  },

  otherMessage: {
    alignSelf: 'flex-start',
  },

  messageText: {
    color: '#fff',
  },
  listContent: {
    padding: 16,
  },
  timeText: {
    fontSize: 12,
  },
});
