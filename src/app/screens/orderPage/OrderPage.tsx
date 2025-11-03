import React from "react";
import "../../css/orderPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  selectCartItems,
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../../../app/components/headers/cartSlice";
import { serverApi } from "../../../app/libs/config";
import ProductsBanner from "../productListPage/ShopBanner";

const OrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const location = useLocation();

  const steps: string[] = ["Proceed to Checkout", "Place Order"];

  // ✅ Route-based step detection (2 pages only)
  const path = location.pathname;
  const currentStep = path === "/order/checkout" ? 1 : 0;

  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );
  const delivery = subtotal < 100 ? 5 : 0;
  const total = subtotal + delivery;

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id: string) => {
    dispatch(increaseQty(id));
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQty(id));
  };

  const handleGoToCheckout = () => {
    navigate("/order/checkout");
  };

  return (
    <>
    <div><ProductsBanner/></div>
      <div className="checkout-wrapper">
 <div className="horizontal-tracker">
  <div className="tracker-bar">
    {steps.map((label, index) => {
      const isCompleted = index < currentStep;
      const isActive = index === currentStep;
      const isUpcoming = index > currentStep;

      return (
        <div
          key={index}
          className={`step-item ${isCompleted ? "completed" : ""} ${
            isActive ? "active" : ""
          } ${isUpcoming ? "upcoming" : ""}`}
        >
          <div className="circle">
            {isCompleted ? "✓" : index + 1}
          </div>
          <div className="label">{label}</div>
        </div>
      );
    })}
  </div>
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
                  <td>
                    <DeleteIcon
                      className="delete-icon"
                      onClick={() => handleRemove(item.id)}
                    />
                  </td>
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
                    <div className="quantity-control">
                      <button type="button" onClick={() => handleDecrease(item.id)}>
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className="quantity-input"
                      />
                      <button type="button" onClick={() => handleIncrease(item.id)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>

        {/* ✅ Totals Section */}
        <div className="cart-totals">
          <h2>Cart Totals</h2>
          <table>
            <tbody>
              <tr>
                <th>Subtotal</th>
                <td>${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Delivery</th>
                <td>${delivery.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Total</th>
                <td>${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <button className="checkout-btn" onClick={handleGoToCheckout}>
            Proceed To Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
