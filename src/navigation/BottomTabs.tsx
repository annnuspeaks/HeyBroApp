import React, { useRef, useEffect, useContext } from 'react';
import { StyleSheet, View, Animated, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VoiceScreen from '../screens/VoiceScreen';
import VideoScreen from '../screens/VideoScreen';
import { ThemeContext } from '../theme/ThemeContext';
import ChatOpenScreen from '../screens/ChatOpenScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();

type IconProps = {
  name: string;
  focused: boolean;
  color: string;
};

const AnimatedIcon = ({ name, focused, color }: IconProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.2 : 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [focused, scale]);

  return (
    <Pressable
      android_ripple={{
        color: 'rgba(139,92,246,0.25)', // 🔥 ripple
        borderless: true,
      }}
      onPress={() => {
        const HapticFeedback = require('react-native-haptic-feedback').default;
        HapticFeedback.trigger('selection'); // 🔥 tab vibration
      }}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.9 : 1 }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [{ scale }],
          },
        ]}
      >
        <Icon
          name={focused ? name : `${name}-outline`}
          size={28}
          color={focused ? '#8B5CF6' : color}
        />

        {focused && <View style={styles.activeDot} />}
      </Animated.View>
    </Pressable>
  );
};

const Stack = createNativeStackNavigator();

const TabsWrapper = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor:
          theme.background === '#020617' ? theme.subText : '#6B7280',
        tabBarStyle: {
          position: 'absolute',
          marginHorizontal: 15,
          bottom: 15,
          height: 70,
          borderRadius: 22,
          backgroundColor:
            theme.background === '#020617'
              ? 'rgba(15,23,42,0.95)'
              : 'rgba(255,255,255,0.75)',
          borderWidth: 1,
          borderColor:
            theme.background === '#020617' ? theme.border : 'rgba(0,0,0,0.08)',
          elevation: 12,
          shadowColor: theme.background === '#020617' ? '#000' : '#999',
          shadowOpacity: theme.background === '#020617' ? 0.25 : 0.12,
          shadowRadius: 12,
          paddingBottom: 10,
          paddingTop: 10,
        },

        tabBarIcon: ({ focused, color }) => {
          let iconName = 'chatbubble';

          if (route.name === 'Chats') iconName = 'chatbubble';
          if (route.name === 'Voice') iconName = 'call';
          if (route.name === 'Video') iconName = 'videocam';
          if (route.name === 'Profile') iconName = 'person';

          return (
            <AnimatedIcon name={iconName} focused={focused} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Chats" component={ChatScreen} />
      <Tab.Screen name="Voice" component={VoiceScreen} />
      <Tab.Screen name="Video" component={VideoScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const BottomTabs = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 🔥 Tabs (your existing UI) */}
      <Stack.Screen name="Tabs" component={TabsWrapper} />

      {/* 🔥 Chat open screen */}
      <Stack.Screen name="ChatOpen" component={ChatOpenScreen} />
    </Stack.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  dot: {
    marginTop: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8B5CF6',
  },
  activeDot: {
    marginTop: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B5CF6',

    shadowColor: '#8B5CF6',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
});
