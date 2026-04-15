import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
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

const renderIcon = (name: string, focused: boolean, color: string) => {
  return (
    <View style={styles.iconContainer}>
      <Icon name={focused ? name : `${name}-outline`} size={26} color={color} />
      {focused && <View style={styles.dot} />}
    </View>
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
        tabBarInactiveTintColor: theme.subText,

        tabBarStyle: {
          position: 'absolute',
          marginHorizontal: 15,
          bottom: 10,
          height: 70,
          borderRadius: 20,
          backgroundColor:
            theme.background === '#020617'
              ? 'rgba(15,23,42,0.75)'
              : 'rgba(255,255,255,0.7)',
          borderWidth: 1,
          borderColor: theme.border,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 10,
          paddingBottom: 10,
          paddingTop: 10,
        },

        tabBarIcon: ({ focused, color }) => {
          let iconName = 'chatbubble';

          if (route.name === 'Chats') iconName = 'chatbubble';
          if (route.name === 'Voice') iconName = 'call';
          if (route.name === 'Video') iconName = 'videocam';
          if (route.name === 'Profile') iconName = 'person';

          return renderIcon(iconName, focused, color);
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
  },

  dot: {
    marginTop: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8B5CF6',
  },
});
