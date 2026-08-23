import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from 'react';
import { lightTheme, darkTheme } from './theme';

type Theme = typeof darkTheme;

interface ThemeContextValue {
  theme: Theme;
  dark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [dark, setDark] = useState(true);

  const toggleTheme = () => setDark(prev => !prev);

  const theme = dark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
