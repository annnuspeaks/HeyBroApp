import React, {createContext, useState} from 'react';
import {lightTheme, darkTheme} from './theme';

export const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({children}: any) => {
  const [dark, setDark] = useState(true);

  const toggleTheme = () => setDark(!dark);

  const theme = dark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{theme, dark, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};