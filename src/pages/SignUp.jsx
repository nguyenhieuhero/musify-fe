import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { register } from '../services/apiService';
import toast from 'react-hot-toast';
import Form from '../ui/Form';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const StyledSignUpPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #121212;
`;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const req = await register({
      userName: username,
      email: email,
      password: password,
      roles: ['user'],
    });
    toast.success(req.message);
  };

  return (
    <StyledSignUpPage>
      <Form onSubmit={handleSubmit}>
        <Form.Title>Sign Up</Form.Title>
        <Form.Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Input
          type="email"
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
        <Form.Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Form.Button type="submit">Sign Up</Form.Button>
      </Form>
    </StyledSignUpPage>
  );
};

export default SignUp;
