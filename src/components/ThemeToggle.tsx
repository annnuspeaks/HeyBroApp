import React, {useContext} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {ThemeContext} from '../theme/ThemeContext';

const ThemeToggle = () => {
  const {toggleTheme, dark} = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={toggleTheme}>
      <Text>{dark ? '🌙' : '☀️'}</Text>
    </TouchableOpacity>
  );
};

export default ThemeToggle;