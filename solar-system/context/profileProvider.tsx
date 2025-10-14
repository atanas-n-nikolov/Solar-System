'use client';
import { createContext, useContext, useState } from 'react';

type ProfileUIContextType = {
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
};

const ProfileUIContext = createContext<ProfileUIContextType | undefined>(
  undefined
);

export function ProfileUIProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <ProfileUIContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </ProfileUIContext.Provider>
  );
}

export function useProfileUI() {
  const ctx = useContext(ProfileUIContext);
  if (!ctx)
    throw new Error('useProfileUI must be used within ProfileUIProvider');
  return ctx;
}
