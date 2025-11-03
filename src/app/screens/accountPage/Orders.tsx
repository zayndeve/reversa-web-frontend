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
      setOrders(fetchedOrders || []);
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

  const resolveImagePath = (img?: string) => {
    if (!img) return "/images/no-image.png";
    return img.startsWith("http")
      ? img
      : `${serverApi.replace(/\/$/, "")}/uploads/products/${img.replace(/^\/+/, "")}`;
  };

  return (
    <div className="dashboard-container">
      <div className="order-header-row">
        <h2>Your Orders</h2>
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
              {orders.map((order) => {
                const previewItem = order.OrderItems?.[0] || {};
                const imageUrl = resolveImagePath(previewItem.ProductImage);

                return (
                  <React.Fragment key={order._id || order.Id}>
                    <tr>
                      <td>
                        <img
                          src={imageUrl}
                          alt={previewItem.ProductName || "Product"}
                          className="order-thumb"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/no-image.png";
                          }}
                        />
                      </td>
                      <td>{previewItem.ProductName || "Unnamed Product"}</td>
                      <td>
                        <span
                          className={`status-pill ${(
                            order.OrderStatus || "unknown"
                          ).toLowerCase()}`}
                        >
                          {order.OrderStatus || "Unknown"}
                        </span>
                      </td>
                      <td>
                        {order.CreatedAt
                          ? new Date(order.CreatedAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td>${(order.TotalAmount || 0).toFixed(2)}</td>
                      <td>
                        <button
                          className="hide-btn"
                          onClick={() =>
                            toggleCollapse(order._id || order.Id)
                          }
                        >
                          {isCollapsed(order._id || order.Id) ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </button>
                      </td>
                    </tr>

                    {!isCollapsed(order._id || order.Id) && (
                      <tr className="order-details-row">
                        <td colSpan={6}>
                          <div className="order-details-box">
                            <p>
                              <strong>Payment:</strong>{" "}
                              {order.PaymentMethod || "Unknown"}
                            </p>
                            <p>
                              <strong>Shipping:</strong>{" "}
                              {order.ShippingAddress
                                ? `${order.ShippingAddress.Address || ""}, ${
                                    order.ShippingAddress.City || ""
                                  }, ${order.ShippingAddress.Country || ""}`
                                : "N/A"}
                            </p>
                            <p>
                              <strong>Order ID:</strong>{" "}
                              {order._id || order.Id}
                            </p>
                            <p>
                              <strong>Items:</strong>{" "}
                              {order.OrderItems?.length || 0}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
