import React, {
  useEffect,
  useState,
  useContext
} from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch(
          'https://zyntra-mocha.vercel.app/api/analytics',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`
            }
          }
        );

        const text = await res.text();
        console.log('ANALYTICS RAW:', text);

        let data = {};

        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(
            'Analytics API returned HTML instead of JSON'
          );
        }

        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            await Swal.fire({
              icon: 'warning',
              title: 'Session Expired',
              text: 'Please login again.',
              confirmButtonColor: '#f97316',
              background: '#18181b',
              color: '#fff'
            });

            navigate('/login');
            return;
          }

          Swal.fire({
            icon: 'error',
            title: 'Analytics Error',
            text:
              data.message ||
              'Unable to load dashboard data.',
            confirmButtonColor: '#ef4444',
            background: '#18181b',
            color: '#fff'
          });

          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0
          });
        }
      } catch (error) {
        console.error(error);

        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text:
            error.message ||
            'Something went wrong while loading dashboard.',
          confirmButtonColor: '#ef4444',
          background: '#18181b',
          color: '#fff'
        });

        setStats({
          totalOrders: 0,
          totalProducts: 0,
          totalUsers: 0,
          totalRevenue: 0
        });
      }
    };

    fetchStats();
  }, [user, navigate]);

  const cardStyle = {
    padding: '25px',
    background: '#18181b',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px'
  };

  const numberStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#f97316'
  };

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '5px'
        }}
      >
        <img
          src="/ShopNestLogo.png"
          alt="Logo"
          style={{
            height: '40px',
            width: '40px',
            borderRadius: '8px',
            objectFit: 'cover',
            filter:
              'drop-shadow(0 0px 10px rgba(249,115,22,0.3))'
          }}
        />

        <h2 style={{ margin: 0 }}>
          Admin Dashboard
        </h2>
      </div>

      <p
        style={{
          color: '#a1a1aa',
          marginBottom: '30px',
          fontSize: '1.1rem'
        }}
      >
        Welcome back,
        <span style={{ color: '#fff' }}>
          {' '}
          {user?.name}
        </span>
      </p>

      {stats ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}
        >
          <div style={cardStyle}>
            <h4 style={{ color: '#a1a1aa' }}>
              Total Orders
            </h4>
            <div style={numberStyle}>
              {stats.totalOrders || 0}
            </div>
          </div>

          <div style={cardStyle}>
            <h4 style={{ color: '#a1a1aa' }}>
              Total Products
            </h4>
            <div style={numberStyle}>
              {stats.totalProducts || 0}
            </div>
          </div>

          <div style={cardStyle}>
            <h4 style={{ color: '#a1a1aa' }}>
              Total Users
            </h4>
            <div style={numberStyle}>
              {stats.totalUsers || 0}
            </div>
          </div>

          <div style={cardStyle}>
            <h4 style={{ color: '#a1a1aa' }}>
              Total Revenue
            </h4>
            <div style={numberStyle}>
              ₹{stats.totalRevenue?.toFixed(2) || '0.00'}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            margin: '50px 0',
            color: '#f97316',
            fontSize: '18px'
          }}
        >
          Loading metrics...
        </div>
      )}

      <div
        style={{
          marginTop: '40px',
          padding: '30px',
          background: '#18181b',
          borderRadius: '12px',
          border:
            '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <h3
          style={{
            marginBottom: '25px',
            color: '#f97316'
          }}
        >
          Administrative Controls
        </h3>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap'
          }}
        >
          <button
            className="btn"
            onClick={() =>
              navigate('/admin/add-product')
            }
          >
            + Add Product
          </button>

          <button
            className="btn"
            onClick={() =>
              navigate('/admin/products')
            }
            style={{
              background: '#3f3f46'
            }}
          >
            📦 Manage Products
          </button>

          <button
            className="btn"
            onClick={() =>
              navigate('/admin/orders')
            }
            style={{
              background: '#3f3f46'
            }}
          >
            🚚 Manage Orders
          </button>

          <button
            className="btn"
            onClick={() =>
              navigate('/admin/users')
            }
            style={{
              background: '#3f3f46'
            }}
          >
            👥 Users Directory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;