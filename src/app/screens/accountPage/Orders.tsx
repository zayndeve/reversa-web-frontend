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

  console.log("🧾 Orders component authMember:", authMember);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!authMember) {
        console.log("🧾 No authMember, skipping fetch");
        return;
      }
      console.log("🧾 Fetching my orders");
      try {
        const orderService = new OrderService();
        const fetchedOrders = await orderService.getMyOrders();
        console.log("🧾 Orders response:", fetchedOrders);
        setOrders(fetchedOrders || []);
        console.log("🧾 Set orders to:", fetchedOrders || []);
      } catch (error) {
        console.error("🧾 Error fetching orders:", error);
        setOrders([]);
      }
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

      {Array.isArray(orders) && orders.length === 0 ? (
        <p>No orders to display.</p>
      ) : Array.isArray(orders) && orders.length > 0 ? (
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
                console.log("🧾 Rendering order:", order);
                const previewItem =
                  order.previewItem || order.PreviewItem || order.OrderItems?.[0] || {};
                console.log("🧾 Preview item:", previewItem);
                const imageUrl = resolveImagePath(
                  previewItem.ProductImage || previewItem.image
                );

                return (
                  <React.Fragment key={order._id || order.id || order.Id}>
                    <tr>
                      <td>
                        <img
                          src={imageUrl}
                          alt={previewItem.ProductName || previewItem.name || "Product"}
                          className="order-thumb"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/no-image.png";
                          }}
                        />
                      </td>
                      <td>{previewItem.ProductName || previewItem.name || "Unnamed Product"}</td>
                      <td>
                        <span
                          className={`status-pill ${(
                            order.OrderStatus || order.orderStatus || "unknown"
                          ).toLowerCase()}`}
                        >
                          {order.OrderStatus || order.orderStatus || "Unknown"}
                        </span>
                      </td>
                      <td>
                        {order.CreatedAt || order.createdAt
                          ? new Date(order.CreatedAt || order.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td>${(order.TotalAmount || order.totalAmount || 0).toFixed(2)}</td>
                      <td>
                        <button
                          className="hide-btn"
                          onClick={() =>
                            toggleCollapse(order._id || order.id || order.Id)
                          }
                        >
                          {isCollapsed(order._id || order.id || order.Id) ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </button>
                      </td>
                    </tr>

                    {!isCollapsed(order._id || order.id || order.Id) && (
                      <tr className="order-details-row">
                        <td colSpan={6}>
                          <div className="order-details-box">
                            <p>
                              <strong>Payment:</strong>{" "}
                              {order.PaymentMethod || order.paymentMethod || "Unknown"}
                            </p>
                            <p>
                              <strong>Shipping:</strong>{" "}
                              {order.ShippingAddress || order.shippingAddress
                                ? `${(order.ShippingAddress || order.shippingAddress).Address || (order.ShippingAddress || order.shippingAddress).address || ""}, ${
                                    (order.ShippingAddress || order.shippingAddress).City || (order.ShippingAddress || order.shippingAddress).city || ""
                                  }, ${(order.ShippingAddress || order.shippingAddress).Country || (order.ShippingAddress || order.shippingAddress).country || ""}`
                                : "N/A"}
                            </p>
                            <p>
                              <strong>Order ID:</strong>{" "}
                              {order._id || order.id || order.Id || "—"}
                            </p>
                            <p>
                              <strong>Items:</strong>{" "}
                              {order.OrderItems?.length || 1} {/* Since OrderItems not present, assume 1 */}
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
      ) : null}
    </div>
  );
};

export default Orders;
