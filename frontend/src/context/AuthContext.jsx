import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        // We don't have a dedicated /me endpoint in the plan, but we can assume 
        // if we have a valid cookie, we might persist state via local storage or 
        // add a /me endpoint. For this assignment, let's rely on localStorage 
        // for basic persistence to keep it simple, or add a verify endpoint.
        // Actually, let's add a simple check.
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          setUser(JSON.parse(userInfo));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password });
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  };

  const logout = async () => {
    await axios.post('/api/auth/logout');
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
