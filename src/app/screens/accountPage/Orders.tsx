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
                <React.Fragment key={order._id}>
                  <tr>
                    <td>
                      <img
                        src={`${serverApi}/${order.previewItem?.image}`}
                        alt={order.previewItem?.name}
                        className="order-thumb"
                      />
                    </td>
                    <td>{order.previewItem?.name}</td>
                    <td>
                      <span className={`status-pill ${order.orderStatus.toLowerCase()}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${order.totalAmount?.toFixed(2)}</td>
                    <td>
                      <button className="hide-btn" onClick={() => toggleCollapse(order._id)}>
                        {isCollapsed(order._id) ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                    </td>
                  </tr>

                  {!isCollapsed(order._id) && (
                    <tr className="order-details-row">
                      <td colSpan={6}>
                        <div className="order-details-box">
                          <p><strong>Payment:</strong> {order.paymentMethod}</p>
                          <p><strong>Shipping:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.country}</p>
                          <p><strong>Order ID:</strong> {order._id}</p>
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
