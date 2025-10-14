'use client';

import { createContext, useContext, useState } from 'react';

type UserData = { id: string; firstName: string } | null;

interface AuthContextType {
  user: UserData;
  isLoggedIn: boolean;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

async function fetchCurrentUser(): Promise<UserData> {
  const res = await fetch('/api/me', { credentials: 'include' });
  if (!res.ok) return null;
  return res.json();
}

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: UserData;
}) {
  const [user, setUser] = useState<UserData>(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  const refreshUser = async () => {
    setIsLoading(true);
    const data = await fetchCurrentUser();
    setUser(data);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, isLoading, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
