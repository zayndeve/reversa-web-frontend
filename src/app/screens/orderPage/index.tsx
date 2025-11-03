import React from "react";
import { Routes, Route } from "react-router-dom";
import OrdersPage from "./OrderPage";
import OrderConfirmation from "./OrderConfirmation";


export default function OrderPageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OrdersPage />} />
     
      <Route path="/:orderId" element={<OrderConfirmation />} />
      
    </Routes>
  );
}
