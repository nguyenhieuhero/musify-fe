import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tokenService from '../services/tokenService';
import { getUserData } from '../services/apiService';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = tokenService.getAccessToken();
      if (!accessToken) {
        setUser(null);
        navigate('/login');
        return;
      }

      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        tokenService.clearTokens();
        setUser(null);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
