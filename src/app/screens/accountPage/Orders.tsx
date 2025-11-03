import React, { useEffect, useState } from "react";
import "../../css/accountPage.css";
import { useGlobal } from "../../hooks/useGlobal";
import OrderService from "../../../app/service/OrderService";
import { serverApi } from "../../../app/libs/config";
import { Eye, EyeOff } from "lucide-react";

const Orders = () => {
  const { authMember } = useGlobal();
  const [orders, setOrders] = useState<any[]>([]);
  const [collapsedOrders, setCollapsedOrders] = useState<string[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!authMember?._id) return;
      const orderService = new OrderService();
      const fetchedOrders = await orderService.getOrdersByMember(authMember._id);
      setOrders(fetchedOrders);
    };
    fetchOrders();
  }, [authMember]);

  const toggleCollapse = (orderId: string) => {
    setCollapsedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const isCollapsed = (id: string) => collapsedOrders.includes(id);

  return (
    <div className="dashboard-container">
      <div className="order-header-row">
       
      </div>

      {orders.length === 0 ? (
        <p>No orders to display.</p>
      ) : (
        <div className="order-table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Status</th>
                <th>Date</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order.Id}>
                  <tr>
                    <td>
                      <img
                        src={`${serverApi}/${order.PreviewItem?.Image}`}
                        alt={order.PreviewItem?.Name}
                        className="order-thumb"
                      />
                    </td>
                    <td>{order.PreviewItem?.Name}</td>
                    <td>
                      <span className={`status-pill ${order.OrderStatus.toLowerCase()}`}>
                        {order.OrderStatus}
                      </span>
                    </td>
                    <td>{new Date(order.CreatedAt).toLocaleDateString()}</td>
                    <td>${order.TotalAmount?.toFixed(2)}</td>
                    <td>
                      <button className="hide-btn" onClick={() => toggleCollapse(order.Id)}>
                        {isCollapsed(order.Id) ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                    </td>
                  </tr>

                  {!isCollapsed(order.Id) && (
                    <tr className="order-details-row">
                      <td colSpan={6}>
                        <div className="order-details-box">
                          <p><strong>Payment:</strong> {order.PaymentMethod}</p>
                          <p><strong>Shipping:</strong> {order.ShippingAddress?.Address}, {order.ShippingAddress?.City}, {order.ShippingAddress?.Country}</p>
                          <p><strong>Order ID:</strong> {order.Id}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
