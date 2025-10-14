'use client';

import { ReactNode, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import Cookies from 'js-cookie';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  darkMode: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({
  children,
  initialDarkMode,
}: {
  children: ReactNode;
  initialDarkMode: boolean;
}) => {
  const initialTheme: Theme = initialDarkMode ? 'dark' : 'light';
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    Cookies.set('theme', theme, { expires: 365 });
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const darkMode = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, darkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
