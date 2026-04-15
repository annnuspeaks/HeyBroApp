import React, { useContext, useRef, useEffect } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

const FloatingThemeToggle = () => {
  const { toggleTheme, dark, theme } = useContext(ThemeContext);

  // 🔥 animation value
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [dark, scale]);

  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <TouchableOpacity
        onPress={toggleTheme}
        style={[
          styles.button,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.text,
            { color: dark ? '#FFD700' : '#0EA5E9' },
          ]}
        >
          {dark ? '🌙' : '☀️'}
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FloatingThemeToggle;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
  button: {
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    backdropFilter: 'blur(10px)',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  text: {
    fontSize: 18,
  },
});
