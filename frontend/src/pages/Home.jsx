import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import heroBanner from '../assets/hero-banner.png';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ IMPORTANT: only use env variable in production
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);

        // ❗ If backend returns HTML instead of JSON, stop here
        const contentType = res.headers.get('content-type');

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('API did not return JSON');
        }

        const data = await res.json();
        setProducts(data);

      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', color: '#fff', padding: '20px' }}>
      
      {/* HERO SECTION */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '520px',
          borderRadius: '28px',
          overflow: 'hidden',
          marginBottom: '50px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.45)'
        }}
      >
        <img
          src={heroBanner}
          alt="Zyntra Hero"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.72), rgba(0,0,0,0.25))'
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '70px',
            transform: 'translateY(-50%)',
            maxWidth: '600px'
          }}
        >
          <p style={{ color: '#f97316', fontWeight: '600', letterSpacing: '4px', marginBottom: '15px' }}>
            WELCOME TO ZYNTRA
          </p>

          <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '18px' }}>
            Shop.<br />
            <span style={{
              background: 'linear-gradient(90deg,#f97316,#fb7185,#8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Own Your Style.
            </span>
          </h1>

          <p style={{ color: '#d4d4d8', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
            Discover premium fashion, electronics and accessories — all curated for modern living.
          </p>

          <button
            onClick={() => window.location.href = '/shop'}
            style={{
              padding: '15px 35px',
              border: 'none',
              borderRadius: '14px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#fff',
              background: 'linear-gradient(90deg,#f97316,#ec4899,#8b5cf6)',
              boxShadow: '0 10px 25px rgba(249,115,22,0.35)'
            }}
          >
            Shop Now →
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <h2 style={{ fontSize: '2rem', marginBottom: '25px', fontWeight: '700' }}>
        Featured Products
      </h2>

      {loading ? (
        <div style={{ color: '#a1a1aa', fontSize: '1.1rem' }}>
          Loading...
        </div>
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div style={{ color: '#a1a1aa' }}>
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;