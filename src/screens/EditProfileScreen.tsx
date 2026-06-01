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

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
  isTablet,
} from '../theme/responsive';

import DatePicker from 'react-native-date-picker';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useUserStore } from '../store/userStore';

import { COLORS } from '../theme/colors';

const EditProfileScreen = ({ navigation, route }: any) => {
  const oldProfile = route?.params?.profile;

  const { setProfile } = useUserStore();

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
    setProfile(form);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* BACK BUTTON */}

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={COLORS.white} />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroGlowLeft} />
          <View style={styles.heroGlowRight} />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.heroImageContainer}
            onPress={() =>
              Alert.alert('Image Upload', 'Backend ke sath later add krenge 🙂')
            }
          >
            <Image
              source={{
                uri: form.image,
              }}
              style={styles.heroAvatar}
            />

            <View style={styles.heroCameraBadge}>
              <Ionicons
                name="camera"
                size={isTablet ? 25 : 22}
                color={COLORS.white}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.heroName}>{form.name}</Text>
          <Text style={styles.heroPhone}>{form.phone}</Text>
        </View>

        <View style={styles.formCard}>

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
                        color: COLORS.white,
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
                  color: form.dob ? COLORS.white : 'rgba(255,255,255,0.35)',
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
    backgroundColor: COLORS.background,
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
    backgroundColor: COLORS.overlay,
  },

  card: {
    marginTop: 90,
    width: '88%',
    alignSelf: 'center',
    borderRadius: 34,
    padding: 24,
    backgroundColor: COLORS.overlay,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
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
    color: COLORS.white,
    fontSize: 16,
    justifyContent: 'center',
    backgroundColor: COLORS.input,
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
    backgroundColor: COLORS.input,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  genderButtonActive: {
    backgroundColor: COLORS.primaryDark,
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
    backgroundColor: COLORS.primaryDark,
  },

  saveText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },

  heroCard: {
    marginTop: verticalScale(90),

    width: '92%',
    maxWidth: 1300,

    alignSelf: 'center',

    borderRadius: moderateScale(32),

    paddingVertical: verticalScale(34),
    paddingHorizontal: scale(24),

    alignItems: 'center',

    overflow: 'hidden',

    backgroundColor: 'rgba(255,255,255,0.04)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  heroGlowLeft: {
    position: 'absolute',

    top: -90,
    left: -70,

    width: isTablet ? 260 : 220,
    height: isTablet ? 260 : 220,

    borderRadius: 999,

    backgroundColor: 'rgba(168,85,247,0.18)',
  },

  heroGlowRight: {
    position: 'absolute',

    bottom: -80,
    right: -60,

    width: isTablet ? 240 : 190,
    height: isTablet ? 240 : 190,

    borderRadius: 999,

    backgroundColor: 'rgba(59,130,246,0.12)',
  },

  heroImageContainer: {
    alignItems: 'center',
  },

  heroAvatar: {
    width: scale(isTablet ? 80 : 72),
    height: scale(isTablet ? 80 : 72),
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  heroCameraBadge: {
    position: 'absolute',
    right: -2,
    bottom: 2,
    width: scale(20),
    height: scale(20),
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDark,
  },

  heroName: {
    marginTop: verticalScale(18),

    color: COLORS.white,

    fontWeight: '700',

    fontSize: fontScale(isTablet ? 24 : 22),
  },

  heroPhone: {
    marginTop: verticalScale(8),
    color: 'rgba(255,255,255,0.55)',
    fontSize: fontScale(isTablet ? 15 : 14),
  },

  formCard: {
    marginTop: verticalScale(24),
    width: '92%',
    maxWidth: 1300,
    alignSelf: 'center',
    borderRadius: moderateScale(28),
    padding: scale(24),
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
});
