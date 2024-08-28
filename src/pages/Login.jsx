import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { login } from '../services/apiService';
import toast from 'react-hot-toast';
import Form from '../ui/Form';
import tokenService from '../services/tokenService';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const StyledLoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #121212;
`;

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Need both email and password');
      return;
    }
    try {
      const response = await login({
        email: email,
        password: password,
      });
      const { accessToken, refreshToken } = response.data;
      tokenService.setTokens(accessToken, refreshToken);
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <StyledLoginPage>
      <Form onSubmit={handleSubmit}>
        <Form.Title>Login</Form.Title>
        <Form.Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Button type="submit">Login</Form.Button>
      </Form>
    </StyledLoginPage>
  );
};

export default LogIn;
