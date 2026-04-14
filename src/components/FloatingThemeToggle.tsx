import React, { useContext, useRef, useEffect } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

const FloatingThemeToggle = () => {
  const { toggleTheme, dark } = useContext(ThemeContext);

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
      <TouchableOpacity onPress={toggleTheme} style={styles.button}>
        <Animated.Text style={styles.text}>{dark ? '🌙' : '☀️'}</Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FloatingThemeToggle;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50, // 👈 adjust if needed
    right: 20,
    zIndex: 999,
  },
  button: {
    backgroundColor: '#1E293B',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
  },
  text: {
    fontSize: 18,
  },
});
