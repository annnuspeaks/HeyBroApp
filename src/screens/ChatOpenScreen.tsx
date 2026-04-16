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
          styles.messageRow,
          {
            justifyContent: isMe ? 'flex-end' : 'flex-start',
          },
        ]}
      >
        <View
          style={[
            styles.messageBubble,

            // 🔥 DIFFERENT STYLE FOR ME vs THEM
            isMe ? styles.myMessage : styles.otherMessage,

            // 🔥 THEME BASED COLOR
            {
              backgroundColor: isMe
                ? '#8B5CF6' // my message (purple)
                : theme.card, // received message
            },
          ]}
        >
          <Text
            style={[
              styles.messageText,
              {
                color: isMe ? '#fff' : theme.text,
              },
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 🔥 HEADER */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        {/* 🔥 LEFT SECTION (back + avatar + name) */}
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>

          <Image source={{ uri: user.image }} style={styles.avatar} />

          <View>
            <Text style={[styles.name, { color: theme.text }]}>
              {user.name}
            </Text>
            <Text style={[styles.timeText, { color: theme.subText }]}>
              online
            </Text>
          </View>
        </View>

        {/* 🔥 RIGHT SECTION (icons) */}
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="call-outline" size={22} color={theme.text} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="videocam-outline" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContent}
      />

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
    justifyContent: 'space-between', // 🔥 IMPORTANT
    paddingHorizontal: 12,
    paddingVertical: 10,
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
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
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
    borderTopRightRadius: 4,
  },

  otherMessage: {
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 25,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  timeText: {
    fontSize: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBtn: {
    marginLeft: 15,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
