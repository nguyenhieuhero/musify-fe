import { useNavigate } from 'react-router-dom';
import tokenService from '../services/tokenService';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    tokenService.clearTokens();
    navigate('/login'); // Redirect to login page or any public route
  };

  return logout;
};

export default useLogout;
