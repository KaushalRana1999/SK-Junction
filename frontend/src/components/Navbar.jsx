import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import logo from '../assets/Zyntra.png';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none'
          }}
        >
          <img
            src={logo}
            alt="Zyntra Logo"
            style={{
              height: '42px',
              width: '42px',
              borderRadius: '10px',
              objectFit: 'cover',
              filter: 'drop-shadow(0 3px 10px rgba(249,115,22,0.35))',
              transition: '0.3s ease'
            }}
          />

          <span
        style={{
          fontSize: '1.7rem',
          fontWeight: '800',
          letterSpacing: '1.5px',
          background: 'linear-gradient(90deg,#f97316,#fb7185,#8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textTransform: 'uppercase',
          textShadow: '0 2px 12px rgba(249,115,22,0.25)',
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        Zyntra
      </span>

        </Link>
      </div>

      {/* FIX: remove default list bullets */}
      <ul className="navbar-links" style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
        <li>
          <Link to="/shop">Shop</Link>
        </li>

        <li>
          <Link to="/cart">Cart ({cartItems.length})</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/profile">Hi, {user.name}</Link>
            </li>

            {user.role === 'admin' && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}

            <li>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
