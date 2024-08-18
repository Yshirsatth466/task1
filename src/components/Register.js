import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link } from 'react-router-dom';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://intern-task-api.bravo68web.workers.dev/auth/signup', {
        email,
        password,
      });
      alert('Registration successful! Please log in.');
      navigate('/login'); // Navigate to login after successful registration
    } catch (error) {
      console.error('Error registering:', error);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
      <p>you have already  <Link to="/login">login s here</Link></p>
    </div>
  );
};

export default Register;
