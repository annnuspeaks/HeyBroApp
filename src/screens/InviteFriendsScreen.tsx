import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Share,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const isTablet = width >= 768;

export default function InviteFriendsScreen({
  navigation,
}: any) {
  const handleInvite = async () => {
    try {
      await Share.share({
        message:
          'Join me on TAS 🚀\n\nExperience secure chats, voice calls, video calls and much more.\n\nDownload now and connect instantly!',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Invite Friends
        </Text>

        <View style={{ width: 42 }} />
      </View>

      {/* CONTENT */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO CARD */}

        <View style={styles.heroCard}>
          <View style={styles.glow1} />
          <View style={styles.glow2} />

          <View style={styles.iconWrapper}>
            <Ionicons
              name="people"
              size={58}
              color="#fff"
            />
          </View>

          <Text style={styles.heroTitle}>
            Invite Your Friends
          </Text>

          <Text style={styles.heroSubtitle}>
            Bring your friends to TAS and enjoy secure
            messaging, crystal clear voice calls and
            ultra smooth video calling experience together.
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.inviteButton}
            onPress={handleInvite}
          >
            <Ionicons
              name="paper-plane"
              size={22}
              color="#fff"
            />

            <Text style={styles.inviteButtonText}>
              Send Invite
            </Text>
          </TouchableOpacity>
        </View>

        {/* FEATURES */}

        <View style={styles.card}>
          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons
                name="chatbubble-ellipses"
                size={24}
                color="#A855F7"
              />
            </View>

            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>
                Secure Messaging
              </Text>

              <Text style={styles.featureDescription}>
                Fast and private conversations with your
                friends.
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons
                name="call"
                size={24}
                color="#22C55E"
              />
            </View>

            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>
                Crystal Voice Calls
              </Text>

              <Text style={styles.featureDescription}>
                Smooth and clear voice calling experience.
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons
                name="videocam"
                size={24}
                color="#8B5CF6"
              />
            </View>

            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>
                HD Video Calls
              </Text>

              <Text style={styles.featureDescription}>
                Connect face-to-face anytime anywhere.
              </Text>
            </View>
          </View>
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Invite more • Connect faster • Stay secure
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#020826',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 18,

    marginTop: 10,
    marginBottom: 18,
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  headerTitle: {
    color: '#fff',

    fontSize: 24,
    fontWeight: '700',
  },

  scrollContent: {
    paddingBottom: 60,
  },

  heroCard: {
    marginHorizontal: 20,

    marginTop: 10,

    borderRadius: 34,

    overflow: 'hidden',

    alignItems: 'center',

    paddingHorizontal: 26,
    paddingVertical: 40,

    backgroundColor: 'rgba(255,255,255,0.04)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  glow1: {
    position: 'absolute',

    top: -90,
    left: -70,

    width: 220,
    height: 220,

    borderRadius: 999,

    backgroundColor: 'rgba(168,85,247,0.18)',
  },

  glow2: {
    position: 'absolute',

    bottom: -110,
    right: -70,

    width: 220,
    height: 220,

    borderRadius: 999,

    backgroundColor: 'rgba(34,197,94,0.10)',
  },

  iconWrapper: {
    width: isTablet ? 130 : 105,
    height: isTablet ? 130 : 105,

    borderRadius: 999,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#8B5CF6',

    marginBottom: 24,
  },

  heroTitle: {
    color: '#fff',

    fontSize: isTablet ? 38 : 30,
    fontWeight: '800',

    textAlign: 'center',
  },

  heroSubtitle: {
    color: 'rgba(255,255,255,0.65)',

    fontSize: isTablet ? 18 : 15,

    lineHeight: 28,

    textAlign: 'center',

    marginTop: 18,

    maxWidth: 550,
  },

  inviteButton: {
    marginTop: 34,

    height: 60,

    paddingHorizontal: 32,

    borderRadius: 20,

    backgroundColor: '#8B5CF6',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inviteButtonText: {
    color: '#fff',

    fontSize: 17,
    fontWeight: '700',

    marginLeft: 12,
  },

  card: {
    marginTop: 26,

    marginHorizontal: 20,

    borderRadius: 30,

    overflow: 'hidden',

    backgroundColor: 'rgba(255,255,255,0.03)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 22,
    paddingVertical: 24,
  },

  featureIcon: {
    width: 58,
    height: 58,

    borderRadius: 18,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  featureTextContainer: {
    flex: 1,

    marginLeft: 18,
  },

  featureTitle: {
    color: '#fff',

    fontSize: 18,
    fontWeight: '700',
  },

  featureDescription: {
    color: 'rgba(255,255,255,0.55)',

    fontSize: 14,

    lineHeight: 24,

    marginTop: 6,
  },

  divider: {
    height: 1,

    backgroundColor: 'rgba(255,255,255,0.05)',

    marginLeft: 96,
  },

  footer: {
    alignItems: 'center',

    marginTop: 36,
  },

  footerText: {
    color: 'rgba(255,255,255,0.45)',

    fontSize: 14,

    letterSpacing: 0.5,
  },
});