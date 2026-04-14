import React, { useContext } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme, dark } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[styles.container, dark ? styles.darkBg : styles.lightBg]}
    >
      <Animated.Text style={styles.text}>{dark ? '🌙' : '☀️'}</Animated.Text>
    </TouchableOpacity>
  );
};

export default ThemeToggle;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
  },

  darkBg: {
    backgroundColor: '#1E293B',
  },
  lightBg: {
    backgroundColor: '#eee',
  },
});
