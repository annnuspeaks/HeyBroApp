import React, { useEffect, useRef } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  Vibration,
  Easing,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { BlurView } from '@react-native-community/blur';

import Sound from 'react-native-sound';

import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const isPortrait = height > width;

const BUTTON_SIZE = isPortrait ? width * 0.12 : height * 0.11;

const AVATAR_SIZE = isPortrait ? width * 0.28 : height * 0.24;

const IncomingVideoCallScreen = ({ route, navigation }: any) => {
  const { user } = route.params;

  // =========================
  // ANIMATIONS
  // =========================

  const glowAnim = useRef(new Animated.Value(0.45)).current;

  const pulseAnim = useRef(new Animated.Value(1)).current;

  const arrowAnim = useRef(new Animated.Value(0)).current;

  const islandAnim = useRef(new Animated.Value(1)).current;

  const waveAnim = useRef(new Animated.Value(0)).current;

  const bgAnim = useRef(new Animated.Value(0)).current;

  // =========================
  // DRAG STATES
  // =========================

  const acceptDrag = useRef(new Animated.ValueXY()).current;

  const rejectDrag = useRef(new Animated.ValueXY()).current;

  const messageDrag = useRef(new Animated.ValueXY()).current;

  // =========================
  // RINGTONE
  // =========================

  useEffect(() => {
    Sound.setCategory('Playback');

    const ringtone = new Sound('ringtone.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Ringtone Error:', error);

        return;
      }

      ringtone.setNumberOfLoops(-1);

      ringtone.play();
    });

    Vibration.vibrate([0, 900, 700], true);

    return () => {
      ringtone.stop();

      ringtone.release();

      Vibration.cancel();
    };
  }, []);

  // =========================
  // LOOP ANIMATIONS
  // =========================

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(bgAnim, {
            toValue: 1,
            duration: 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),

          Animated.timing(bgAnim, {
            toValue: 0,
            duration: 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),

        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 0.95,
            duration: 1400,
            useNativeDriver: true,
          }),

          Animated.timing(glowAnim, {
            toValue: 0.35,
            duration: 1400,
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.06,
            duration: 1400,
            useNativeDriver: true,
          }),

          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1400,
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.timing(islandAnim, {
            toValue: 1.04,
            duration: 1200,
            useNativeDriver: true,
          }),

          Animated.timing(islandAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),

        Animated.loop(
          Animated.sequence([
            Animated.timing(arrowAnim, {
              toValue: -8,
              duration: 650,
              useNativeDriver: true,
            }),

            Animated.timing(arrowAnim, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ),

        Animated.loop(
          Animated.sequence([
            Animated.timing(waveAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),

            Animated.timing(waveAnim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
        ),
      ]),
    ).start();
  }, []);

  // =========================
  // ACTIONS
  // =========================

  const acceptCall = () => {
    navigation.replace('VideoCallScreen', { user });
  };

  const rejectCall = () => {
    navigation.goBack();
  };

  const openChat = () => {
    navigation.navigate('ChatOpenScreen', {
      user,
      defaultMessage: "Hello! I'm busy right now. Calling you later.",
    });
  };

  // =========================
  // DRAG BUTTONS
  // =========================

  const createPanResponder = (animatedValue: any, action: () => void) => {
    let hapticTriggered = false;

    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gesture) => {
        const limitedY = Math.max(gesture.dy, -70);

        animatedValue.setValue({
          x: 0,
          y: limitedY,
        });

        if (limitedY <= -70 && !hapticTriggered) {
          Vibration.vibrate(40);

          hapticTriggered = true;
        }

        if (limitedY > -70) {
          hapticTriggered = false;
        }
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -70) {
          Vibration.vibrate(70);

          action();
        }

        Animated.spring(animatedValue, {
          toValue: {
            x: 0,
            y: 0,
          },

          friction: 5,

          tension: 90,

          useNativeDriver: false,
        }).start();
      },
    });
  };

  const acceptPan = createPanResponder(acceptDrag, acceptCall);

  const rejectPan = createPanResponder(rejectDrag, rejectCall);

  const messagePan = createPanResponder(messageDrag, openChat);

  return (
    <Animated.View
      style={[
        styles.backgroundWrapper,
        {
          backgroundColor: bgAnim.interpolate({
            inputRange: [0, 1],

            outputRange: ['#111111', '#24152F'],
          }),
        },
      ]}
    >
      <LinearGradient
        colors={['#0F0F0F', '#171717', '#24112D', '#120A1A']}
        style={styles.container}
      >
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
            ]}
          >
            <View style={styles.islandDot} />

            <Text style={styles.islandText}>Incoming Call</Text>
          </Animated.View>

          {/* AVATAR GLOW */}

          <Animated.View
            style={[
              styles.avatarGlow,
              {
                opacity: glowAnim,

                transform: [
                  {
                    scale: pulseAnim,
                  },
                ],
              },
            ]}
          />

          {/* AVATAR */}

          <Animated.Image
            source={{
              uri: user.image,
            }}
            style={[
              styles.avatar,
              {
                transform: [
                  {
                    scale: pulseAnim,
                  },
                ],
              },
            ]}
          />

          {/* INFO */}

          <BlurView blurType="dark" blurAmount={18}>
            <Text style={styles.subText}>Incoming video call...</Text>

            <Text style={styles.name}>{user.name}</Text>

            {/* WAVEFORM */}

            <View>
              {[...Array(5)].map((_, i) => (
                <Animated.View
                  key={i}
                  style={[
                    {
                      transform: [
                        {
                          scaleY: waveAnim.interpolate({
                            inputRange: [0, 1],

                            outputRange: [0.5, 1.5],
                          }),
                        },
                      ],

                      opacity: waveAnim.interpolate({
                        inputRange: [0, 1],

                        outputRange: [0.3, 1],
                      }),
                    },
                  ]}
                />
              ))}
            </View>
          </BlurView>

          {/* BUTTONS */}

          <View style={styles.buttonsRow}>
            {/* DECLINE */}

            <Animated.View
              {...rejectPan.panHandlers}
              style={{
                transform: rejectDrag.getTranslateTransform(),
              }}
            >
              <View style={styles.buttonWrapper}>
                <View
                  style={[
                    styles.button,
                    {
                      backgroundColor: '#FF4444',
                    },
                  ]}
                >
                  <Icon
                    name="call"
                    size={24}
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
              </View>
            </Animated.View>

            {/* ACCEPT */}

            <Animated.View
              {...acceptPan.panHandlers}
              style={{
                transform: acceptDrag.getTranslateTransform(),
              }}
            >
              <View style={styles.buttonWrapper}>
                {/* ARROWS */}

                <Animated.View
                  style={{
                    marginBottom: 8,

                    transform: [
                      {
                        translateY: arrowAnim,
                      },
                    ],
                  }}
                >
                  <Icon name="chevron-up" size={18} color="#fff" />

                  <Icon
                    name="chevron-up"
                    size={18}
                    color="#fff"
                    style={{
                      marginTop: -10,
                    }}
                  />

                  <Icon
                    name="chevron-up"
                    size={18}
                    color="#fff"
                    style={{
                      marginTop: -10,
                    }}
                  />
                </Animated.View>

                {/* PULSE */}

                <Animated.View
                  style={[
                    {
                      opacity: glowAnim,

                      transform: [
                        {
                          scale: pulseAnim,
                        },
                      ],
                    },
                  ]}
                />

                {/* BUTTON */}

                <Animated.View
                  style={[
                    styles.button,
                    {
                      backgroundColor: '#8B5CF6',

                      transform: [
                        {
                          translateY: arrowAnim.interpolate({
                            inputRange: [-8, 0],

                            outputRange: [-3, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <Icon name="videocam" size={24} color="#fff" />
                </Animated.View>
              </View>
            </Animated.View>

            {/* MESSAGE */}

            <Animated.View
              {...messagePan.panHandlers}
              style={{
                transform: messageDrag.getTranslateTransform(),
              }}
            >
              <View style={styles.buttonWrapper}>
                <View
                  style={[
                    styles.button,
                    {
                      backgroundColor: '#fff',
                    },
                  ]}
                >
                  <Icon name="chatbubble" size={22} color="#111" />
                </View>
              </View>
            </Animated.View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default IncomingVideoCallScreen;

const styles = StyleSheet.create({
  backgroundWrapper: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.50)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  dynamicIsland: {
    position: 'absolute',
    top: isPortrait ? 20 : 14,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
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
    borderRadius: 99,
    backgroundColor: '#8B5CF6',
  },

  islandText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  avatarGlow: {
    position: 'absolute',
    width: AVATAR_SIZE + 34,
    height: AVATAR_SIZE + 34,
    borderRadius: 999,
    backgroundColor: 'rgba(139,92,246,0.16)',
  },

  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.18)',
    marginBottom: 24,
  },

  subText: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 8,
  },

  name: {
    color: '#fff',
    fontSize: isPortrait ? 32 : 26,
    fontWeight: '800',
    textAlign: 'center',
  },

  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: isPortrait ? 70 : 40,
    gap: isPortrait ? 42 : 90,
  },

  buttonWrapper: {
    alignItems: 'center',
  },

  button: {
    width: BUTTON_SIZE - 15,
    height: BUTTON_SIZE - 15,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});
