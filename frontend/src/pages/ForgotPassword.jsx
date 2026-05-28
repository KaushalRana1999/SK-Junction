import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire('Success', 'OTP sent to email', 'success');
        navigate('/verify-reset-otp', { state: { email } });
      } else {
        Swal.fire('Error', data.message, 'error');
      }

    } catch (err) {
      Swal.fire('Error', 'Server error', 'error');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="btn">
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;