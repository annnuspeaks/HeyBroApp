import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
  Dimensions,
  PanResponder,
  Vibration,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const isPortrait = height > width;

const BUTTON_SIZE = isPortrait ? width * 0.13 : height * 0.12;

const AVATAR_SIZE = isPortrait ? width * 0.3 : height * 0.28;

const IncomingVideoCallScreen = ({ route, navigation }: any) => {
  const { user } = route.params;

  // =========================
  // ANIMATIONS
  // =========================

  const glowAnim = useRef(new Animated.Value(0.4)).current;

  const pulseAnim = useRef(new Animated.Value(1)).current;

  const arrowAnim = useRef(new Animated.Value(0)).current;

  // =========================
  // DRAG STATES
  // =========================

  const acceptDrag = useRef(new Animated.ValueXY()).current;

  const rejectDrag = useRef(new Animated.ValueXY()).current;

  const messageDrag = useRef(new Animated.ValueXY()).current;

  // =========================
  // LOOP ANIMATIONS
  // =========================

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 0.9,
            duration: 1200,
            useNativeDriver: true,
          }),

          Animated.timing(glowAnim, {
            toValue: 0.35,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 1200,
            useNativeDriver: true,
          }),

          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),

        Animated.loop(
          Animated.sequence([
            Animated.timing(arrowAnim, {
              toValue: -10,
              duration: 700,
              useNativeDriver: true,
            }),

            Animated.timing(arrowAnim, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ),
      ]),
    ).start();
  }, []);

  // =========================
  // RING / VIBRATION
  // =========================

  useEffect(() => {
    const vibrationPattern = [0, 900, 700];

    Vibration.vibrate(vibrationPattern, true);

    return () => {
      Vibration.cancel();
    };
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
  // CREATE DRAGGABLE BUTTON
  // =========================

  const createPanResponder = (animatedValue: any, action: () => void) => {
    let hapticTriggered = false;

    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gesture) => {
        // MAX SWIPE LIMIT

        const limitedY = Math.max(gesture.dy, -85);

        animatedValue.setValue({
          x: 0,
          y: limitedY,
        });

        // HAPTIC AT LIMIT

        if (limitedY <= -85 && !hapticTriggered) {
          Vibration.vibrate(40);

          hapticTriggered = true;
        }

        if (limitedY > -85) {
          hapticTriggered = false;
        }
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -85) {
          Vibration.vibrate(60);

          action();
        }

        Animated.spring(animatedValue, {
          toValue: {
            x: 0,
            y: 0,
          },

          friction: 5,

          useNativeDriver: false,
        }).start();
      },
    });
  };

  const acceptPan = createPanResponder(acceptDrag, acceptCall);

  const rejectPan = createPanResponder(rejectDrag, rejectCall);

  const messagePan = createPanResponder(messageDrag, openChat);

  return (
    <ImageBackground
      source={{
        uri: user.image,
      }}
      blurRadius={30}
      style={styles.container}
    >
      <View style={styles.overlay}>
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

        {/* NAME */}

        <Text style={styles.name}>{user.name}</Text>

        <Text style={styles.subText}>Incoming video call...</Text>

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
                  size={26}
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

              <Text style={styles.buttonText}>Decline</Text>
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
                  marginBottom: -90,

                  transform: [
                    {
                      translateY: arrowAnim,
                    },
                  ],
                }}
              >
                <Icon name="chevron-up" size={20} color="#fff" />

                <Icon
                  name="chevron-up"
                  size={20}
                  color="#fff"
                  style={{
                    marginTop: -12,
                  }}
                />

                <Icon
                  name="chevron-up"
                  size={20}
                  color="#fff"
                  style={{
                    marginTop: -12,
                  }}
                />
              </Animated.View>

              {/* GLOW */}

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
                    transform: [
                      {
                        translateY: arrowAnim.interpolate({
                          inputRange: [-10, 0],

                          outputRange: [-4, 0],
                        }),
                      },
                    ],
                  },
                  {
                    backgroundColor: '#8B5CF6',
                  },
                ]}
              >
                <Icon name="videocam" size={26} color="#fff" />
              </Animated.View>

              <Text style={styles.buttonText}>Swipe Up</Text>
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
                <Icon name="chatbubble" size={24} color="#111" />
              </View>

              <Text style={styles.darkText}>Message</Text>
            </View>
          </Animated.View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default IncomingVideoCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  avatarGlow: {
    position: 'absolute',
    width: AVATAR_SIZE + 35,
    height: AVATAR_SIZE + 35,
    borderRadius: 999,
    backgroundColor: 'rgba(139,92,246,0.18)',
  },

  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
  },

  name: {
    color: '#fff',
    fontSize: isPortrait ? 34 : 26,
    fontWeight: '800',
    marginTop: 22,
  },

  subText: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 17,
    marginTop: 8,
  },

  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: isPortrait ? 80 : 40,
    gap: 80,
  },

  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    marginTop: 90,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

  buttonText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
  },

  darkText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
  },
});
