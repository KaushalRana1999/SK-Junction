import React from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  removeFromCart,
  addToCart
} from '../redux/cartSlice';
import '../styles/cart.css';

const Cart = () => {

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = async (id) => {

    const result = await Swal.fire({
      title: 'Remove Item?',
      text:
        'This item will be removed from cart.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'Remove',
      background: '#18181b',
      color: '#fff'
    });

    if (result.isConfirmed) {

      dispatch(removeFromCart(id));

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Removed from cart',
        showConfirmButton: false,
        timer: 2200,
        timerProgressBar: true,
        background: '#18181b',
        color: '#fff'
      });
    }
  };

  const handleUpdateQty = (
    item,
    qty
  ) => {

    if (qty > 0) {

      dispatch(
        addToCart({
          ...item,
          qty
        })
      );

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Cart updated',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: '#18181b',
        color: '#fff'
      });
    }
  };

  const totalPrice =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price * item.qty,
      0
    );

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty.
          <Link to="/shop">
            {' '}Go Shopping
          </Link>
        </p>
      ) : (
        <div className="cart-layout">

          <div className="cart-items">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="cart-item"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <h4>{item.name}</h4>

                  <p>
                    ₹{item.price}
                  </p>

                  <div className="qty-controls">
                    <button
                      onClick={() =>
                        handleUpdateQty(
                          item,
                          item.qty - 1
                        )
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.qty}
                    </span>

                    <button
                      onClick={() =>
                        handleUpdateQty(
                          item,
                          item.qty + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      handleRemove(
                        item.productId
                      )
                    }
                    className="btn-remove"
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>
              Total:
              ₹{totalPrice.toFixed(2)}
            </h3>

            <button
              onClick={() =>
                navigate('/checkout')
              }
              className="btn btn-checkout"
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;