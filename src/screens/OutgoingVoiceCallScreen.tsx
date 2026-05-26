import React, {useEffect, useRef, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import InCallManager from 'react-native-incall-manager';

const {width, height} = Dimensions.get('window');

const isPortrait = height > width;

const AVATAR_SIZE = isPortrait ? width * 0.27 : height * 0.24;

const BUTTON_SIZE = isPortrait ? width * 0.12 : height * 0.11;

const OutgoingVoiceCallScreen = ({
  route,
  navigation,
}: any) => {
  const {user} = route.params;

  // =========================
  // STATES
  // =========================

  const [isMuted, setIsMuted] =
    useState(false);

  const [isSpeakerOn, setIsSpeakerOn] =
    useState(false);

  // =========================
  // ANIMATIONS
  // =========================

  const textAnim = useRef(
    new Animated.Value(0.4),
  ).current;

  const islandAnim = useRef(
    new Animated.Value(1),
  ).current;

  // =========================
  // RINGTONE
  // =========================

  const ringtoneRef =
    useRef<Sound | null>(null);

  useEffect(() => {
    Sound.setCategory('Playback');

    const ringtone = new Sound(
      'ring.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log(
            'VOICE RINGTONE ERROR => ',
            error,
          );
          return;
        }

        ringtone.setVolume(1);

        ringtone.setNumberOfLoops(-1);

        ringtone.play(success => {
          console.log(
            'VOICE RINGTONE PLAYING => ',
            success,
          );
        });
      },
    );

    ringtoneRef.current = ringtone;

    return () => {
      ringtone.stop(() => {
        ringtone.release();
      });
    };
  }, []);

  // =========================
  // LOOP ANIMATION
  // =========================

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
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
    ringtoneRef.current?.stop();

    navigation.goBack();
  };

  const toggleMute = () => {
    const next = !isMuted;

    setIsMuted(next);

    InCallManager.setMicrophoneMute(
      next,
    );
  };

  const toggleSpeaker = () => {
    const next = !isSpeakerOn;

    setIsSpeakerOn(next);

    InCallManager.setForceSpeakerphoneOn(
      next,
    );
  };

  return (
    <LinearGradient
      colors={[
        '#5D5A4D',
        '#4B4841',
        '#3B312E',
        '#2A1515',
      ]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <View style={styles.overlay}>
        {/* DYNAMIC ISLAND */}

        <Animated.View
          style={[
            styles.dynamicIsland,
            {
              transform: [
                {
                  scale: islandAnim,
                },
              ],
            },
          ]}>
          <View style={styles.islandDot} />

          <Text style={styles.islandText}>
            Calling...
          </Text>
        </Animated.View>

        {/* CENTER */}

        <View style={styles.centerContainer}>
          {/* AVATAR */}

          <Animated.Image
            source={{
              uri: user.image,
            }}
            style={styles.avatar}
          />

          {/* TEXT */}

          <View style={styles.textContainer}>
            <Text
              numberOfLines={1}
              style={styles.name}>
              {user.name}
            </Text>

            <Animated.Text
              style={[
                styles.subText,
                {
                  opacity: textAnim,
                },
              ]}>
              Calling voice...
            </Animated.Text>
          </View>
        </View>

        {/* BOTTOM BUTTONS */}

        <View
          style={styles.bottomContainer}>
          {/* MUTE */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleMute}>
            <View
              style={[
                styles.secondaryButton,

                isMuted &&
                  styles.activeMuteButton,
              ]}>
              <Icon
                name={
                  isMuted
                    ? 'mic-off'
                    : 'mic'
                }
                size={26}
                color="#fff"
              />
            </View>
          </TouchableOpacity>

          {/* END CALL */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={cancelCall}>
            <View
              style={styles.endCallButton}>
              <Icon
                name="call"
                size={34}
                color="#fff"
                style={{
                  transform: [
                    {
                      rotate: '135deg',
                    },
                  ],
                }}
              />
            </View>
          </TouchableOpacity>

          {/* SPEAKER */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleSpeaker}>
            <View
              style={[
                styles.secondaryButton,

                isSpeakerOn &&
                  styles.activeSpeakerButton,
              ]}>
              <Icon
                name={
                  isSpeakerOn
                    ? 'volume-high'
                    : 'volume-medium'
                }
                size={26}
                color="#fff"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default OutgoingVoiceCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.42)',
    alignItems: 'center',
  },

  dynamicIsland: {
    marginTop: isPortrait
      ? 22
      : 10,

    backgroundColor:
      'rgba(0,0,0,0.70)',

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
    backgroundColor: '#22C55E',
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
    width: AVATAR_SIZE + 50,
    height: AVATAR_SIZE + 50,
    borderRadius: 999,
    borderWidth: 2,
    borderColor:
      'rgba(255,255,255,0.15)',
  },

  textContainer: {
    alignItems: 'center',
    marginTop: 24,
    minHeight: 80,
    justifyContent: 'center',
  },

  name: {
    color: '#fff',
    fontSize: isPortrait
      ? 31
      : 26,
    fontWeight: '800',
    textAlign: 'center',
  },

  subText: {
    color:
      'rgba(255,255,255,0.78)',

    fontSize: 17,

    marginTop: 10,

    textAlign: 'center',
  },

  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent:
      'space-evenly',
    alignItems: 'center',
    marginBottom: isPortrait
      ? 70
      : 35,
  },

  secondaryButton: {
    width: BUTTON_SIZE - 5,
    height: BUTTON_SIZE - 5,
    borderRadius: 999,
    backgroundColor:
      'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeMuteButton: {
    backgroundColor: '#D97706',

    shadowColor: '#F59E0B',

    shadowOpacity: 0.9,

    shadowRadius: 18,

    elevation: 12,
  },

  activeSpeakerButton: {
    backgroundColor: '#16A34A',

    shadowColor: '#22C55E',

    shadowOpacity: 0.9,

    shadowRadius: 18,

    elevation: 12,
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