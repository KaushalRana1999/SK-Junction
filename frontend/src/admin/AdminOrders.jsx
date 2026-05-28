import React, {
  useEffect,
  useState,
  useContext
} from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const AdminOrders = () => {
  const { user } =
    useContext(AuthContext);

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {

        const res =
          await fetch(
            '/api/orders',
            {
              headers: {
                Authorization:
                  `Bearer ${user.token}`
              }
            }
          );

        const data =
          await res.json();

        setOrders(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.error(error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text:
            'Failed to load orders.',
          confirmButtonColor:
            '#ef4444',
          background:
            '#18181b',
          color: '#fff'
        });
      }
    };

    fetchOrders();
  }, [user]);

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      const res =
        await fetch(
          `/api/orders/${id}/status`,
          {
            method: 'PUT',
            headers: {
              'Content-Type':
                'application/json',
              Authorization:
                `Bearer ${user.token}`
            },
            body:
              JSON.stringify({
                status
              })
          }
        );

      const data =
        await res.json();

      if (res.ok) {

        setOrders(
          orders.map(
            (order) =>
              order._id === id
                ? {
                    ...order,
                    status
                  }
                : order
          )
        );

        Swal.fire({
          icon: 'success',
          title:
            'Status Updated ✅',
          text:
            `Order marked as ${status}.`,
          confirmButtonColor:
            '#f97316',
          background:
            '#18181b',
          color: '#fff',
          timer: 2000,
          showConfirmButton:
            true
        });

      } else {

        Swal.fire({
          icon: 'error',
          title:
            'Update Failed',
          text:
            data.message ||
            'Could not update order status.',
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
          'Something went wrong while updating status.',
        confirmButtonColor:
          '#ef4444',
        background:
          '#18181b',
        color: '#fff'
      });

    }
  };

  return (
    <div style={containerStyle}>
      <h2
        style={{
          color: '#f97316',
          marginBottom:
            '20px'
        }}
      >
        Manage Orders
      </h2>

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
              <th
                style={
                  thStyle
                }
              >
                ORDER ID
              </th>

              <th
                style={
                  thStyle
                }
              >
                USER
              </th>

              <th
                style={
                  thStyle
                }
              >
                TOTAL
              </th>

              <th
                style={
                  thStyle
                }
              >
                DATE
              </th>

              <th
                style={
                  thStyle
                }
              >
                STATUS
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map(
              (
                order
              ) => (
                <tr
                  key={
                    order._id
                  }
                  style={
                    rowStyle
                  }
                >
                  <td
                    style={
                      tdStyle
                    }
                  >
                    {order._id.substring(
                      0,
                      8
                    )}
                    ...
                  </td>

                  <td
                    style={
                      tdStyle
                    }
                  >
                    {order
                      .userId
                      ?.name ||
                      'Deleted User'}
                  </td>

                  <td
                    style={
                      tdStyle
                    }
                  >
                    ₹
                    {order.totalAmount.toFixed(
                      2
                    )}
                  </td>

                  <td
                    style={
                      tdStyle
                    }
                  >
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td
                    style={
                      tdStyle
                    }
                  >
                    <select
                      value={
                        order.status
                      }
                      onChange={(
                        e
                      ) =>
                        updateStatus(
                          order._id,
                          e.target
                            .value
                        )
                      }
                      style={
                        selectStyle
                      }
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>
                    </select>
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

const selectStyle = {
  background:
    '#09090b',
  color: '#fff',
  padding: '6px',
  border:
    '1px solid #27272a',
  borderRadius:
    '4px',
  outline:
    'none'
};

export default AdminOrders;