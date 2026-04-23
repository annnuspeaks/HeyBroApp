import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

const ProfileScreen = ({ navigation }: any) => {
  const { theme } = useContext(ThemeContext);

  const user = {
    name: 'Harshvardhan',
    phone: '+91 9876543210',
    image: 'https://i.pravatar.cc/150?img=12',
  };

  const handleLogout = () => {
    navigation.replace('LoginScreen');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      {/* 🔥 PROFILE HEADER */}
      <View style={styles.header}>
        <Image source={{ uri: user.image }} style={styles.avatar} />

        <Text style={[styles.name, { color: theme.text }]}>
          {user.name}
        </Text>

        <Text style={[styles.phone, { color: theme.subText }]}>
          {user.phone}
        </Text>
      </View>

      {/* 🔥 OPTIONS CARD */}
      <View
        style={[
          styles.card,
          {
            backgroundColor:
              theme.background === '#020617'
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.05)',
            borderColor: theme.border,
          },
        ]}
      >

        {/* EDIT PROFILE */}
        <TouchableOpacity style={styles.item}>
          <Text style={[styles.itemText, { color: theme.text }]}>
            Edit Profile
          </Text>
        </TouchableOpacity>

        {/* SETTINGS */}
        <TouchableOpacity style={styles.item}>
          <Text style={[styles.itemText, { color: theme.text }]}>
            Settings
          </Text>
        </TouchableOpacity>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.item} onPress={handleLogout}>
          <Text style={[styles.itemText, { color: 'red' }]}>
            Logout
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
  },

  phone: {
    marginTop: 4,
    fontSize: 14,
  },

  card: {
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 10,
  },

  item: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },

  itemText: {
    fontSize: 15,
    fontWeight: '500',
  },
});