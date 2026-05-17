import React, {
  useEffect,
  useRef,
} from 'react';

import {
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const CallingScreen = ({route}: any) => {

  const {user} = route.params;

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.12)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.04,
          duration: 1500,
          useNativeDriver: true,
        }),

        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.18,
          duration: 1500,
          useNativeDriver: true,
        }),

        Animated.timing(opacityAnim, {
          toValue: 0.1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={['#020617', '#0F172A', '#111827']}
      style={styles.container}>
      <Animated.View
        style={[
          styles.glow,
          {
            opacity: opacityAnim,
            transform: [{scale: pulseAnim}],
          },
        ]}
      />

      <Image
        source={{uri: user.image}}
        style={styles.avatar}
      />

      <Text style={styles.name}>{user.name}</Text>

      <Text style={styles.status}>
        {user.online ? 'Ringing...' : 'Calling...'}
      </Text>

      <TouchableOpacity style={styles.endButton}>
        <Icon
          name="call"
          size={30}
          color="#fff"
          style={{
            transform: [{rotate: '135deg'}],
          }}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CallingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  glow: {
    position: 'absolute',
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: 999,
    backgroundColor: '#8B5CF6',
  },

  avatar: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },

  name: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 30,
  },

  status: {
    color: 'rgba(255,255,255,0.65)',
    marginTop: 12,
    fontSize: 17,
  },

  endButton: {
    position: 'absolute',
    bottom: 70,
    width: 85,
    height: 85,
    borderRadius: 42,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
});