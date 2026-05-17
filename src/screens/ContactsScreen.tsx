import React, {useContext} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {ThemeContext} from '../theme/ThemeContext';
import {useNavigation} from '@react-navigation/native';

const ContactsScreen = () => {
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation<any>();

  const contacts = [
    {
      id: '1',
      name: 'Shreya Ji',
      online: true,
      image: 'https://i.pravatar.cc/150?img=10',
    },

    {
      id: '2',
      name: 'Rohan',
      online: false,
      image: 'https://i.pravatar.cc/150?img=11',
    },

    {
      id: '3',
      name: 'Aaditya',
      online: true,
      image: 'https://i.pravatar.cc/150?img=12',
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}>
      <Text style={[styles.header, {color: theme.text}]}>
        Select Contact
      </Text>

      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor:
                  theme.background === '#020617'
                    ? 'rgba(255,255,255,0.05)'
                    : '#fff',
              },
            ]}
            onPress={() =>
              navigation.navigate('CallingScreen', {
                user: item,
              })
            }>
            <Image
              source={{uri: item.image}}
              style={styles.avatar}
            />

            <View style={{flex: 1}}>
              <Text
                style={[
                  styles.name,
                  {color: theme.text},
                ]}>
                {item.name}
              </Text>

              <Text
                style={{
                  color: item.online
                    ? '#22C55E'
                    : '#64748B',
                  marginTop: 5,
                }}>
                {item.online ? 'Online' : 'Offline'}
              </Text>
            </View>

            <Icon
              name="call"
              size={22}
              color="#22C55E"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    marginBottom: 14,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    marginRight: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },
});