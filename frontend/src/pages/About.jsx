import React from 'react';
import dp from '../assets/dp.jpeg';

const About = () => {
  const containerStyle = {
    maxWidth: '950px',
    margin: '40px auto',
    padding: '45px',
    background: 'rgba(24,24,27,0.95)',
    backdropFilter: 'blur(12px)',
    borderRadius: '24px',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 15px 45px rgba(0,0,0,0.45)',
    textAlign: 'center'
  };

  const socialBtnStyle = {
    display: 'inline-block',
    padding: '12px 22px',
    borderRadius: '12px',
    textDecoration: 'none',
    transition: '0.3s ease',
    border: '1px solid rgba(255,255,255,0.1)',
    fontWeight: '500',
    fontSize: '0.95rem'
  };

  return (
    <div style={containerStyle}>
      <img
        src={dp}
        alt="Kaushal Rana"
        style={{
          width: '190px',
          height: '190px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '4px solid #f97316',
          marginBottom: '22px',
          boxShadow:
            '0 6px 25px rgba(249,115,22,0.4)'
        }}
      />

      <h2
        style={{
          fontSize: '2.7rem',
          marginBottom: '10px',
          color: '#fff',
          fontWeight: '700'
        }}
      >
        About Me
      </h2>

      <h3
        style={{
          fontSize: '1.4rem',
          marginBottom: '18px',
          fontWeight: '600',
          background:
            'linear-gradient(90deg,#f97316,#fb7185,#8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Kaushal Rana (@thekaushalrana)
      </h3>

      <p
        style={{
          color: '#a1a1aa',
          fontSize: '1.08rem',
          lineHeight: '1.9',
          maxWidth: '650px',
          margin: '0 auto 35px'
        }}
      >
        <strong
          style={{
            color: '#fff'
          }}
        >
          Join the community and grow together!
        </strong>

        <br />
        Zyntra — My scalable MERN based
        e-commerce platform designed with
        modern shopping experiences.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '14px'
        }}
      >
        <a
          href="https://www.youtube.com/@kaushalkaushuuk0189"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background:
              'rgba(239,68,68,0.18)',
            borderColor: '#ef4444',
            color: '#ef4444'
          }}
        >
          📺 YouTube
        </a>

        <a
          href="https://www.linkedin.com/in/kaushal-rana-1544bb240/"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background:
              'rgba(59,130,246,0.18)',
            borderColor: '#3b82f6',
            color: '#3b82f6'
          }}
        >
          💼 LinkedIn
        </a>
      </div>
    </div>
  );
};

export default About;