import React, {
  useEffect,
  useState,
  useContext
} from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminProducts = () => {
  const { user } =
    useContext(AuthContext);

  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res =
          await fetch(
            'https://zyntra-mocha.vercel.app/api/products'
          );

        const text =
          await res.text();

        let data = [];

        try {
          data =
            JSON.parse(text);
        } catch {
          throw new Error(
            'Products API returned HTML instead of JSON'
          );
        }

        if (res.ok) {
          setProducts(
            Array.isArray(data)
              ? data
              : []
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text:
              data.message ||
              'Failed to load products.',
            confirmButtonColor:
              '#ef4444',
            background:
              '#18181b',
            color: '#fff'
          });
        }
      } catch (error) {
        console.error(error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text:
            error.message ||
            'Failed to load products.',
          confirmButtonColor:
            '#ef4444',
          background:
            '#18181b',
          color: '#fff'
        });
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (
    id
  ) => {
    const result =
      await Swal.fire({
        title:
          'Delete Product?',
        text:
          'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor:
          '#ef4444',
        cancelButtonColor:
          '#3f3f46',
        confirmButtonText:
          'Yes, Delete',
        background:
          '#18181b',
        color: '#fff'
      });

    if (result.isConfirmed) {
      try {
        const res =
          await fetch(
            `https://zyntra-mocha.vercel.app/api/products/${id}`,
            {
              method:
                'DELETE',
              headers: {
                Authorization:
                  `Bearer ${user.token}`
              }
            }
          );

        const text =
          await res.text();

        let data = {};

        try {
          data =
            JSON.parse(text);
        } catch {
          throw new Error(
            'Delete API returned HTML instead of JSON'
          );
        }

        if (res.ok) {
          setProducts(
            products.filter(
              (p) =>
                p._id !== id
            )
          );

          Swal.fire({
            icon: 'success',
            title:
              'Deleted Successfully',
            text:
              'Product removed successfully.',
            confirmButtonColor:
              '#f97316',
            background:
              '#18181b',
            color: '#fff',
            timer: 2200
          });
        } else {
          Swal.fire({
            icon: 'error',
            title:
              'Delete Failed',
            text:
              data.message ||
              'Could not delete product.',
            confirmButtonColor:
              '#ef4444',
            background:
              '#18181b',
            color: '#fff'
          });
        }
      } catch (error) {
        console.error(error);

        Swal.fire({
          icon: 'error',
          title:
            'Server Error',
          text:
            error.message ||
            'Something went wrong.',
          confirmButtonColor:
            '#ef4444',
          background:
            '#18181b',
            color: '#fff'
        });
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          display: 'flex',
          justifyContent:
            'space-between',
          alignItems:
            'center',
          marginBottom:
            '20px'
        }}
      >
        <h2
          style={{
            color:
              '#f97316'
          }}
        >
          Manage Products
        </h2>

        <Link
          to="/admin/add-product"
          className="btn"
        >
          + Add Product
        </Link>
      </div>

      <div
        style={{
          overflowX:
            'auto'
        }}
      >
        <table
          style={
            tableStyle
          }
        >
          <thead>
            <tr
              style={
                rowStyle
              }
            >
              <th style={thStyle}>ID</th>
              <th style={thStyle}>NAME</th>
              <th style={thStyle}>PRICE</th>
              <th style={thStyle}>CATEGORY</th>
              <th style={thStyle}>STOCK</th>
              <th style={thStyle}>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {products.map(
              (
                product
              ) => (
                <tr
                  key={
                    product._id
                  }
                  style={
                    rowStyle
                  }
                >
                  <td style={tdStyle}>
                    {product._id.substring(
                      0,
                      8
                    )}
                    ...
                  </td>

                  <td style={tdStyle}>
                    {product.name}
                  </td>

                  <td style={tdStyle}>
                    ₹
                    {product.price?.toFixed(
                      2
                    )}
                  </td>

                  <td style={tdStyle}>
                    {product.category}
                  </td>

                  <td style={tdStyle}>
                    {product.stock}
                  </td>

                  <td style={tdStyle}>
                    <Link
                      to={`/admin/edit-product/${product._id}`}
                      style={
                        editBtn
                      }
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          product._id
                        )
                      }
                      style={
                        deleteBtn
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const containerStyle = {
  maxWidth: '1200px',
  margin:
    '40px auto',
  padding: '30px',
  background:
    '#18181b',
  borderRadius:
    '12px',
  border:
    '1px solid rgba(255,255,255,0.05)',
  color: '#fafafa'
};

const tableStyle = {
  width: '100%',
  borderCollapse:
    'collapse'
};

const rowStyle = {
  borderBottom:
    '1px solid rgba(255,255,255,0.1)'
};

const thStyle = {
  padding: '15px',
  textAlign:
    'left',
  color:
    '#a1a1aa',
  fontSize:
    '0.9rem'
};

const tdStyle = {
  padding: '15px',
  textAlign:
    'left'
};

const editBtn = {
  background:
    '#3b82f6',
  color: '#fff',
  padding:
    '6px 12px',
  borderRadius:
    '4px',
  marginRight:
    '10px',
  textDecoration:
    'none'
};

const deleteBtn = {
  background:
    '#ef4444',
  color: '#fff',
  padding:
    '6px 12px',
  borderRadius:
    '4px',
  border: 'none',
  cursor:
    'pointer'
};

export default AdminProducts;