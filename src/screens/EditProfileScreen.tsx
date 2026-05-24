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
  Dimensions,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768;

const EditProfileScreen = ({ navigation, route }: any) => {
  const oldProfile = route?.params?.profile;

  const [openDatePicker, setOpenDatePicker] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [form, setForm] = useState({
    name: oldProfile?.name || 'Harshvardhan',

    phone: oldProfile?.phone || '+91 9876543210',

    gender: oldProfile?.gender || '',

    qualification: oldProfile?.qualification || '',

    bio: oldProfile?.bio || '',

    dob: oldProfile?.dob || '',

    email: oldProfile?.email || '',

    website: oldProfile?.website || '',

    image: oldProfile?.image || 'https://i.pravatar.cc/300',
  });

  const handleChange = (key: string, value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleSave = () => {
    navigation.navigate('Profile', {
      updatedProfile: form,
    });
  };

  return (
    <View style={styles.container}>
      {/* BACK BUTTON */}

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        <View style={styles.card}>
          {/* PROFILE IMAGE */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.imageContainer}
            onPress={() =>
              Alert.alert('Image Upload', 'Backend ke sath later add krenge 🙂')
            }
          >
            <Image
              source={{
                uri: form.image,
              }}
              style={styles.avatar}
            />

            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={18} color="#fff" />
            </View>

            <Text style={styles.changePhoto}>Change Photo</Text>
          </TouchableOpacity>

          {/* NAME */}

          <View style={styles.field}>
            <Text style={styles.label}>Name</Text>

            <TextInput
              value={form.name}
              placeholder="Enter name"
              placeholderTextColor="rgba(255,255,255,0.35)"
              onChangeText={text => handleChange('name', text)}
              style={styles.input}
            />
          </View>

          {/* PHONE */}

          <View style={styles.field}>
            <Text style={styles.label}>Phone Number</Text>

            <TextInput
              editable={false}
              value={form.phone}
              style={[
                styles.input,
                {
                  opacity: 0.55,
                },
              ]}
            />
          </View>

          {/* GENDER */}

          <View style={styles.field}>
            <Text style={styles.label}>Gender</Text>

            <View style={styles.genderRow}>
              {['Male', 'Female', 'Other'].map(item => (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.8}
                  onPress={() => handleChange('gender', item)}
                  style={[
                    styles.genderButton,

                    form.gender === item && styles.genderButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.genderText,

                      form.gender === item && {
                        color: '#fff',
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* DOB */}

          <View style={styles.field}>
            <Text style={styles.label}>Date of Birth</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setOpenDatePicker(true)}
              style={styles.input}
            >
              <Text
                style={{
                  color: form.dob ? '#fff' : 'rgba(255,255,255,0.35)',
                }}
              >
                {form.dob || 'Select Date'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* QUALIFICATION */}

          <View style={styles.field}>
            <Text style={styles.label}>Qualification</Text>

            <TextInput
              value={form.qualification}
              placeholder="Your qualification"
              placeholderTextColor="rgba(255,255,255,0.35)"
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
              placeholder="example@gmail.com"
              placeholderTextColor="rgba(255,255,255,0.35)"
              onChangeText={text => handleChange('email', text)}
              style={styles.input}
            />
          </View>

          {/* WEBSITE */}

          <View style={styles.field}>
            <Text style={styles.label}>Website</Text>

            <TextInput
              value={form.website}
              placeholder="https://yourwebsite.com"
              placeholderTextColor="rgba(255,255,255,0.35)"
              onChangeText={text => handleChange('website', text)}
              style={styles.input}
            />
          </View>

          {/* BIO */}

          <View style={styles.field}>
            <Text style={styles.label}>Bio</Text>

            <TextInput
              multiline
              value={form.bio}
              placeholder="Write something unique..."
              placeholderTextColor="rgba(255,255,255,0.35)"
              onChangeText={text => handleChange('bio', text)}
              style={[styles.input, styles.bioInput]}
            />
          </View>
        </View>
      </ScrollView>

      <DatePicker
        modal
        mode="date"
        open={openDatePicker}
        date={selectedDate}
        maximumDate={new Date()}
        onConfirm={date => {
          setOpenDatePicker(false);

          setSelectedDate(date);

          const formatted = date.toLocaleDateString('en-GB');

          handleChange('dob', formatted);
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />

      {/* SAVE BUTTON */}

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#020826',
  },

  backButton: {
    position: 'absolute',

    top: 45,
    left: 20,

    zIndex: 999,

    width: 46,
    height: 46,

    borderRadius: 23,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  card: {
    marginTop: 90,

    width: '88%',
    alignSelf: 'center',

    borderRadius: 34,

    padding: 24,

    backgroundColor: 'rgba(255,255,255,0.08)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  imageContainer: {
    alignItems: 'center',

    marginBottom: 35,
  },

  avatar: {
    width: isTablet ? 140 : 110,
    height: isTablet ? 140 : 110,

    borderRadius: 100,
  },

  cameraBadge: {
    position: 'absolute',

    right: width * 0.34,
    bottom: 28,

    width: 34,
    height: 34,

    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#7C3AED',
  },

  changePhoto: {
    marginTop: 12,

    color: '#C084FC',

    fontSize: 16,
    fontWeight: '600',
  },

  field: {
    marginBottom: 22,
  },

  label: {
    color: 'rgba(255,255,255,0.7)',

    marginBottom: 10,

    fontSize: 15,
  },

  input: {
    minHeight: 58,

    borderRadius: 18,

    paddingHorizontal: 18,

    color: '#fff',

    fontSize: 16,

    justifyContent: 'center',

    backgroundColor: 'rgba(255,255,255,0.05)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  bioInput: {
    minHeight: 120,

    paddingTop: 18,

    textAlignVertical: 'top',
  },

  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  genderButton: {
    width: '31%',

    height: 54,

    borderRadius: 16,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.05)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  genderButtonActive: {
    backgroundColor: '#7C3AED',
  },

  genderText: {
    color: 'rgba(255,255,255,0.6)',

    fontWeight: '600',
  },

  saveButton: {
    position: 'absolute',

    bottom: 24,
    left: 20,
    right: 20,

    height: 64,

    borderRadius: 22,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#7C3AED',
  },

  saveText: {
    color: '#fff',

    fontSize: 18,
    fontWeight: '700',
  },
});
