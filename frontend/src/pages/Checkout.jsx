import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import Swal from 'sweetalert2';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // ✅ Updated with backend URL
  const bypassPayment = async () => {
    const saveOrderRes = await fetch('https://zyntra-mocha.vercel.app/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId: 'bypass_txn_' + Date.now()
      })
    });

    if (saveOrderRes.ok) {
      dispatch(clearCart());

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Order placed successfully (Test Mode)',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        background: '#111827',
        color: '#fff',
        iconColor: '#22c55e'
      });

      navigate('/ordersuccess');
    }
  };

  const handlePayment = async () => {
    try {
      const orderRes = await fetch('https://zyntra-mocha.vercel.app/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice })
      });

      // ✅ Check before parsing JSON
      if (!orderRes.ok) {
        const result = await Swal.fire({
          title: 'Payment Gateway Not Configured',
          text: 'Do you want to use test bypass mode?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Continue',
          cancelButtonText: 'Cancel',
          background: '#111827',
          color: '#fff'
        });

        if (result.isConfirmed) {
          return bypassPayment();
        } else {
          return;
        }
      }

      const orderData = await orderRes.json();

      const options = {
        key: 'rzp_test_dummykey123',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopNest',
        description: 'Test Transaction',
        order_id: orderData.id,

        handler: async function (response) {
          const verifyRes = await fetch('https://zyntra-mocha.vercel.app/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });

          if (verifyRes.ok) {
            const saveOrderRes = await fetch('https://zyntra-mocha.vercel.app/api/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id
              })
            });

            if (saveOrderRes.ok) {
              dispatch(clearCart());

              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Payment Successful',
                showConfirmButton: false,
                timer: 2000,
                toast: true,
                background: '#111827',
                color: '#fff',
                iconColor: '#22c55e'
              });

              navigate('/ordersuccess');
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Order saving failed',
                showConfirmButton: false,
                timer: 2000,
                toast: true,
                background: '#111827',
                color: '#fff'
              });
            }
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Payment verification failed',
              showConfirmButton: false,
              timer: 2000,
              toast: true,
              background: '#111827',
              color: '#fff'
            });
          }
        },

        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: '9999999999'
        },
        theme: {
          color: '#f97316'
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        background: '#111827',
        color: '#fff'
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Please login first',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        background: '#111827',
        color: '#fff'
      });

      navigate('/login');
      return;
    }

    handlePayment();
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Address</h3>

          <input
            type="text"
            placeholder="Full Name"
            required
            value={address.fullName}
            onChange={(e) =>
              setAddress({ ...address, fullName: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Street"
            required
            value={address.street}
            onChange={(e) =>
              setAddress({ ...address, street: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="City"
            required
            value={address.city}
            onChange={(e) =>
              setAddress({ ...address, city: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Postal Code"
            required
            value={address.postalCode}
            onChange={(e) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Country"
            required
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
          />

          <div className="checkout-summary">
            <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>
            <button type="submit" className="btn">
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
