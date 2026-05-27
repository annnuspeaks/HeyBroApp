import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './src/navigation/BottomTabs';
import { ThemeProvider } from './src/theme/ThemeContext';
import LoginScreen from './src/screens/LoginScreen';
import OtpScreen from './src/screens/OtpScreen';
import ChatOpenScreen from './src/screens/ChatOpenScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import VoiceCallScreen from './src/screens/VoiceCallScreen';
import ContactsScreen from './src/screens/VoiceContactsScreen';
import IncomingVoiceCallScreen from './src/screens/IncomingVoiceCallScreen';
import OutgoingVoiceCallScreen from './src/screens/OutgoingVoiceCallScreen';
import VideoScreen from './src/screens/VideoScreen';
import VideoCallScreen from './src/screens/VideoCallScreen';
import IncomingVideoCallScreen from './src/screens/IncomingVideoCallScreen';
import OutgoingVideoCallScreen from './src/screens/OutgoingVideoCallScreen';
import VideoContactsScreen from './src/screens/VideoContactsScreen';
import MyProfileQRScreen from './src/screens/MyProfileQRScreen';
import TermsAndConditionsScreen from './src/screens/TermsAndConditionsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="OtpScreen"
            component={OtpScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="MainTabs"
            component={BottomTabs}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ChatOpen"
            component={ChatOpenScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="TermsAndConditionsScreen"
            component={TermsAndConditionsScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="MyProfileQRScreen"
            component={MyProfileQRScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ContactsScreen"
            component={ContactsScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="VoiceCallScreen"
            component={VoiceCallScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="IncomingVoiceCallScreen"
            component={IncomingVoiceCallScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="OutgoingVoiceCallScreen"
            component={OutgoingVoiceCallScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="VideoScreen"
            component={VideoScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="VideoCallScreen"
            component={VideoCallScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="IncomingVideoCallScreen"
            component={IncomingVideoCallScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="OutgoingVideoCallScreen"
            component={OutgoingVideoCallScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="VideoContactsScreen"
            component={VideoContactsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
