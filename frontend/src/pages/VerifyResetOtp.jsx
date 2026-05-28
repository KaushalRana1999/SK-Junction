import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const VerifyResetOtp = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/verify-reset-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire('Success', 'OTP verified', 'success');
        navigate('/reset-password', { state: { email } });
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
        <h2>Verify OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button type="submit" className="btn">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyResetOtp;