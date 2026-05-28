import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/auth.css';

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await res.json();

      if (res.ok) {

        await Swal.fire({
          icon: 'success',
          title: 'OTP Sent!',
          text: 'Verification OTP has been sent to your email.',
          confirmButtonColor: '#f97316',
          background: '#18181b',
          color: '#fff',
          timer: 2500,
          showConfirmButton: true
        });

        navigate('/verify-otp', {
          state: { email }
        });

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: data.message,
          confirmButtonColor: '#ef4444',
          background: '#18181b',
          color: '#fff'
        });
      }

    } catch (error) {

      console.error(error);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong.',
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
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

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
          Register
        </button>

        <p>
          Already have an account?
          <Link to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;