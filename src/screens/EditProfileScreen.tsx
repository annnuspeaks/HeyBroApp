import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

const EditProfileScreen = ({ navigation }: any) => {
  const [form, setForm] = useState({
    name: 'Harshvardhan',
    phone: '+91 9876543210',
    age: '',
    gender: '',
    qualification: '',
    bio: '',
    dob: '',
    email: '',
    website: '',
    image: 'https://i.pravatar.cc/150?img=12',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = () => {
    if (!form.name || !form.phone) {
      alert('Name & Phone are required');
      return;
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* PROFILE IMAGE */}
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => alert('Image picker later')}
      >
        <Image source={{ uri: form.image }} style={styles.avatar} />
        <Text style={styles.changePhoto}>Change Photo</Text>
      </TouchableOpacity>

      {/* INPUT FIELDS */}
      {[
        { label: 'Name*', key: 'name' },
        { label: 'Phone*', key: 'phone' },
        { label: 'Age', key: 'age' },
        { label: 'Gender', key: 'gender' },
        { label: 'Qualification', key: 'qualification' },
        { label: 'Bio', key: 'bio' },
        { label: 'Date of Birth', key: 'dob' },
        { label: 'Email', key: 'email' },
        { label: 'Website', key: 'website' },
      ].map(item => (
        <View key={item.key} style={styles.field}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            value={(form as any)[item.key]}
            onChangeText={text => handleChange(item.key, text)}
            style={styles.input}
          />
        </View>
      ))}

      {/* SAVE BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#020617',
  },

  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  changePhoto: {
    marginTop: 8,
    color: '#7C3AED',
  },

  field: {
    marginBottom: 16,
  },

  label: {
    marginBottom: 6,
    color: '#aaa',
  },

  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#fff',
  },

  button: {
    marginTop: 20,
    backgroundColor: '#7C3AED',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
