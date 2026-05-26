import React, { useEffect, useRef } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Easing,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const isPortrait = height > width;

const AVATAR_SIZE = isPortrait ? width * 0.27 : height * 0.24;

const BUTTON_SIZE = isPortrait ? width * 0.12 : height * 0.11;

const OutgoingVideoCallScreen = ({ route, navigation }: any) => {
  const { user } = route.params;

  // =========================
  // ANIMATIONS
  // =========================

  const glowAnim = useRef(new Animated.Value(0.45)).current;

  const pulseAnim = useRef(new Animated.Value(1)).current;

  const textAnim = useRef(new Animated.Value(0.4)).current;

  const islandAnim = useRef(new Animated.Value(1)).current;

  // =========================
  // LOOP ANIMATION
  // =========================

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 0.9,
            duration: 2400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(glowAnim, {
            toValue: 0.45,
            duration: 2400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.03,
            duration: 2400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.timing(textAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),

          Animated.timing(textAnim, {
            toValue: 0.4,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.timing(islandAnim, {
            toValue: 1.04,
            duration: 1800,
            useNativeDriver: true,
          }),

          Animated.timing(islandAnim, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);

  // =========================
  // ACTIONS
  // =========================

  const cancelCall = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={['#5D5A4D', '#4B4841', '#3B312E', '#2A1515']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        {/* DYNAMIC ISLAND */}

        <Animated.View
          style={[
            styles.dynamicIsland,
            {
              transform: [{ scale: islandAnim }],
            },
          ]}
        >
          <View style={styles.islandDot} />

          <Text style={styles.islandText}>Calling...</Text>
        </Animated.View>

        {/* CENTER */}

        <View style={styles.centerContainer}>
          {/* AVATAR GLOW */}

          <Animated.View
            style={[
              {
                opacity: glowAnim,
                transform: [{ scale: pulseAnim }],
              },
            ]}
          />

          {/* AVATAR */}

          <Animated.Image
            source={{
              uri: user.image,
            }}
            style={styles.avatar}
          />

          {/* TEXT */}

          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.name}>
              {user.name}
            </Text>

            <Animated.Text
              style={[
                styles.subText,
                {
                  opacity: textAnim,
                },
              ]}
            >
              Calling video...
            </Animated.Text>
          </View>
        </View>

        {/* BOTTOM BUTTONS */}

        <View style={styles.bottomContainer}>
          {/* MUTE */}

          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.secondaryButton}>
              <Icon name="mic-off" size={26} color="#fff" />
            </View>
          </TouchableOpacity>

          {/* END CALL */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={cancelCall}
          >
            <View style={styles.endCallButton}>
              <Icon
                name="call"
                size={34}
                color="#fff"
                style={{
                  transform: [{ rotate: '135deg' }],
                }}
              />
            </View>
          </TouchableOpacity>

          {/* SPEAKER */}

          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.secondaryButton}>
              <Icon name="volume-high" size={26} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default OutgoingVideoCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.42)',
    alignItems: 'center',
  },

  dynamicIsland: {
    marginTop: isPortrait ? 22 : 10,
    backgroundColor: 'rgba(0,0,0,0.70)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  islandDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#8B5CF6',
  },

  islandText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: AVATAR_SIZE+50,
    height: AVATAR_SIZE+50,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
  },

  textContainer: {
    alignItems: 'center',
    marginTop: 24,
    minHeight: 80,
    justifyContent: 'center',
  },

  name: {
    color: '#fff',
    fontSize: isPortrait ? 31 : 26,
    fontWeight: '800',
    textAlign: 'center',
  },

  subText: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 17,
    marginTop: 10,
    textAlign: 'center',
  },

  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: isPortrait ? 70 : 35,
  },

  secondaryButton: {
    width: BUTTON_SIZE - 5,
    height: BUTTON_SIZE - 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  endCallButton: {
    width: BUTTON_SIZE + 12,
    height: BUTTON_SIZE + 12,
    borderRadius: 999,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});