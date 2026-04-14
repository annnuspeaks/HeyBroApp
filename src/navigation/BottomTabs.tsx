import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ThemeToggle from '../components/ThemeToggle';
import VoiceScreen from '../screens/VoiceScreen';
import VideoScreen from '../screens/VideoScreen';

const renderThemeToggle = () => <ThemeToggle />;
const Tab = createBottomTabNavigator();

const chatIcon = ({ color }: any) => (
  <Icon name="chatbubble-ellipses" size={26} color={color} />
);

const voiceIcon = ({ color }: any) => (
  <Icon name="call" size={26} color={color} />
);

const videoIcon = ({ color }: any) => (
  <Icon name="videocam" size={26} color={color} />
);

const profileIcon = ({ color }: any) => (
  <Icon name="person" size={26} color={color} />
);

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F172A',
          borderTopWidth: 0,
          height: 70,
        },
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: '#888',
        headerRight: renderThemeToggle,
      }}
    >
      <Tab.Screen
        name="Chats"
        component={ChatScreen}
        options={{
          tabBarIcon: chatIcon,
          tabBarLabel: '',
        }}
      />

      <Tab.Screen
        name="Voice"
        component={VoiceScreen}
        options={{
          tabBarIcon: voiceIcon,
          tabBarLabel: '',
        }}
      />

      <Tab.Screen
        name="Video"
        component={VideoScreen}
        options={{
          tabBarIcon: videoIcon,
          tabBarLabel: '',
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: profileIcon,
          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
