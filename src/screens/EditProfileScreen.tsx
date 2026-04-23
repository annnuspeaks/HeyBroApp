import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
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
      Alert.alert('Name & Phone are required');
      return;
    }

    navigation.goBack();
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <View style={styles.card}>
            {/* PROFILE IMAGE */}
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => Alert.alert('Image picker later')}
            >
              <Image source={{ uri: form.image }} style={styles.avatar} />
              <Text style={styles.changePhoto}>Change Photo</Text>
            </TouchableOpacity>

            {/* INPUT FIELDS */}
            {/* NAME */}
            <View style={styles.field}>
              <Text style={styles.label}>Name*</Text>
              <TextInput
                value={form.name}
                onChangeText={text => handleChange('name', text)}
                style={styles.input}
              />
            </View>

            {/* PHONE */}
            <View style={styles.field}>
              <Text style={styles.label}>Phone*</Text>
              <TextInput
                value={form.phone}
                keyboardType="phone-pad"
                onChangeText={text => handleChange('phone', text)}
                style={styles.input}
              />
            </View>

            {/* GENDER */}
            <View style={styles.field}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.radioRow}>
                {['Male', 'Female', 'Other'].map(g => (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.radio,
                      form.gender === g && styles.radioActive,
                    ]}
                    onPress={() => handleChange('gender', g)}
                  >
                    <Text style={styles.radioText}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* DOB */}
            <View style={styles.field}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => Alert.alert('Date picker next')}
              >
                <Text style={{ color: form.dob ? '#fff' : '#888' }}>
                  {form.dob || 'Select Date'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* QUALIFICATION */}
            <View style={styles.field}>
              <Text style={styles.label}>Qualification</Text>
              <TextInput
                value={form.qualification}
                onChangeText={text => handleChange('qualification', text)}
                style={styles.input}
              />
            </View>

            {/* EMAIL */}
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={form.email}
                keyboardType="email-address"
                onChangeText={text => handleChange('email', text)}
                style={styles.input}
              />
            </View>

            {/* WEBSITE */}
            <View style={styles.field}>
              <Text style={styles.label}>Website</Text>
              <TextInput
                value={form.website}
                onChangeText={text => handleChange('website', text)}
                style={styles.input}
              />
            </View>

            {/* BIO */}
            <View style={styles.field}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                value={form.bio}
                multiline
                onChangeText={text => handleChange('bio', text)}
                style={[styles.input, { height: 100 }]}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#020617',
  },

  content: {
    width: '100%',
    maxWidth: 500, // 🔥 center form
    alignSelf: 'center',
    padding: 20,
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
  saveBtn: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#7C3AED',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  radio: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
    width: '30%',
    alignItems: 'center',
  },

  radioActive: {
    backgroundColor: '#7C3AED',
  },

  radioText: {
    color: '#fff',
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 20,
    padding: 16,
  },
});
