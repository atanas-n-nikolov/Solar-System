'use client';

import { ReactNode, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import Cookies from 'js-cookie';

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (value: boolean) => void;
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
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  useEffect(() => {
    Cookies.set('theme', darkMode ? 'dark' : 'white', { expires: 365 });
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'white'
    );
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
