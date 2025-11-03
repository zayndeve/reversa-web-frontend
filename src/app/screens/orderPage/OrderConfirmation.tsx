import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  selectCartItems,
  removeItem,
  clearCart,
  increaseQty,
  decreaseQty,
} from "../../components/headers/cartSlice";
import { serverApi } from "../../libs/config";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import OrderService from "../../../app/service/OrderService";
import "../../css/orderPage.css";
import ProductsBanner from "../productListPage/ShopBanner";


const OrderConfirmation = () => {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const orderService = new OrderService();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "CARD",
  });

  const [cartSnapshot, setCartSnapshot] = useState<any[]>([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const displayItems = paymentSuccess ? cartSnapshot : cartItems;

  const subtotal = displayItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );
  const discount = 0;
  const shipping = subtotal < 100 ? 5 : 0;
  const total = subtotal - discount + shipping;

  const handleBack = () => {
    navigate("/order");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncrease = (id: string) => {
    dispatch(increaseQty(id));
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQty(id));
  };

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      const { clientSecret } = await orderService.createPaymentIntent(total);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: form.fullName || "Guest",
          },
        },
      });

      if (result.error) {
        alert("Payment failed: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        // ✅ Lock in cart snapshot
        setCartSnapshot([...cartItems]);

        const orderInput = {
          shippingAddress: {
            fullName: form.fullName,
            phone: form.phone,
            address: form.address,
            city: form.city,
            postalCode: form.postalCode,
            country: form.country,
          },
          paymentMethod: form.paymentMethod,
          orderItems: cartItems.map((item:any) => ({
            productId: item.id,
            itemPrice: item.price,
            itemQuantity: item.quantity,
            productName: item.name,
            productImage: item.image,
          })),
        };

        const savedOrder = await orderService.saveOrderToDatabase(orderInput);
        dispatch(clearCart());
        setOrderId(savedOrder._id);
        setPaymentSuccess(true);
      }
    } catch (err) {
      console.error("❌ Payment error:", err);
    }
  };

  const steps = ["Proceed to Checkout", "Place Order"];
  const location = useLocation();
  const path = location.pathname;
  const currentStep = path === "/order/checkout" ? 2 : 1;
  return (
    <>
      <div><ProductsBanner/></div>
      <div className="checkout-wrapper">
        <div className="horizontal-tracker">
          <div className="tracker-bar">
            {steps.map((label: string, index: number) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep - 1;

              return (
                <div
                  key={index}
                  className={`step-item ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
                >
                  <div className={`circle ${isCompleted ? "check" : ""}`}>
                    {isCompleted ? "✓" : index + 1}
                  </div>
                  <p className="label">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Confirmation Layout */}
      <div className="order-confirmation">
        <div className="confirmation-grid">
          {/* LEFT */}
          <div className="items-panel">
            <div className="items-header">
              <h2>Items ({cartItems.length})</h2>
              <button className="remove-all" onClick={handleClearCart}>
                <DeleteIcon style={{ fontSize: 20, marginRight: 6 }} />
                <span style={{ color: "#000000", fontSize: "16px" }}>Remove all</span>
              </button>
            </div>

            {(paymentSuccess ? cartSnapshot : cartItems).map((item: any) => (
              <div className="item-card" key={item.id}>
                <img src={`${serverApi}/${item.image}`} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>Size: {item.size || "-"}</p>
                  <p>Category: {item.category || "-"}</p>
                  <div className="qty-box">
                    <button onClick={() => handleDecrease(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item.id)}>+</button>
                  </div>
                </div>
                <div className="item-price">
                  ${item.price.toFixed(2)}
                  <DeleteIcon
                    className="item-delete-icon"
                    style={{marginLeft: 10, cursor: "pointer", color: "#c70000" }}
                    onClick={() => handleRemoveItem(item.id)}
                  />
                </div>
              </div>
            ))}

            {!paymentSuccess && (
              <div className="order-summary">
                <h3>Billing Information</h3>
                <form>
                  <label>Country *</label>
                  <input name="country" onChange={handleChange} required />
                  <div className="row">
                    <div>
                      <label>Full Name *</label>
                      <input name="fullName" onChange={handleChange} required />
                    </div>
                    <div>
                      <label>Phone *</label>
                      <input name="phone" onChange={handleChange} required />
                    </div>
                  </div>
                  <label>Address *</label>
                  <input name="address" onChange={handleChange} required />
                  <label>City *</label>
                  <input name="city" onChange={handleChange} required />
                  <label>Postal Code *</label>
                  <input name="postalCode" onChange={handleChange} required />
                  <label>Payment Method *</label>
                  <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                    <option value="CARD">Card</option>
                    <option value="PAYPAL">PayPal</option>
                    <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
                  </select>
                </form>
              </div>
            )}

            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="summary-line"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>
              <div className="summary-line"><span>Shipping</span><span>{shipping > 0 ? `$${shipping.toFixed(2)}` : "FREE"}</span></div>
              <div className="summary-total"><span>Total Price</span><span>${total.toFixed(2)}</span></div>
            </div>

            {paymentSuccess && (
              <div className="success-panel">
                <h3>🎉 Payment Successful!</h3>
                <p>Your order ID is: <strong>{orderId}</strong></p>
                <p>We’ve received your order and it’s being processed.</p>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="payment-panel">
            <h2>Checkout</h2>
            <div className="payment-methods">
              <img src="/icons/mastercard.svg" alt="Mastercard" />
              <img src="/icons/visa.svg" alt="Visa" />
              <img src="/icons/paypal.svg" alt="PayPal" />
            </div>

            {!paymentSuccess && (
              <form className="payment-form" onSubmit={handlePayNow}>
                <label>Cardholder name</label>
                <input type="text" placeholder="Full name on card" required />
                <label>Card number</label>
                <CardElement className="stripe-card-element" />
                <button type="submit" className="pay-btn">Pay now</button>
              </form>
            )}

            <button className="back-btn" onClick={handleBack}>← Back to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
