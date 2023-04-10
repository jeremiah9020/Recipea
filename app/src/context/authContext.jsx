import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    isLoading: true,
    setAuthenticated: () => {}
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      const initializeAuth = async () => {
        const response = await fetch('http://localhost:3001/auth/check',{
          method: 'GET',
          credentials: 'include'
      })
        setAuthenticated(response.status === 200);
        setLoading(false);
      };
      initializeAuth();
    }, []);
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          isLoading,
          setAuthenticated
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  }

  export function useIsAuthenticated() {
    const context = useAuth();
    return context.isAuthenticated;
  }