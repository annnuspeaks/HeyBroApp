import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ImageBackground,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';

import { BlurView } from '@react-native-community/blur';

import { mediaDevices, RTCView } from 'react-native-webrtc';

import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const VideoCallScreen = ({ route }: any) => {
  const user = route?.params?.user;
  const [connected, setConnected] = useState(false);

  const [showControls, setShowControls] = useState(false);

  const [swapped, setSwapped] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const [localStream, setLocalStream] = useState<any>(null);

  const [isMuted, setIsMuted] = useState(false);

  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  const [isVideoOff, setIsVideoOff] = useState(false);

  const [isFrontCamera, setIsFrontCamera] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const controlsAnim = useRef(new Animated.Value(0)).current;

  const miniScale = useRef(new Animated.Value(1)).current;

  const controlsTimeout = useRef<any>(null);

  const pan = useRef(
    new Animated.ValueXY({
      x: width - 150,
      y: 110,
    }),
  ).current;

  const lastPosition = useRef({
    x: width - 150,
    y: 110,
  });

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,

        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }
  };

  const setupLocalStream = async () => {
    try {
      await requestPermissions();

      const stream = await mediaDevices.getUserMedia({
        audio: true,

        video: {
          facingMode: 'user',

          frameRate: 30,
        },
      });

      setLocalStream(stream);
    } catch (err) {
      console.log('STREAM ERROR', err);
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setupLocalStream();

    // simulate pickup

    const timer = setTimeout(() => {
      setConnected(true);
    }, 4000);

    return () => {
      clearTimeout(timer);

      if (localStream) {
        localStream.getTracks().forEach((track: any) => track.stop());
      }
    };
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => {
      return Math.abs(gesture.dx) > 8 || Math.abs(gesture.dy) > 8;
    },

    onPanResponderGrant: () => {
      pan.setOffset({
        x: lastPosition.current.x,
        y: lastPosition.current.y,
      });

      pan.setValue({
        x: 0,
        y: 0,
      });
    },

    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ],
      {
        useNativeDriver: false,
      },
    ),

    onPanResponderRelease: (e, gesture) => {
      pan.flattenOffset();

      let finalX = lastPosition.current.x + gesture.dx;

      let finalY = lastPosition.current.y + gesture.dy;

      // SNAP CORNERS

      const snapX = finalX < width / 2 ? 20 : width - 140;

      const snapY = finalY < height / 2 ? 100 : height - 260;

      Animated.spring(pan, {
        toValue: {
          x: snapX,
          y: snapY,
        },

        friction: 7,

        tension: 50,

        useNativeDriver: false,
      }).start();

      lastPosition.current = {
        x: snapX,
        y: snapY,
      };
    },
  });

  const toggleControls = () => {
    const nextState = !showControls;

    setShowControls(nextState);

    Animated.timing(controlsAnim, {
      toValue: nextState ? 1 : 0,

      duration: 260,

      easing: Easing.out(Easing.exp),

      useNativeDriver: true,
    }).start();

    Animated.spring(miniScale, {
      toValue: nextState ? 1.08 : 1,

      useNativeDriver: false,
    }).start();

    // auto hide

    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }

    if (nextState) {
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false);

        Animated.timing(controlsAnim, {
          toValue: 0,

          duration: 260,

          easing: Easing.out(Easing.exp),

          useNativeDriver: true,
        }).start();

        Animated.spring(miniScale, {
          toValue: 1,

          useNativeDriver: false,
        }).start();
      }, 3000);
    }
  };

  const swapVideos = () => {
    Animated.spring(miniScale, {
      toValue: 0.92,

      useNativeDriver: false,
    }).start(() => {
      setSwapped(prev => !prev);

      Animated.spring(miniScale, {
        toValue: 1,

        friction: 5,

        useNativeDriver: false,
      }).start();
    });
  };

  let lastTap = 0;

  const handleDoubleTap = () => {
    const now = Date.now();

    if (now - lastTap < 300) {
      swapVideos();
    }

    lastTap = now;
  };

  const toggleMute = () => {
    if (!localStream) return;

    localStream.getAudioTracks().forEach((track: any) => {
      track.enabled = isMuted;
    });

    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    if (!localStream) return;

    localStream.getVideoTracks().forEach((track: any) => {
      track.enabled = isVideoOff;
    });

    setIsVideoOff(!isVideoOff);
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(prev => !prev);
  };

  const switchCamera = () => {
    if (!localStream) return;

    localStream.getVideoTracks().forEach((track: any) => {
      if (track._switchCamera) {
        track._switchCamera();
      }
    });

    setIsFrontCamera(prev => !prev);
  };

  const toggleExpand = () => {
    setExpanded(prev => !prev);

    Animated.spring(miniScale, {
      toValue: expanded ? 1 : 1.18,

      friction: 6,

      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* REMOTE VIDEO */}

      <TouchableOpacity
        activeOpacity={1}
        style={styles.fullscreenVideo}
        onPress={toggleControls}
      >
        <View style={styles.selfVideo}>
          {localStream && (
            <RTCView
              pointerEvents="none"
              streamURL={localStream.toURL()}
              style={styles.rtcVideo}
              objectFit="cover"
              mirror
            />
          )}
        </View>
      </TouchableOpacity>

      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.controlsOverlay,
          {
            opacity: controlsAnim,

            transform: [
              {
                translateY: controlsAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0],
                }),
              },
              {
                scale: controlsAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.92, 1],
                }),
              },
            ],
          },
        ]}
      >
        <BlurView
          style={styles.blurDock}
          blurType="dark"
          blurAmount={22}
          reducedTransparencyFallbackColor="rgba(15,15,15,0.92)"
        >
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={[
                styles.controlBtn,

                isMuted && {
                  backgroundColor: 'rgba(239,68,68,0.22)',
                  borderColor: 'rgba(239,68,68,0.4)',

                  shadowColor: '#EF4444',
                },

                isMuted && styles.controlBtnActive,
              ]}
              onPress={toggleMute}
            >
              <Icon name={isMuted ? 'mic-off' : 'mic'} size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.controlBtn,

                isVideoOff && {
                  backgroundColor: 'rgba(245,158,11,0.22)',
                  borderColor: 'rgba(245,158,11,0.45)',

                  shadowColor: '#F59E0B',
                },

                isVideoOff && styles.controlBtnActive,
              ]}
              onPress={toggleVideo}
            >
              <Icon
                name={isVideoOff ? 'videocam-off' : 'videocam'}
                size={22}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn} onPress={switchCamera}>
              <Icon name="camera-reverse" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.controlBtn,

                isSpeakerOn && {
                  backgroundColor: 'rgba(34,197,94,0.18)',
                  borderColor: 'rgba(34,197,94,0.4)',

                  shadowColor: '#22C55E',
                },

                isSpeakerOn && styles.controlBtnActive,
              ]}
              onPress={toggleSpeaker}
            >
              <Icon
                name={isSpeakerOn ? 'volume-high' : 'volume-mute'}
                size={22}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.controlBtn,
                {
                  backgroundColor: '#EF4444',
                },
              ]}
            >
              <Icon
                name="call"
                size={22}
                color="#fff"
                style={{
                  transform: [{ rotate: '135deg' }],
                }}
              />
            </TouchableOpacity>
          </View>
        </BlurView>
      </Animated.View>

      {/* LOCAL VIDEO */}

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          swapped ? styles.fullSelfView : styles.miniSelfView,

          {
            transform: [
              ...pan.getTranslateTransform(),

              {
                scale: miniScale,
              },
            ],
          },

          {
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableWithoutFeedback
          onPress={toggleExpand}
          onPressOut={handleDoubleTap}
        >
          <View style={styles.selfVideo}>
            {localStream && (
              <RTCView
                pointerEvents="none"
                streamURL={localStream.toURL()}
                style={styles.rtcVideo}
                objectFit="cover"
                mirror
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>

      {/* CALL TIMER */}

      {connected && (
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>00:12</Text>
        </View>
      )}
    </View>
  );
};

export default VideoCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  fullscreenVideo: {
    flex: 1,
  },

  remoteVideo: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  callingOverlay: {
    alignItems: 'center',
  },

  name: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '700',
  },

  status: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 10,
    fontSize: 18,
  },

  miniSelfView: {
    position: 'absolute',
    width: 120,
    height: 180,
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: '#111',
  },

  fullSelfView: {
    ...StyleSheet.absoluteFill,
    zIndex: 20,
  },

  selfVideo: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  controlsOverlay: {
    position: 'absolute',
    bottom: 18,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  controlBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(18,18,18,0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },

  controlBtnActive: {
    shadowOpacity: 0.9,
    shadowRadius: 18,
    elevation: 18,
    transform: [{ scale: 1.08 }],
  },

  timerContainer: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  timer: {
    color: '#fff',
    fontWeight: '600',
  },

  rtcVideo: {
    width: '100%',
    height: '100%',
  },

  blurDock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: width * 0.78,
    maxWidth: 520,
    minWidth: 300,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 18,
  },

  controlsRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 999,
    elevation: 999,
  },
});
