import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomTabs';
import { ThemeProvider } from './src/theme/ThemeContext'; 

const App = () => {
  return (
    <ThemeProvider>   
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;