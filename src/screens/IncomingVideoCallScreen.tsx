import React, {
  useEffect,
  useRef,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } =
  Dimensions.get('window');

const IncomingVideoCallScreen = ({
  route,
  navigation,
}: any) => {
  const { user } = route.params;

  const pulseAnim = useRef(
    new Animated.Value(1),
  ).current;

  const glowAnim = useRef(
    new Animated.Value(0.25),
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(
            pulseAnim,
            {
              toValue: 1.08,

              duration: 1200,

              useNativeDriver: true,
            },
          ),

          Animated.timing(
            pulseAnim,
            {
              toValue: 1,

              duration: 1200,

              useNativeDriver: true,
            },
          ),
        ]),

        Animated.sequence([
          Animated.timing(
            glowAnim,
            {
              toValue: 0.45,

              duration: 1200,

              useNativeDriver: true,
            },
          ),

          Animated.timing(
            glowAnim,
            {
              toValue: 0.2,

              duration: 1200,

              useNativeDriver: true,
            },
          ),
        ]),
      ]),
    ).start();
  }, []);

  const acceptCall = () => {
    navigation.replace(
      'VideoCallScreen',
      {
        user,
      },
    );
  };

  const rejectCall = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={{
        uri: user.image,
      }}
      blurRadius={25}
      style={styles.container}>
      <View style={styles.overlay}>
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

        <Text style={styles.name}>
          {user.name}
        </Text>

        <Text style={styles.callingText}>
          Incoming video call...
        </Text>

        {/* ACTIONS */}

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor:
                  '#EF4444',
              },
            ]}
            onPress={rejectCall}>
            <Icon
              name="call"
              size={28}
              color="#fff"
              style={{
                transform: [
                  {
                    rotate:
                      '135deg',
                  },
                ],
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor:
                  '#8B5CF6',
              },
            ]}
            onPress={acceptCall}>
            <Icon
              name="videocam"
              size={28}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default IncomingVideoCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },

  overlay: {
    flex: 1,

    backgroundColor:
      'rgba(0,0,0,0.55)',

    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarGlow: {
    position: 'absolute',

    width: 240,
    height: 240,

    borderRadius: 120,

    backgroundColor:
      'rgba(139,92,246,0.35)',
  },

  avatar: {
    width: 180,
    height: 180,

    borderRadius: 90,

    borderWidth: 3,

    borderColor:
      'rgba(255,255,255,0.18)',
  },

  name: {
    color: '#fff',

    fontSize: 34,

    fontWeight: '700',

    marginTop: 28,
  },

  callingText: {
    color: 'rgba(255,255,255,0.72)',

    marginTop: 10,

    fontSize: 17,
  },

  actionsRow: {
    flexDirection: 'row',

    marginTop: 80,

    gap: 50,
  },

  actionButton: {
    width: 82,
    height: 82,

    borderRadius: 41,

    justifyContent: 'center',
    alignItems: 'center',

    shadowOpacity: 0.4,

    shadowRadius: 12,

    elevation: 10,
  },
});