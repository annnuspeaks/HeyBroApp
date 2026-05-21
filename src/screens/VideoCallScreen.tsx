import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  ImageBackground,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const VideoCallScreen = ({ route }: any) => {
  const { user } = route.params;

  const [connected, setConnected] = useState(false);

  const [showControls, setShowControls] = useState(false);

  const [swapped, setSwapped] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const controlsAnim = useRef(new Animated.Value(0)).current;

  const miniScale = useRef(new Animated.Value(1)).current;

  const controlsTimeout = useRef<any>(null);

  const pan = useRef(
    new Animated.ValueXY({
      x: width - 140,
      y: 90,
    }),
  ).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // simulate pickup

    const timer = setTimeout(() => {
      setConnected(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

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
  });

  const toggleControls = () => {
    const nextState = !showControls;

    setShowControls(nextState);

    Animated.timing(controlsAnim, {
      toValue: nextState ? 1 : 0,

      duration: 250,

      useNativeDriver: true,
    }).start();

    Animated.spring(miniScale, {
      toValue: nextState ? 1.08 : 1,

      useNativeDriver: true,
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

          duration: 250,

          useNativeDriver: true,
        }).start();

        Animated.spring(miniScale, {
          toValue: 1,

          useNativeDriver: true,
        }).start();
      }, 3000);
    }
  };

  const swapVideos = () => {
    Animated.spring(miniScale, {
      toValue: 0.92,

      useNativeDriver: true,
    }).start(() => {
      setSwapped(prev => !prev);

      Animated.spring(miniScale, {
        toValue: 1,

        friction: 5,

        useNativeDriver: true,
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

  return (
    <View style={styles.container}>
      {/* REMOTE VIDEO */}

      <TouchableOpacity
        activeOpacity={1}
        style={styles.fullscreenVideo}
        onPress={() => setShowControls(false)}
      >
        <ImageBackground
          source={{
            uri: user.image,
          }}
          style={styles.remoteVideo}
          blurRadius={connected ? 0 : 10}
        >
          {!connected && (
            <View style={styles.callingOverlay}>
              <Text style={styles.name}>{user.name}</Text>

              <Text style={styles.status}>
                {user.online ? 'Ringing...' : 'Calling...'}
              </Text>
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>

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

            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableWithoutFeedback
          onPress={toggleControls}
          onPressOut={handleDoubleTap}
        >
          <ImageBackground
            source={{
              uri: 'https://i.pravatar.cc/300',
            }}
            style={styles.selfVideo}
            imageStyle={{
              borderRadius: swapped ? 0 : 18,
            }}
          >
            <Animated.View
              pointerEvents={showControls ? 'auto' : 'none'}
              style={[
                styles.controlsOverlay,

                {
                  opacity: controlsAnim,
                },
              ]}
            >
              <TouchableOpacity style={styles.controlBtn}>
                <Icon name="mic-off" size={22} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.controlBtn}>
                <Icon name="camera-reverse" size={22} color="#fff" />
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
                    transform: [
                      {
                        rotate: '135deg',
                      },
                    ],
                  }}
                />
              </TouchableOpacity>
            </Animated.View>
          </ImageBackground>
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
    borderRadius: 18,
    overflow: 'hidden',
  },

  fullSelfView: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
  },

  selfVideo: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },

  controlsOverlay: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  controlBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',

    justifyContent: 'center',
    alignItems: 'center',
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
});
