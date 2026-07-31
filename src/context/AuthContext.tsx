import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  isGuest: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  loginGuest: (username?: string) => void;
  loginEmail: (email: string, pass: string) => Promise<void>;
  signupEmail: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check saved session in localStorage
    const savedUser = localStorage.getItem('parallel_worlds_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse user session:', e);
      }
    } else {
      // Auto guest mode for instant seamless play in IIT Gamethon preview
      const guestUser: User = {
        uid: 'guest_' + Math.random().toString(36).substr(2, 9),
        email: 'guest@gamethon.iit.ac.in',
        displayName: 'Eco Guardian (Guest)',
        isGuest: true,
      };
      setCurrentUser(guestUser);
      localStorage.setItem('parallel_worlds_user', JSON.stringify(guestUser));
    }
    setLoading(false);
  }, []);

  const loginGuest = (username?: string) => {
    const guestUser: User = {
      uid: 'guest_' + Math.random().toString(36).substr(2, 9),
      email: 'guest@gamethon.iit.ac.in',
      displayName: username || 'Eco Hero',
      isGuest: true,
    };
    setCurrentUser(guestUser);
    localStorage.setItem('parallel_worlds_user', JSON.stringify(guestUser));
  };

  const loginEmail = async (email: string, _pass: string) => {
    const user: User = {
      uid: 'usr_' + Math.random().toString(36).substr(2, 9),
      email: email,
      displayName: email.split('@')[0],
      isGuest: false,
    };
    setCurrentUser(user);
    localStorage.setItem('parallel_worlds_user', JSON.stringify(user));
  };

  const signupEmail = async (email: string, _pass: string, name: string) => {
    const user: User = {
      uid: 'usr_' + Math.random().toString(36).substr(2, 9),
      email: email,
      displayName: name || email.split('@')[0],
      isGuest: false,
    };
    setCurrentUser(user);
    localStorage.setItem('parallel_worlds_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('parallel_worlds_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, loginGuest, loginEmail, signupEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
