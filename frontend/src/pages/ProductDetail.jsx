import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Swal from 'sweetalert2';
import '../styles/product.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ UPDATED: SweetAlert2 popup
  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          productId: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          qty: 1,
        })
      );

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${product.name} added to cart`,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        background: '#111827',
        color: '#ffffff',
        iconColor: '#22c55e',
      });
    }
  };

  if (loading)
    return (
      <div style={{ textAlign: 'center', margin: '100px', color: '#f97316' }}>
        Loading Product...
      </div>
    );

  if (!product)
    return (
      <div style={{ textAlign: 'center', margin: '100px', color: '#ef4444' }}>
        Product Not Found
      </div>
    );

  return (
    <div
      className="product-detail-wrapper"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        color: '#fff',
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          color: '#a1a1aa',
          marginBottom: '20px',
          fontSize: '0.95rem',
        }}
      >
        <Link to="/" style={{ color: '#f97316' }}>
          Home
        </Link>{' '}
        /{' '}
        <Link to="/shop" style={{ color: '#f97316' }}>
          Shop
        </Link>{' '}
        / {product.category} /{' '}
        <span style={{ color: '#fff' }}>{product.name}</span>
      </div>

      <div
        className="product-detail"
        style={{
          display: 'flex',
          gap: '40px',
          flexWrap: 'wrap',
          background: '#111827',
          padding: '25px',
          borderRadius: '12px',
        }}
      >
        {/* Image */}
        <div className="detail-image-container" style={{ flex: 1 }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="detail-image"
            style={{
              width: '100%',
              borderRadius: '12px',
              objectFit: 'cover',
              maxHeight: '450px',
            }}
          />
        </div>

        {/* Info */}
        <div className="detail-info" style={{ flex: 1 }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
            {product.name}
          </h2>

          <p
            className="detail-price"
            style={{
              fontSize: '2.2rem',
              margin: '15px 0',
              color: '#22c55e',
              fontWeight: 'bold',
            }}
          >
            ₹{product.price.toFixed(2)}
          </p>

          {/* Description */}
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ marginBottom: '10px' }}>Product Description</h4>
            <p style={{ color: '#a1a1aa', lineHeight: '1.8' }}>
              {product.description}
            </p>
          </div>

          {/* Button */}
          <button
            onClick={handleAddToCart}
            className="btn"
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '1.1rem',
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Add to Shopping Cart
          </button>

          {/* Stock */}
          <p
            style={{
              marginTop: '20px',
              color: product.stock > 0 ? '#10b981' : '#ef4444',
              fontWeight: '600',
            }}
          >
            {product.stock > 0
              ? `● In Stock (${product.stock} units available)`
              : '● Temporarily Out of Stock'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;