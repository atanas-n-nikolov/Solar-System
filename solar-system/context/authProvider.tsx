'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client'; // ✅ използваме твоята функция

type UserData = { id: string; lastName: string } | null;

interface AuthContextType {
  user: UserData;
  isLoggedIn: boolean;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: UserData;
}) {
  const [user, setUser] = useState<UserData>(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            lastName: session.user.user_metadata?.last_name || '',
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  const refreshUser = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      setUser(null);
    } else {
      setUser({
        id: data.user.id,
        lastName: data.user.user_metadata?.last_name || '',
      });
    }
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
