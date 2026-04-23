import React, { useContext, useState } from 'react';
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

const messages = [
  { id: '1', text: 'Hello bro 👋', sender: 'them' },
  { id: '2', text: 'Hey! kya haal hai?', sender: 'me' },
  { id: '3', text: 'Sab mast 🔥', sender: 'them' },
];
const ChatOpenScreen = ({ route, navigation }: any) => {
  const flatListRef = React.useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = React.useState('');
  const [chatData, setChatData] = React.useState(messages);
  const { theme } = useContext(ThemeContext);
  const { user } = route.params;

  const renderMessage = ({ item }: any) => {
    const isMe = item.sender === 'me';

    return (
      <View
        style={[styles.messageRow, isMe ? styles.alignRight : styles.alignLeft]}
      >
        <View
          style={[
            styles.messageBubble,
            isMe ? styles.myMessage : styles.otherMessage,
            isMe ? styles.myBubble : styles.otherBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isMe ? styles.myText : styles.otherText,
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  const handleSend = () => {
    if (message.trim() === '') return; // empty message ignore

    // Create new message object
    const newMsg = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
    };

    // Add new message to chat data
    setChatData(prev => [...prev, newMsg]);
    setMessage('');

    // Scroll to bottom after a short delay to ensure the new message is rendered
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      // fake reply
      const reply = {
        id: Date.now().toString(),
        text: 'Reply aa gaya 😎',
        sender: 'them',
      };

      setChatData(prev => [...prev, reply]);
    }, 1500);
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
        ref={ref => (flatListRef.current = ref)}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        data={chatData}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <Text style={{ color: '#fff', textAlign: 'center' }}>
            No messages
          </Text>
        )}
      />

        {/* Typing indicator */}
      {isTyping && (
        <View style={styles.typingContainer}>
          <View style={styles.typingBubble}>
            <Text style={{ color: '#aaa' }}>Typing...</Text>
          </View>
        </View>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor:
              theme.background === '#020617'
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.05)',
            borderColor: theme.border,
          },
        ]}
      >
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="happy-outline" size={22} color={theme.text} />
        </TouchableOpacity>

        {/* ✍️ Input */}
        <TextInput
          placeholder="Type message..."
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={handleSend}
          placeholderTextColor="#aaa"
          style={[styles.input, { color: theme.text }]}
        />

        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <View style={{ transform: [{ scale: message.trim() ? 1 : 0.95 }] }}>
            <Icon
              name={message.trim() ? 'send' : 'mic-outline'}
              size={22}
              color="#fff"
            />
          </View>
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
  input: {
    flex: 1,
    fontSize: 14,
    marginHorizontal: 10,
  },
  sendBtn: {
    backgroundColor: '#8B5CF6',
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    activeOpacity: 0.7,
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
    paddingBottom: 20,
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
    padding: 6,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
  myBubble: {
    backgroundColor: '#8B5CF6',
  },
  otherBubble: {
    backgroundColor: '#1E293B',
  },
  myText: {
    color: '#fff',
  },
  otherText: {
    color: '#ccc',
  },

  typingContainer: {
    paddingHorizontal: 16,
    marginTop: 6,
  },

  typingBubble: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
});
