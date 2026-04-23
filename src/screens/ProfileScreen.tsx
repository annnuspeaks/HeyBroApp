import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

const ProfileScreen = ({ navigation }: any) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const phone = '+91 9876543210';
  const [name, setName] = useState('Harshvardhan');
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    navigation.replace('LoginScreen');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 🔥 PROFILE HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => alert('Image picker later')}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            style={styles.avatar}
          />
        </TouchableOpacity>

        {isEditing ? (
          <TextInput
            value={name}
            onChangeText={setName}
            style={[styles.input, { color: theme.text }]}
          />
        ) : (
          <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
        )}

        <Text style={[styles.phone, { color: theme.subText }]}>{phone}</Text>
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
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={[styles.itemText, { color: theme.text }]}>
            {isEditing ? 'Save' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>

        {/* SETTINGS */}
        <TouchableOpacity style={styles.item}>
          <Text style={[styles.itemText, { color: theme.text }]}>Settings</Text>
        </TouchableOpacity>

        {/* / THEME TOGGLE */}
        <TouchableOpacity style={styles.item} onPress={toggleTheme}>
          <Text style={[styles.itemText, { color: theme.text }]}>
            Toggle Theme 🌗
          </Text>
        </TouchableOpacity>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.item} onPress={handleLogout}>
          <Text style={[styles.itemText, { color: 'red' }]}>Logout</Text>
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
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
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
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginTop: 6,
  },
});
