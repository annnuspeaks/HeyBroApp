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
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const isPortrait = height > width;

const BUTTON_SIZE = isPortrait ? width * 0.12 : height * 0.11;
const AVATAR_SIZE = isPortrait ? width * 0.27 : height * 0.24;

const DRAG_LIMIT = -70;

const IncomingVoiceCallScreen = ({ route, navigation }: any) => {
  const { user } = route.params;

  // =========================
  // ANIMATIONS
  // =========================

  const glowAnim = useRef(new Animated.Value(0.45)).current;

  const pulseAnim = useRef(new Animated.Value(1)).current;

  const arrowAnim = useRef(new Animated.Value(0)).current;

  const islandAnim = useRef(new Animated.Value(1)).current;

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

    const ringtone = new Sound(
      'ringtone.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('VOICE RINGTONE ERROR => ', error);

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

    Vibration.vibrate([0, 1000, 700], true);

    return () => {
      ringtone.stop(() => {
        ringtone.release();
      });

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
          Animated.timing(glowAnim, {
            toValue: 0.9,
            duration: 2200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(glowAnim, {
            toValue: 0.45,
            duration: 2200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.03,
            duration: 2200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2200,
            easing: Easing.inOut(Easing.ease),
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

        Animated.loop(
          Animated.sequence([
            Animated.timing(arrowAnim, {
              toValue: -10,
              duration: 1000,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),

            Animated.delay(400),

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
  // ACTIONS
  // =========================

  const acceptCall = () => {
    navigation.replace('VoiceCallScreen', {
      user,
    });
  };

  const rejectCall = () => {
    navigation.goBack();
  };

  const openChat = () => {
    navigation.navigate('ChatOpenScreen', {
      user,
      defaultMessage:
        "Hello! I'm busy right now. Calling you later.",
    });
  };

  // =========================
  // DRAG
  // =========================

  const createPanResponder = (
    animatedValue: any,
    action: () => void,
  ) => {
    let hapticTriggered = false;

    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gesture) => {
        const limitedY = Math.max(
          gesture.dy,
          DRAG_LIMIT,
        );

        animatedValue.setValue({
          x: 0,
          y: limitedY,
        });

        if (
          limitedY <= DRAG_LIMIT &&
          !hapticTriggered
        ) {
          Vibration.vibrate(35);

          hapticTriggered = true;
        }

        if (limitedY > DRAG_LIMIT) {
          hapticTriggered = false;
        }
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy <= DRAG_LIMIT) {
          Vibration.vibrate(60);

          action();
        }

        Animated.spring(animatedValue, {
          toValue: {
            x: 0,
            y: 0,
          },

          friction: 5,

          tension: 90,

          useNativeDriver: true,
        }).start();
      },
    });
  };

  const acceptPan = createPanResponder(
    acceptDrag,
    acceptCall,
  );

  const rejectPan = createPanResponder(
    rejectDrag,
    rejectCall,
  );

  const messagePan = createPanResponder(
    messageDrag,
    openChat,
  );

  return (
    <LinearGradient
      colors={[
        '#5D5A4D',
        '#4B4841',
        '#3B312E',
        '#2A1515',
      ]}
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
              transform: [
                {
                  scale: islandAnim,
                },
              ],
            },
          ]}
        >
          <View
            style={[
              styles.islandDot,
              {
                backgroundColor: '#22C55E',
              },
            ]}
          />

          <Text style={styles.islandText}>
            Incoming Call
          </Text>
        </Animated.View>

        {/* CENTER */}

        <View style={styles.centerContainer}>
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
              style={styles.name}
            >
              {user.name}
            </Text>

            <Text style={styles.subText}>
              Incoming voice call...
            </Text>
          </View>
        </View>

        {/* BUTTONS */}

        <View style={styles.buttonsContainer}>
          {/* DECLINE */}

          <Animated.View
            {...rejectPan.panHandlers}
            style={{
              transform:
                rejectDrag.getTranslateTransform(),
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
                  size={35}
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
              transform: [
                ...acceptDrag.getTranslateTransform(),

                {
                  translateY:
                    arrowAnim.interpolate({
                      inputRange: [-10, 0],

                      outputRange: [-10, 0],
                    }),
                },
              ],
            }}
          >
            <View style={styles.buttonWrapper}>
              {/* ARROWS */}

              <Animated.View
                style={[
                  styles.arrowsContainer,
                  {
                    transform: [
                      {
                        translateY:
                          arrowAnim,
                      },
                    ],
                  },
                ]}
              >
                <Icon
                  name="chevron-up"
                  size={20}
                  color="#fff"
                  style={{
                    opacity: 0.05,
                  }}
                />

                <Icon
                  name="chevron-up"
                  size={18}
                  color="#fff"
                  style={{
                    marginTop: -1,
                    opacity: 0.15,
                  }}
                />

                <Icon
                  name="chevron-up"
                  size={18}
                  color="#fff"
                  style={{
                    marginTop: -1,
                    opacity: 0.35,
                  }}
                />

                <Icon
                  name="chevron-up"
                  size={18}
                  color="#fff"
                  style={{
                    marginTop: -1,
                    opacity: 0.55,
                  }}
                />

                <Icon
                  name="chevron-up"
                  size={18}
                  color="#fff"
                  style={{
                    marginTop: -1,
                    opacity: 0.75,
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
                    backgroundColor: '#22C55E',
                  },
                ]}
              >
                <Icon
                  name="call"
                  size={35}
                  color="#fff"
                />
              </Animated.View>
            </View>
          </Animated.View>

          {/* MESSAGE */}

          <Animated.View
            {...messagePan.panHandlers}
            style={{
              transform:
                messageDrag.getTranslateTransform(),
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
                <Icon
                  name="chatbubble"
                  size={35}
                  color="#111"
                />
              </View>
            </View>
          </Animated.View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default IncomingVoiceCallScreen;

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
    marginTop: isPortrait ? 22 : 10,

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
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
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
    fontSize: isPortrait ? 31 : 26,
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

  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent:
      'space-evenly',
    alignItems: 'flex-end',
    marginBottom:
      isPortrait ? 70 : 35,
  },

  buttonWrapper: {
    alignItems: 'center',
  },

  button: {
    width: BUTTON_SIZE - 10,
    height: BUTTON_SIZE - 10,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },

  arrowsContainer: {
    marginBottom: 8,
    alignItems: 'center',
  },
});