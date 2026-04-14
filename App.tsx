import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomTabs';
import { ThemeProvider } from './src/theme/ThemeContext';
import FloatingThemeToggle from './src/components/FloatingThemeToggle';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
      <FloatingThemeToggle />
    </ThemeProvider>
  );
};

export default App;
