import React, { useContext, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
  PanResponder,
} from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const messages = [
  {
    id: '1',
    text: 'Hello bro 👋',
    sender: 'them',
    time: '10:40 PM',
    status: 'seen', // sent | delivered | seen
  },
  {
    id: '2',
    text: 'Hey! kya haal hai?',
    sender: 'me',
    time: '10:41 PM',
    status: 'seen',
  },
  {
    id: '3',
    text: 'Sab mast 🔥',
    sender: 'them',
    time: '10:42 PM',
  },
];
const ChatOpenScreen = ({ route, navigation }: any) => {
  const flatListRef = useRef<FlatList<any>>(null!);
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = React.useState('');
  const [replyTo, setReplyTo] = useState<any>(null);
  const [swipedMsgId, setSwipedMsgId] = useState<string | null>(null);
  const translateXMap = useRef<{ [key: string]: Animated.Value }>({}).current;

  const [isRecording, setIsRecording] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  const sendAnim = useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    Animated.spring(sendAnim, {
      toValue: message.trim() ? 1 : 0.9,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, [message]);

  const [chatData, setChatData] = React.useState(messages);
  React.useEffect(() => {
    if (isTyping) {
      dot1.setValue(0);
      dot2.setValue(0);
      dot3.setValue(0);

      Animated.loop(
        Animated.stagger(150, [
          Animated.timing(dot1, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot3, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [isTyping]);

  const { theme } = useContext(ThemeContext);
  const { user } = route.params;

  const renderMessage = ({ item }: { item: any }) => {
    if (!translateXMap[item.id]) {
      translateXMap[item.id] = new Animated.Value(0);
    }

    const translateX = translateXMap[item.id];
    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dx) > 10;
      },

      onPanResponderMove: (_, gesture) => {
        if (gesture.dx > 0) {
          translateX.setValue(Math.min(gesture.dx, 80));

          if (gesture.dx > 20) {
            setSwipedMsgId(item.id);
          }
        }
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 60) {
          setReplyTo(item);
        }

        setSwipedMsgId(null);

        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          friction: 5,
        }).start();
      },
    });

    const isMe = item.sender === 'me';
    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.messageRow,
          {
            justifyContent: isMe ? 'flex-end' : 'flex-start',
            transform: [{ translateX }],
            opacity: translateX.interpolate({
              inputRange: [0, 100],
              outputRange: [1, 0.85],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        {swipedMsgId === item.id && (
          <Animated.Text
            style={[
              styles.replyHint,
              {
                opacity: translateX.interpolate({
                  inputRange: [10, 40],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                }),
                transform: [
                  {
                    scale: translateX.interpolate({
                      inputRange: [10, 40],
                      outputRange: [0.5, 1],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}
          >
            ↩
          </Animated.Text>
        )}
        <View
          style={[
            styles.messageBubble,
            isMe ? styles.myBubble : styles.otherBubble,
          ]}
        >
          {item.replyTo && (
            <View style={styles.replyPreview}>
              <Text style={styles.replyPreviewText}>{item.replyTo}</Text>
            </View>
          )}
          <Text
            style={[
              styles.messageText,
              isMe ? styles.myText : styles.otherText,
              { flexWrap: 'wrap' },
            ]}
          >
            {item.text}
          </Text>

          {/* 🔥 TIME + TICKS */}
          <View style={styles.metaContainer}>
            <Text style={styles.timeTextMsg}>{item.time}</Text>

            {isMe && (
              <Text
                style={[
                  styles.tick,
                  {
                    color: item.status === 'seen' ? '#60A5FA' : '#aaa',
                  },
                ]}
              >
                {item.status === 'sent'
                  ? '✓'
                  : item.status === 'delivered'
                  ? '✓✓'
                  : '✓✓'}
              </Text>
            )}
          </View>
        </View>
      </Animated.View>
    );
  };

  const handleSend = () => {
    if (message.trim() === '') return;
    const newMsg = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
      replyTo: replyTo ? replyTo.text : null,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'sent',
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
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setChatData(prev => [...prev, reply]);
      setIsTyping(false);
      setReplyTo(null);
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
        ref={flatListRef}
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

      {isTyping && (
        <View style={styles.typingContainer}>
          <View style={styles.typingBubble}>
            <View style={{ flexDirection: 'row' }}>
              <Animated.View
                style={[
                  styles.dot,
                  {
                    opacity: dot1,
                    transform: [
                      {
                        translateY: dot1.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -4],
                        }),
                      },
                    ],
                  },
                ]}
              />

              <Animated.View
                style={[
                  styles.dot,
                  { marginHorizontal: 4 },
                  {
                    opacity: dot2,
                    transform: [
                      {
                        translateY: dot2.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -4],
                        }),
                      },
                    ],
                  },
                ]}
              />

              <Animated.View
                style={[
                  styles.dot,
                  {
                    opacity: dot3,
                    transform: [
                      {
                        translateY: dot3.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -4],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
          </View>
        </View>
      )}

      {isRecording && (
        <View style={styles.recordingContainer}>
          <Text style={styles.recordingText}>● Recording...</Text>
        </View>
      )}

      {replyTo && (
        <View style={styles.replyBar}>
          <View style={{ flex: 1 }}>
            <Text style={styles.replyLabel}>Replying to</Text>
            <Text numberOfLines={1} style={styles.replyText}>
              {replyTo.text}
            </Text>
          </View>

          <TouchableOpacity onPress={() => setReplyTo(null)}>
            <Text style={styles.replyClose}>✕</Text>
          </TouchableOpacity>
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

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sendBtn}
          onPress={handleSend}
          onPressIn={() => {
            Animated.spring(sendAnim, {
              toValue: 0.85,
              useNativeDriver: true,
            }).start();
          }}
          onPressOut={() => {
            setIsRecording(false);

            Animated.spring(sendAnim, {
              toValue: 1,
              useNativeDriver: true,
            }).start();
          }}
          onLongPress={() => setIsRecording(true)}
        >
          <Animated.View
            style={{
              transform: [{ scale: isRecording ? pulseAnim : sendAnim }],
              opacity: isRecording ? 1 : message.trim() ? 1 : 0.7,
            }}
          >
            <Icon
              name={
                isRecording ? 'mic' : message.trim() ? 'send' : 'mic-outline'
              }
              size={22}
              color={isRecording ? 'red' : '#fff'}
            />
          </Animated.View>
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
    minWidth: 60,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 15,
    marginHorizontal: 10,
  },
  sendBtn: {
    backgroundColor: '#8B5CF6',
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
    lineHeight: 20,
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
    padding: 6,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    justifyContent: 'flex-start',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    backgroundColor: 'rgba(255,255,255,0.06)',
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

  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#aaa',
    borderRadius: 3,
  },

  recordingContainer: {
    alignItems: 'center',
    marginBottom: 6,
  },

  recordingText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },

  timeTextMsg: {
    fontSize: 10,
    color: '#aaa',
    marginRight: 4,
  },

  tick: {
    fontSize: 12,
    color: '#aaa',
  },
  replyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  replyLabel: {
    fontSize: 11,
    color: '#aaa',
  },

  replyText: {
    fontSize: 13,
    color: '#fff',
  },

  replyClose: {
    fontSize: 18,
    color: '#aaa',
    paddingHorizontal: 8,
  },

  replyPreview: {
    borderLeftWidth: 3,
    borderLeftColor: '#8B5CF6',
    paddingLeft: 6,
    marginBottom: 4,
  },

  replyPreviewText: {
    fontSize: 12,
    color: '#ccc',
  },
  replyHint: {
    position: 'absolute',
    left: 0,
    top: '35%',
    color: '#8B5CF6',
    fontSize: 16,
  },
});
