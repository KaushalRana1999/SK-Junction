import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      style={{
        background: 'rgba(9,9,11,0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '45px 25px',
        marginTop: '60px',
        boxShadow: '0 -8px 30px rgba(0,0,0,0.35)'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '30px'
        }}
      >
        {/* BRAND */}
        <div>
          <h2
            style={{
              fontSize: '1.8rem',
              fontWeight: '800',
              marginBottom: '10px',
              letterSpacing: '1px',
              background:
                'linear-gradient(90deg,#f97316,#fb7185,#8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase'
            }}
          >
            Zyntra
          </h2>

          <p
            style={{
              color: '#a1a1aa',
              fontSize: '0.95rem',
              lineHeight: '1.7'
            }}
          >
            Premium E-Commerce Platform
            <br />
            Shop smarter. Live better.
          </p>
        </div>

        {/* LINKS */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap'
          }}
        >
          <Link
            to="/about"
            style={{
              color: '#d4d4d8',
              textDecoration: 'none',
              transition: '0.3s',
              fontWeight: '500'
            }}
          >
            About
          </Link>

          <Link
            to="/return"
            style={{
              color: '#d4d4d8',
              textDecoration: 'none',
              transition: '0.3s',
              fontWeight: '500'
            }}
          >
            Return Policy
          </Link>

          <Link
            to="/disclaimer"
            style={{
              color: '#d4d4d8',
              textDecoration: 'none',
              transition: '0.3s',
              fontWeight: '500'
            }}
          >
            Disclaimer
          </Link>
        </div>

        {/* COPYRIGHT */}
        <div
          style={{
            color: '#71717a',
            fontSize: '0.92rem',
            textAlign: 'right'
          }}
        >
          © {new Date().getFullYear()}
          <br />

          <span
            style={{
              background:
                'linear-gradient(90deg,#f97316,#fb7185,#8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700'
            }}
          >
            Zyntra
          </span>

          {' '}All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;