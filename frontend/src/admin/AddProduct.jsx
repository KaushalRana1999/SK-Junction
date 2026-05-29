import React, {
  useState,
  useContext,
  useEffect
} from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddProduct = () => {
  const { user } =
    useContext(AuthContext);

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: ''
    });

  const [image, setImage] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (
      !user ||
      user.role !== 'admin'
    ) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (!image) {
      return Swal.fire({
        icon: 'warning',
        title:
          'Image Required',
        text:
          'Please select a product image.',
        confirmButtonColor:
          '#f97316',
        background:
          '#18181b',
        color: '#fff'
      });
    }

    setLoading(true);

    const data =
      new FormData();

    data.append(
      'name',
      formData.name
    );
    data.append(
      'description',
      formData.description
    );
    data.append(
      'price',
      formData.price
    );
    data.append(
      'category',
      formData.category
    );
    data.append(
      'stock',
      formData.stock
    );
    data.append(
      'image',
      image
    );

    try {
      const res =
        await fetch(
          'https://zyntra-mocha.vercel.app/api/products',
          {
            method: 'POST',
            headers: {
              Authorization:
                `Bearer ${user.token}`
            },
            body: data
          }
        );

      const text =
        await res.text();

      let responseData =
        {};

      try {
        responseData =
          JSON.parse(text);
      } catch {
        throw new Error(
          'Product API returned HTML instead of JSON'
        );
      }

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title:
            'Product Published 🚀',
          text:
            'Your product has been added successfully.',
          confirmButtonColor:
            '#f97316',
          background:
            '#18181b',
          color: '#fff',
          timer: 2500
        });

        navigate(
          '/admin/products'
        );
      } else {
        Swal.fire({
          icon: 'error',
          title:
            'Upload Failed',
          text:
            responseData.message ||
            'Error creating product',
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
          'Something went wrong while uploading product.',
        confirmButtonColor:
          '#ef4444',
        background:
          '#18181b',
        color: '#fff'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin:
          '40px auto',
        background:
          '#18181b',
        padding: '40px',
        borderRadius:
          '12px',
        border:
          '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <h2
        style={{
          color:
            '#f97316',
          marginBottom:
            '20px'
        }}
      >
        Add New Product
      </h2>

      <form
        onSubmit={
          handleSubmit
        }
        style={{
          display:
            'flex',
          flexDirection:
            'column',
          gap: '15px'
        }}
      >
        <input
          type="text"
          placeholder="Product Name"
          required
          value={
            formData.name
          }
          onChange={(
            e
          ) =>
            setFormData({
              ...formData,
              name:
                e.target.value
            })
          }
          style={
            inputStyle
          }
        />

        <textarea
          placeholder="Description"
          required
          rows="4"
          value={
            formData.description
          }
          onChange={(
            e
          ) =>
            setFormData({
              ...formData,
              description:
                e.target.value
            })
          }
          style={
            inputStyle
          }
        />

        <input
          type="number"
          placeholder="Price"
          required
          value={
            formData.price
          }
          onChange={(
            e
          ) =>
            setFormData({
              ...formData,
              price:
                e.target.value
            })
          }
          style={
            inputStyle
          }
        />

        <input
          type="text"
          placeholder="Category"
          required
          value={
            formData.category
          }
          onChange={(
            e
          ) =>
            setFormData({
              ...formData,
              category:
                e.target.value
            })
          }
          style={
            inputStyle
          }
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          required
          value={
            formData.stock
          }
          onChange={(
            e
          ) =>
            setFormData({
              ...formData,
              stock:
                e.target.value
            })
          }
          style={
            inputStyle
          }
        />

        <input
          type="file"
          accept="image/*"
          required
          onChange={(
            e
          ) =>
            setImage(
              e.target
                .files[0]
            )
          }
          style={{
            color:
              '#fff'
          }}
        />

        <button
          type="submit"
          disabled={
            loading
          }
          className="btn"
        >
          {loading
            ? 'Uploading...'
            : 'Publish Product'}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: '12px',
  background:
    '#09090b',
  border:
    '1px solid #27272a',
  borderRadius:
    '6px',
  color: '#fff',
  fontSize: '15px',
  outline: 'none'
};

export default AddProduct;