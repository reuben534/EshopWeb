import { useEffect, useState } from 'react';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  return (
    <section className="section">
      <h3>Order History</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h4>{order.id}</h4>
              <p>{order.createdAt}</p>
              <p>Status: {order.orderStatus}</p>
              <p>Total: R{order.total}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
