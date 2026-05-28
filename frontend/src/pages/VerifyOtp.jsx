import React, { useState } from 'react';
import {
  useNavigate,
  useLocation
} from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/auth.css';

const VerifyOtp = () => {

  const [otp, setOtp] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch(
        '/api/auth/verify-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json'
          },
          body: JSON.stringify({
            email,
            otp
          })
        }
      );

      const data = await res.json();

      if (res.ok) {

        await Swal.fire({
          icon: 'success',
          title: 'Verified Successfully',
          text: 'Your email has been verified 🎉',
          confirmButtonColor: '#f97316',
          background: '#18181b',
          color: '#fff'
        });

        navigate('/login');

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Invalid OTP',
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
        title: 'Verification Failed',
        text: 'Something went wrong. Try again.',
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
        <h2>Verify OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          required
        />

        <button
          type="submit"
          className="btn"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;