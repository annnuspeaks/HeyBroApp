import React, {
  useContext,
  useEffect,
  useRef,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Animated,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';

import {ThemeContext} from '../theme/ThemeContext';

import FloatingThemeToggle from '../components/FloatingThemeToggle';

const CallItem = ({
  item,
  index,
  theme,
  navigation,
}: any) => {
  const translateY = useRef(
    new Animated.Value(30),
  ).current;

  const opacity = useRef(
    new Animated.Value(0),
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('CallingScreen', {
          user: item,
        })
      }
      style={({pressed}) => [
        {
          transform: [{scale: pressed ? 0.98 : 1}],
        },
      ]}>
      <Animated.View
        style={[
          styles.callCard,
          {
            backgroundColor:
              theme.background === '#020617'
                ? 'rgba(255,255,255,0.05)'
                : '#fff',

            borderColor:
              theme.background === '#020617'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(0,0,0,0.06)',

            opacity,
            transform: [{translateY}],
          },
        ]}>
        <View style={{position: 'relative'}}>
          <Image
            source={{uri: item.image}}
            style={styles.avatar}
          />

          <View
            style={[
              styles.onlineDot,
              {
                backgroundColor: item.online
                  ? '#22C55E'
                  : '#64748B',
              },
            ]}
          />
        </View>

        <View style={{flex: 1}}>
          <Text style={[styles.name, {color: theme.text}]}>
            {item.name}
          </Text>

          <View style={styles.row}>
            <Icon
              name={
                item.type === 'Missed'
                  ? 'call-outline'
                  : 'arrow-up-outline'
              }
              size={14}
              color={
                item.type === 'Missed'
                  ? '#EF4444'
                  : '#22C55E'
              }
            />

            <Text
              style={[
                styles.callType,
                {color: theme.subText},
              ]}>
              {item.type}
            </Text>
          </View>
        </View>

        <View style={{alignItems: 'flex-end'}}>
          <Text
            style={[
              styles.time,
              {color: theme.subText},
            ]}>
            {item.time}
          </Text>

          <TouchableOpacity
            style={styles.smallCallButton}
            onPress={() =>
              navigation.navigate(
                'CallingScreen',
                {
                  user: item,
                },
              )
            }>
            <Icon
              name="call"
              size={18}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const VoiceScreen = () => {
  const navigation = useNavigation<any>();

  const {theme} = useContext(ThemeContext);

  const fadeAnim = useRef(
    new Animated.Value(0),
  ).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const recentCalls = [
    {
      id: '1',
      name: 'Shreya Ji',
      type: 'Incoming',
      time: 'Today, 10:42 PM',
      online: true,
      image: 'https://i.pravatar.cc/150?img=10',
    },

    {
      id: '2',
      name: 'Rohan',
      type: 'Outgoing',
      time: 'Today, 7:12 PM',
      online: false,
      image: 'https://i.pravatar.cc/150?img=11',
    },

    {
      id: '3',
      name: 'Aaditya',
      type: 'Missed',
      time: 'Yesterday',
      online: true,
      image: 'https://i.pravatar.cc/150?img=12',
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}>
      <FloatingThemeToggle />

      <Animated.View
        style={{
          opacity: fadeAnim,
          flex: 1,
        }}>
        <Text
          style={[
            styles.header,
            {color: theme.text},
          ]}>
          Calls
        </Text>

        <Text
          style={[
            styles.subHeader,
            {color: theme.subText},
          ]}>
          Recent voice activity
        </Text>

        <FlatList
          data={recentCalls}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          renderItem={({item, index}) => (
            <CallItem
              item={item}
              index={index}
              theme={theme}
              navigation={navigation}
            />
          )}
        />

        <TouchableOpacity
          style={styles.fab}
          onPress={() =>
            navigation.navigate(
              'ContactsScreen',
            )
          }>
          <Icon
            name="call"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default VoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 20,
  },

  header: {
    fontSize: 34,
    fontWeight: '700',
  },

  subHeader: {
    marginTop: 5,
    marginBottom: 25,
    fontSize: 14,
    opacity: 0.7,
  },

  callCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 22,
    marginBottom: 14,
    borderWidth: 1,
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginRight: 14,
  },

  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 14,
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#020617',
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  callType: {
    marginLeft: 5,
    fontSize: 13,
  },

  time: {
    fontSize: 12,
    marginBottom: 12,
  },

  smallCallButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#22C55E',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#22C55E',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
});