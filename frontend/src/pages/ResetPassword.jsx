import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, newPassword })
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire('Success', 'Password reset successful', 'success');
        navigate('/login');
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
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;