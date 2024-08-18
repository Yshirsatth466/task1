import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Link } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Implement login API request
      const response = await axios.post('https://intern-task-api.bravo68web.workers.dev/auth/login', {
        email,
        password,
      });
      // Save the auth token and navigate to the products page
      localStorage.setItem('authToken', response.data.token); // Save token in local storage
      navigate('/products');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <p>Don't have an account? <Link to="/register">Register s here</Link></p>
    </div>
  );
};

export default Login;
