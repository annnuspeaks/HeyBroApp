import React, {
  useContext,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';

import {ThemeContext} from '../theme/ThemeContext';

const VideoScreen = () => {
  const {theme} = useContext(ThemeContext);

  const navigation = useNavigation<any>();

  const [activeTab, setActiveTab] =
    useState<'All' | 'Missed'>('All');

  const videoCalls = [
    {
      id: '1',
      name: 'Shreya Ji',
      type: 'Incoming',
      online: true,
      timestamp: new Date(),
      image: 'https://i.pravatar.cc/150?img=10',
    },

    {
      id: '2',
      name: 'Aham Deshwal',
      type: 'Missed',
      online: false,
      timestamp: new Date(),
      image: 'https://i.pravatar.cc/150?img=20',
    },
  ];

  const filteredCalls =
    activeTab === 'Missed'
      ? videoCalls.filter(
          item => item.type === 'Missed',
        )
      : videoCalls;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme.background,
        },
      ]}>
      <View style={styles.headerRow}>
        <View>
          <Text
            style={[
              styles.header,
              {color: theme.text},
            ]}>
            Video Calls
          </Text>

          <Text
            style={[
              styles.subHeader,
              {color: theme.subText},
            ]}>
            Recent video activity
          </Text>
        </View>

        <TouchableOpacity
          style={styles.videoFab}>
          <Icon
            name="videocam"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* SEGMENT */}

      <View style={styles.segmentOuter}>
        <View style={styles.segmentContainer}>
          <View
            style={[
              styles.activePill,
              {
                left:
                  activeTab === 'All'
                    ? 3
                    : 84,

                backgroundColor:
                  activeTab === 'All'
                    ? '#8B5CF6'
                    : '#EF4444',
              },
            ]}
          />

          <TouchableOpacity
            style={styles.segmentButton}
            onPress={() =>
              setActiveTab('All')
            }>
            <Text
              style={[
                styles.segmentText,
                activeTab === 'All' &&
                  styles.activeText,
              ]}>
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.segmentButton}
            onPress={() =>
              setActiveTab('Missed')
            }>
            <Text
              style={[
                styles.segmentText,
                activeTab === 'Missed' &&
                  styles.activeText,
              ]}>
              Missed
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredCalls}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor:
                  theme.background ===
                  '#020617'
                    ? 'rgba(255,255,255,0.04)'
                    : '#fff',
              },
            ]}
            onPress={() =>
              navigation.navigate(
                'VideoCallScreen',
                {
                  user: item,
                },
              )
            }>
            <Image
              source={{
                uri: item.image,
              }}
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
                  color:
                    item.type === 'Missed'
                      ? '#EF4444'
                      : '#8B5CF6',

                  marginTop: 4,
                }}>
                {item.type}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.callButton}>
              <Icon
                name="videocam"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  header: {
    fontSize: 34,
    fontWeight: '700',
  },

  subHeader: {
    marginTop: 4,
    opacity: 0.7,
  },

  videoFab: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  segmentOuter: {
    alignItems: 'center',
    marginVertical: 24,
  },

  segmentContainer: {
    width: 170,
    height: 44,
    borderRadius: 22,
    backgroundColor:
      'rgba(255,255,255,0.05)',

    overflow: 'hidden',
    flexDirection: 'row',
    position: 'relative',
  },

  activePill: {
    position: 'absolute',
    width: 84,
    height: 38,
    borderRadius: 19,
    top: 3,
  },

  segmentButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  segmentText: {
    color: '#94A3B8',
    fontWeight: '600',
  },

  activeText: {
    color: '#fff',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 22,
    marginBottom: 12,
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginRight: 14,
  },

  name: {
    fontSize: 17,
    fontWeight: '600',
  },

  callButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});