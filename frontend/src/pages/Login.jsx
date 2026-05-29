import React, {
  useState,
  useContext
} from 'react';
import {
  useNavigate,
  Link
} from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';

const Login = () => {
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const { login } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch(
        'https://zyntra-mocha.vercel.app/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await res.json();

      if (res.ok) {

        login(data);

        await Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome back, ${data.name} 👋`,
          confirmButtonColor: '#f97316',
          background: '#18181b',
          color: '#fff'
        });

        navigate('/');

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text:
            data.message ||
            'Invalid credentials',
          confirmButtonColor: '#ef4444',
          background: '#18181b',
          color: '#fff'
        });

      }

    } catch (error) {

      console.error(
        'Login Error:',
        error
      );

      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text:
          'Something went wrong. Please try again.',
        confirmButtonColor: '#ef4444',
        background: '#18181b',
        color: '#fff'
      });

    }
  };

  return (
    <div className="auth-container">
      <form
        onSubmit={handleSubmit}
        className="auth-form"
      >
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          type="submit"
          className="btn"
        >
          Login
        </button>

        <p style={{ marginTop: '10px' }}>
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </p>

        <p>
          Don't have an account?
          <Link to="/register">
            {' '}Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;