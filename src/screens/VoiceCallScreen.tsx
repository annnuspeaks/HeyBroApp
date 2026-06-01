import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';

import {
  verticalScale,
  moderateScale,
  fontScale,
  isTablet,
} from '../theme/responsive';

import { useNavigation } from '@react-navigation/native';

import InCallManager from 'react-native-incall-manager';

import Icon from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../theme/colors';

const VoiceCallScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();

  const user = route?.params?.user;

  const [connected, setConnected] = useState(false);

  const [showControls, setShowControls] = useState(true);

  const [isMuted, setIsMuted] = useState(false);

  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  const controlsAnim = useRef(new Animated.Value(1)).current;

  const controlsTimeout = useRef<any>(null);

  const callDuration = useRef(12);

  const [timerText, setTimerText] = useState('00:12');

  // =========================
  // START AUDIO ROUTE
  // =========================

  useEffect(() => {
    InCallManager.start({
      media: 'audio',
    });

    InCallManager.setSpeakerphoneOn(true);

    const connectTimer = setTimeout(() => {
      setConnected(true);
    }, 1800);

    const interval = setInterval(() => {
      callDuration.current += 1;

      const mins = Math.floor(callDuration.current / 60)
        .toString()
        .padStart(2, '0');

      const secs = (callDuration.current % 60).toString().padStart(2, '0');

      setTimerText(`${mins}:${secs}`);
    }, 1000);

    return () => {
      clearTimeout(connectTimer);

      clearInterval(interval);

      InCallManager.stop();
    };
  }, []);

  // =========================
  // TOGGLE CONTROLS
  // =========================

  const toggleControls = () => {
    const next = !showControls;

    setShowControls(next);

    Animated.timing(controlsAnim, {
      toValue: next ? 1 : 0,
      duration: 250,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }

    if (next) {
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false);

        Animated.timing(controlsAnim, {
          toValue: 0,
          duration: 250,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }).start();
      }, 3500);
    }
  };

  // =========================
  // MUTE
  // =========================

  const toggleMute = () => {
    const next = !isMuted;

    setIsMuted(next);

    InCallManager.setMicrophoneMute(next);
  };

  // =========================
  // SPEAKER
  // =========================

  const toggleSpeaker = () => {
    const next = !isSpeakerOn;

    setIsSpeakerOn(next);

    InCallManager.setSpeakerphoneOn(next);
  };

  // =========================
  // END CALL
  // =========================

  const endCall = () => {
    InCallManager.stop();

    navigation.goBack();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={toggleControls}
    >
      {/* TOP TIMER */}

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          {connected ? timerText : 'Connecting...'}
        </Text>
      </View>

      {/* CENTER */}

      <View style={styles.centerContainer}>
        <Animated.Image
          source={{
            uri: user?.image,
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>{user?.name}</Text>

        <Text style={styles.status}>
          {connected ? 'Voice call connected' : 'Connecting voice call...'}
        </Text>
      </View>

      {/* CONTROLS */}

      <Animated.View
        style={[
          styles.controlsWrapper,
          {
            opacity: controlsAnim,

            transform: [
              {
                translateY: controlsAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.controlsRow}>
          {/* MUTE */}

          <TouchableOpacity
            onPress={toggleMute}
            style={[
              styles.controlBtn,

              isMuted && {
                backgroundColor: 'rgba(239,68,68,0.22)',

                borderColor: 'rgba(239,68,68,0.4)',

                shadowColor: '#EF4444',
              },

              isMuted && styles.controlBtnActive,
            ]}
          >
            <Icon
              name={isMuted ? 'mic-off' : 'mic'}
              size={isTablet ? 22 : 24}
              color={COLORS.white}
            />
          </TouchableOpacity>

          {/* SPEAKER */}

          <TouchableOpacity
            onPress={toggleSpeaker}
            style={[
              styles.controlBtn,

              isSpeakerOn && {
                backgroundColor: 'rgba(34,197,94,0.18)',
                borderColor: 'rgba(34,197,94,0.4)',
                shadowColor: COLORS.success,
              },

              isSpeakerOn && styles.controlBtnActive,
            ]}
          >
            <Icon
              name={isSpeakerOn ? 'volume-high' : 'volume-mute'}
              size={isTablet ? 22 : 24}
              color={COLORS.white}
            />
          </TouchableOpacity>

          {/* END CALL */}

          <TouchableOpacity
            onPress={endCall}
            style={[styles.controlBtn, styles.endBtn]}
          >
            <Icon
              name="call"
              size={isTablet ? 22 : 24}
              color={COLORS.white}
              style={{
                transform: [
                  {
                    rotate: '135deg',
                  },
                ],
              }}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default VoiceCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  timerContainer: {
    top: isTablet ? verticalScale(40) : verticalScale(60),
    alignSelf: 'center',
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
  },

  timerText: {
    color: COLORS.white,
    fontSize: fontScale(14),
    fontWeight: '700',
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: isTablet ? verticalScale(40) : verticalScale(80),
  },

  avatar: {
    width: isTablet ? 120 : 150,
    height: isTablet ? 120 : 150,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  name: {
    marginTop: verticalScale(24),
    fontSize: isTablet ? 22 : 30,
    color: COLORS.white,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  status: {
    marginTop: verticalScale(10),
    color: 'rgba(255,255,255,0.62)',
    fontSize: isTablet ? 13 : 16,
    fontWeight: '500',
  },

  controlsWrapper: {
    position: 'absolute',
    bottom: isTablet ? 95 : 40,
    width: '100%',
    alignItems: 'center',
  },

  controlsRow: {
    width: isTablet ? '52%' : '72%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  controlBtn: {
    width: 65,
    height: 65,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(18,18,18,0.78)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
  },

  controlBtnActive: {
    shadowOpacity: 0.9,
    shadowRadius: 18,
    elevation: 32,
    transform: [{ scale: 1.08 }],
  },

  endBtn: {
    backgroundColor: '#EF4444',
  },
});
