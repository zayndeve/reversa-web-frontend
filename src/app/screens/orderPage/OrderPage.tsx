import React, { useState } from "react";
import "../../css/orderPage.css";
import { useNavigate, Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../hooks";
import OrderService from "../../../app/service/OrderService";
import { selectCartItems } from "../../../app/components/headers/cartSlice";
import { serverApi } from "../../../app/libs/config";

const OrdersPage = () => {
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartItems);
  const orderService = new OrderService();

  const subtotal = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const delivery = subtotal < 100 ? 5 : 0;
  const total = subtotal + delivery;

  // Form State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("CARD");

  const handleCheckout = async () => {
    try {
      const orderItems = cartItems.map((item: any) => ({
        productId: item.id,
        itemPrice: item.price,         // ✅ correct key
        itemQuantity: item.quantity,   // ✅ correct key
      }));

      const orderInput = {
        orderItems,
        paymentMethod,
        shippingAddress,
      };

      const response = await orderService.createOrder(orderInput);
      console.log("✅ Order created:", response);
      navigate("/checkout");
    } catch (error) {
      console.error("❌ Order creation failed:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* ✅ Banner Section */}
      <div className="orders-page-banner">
        <div className="orders-banner-content">
          <div className="orders-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Orders</span>
          </div>
          <h1 className="orders-heading-title">Order List</h1>
        </div>
      </div>

      {/* ✅ Cart Table Section */}
      <div className="order-page">
        <form className="cart-form">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Remove</th>
                <th>Images</th>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: any) => (
                <tr key={item.id}>
                  <td><DeleteIcon className="delete-icon" /></td>
                  <td>
                    <img
                      src={`${serverApi}/${item.image}`}
                      alt={item.name}
                      className="product-thumb"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      className="quantity-input"
                      readOnly
                    />
                  </td>
                  <td><strong>${(item.price * item.quantity).toFixed(2)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>

        {/* ✅ Checkout Form */}
        <div className="cart-totals">
          <h2>Shipping & Payment</h2>
          <div className="checkout-form">
            <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
            <input name="address" placeholder="Address" onChange={handleChange} required />
            <input name="city" placeholder="City" onChange={handleChange} required />
            <input name="postalCode" placeholder="Postal Code" onChange={handleChange} required />
            <input name="country" placeholder="Country" onChange={handleChange} required />

            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="CARD">Card</option>
              <option value="PAYPAL">PayPal</option>
              <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
            </select>
          </div>

          <h2>Cart Totals</h2>
          <table>
            <tbody>
              <tr>
                <th>Subtotal</th>
                <td>${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Total</th>
                <td>${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed To Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
